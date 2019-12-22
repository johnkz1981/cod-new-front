import Select2 from '~/components/shared/Select2'
import QuantityInput from '~/components/shared/QuantityInput'

export default {

  components: {
    Select2,
    QuantityInput
  },
  props: ['basketItemData'],
  data() {
    return {
      currentQuantity: 1,
      loading: false,
      selectedColor: null,
      selectedSize: null,
      selectedTon: null,
      colors: [],
      sizes: [],
      tons: [],
      wholesaleQuantity: 0,
      wholesalePackageTypeQuantity: null,
      propsPasted: false,
      defaultQuantity: 0,
      selectedOfferParams: {
        selectedColor: null,
        selectedSize: null,
        selectedTon: null
      },
      // My
      basketItemDataQuantity: 0,
      basketItemDataType: '',
    };
  },

  computed: {
    selectedOffer() {
      return this.basketItemData.info.offers.find(
          item => item.id === this.basketItemData.id
      );
    },

    /**
     * Return available package types.
     * @returns {Array}
     */
    packageTypes() {
      let packageTypes = [],
          info = this.basketItemData.info;

      if (info.boxSize && info.boxSize > 1) {
        packageTypes.push({id: 3, text: `Коробка ${info.boxSize} шт`, type: 'box'});
      }

      if (info.packageSize && info.packageSize > 1) {
        packageTypes.push({id: 2, text: `Упаковка ${info.packageSize} шт`, type: 'package'});
      }

      if (packageTypes.length > 0) {
        packageTypes.push({id: 1, text: 'Поштучно', type: 'goods'});
      }

      return packageTypes;
    },

    getDefaultMinQuantity() {
      let info = this.basketItemData.info;

      switch (this.basketItemData.type) {
        case 'box':
          return 1;
        case 'package':
          return 1;
        default:
          return info.minQuantity;
      }
    },

    getDefaultQuantity() {
      let info = this.basketItemData.info;
      let quantity = this.basketItemData.quantity;

      switch (this.basketItemData.type) {
        case 'box':
          quantity = quantity / info.boxSize;
          break;
        case 'package':
          quantity = quantity / info.packageSize;
          break;
        default:
          quantity = this.basketItemData.quantity;
      }

      this.currentQuantity = quantity;

      return quantity;
    },

    price() {
      return +this.selectedOffer.price;
    },
  },

  methods: {
    getPackageTypeName() {
      switch (this.basketItemData.type) {
        case 'box':
          return 'кор.';
        case 'package':
          return 'уп.';
        default:
          return 'шт.';
      }
    },

    getColors() {
      let colors = [];

      if (this.basketItemData.info.offers.length > 1) {
        this.basketItemData.info.offers.forEach(offer => {
          if (
              !offer.isAvailable ||
              (typeof offer.color === 'undefined' || offer.color.length === 0 || offer.color === null)
          ) {
            return;
          }

          let alreadyColor = colors.find(color => color.id === offer.color.id);

// Add new color or add offerId to already color
          if (!alreadyColor) {
            colors.push({
              id: offer.color.id,
              text: offer.color.name,
              color: offer.color.hex
            });
          }
        });
      }

      return colors;
    },

    getSizes() {
      let sizes = [];

      if (this.colors.length > 0) {
        this.basketItemData.info.offers.forEach(offer => {
          if (
              offer.isAvailable &&
              offer.size && offer.size.length > 0 &&
              ((this.colors.length > 0 && offer.color &&
                  offer.color.id === this.selectedOffer.color.id) ||
                  this.colors.length === 0)
          ) {
            sizes.push({
              size: offer.size,
              id: offer.size,
              text: offer.size
            });
          }
        });
      } else {
        this.basketItemData.info.offers.forEach(offer => {
          if (
              offer.isAvailable &&
              offer.size && offer.size.length > 0
          ) {
            sizes.push({
              size: offer.size,
              id: offer.size,
              text: offer.size
            });
          }
        });
      }

      return sizes;
    },

    getTons() {
      let tons = [];

      this.basketItemData.info.offers.forEach(offer => {
        if (
            offer.isAvailable &&
            offer.ton && offer.ton.length > 0
        ) {
          tons.push({
            ton: offer.ton,
            id: offer.ton,
            text: offer.ton
          });
        }
      });

      return tons;
    },

    /**
     * Delete item from basket
     * @param item
     */
    basketItemDelete() {
      this.$emit('basket-item-delete', this.basketItemData);
    },

    getWholesaleQuantity() {
      let info = this.basketItemData.info;

      switch (this.basketItemData.type) {
        case 'goods':
          return 1;
        case 'box':
          return info.boxSize;
        case 'package':
          return info.packageSize;
        default:
          return 1;
      }
    },

    update() {
      this.$emit('changed', {
        params: {
          basketId: this.basketItemData.basketId,
          offerId: this.selectedOffer.id,
          quantity: this.basketItemDataQuantity,
          type: this.basketItemDataType,
          isOffer: this.basketItemData.info.hasOffers
        }
      });
    },

    quantityChange($event) {
      this.currentQuantity = $event;
      // this.basketItemData.quantity = $event * +this.wholesaleQuantity;
      this.basketItemDataQuantity = $event * +this.wholesaleQuantity;

      this.update();
    },

    getQuantityForBasket() {
      let info = this.basketItemData.info;
      let quantity = this.basketItemData.quantity;

      switch (this.basketItemData.type) {
        case 'box':
          quantity = quantity / info.boxSize;
          break;
        case 'package':
          quantity = quantity / info.packageSize;
          break;
        default:
          quantity = this.basketItemData.quantity;
      }

// this.currentQuantity = quantity;

      return quantity;
    },

    reInit() {
      if (this.selectedOffer &&
          this.selectedOffer.color != null &&
          typeof this.selectedOffer.color !== 'undefined') {
        this.selectedColor = this.selectedOffer.color.id;
      }

      if (this.selectedOffer &&
          typeof this.selectedOffer.color !== 'undefined' &&
          this.selectedOffer.size &&
          this.selectedOffer.size.length > 0) {
        this.selectedSize = this.selectedOffer.size;
      }

      if (
          this.selectedOffer &&
          (typeof this.selectedSize === 'undefined' || this.selectedSize === null) &&
          (typeof this.selectedOffer.color === 'undefined' || (this.selectedOffer.color && this.selectedOffer.color.length === 0)) &&
          (typeof this.selectedOffer.size !== 'undefined' && this.selectedOffer.size.length > 0)
      ) {
        this.selectedSize = this.selectedOffer.size;
      }

      if (this.selectedOffer &&
          this.selectedOffer.ton &&
          this.selectedOffer.ton.length > 0) {
        this.selectedTon = this.selectedOffer.ton;
      }

      this.loading = false;
      this.wholesaleQuantity = this.getWholesaleQuantity();
    }
  },

  watch: {
    wholesalePackageTypeQuantity(type, oldType) {
      if (typeof oldType === 'undefined' || oldType === null || +oldType === +type) return;

      switch (+type) {
        case 2:
          this.basketItemDataType = 'package';
          this.basketItemDataQuantity = +this.basketItemData.info.packageSize * this.currentQuantity;
          break;
        case 3:
          this.basketItemDataType = 'box';
          this.basketItemDataQuantity = +this.basketItemData.info.boxSize * this.currentQuantity;
          break;
        default:
          this.basketItemDataType = 'goods';
          this.basketItemDataQuantity = this.currentQuantity;
      }

      this.update();
    },

    selectedColor(newColor) {
      if (typeof newColor !== 'undefined' && +newColor > 0) {
        this.selectedOfferParams = {
          selectedColor: newColor,
          selectedSize: this.selectedOfferParams.selectedSize
        };
      }
    },

    selectedSize(newSize) {
      if (typeof newSize !== 'undefined' && newSize !== '' && newSize.length > 0) {
        this.selectedOfferParams = {
          selectedColor: this.selectedOfferParams.selectedColor,
          selectedSize: newSize
        };
      }
    },

    selectedTon(newT) {
      if (typeof newT !== 'undefined' && newT !== '' && newT.length > 0) {
        this.selectedOfferParams.selectedTon = newT;
      }
    },

    selectedOfferParams: {
      handler: function (newVal, oldVal) {
        let colorChanged = (oldVal.selectedColor !== null && +newVal.selectedColor !== +oldVal.selectedColor);
        let sizeChanged = (oldVal.selectedSize !== null && newVal.selectedSize !== oldVal.selectedSize);
        let tonChanged = (oldVal.selectedTon !== null && newVal.selectedTon !== oldVal.selectedTon);

        if (!sizeChanged && !colorChanged && !tonChanged) {
          return;
        }

        if (this.tons.length > 0) {
          this.basketItemData.id = this.basketItemData.info.offers.find((offer) => offer.ton === newVal.selectedTon).id;

          if (newVal.selectedTon && newVal.selectedTon.length > 0) {
            return this.update();
          }
        }

        if (this.colors.length > 0 && this.sizes.length === 0) {
          this.basketItemData.id = this.basketItemData.info.offers.find((offer) => offer.color.id === +newVal.selectedColor).id;

          if (+newVal.selectedColor > 0) {
            return this.update();
          }
        }

        if (this.colors.length === 0 && this.sizes.length > 0) {
          this.basketItemData.id = this.basketItemData.info.offers.find((offer) => offer.size === newVal.selectedSize).id;

          if (newVal.selectedSize && newVal.selectedSize.length > 0) {
            return this.update();
          }
        }

        if (this.colors.length > 0 && this.sizes.length > 0) {
          let offer = this.basketItemData.info.offers
              .find((offer) => offer.color.id === +newVal.selectedColor && offer.size === newVal.selectedSize);

          if (typeof offer === 'undefined') {
            offer = this.basketItemData.info.offers.find((offer) => offer.color.id === +newVal.selectedColor);
            this.basketItemData.id = offer.id;
            this.sizes = this.getSizes();
            this.selectedSize = offer.size;

            return;
          }

          this.basketItemData.id = offer.id;

          if (colorChanged) {
            this.sizes = this.getSizes();
          }

          if (+newVal.selectedColor > 0 && newVal.selectedSize && newVal.selectedSize.length > 0) {
            return this.update();
          }
        }
      },
      deep: true
    },

    basketItemData() {
      this.reInit();
    }
  },

  mounted() {
    switch (this.basketItemData.type) {
      case 'package':
        this.wholesalePackageTypeQuantity = 2;
        break;
      case 'box':
        this.wholesalePackageTypeQuantity = 3;
        break;
      default:
        this.wholesalePackageTypeQuantity = 1;
    }

    this.colors = this.getColors();
    this.sizes = this.getSizes();
    this.tons = this.getTons();

    this.reInit();
  }
}