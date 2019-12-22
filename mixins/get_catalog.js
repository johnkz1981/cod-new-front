import qs from 'qs';
export default {
  mounted() {
    this.catalogMounted = true;
    this.getCatalog(false, true);
  },

  methods: {
    /**
     * Get catalog from server
     */
    getCatalog: function (add = false, initLoad = false) {
      const params = Object.assign(
          {
            filter: window.innerWidth >= 1200 ?
                (this.$refs.catalogFilter ? this.$refs.catalogFilter.requestParams : {}) :
                (this.$refs.catalogFilterMobile ? this.$refs.catalogFilterMobile.requestParams : {}),
            section: this.sectionId,
            page: this.currentPage
          },
          window.innerWidth >= 768 ?
              (this.$refs.catalogTop ? this.$refs.catalogTop.requestParams : {}) :
              (this.$refs.catalogTopMobile ? this.$refs.catalogTopMobile.requestParams : {})
      );

      if (typeof this.elementId !== 'undefined') {
        params.elementId = this.elementId;
      }

      if (typeof this.onlyAvailable !== 'undefined') {
        params.onlyAvailable = this.onlyAvailable;
      }

      if (typeof this.searchQuery !== 'undefined') {
        params.searchQuery = this.searchQuery;
      }

      if (typeof this.isPopular !== 'undefined' && +this.isPopular > 0) {
        params.isPopular = this.isPopular;
      }

      this.itemsPerPage = (this.$refs.catalogTop ? this.$refs.catalogTop.requestParams.quantity : 36);

      this.$parent.loading = true;

      if (typeof this.isSlider !== 'undefined' && +this.isSlider > 0) {
        this.itemsPerPage = this.isSlider;
        params.quantity = this.itemsPerPage;
        params.isSlider = true;
      }

      if(Object.keys(this.$nuxt.$loading).length){
        this.$nuxt.$loading.start();
      }

      this.$axios.$get(this.apiUrl, {
        params: params,
        paramsSerializer(params) {
          return qs.stringify(params, {encode: false});
        }
      })
          .then(response => {
            const result = response.result;

            if (add) {
              this.catalogItems = this.catalogItems.concat(result.list || []);
            } else {
              this.catalogItems = result.list || [];
            }
            this.catalogFilterData = result.filter;
            this.catalogItemsAllCount = +result.count;

            setTimeout(() => {
              this.$parent.loading = false;

              if (
                  add === false &&
                  typeof this.elementId === 'undefined' &&
                  !initLoad
              ) {
                let body = $('html, body');
                let catalog = $('.catalog').get(0);
                body.stop().animate({scrollTop: catalog.offsetTop - 75}, 0, 'swing', function () {
                });
              }
            }, 10);
          })
          .catch(err => {
            console.log(err);
          });
    },
    changeOptions($event) {

    }
  }
}