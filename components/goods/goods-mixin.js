import {merge} from 'lodash';

export const goodsMixin = {
  props: ['goodsId', 'itemData'],

  data() {
    return {
      apiUrl: 'api/v1/product/',
      offers: [],
      itemDataRender: null,
      previewPicture: '',
      selectedOffer: null,

      prices: [],
      minQuantity: 1,
      priceList: [],

      hasOffers: false,

      boxSize: null,
      packageSize: null,
      characteristicsCollapse: true,
      images: null
    };
  },

  computed: {
    /**
     * Get color from offers
     * @returns {Array}
     */
    colors() {
      let colors = [];

      if (this.offers.length > 1) {
        this.offers.forEach((offer) => {
          if (offer.color) {
            let alreadyColor = colors.find((color) => color.hex === offer.color.hex);

            // Add new color or add offerId to already color
            if (!alreadyColor) {
              colors.push(Object.assign({offerId: [offer.id]}, offer.color));
            } else {
              alreadyColor.offerId.push(offer.id);
            }
          }
        });
      }

      return colors;
    },

    /**
     * Get sizes from selected offer
     * @returns {Array}
     */
    sizes() {
      let sizes = [];

      if (this.colors.length > 0) {
        this.offers.forEach((offer) => {
          if (offer.size && offer.color &&
              offer.color.hex === this.selectedOffer.color.hex) {
            sizes.push({size: offer.size, offerId: offer.id});
          }
        });
      } else {
        this.offers.forEach((offer) => {
          if (offer.size) {
            sizes.push({size: offer.size, offerId: offer.id});
          }
        });
      }

      return sizes;
    },

    /**
     * Get tons from selected offer
     * @returns {Array}
     */
    tons() {
      let tons = [];

      this.offers.forEach((offer) => {
        if (offer.ton) {
          tons.push({ton: offer.ton, offerId: offer.id});
        }
      });

      return tons;
    },

    /**
     * Get price from selected offer
     * @returns {*}
     */
    price() {
      if (this.prices.length) {
        return this.prices.find((price) => price.id === this.selectedOffer.id);
      } else {
        return +this.selectedOffer.price;
      }
    },

    videoLink() {
      return this.itemDataRender.video ? this.itemDataRender.video : false;
    }
  },

  methods: {
    isLargeNameClass(name) {
      return name.length > 55;
    },

    /**
     * Get goods offers from server
     */
    getOffers() {
      if (!this.itemData) {
        this.$axios.$get('/api/v1/product/get', {params: {id: this.goodsId}})
            .then(response => {
              let result = merge({}, response.result);
              this.itemDataRender = result;

              this.boxSize = +result.boxSize;
              this.packageSize = +result.packageSize;
              this.minQuantity = +result.minQuantity;
              this.hasOffers = result.hasOffers;

              if (result.offers.length) {
                this.offers = result.offers;
                this.selectedOffer = this.offers[0];
              }

              this.priceList = result.priceList;
              this.getPrice(this.boxSize || 1);
              this.getImages();
            })
            .catch(err => {
              console.log(err);
            });
      } else {
        this.itemDataRender = this.itemData;
        this.boxSize = this.itemData.boxSize;
        this.packageSize = this.itemData.packageSize;
        this.minQuantity = this.itemData.minQuantity;
        this.priceList = this.itemData.priceList;
        this.hasOffers = this.itemData.hasOffers;

        if (this.itemData.offers.length) {
          this.offers = this.itemData.offers;
          this.selectedOffer = this.offers[0];
        }
        this.getImages();
      }
    },

    /**
     * Get available prices
     * @param quantity
     */
    getPrice(quantity = 1) {
      let type = 'box';

      if (quantity >= 1) type = 'goods';
      if (quantity % this.packageSize === 0) type = 'package';
      if (quantity % this.boxSize === 0) type = 'box';
    },

    /**
     * Add to basket
     * @param quantity
     */
    async addToBasket(params) {

      await this.$store.dispatch('basket/addToBasket',
          {
            params,
            selectedOfferId: this.selectedOffer.id,
            itemDataRenderHasOffers: this.itemDataRender.hasOffers
          }
      );
      if(params.showBasket){
        this.$bvModal.show('basket-modal');
      }
    },

    /**
     * When color or size changed
     * @param offerId
     */
    optionChanged(offerId) {
      this.selectedOffer = this.offers.find((offer) => offer.id === +offerId);
      this.getImages();
    },

    checkCollapse() {
      if (process.client) {
        this.characteristicsCollapse = window.innerWidth > 1199;
      }
    },

    getImages() {
      if (this.itemDataRender.offers &&
          this.itemDataRender.offers[0] &&
          this.itemDataRender.offers[0].previewPicture) {
        this.previewPicture = this.itemDataRender.offers[0].previewPicture;
      } else {
        this.previewPicture = this.itemDataRender.previewPicture;
      }

      if (this.selectedOffer && this.selectedOffer.pictures) {
        this.images = this.selectedOffer.pictures;
        this.images.previewPicture = this.selectedOffer.previewPicture;
      }
    }
  },

  /**
   * Get goods offers on created
   */
  created() {
    if (this.goodsId) {
      this.getOffers();
    }
  },

  watch: {
    itemData() {
      this.itemDataRender = this.itemData;

      if (this.itemDataRender.offers &&
          this.itemDataRender.offers[0] &&
          this.itemDataRender.offers[0].previewPicture) {
        this.previewPicture = this.itemDataRender.offers[0].previewPicture;
      }

      this.getOffers();
    },

    selectedOffer() {
      // this.getImages();
    },

    itemDataRender() {
      this.images = null;
      this.getImages();
    }
  }
};
