<template>
    <div>
      <div class="catalog-item__price">
        <ul>
          <li>
            <div>Ваша цена</div>
            <div v-if="basePrice > 0 || lowestPrice > 0">
              <span v-if="!isCountEqualToPackage() && !isCountEqualToBox()">{{ selectedPackedPrice | formatPrice }}</span>
              <span class="goods-buy__price is-package" v-if="isCountEqualToPackage()">
                      {{ packagePrice | formatPrice }}
                  </span>
              <span class="goods-buy__price is-box" v-if="isCountEqualToBox()">
                      {{ boxPrice | formatPrice }}
                  </span>
              р./шт
              <i v-if="basePrice > 0 && (lowestPriceFor === 'package' || lowestPriceFor === 'box')" class="info-badge"
                 :id="'helpAboutLowestPrice_' + selectedOffer.id" tabindex="-1">
                ?
              </i>
              <b-popover v-if="basePrice > 0 && (lowestPriceFor === 'package' || lowestPriceFor === 'box')"
                         :target="'helpAboutLowestPrice_' + selectedOffer.id"
                         triggers="focus"
                         placement="topright">
                      <span v-if="wholesalePackageTypeQuantity == 1">
                          <span v-if="(lowestPriceFor === 'package' && isCountEqualToPackage()) || (lowestPriceFor === 'box' && isCountEqualToBox())">
                              <strong class="orange-text">Эта цена с максимальной скидкой!</strong>
                          </span>
                          <span v-if="lowestPriceFor === 'box' && isCountEqualToPackage()">
                              При покупке <strong class="blue-text">коробками ({{ boxSize }} шт.)</strong> цена будет снижена до
                              <strong class="blue-text">{{ lowestPrice  | formatPrice}}</strong> р./шт
                          </span>
                          <span v-if="lowestPriceFor === 'box' && !isCountEqualToBox() && !isCountEqualToPackage()">
                              Цена может быть снижена до<br>
                              <strong class="blue-text">{{ lowestPrice  | formatPrice}}</strong> р./шт
                                  при покупке <strong class="blue-text">коробками ({{ boxSize }} шт.)</strong>
                          </span>
                          <span v-if="lowestPriceFor === 'package' && !isCountEqualToPackage()">
                              Цена может быть снижена до<br>
                              <strong class="green-text">{{ lowestPrice  | formatPrice}}</strong> р./шт
                                  при покупке <strong class="green-text">упаковками ({{ packageSize }} шт.)</strong>
                          </span>
                      </span>
                <span v-if="(wholesalePackageTypeQuantity == 2 && lowestPriceFor === 'package') || (wholesalePackageTypeQuantity == 3 && lowestPriceFor === 'box')">
                          <strong class="orange-text">Эта цена с максимальной скидкой!</strong>
                      </span>
                <span v-if="wholesalePackageTypeQuantity == 2 && lowestPriceFor === 'box'">
                           Цена может быть снижена до<br>
                              <strong class="blue-text">{{ lowestPrice  | formatPrice}}</strong> р./шт
                                  при покупке <strong class="blue-text">коробками ({{ boxSize }} шт.)</strong>
                      </span>
              </b-popover>
            </div>
            <div v-if="basePrice == 0 && lowestPrice == 0" class="no-price-box">
              <span class="no-price">по запросу</span>
            </div>
          </li>
          <li v-if="basePrice > 0">
            <div>Базовая цена</div>
            <div><span>{{ basePrice | formatPrice}}</span> р./шт</div>
          </li>
          <li v-if="basePrice === 0 && lowestPrice > 0">
            <div>Макс. скидка</div>
            <div>
              <span class="lowest-price">{{ lowestPrice  | formatPrice}}</span> р./шт
              <i class="info-badge" :id="'helpAboutLowestPrice_' + selectedOffer.id" tabindex="-1">
                ?
              </i>
              <b-popover :target="'helpAboutLowestPrice_' + selectedOffer.id"
                         triggers="focus"
                         placement="topright">
                Цена с максимальной скидкой доступна
                <strong v-if="lowestPriceFor === 'box'" class="blue-text">при покупке коробками ({{ boxSize }} шт.)</strong>
                <strong v-if="lowestPriceFor === 'package'" class="green-text">при покупке упаковками ({{ packageSize }} шт.)</strong>
                <strong v-if="lowestPriceFor === 'goods'">после регистрации</strong>
              </b-popover>
            </div>
          </li>
          <li v-if="basePrice == 0 && lowestPrice == 0">
            <div>Макс. скидка</div>
            <div class="no-price-box"><span class="no-price">по запросу</span></div>
          </li>
        </ul>
      </div>

      <div v-if="isMounted && selectedOffer.isAvailable && (basePrice > 0 || lowestPrice > 0)">
        <div class="goods-buy__pieces" v-if="!packageTypes.length">
          <div class="goods-buy__add">
            <quantity-input :min-quantity="minQuantity" :max-quantity="1000" @changed="quantity = $event"></quantity-input>
            <button type="button" class="goods-buy__add__btn" @click="goToBasket()" v-if="inBasketCount()">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                <g fill="none" fill-rule="evenodd">
                  <circle cx="20" cy="20" r="20" fill="url(#svg-main-gradient)"/>
                  <text class="text" x="50%" y="24" text-anchor="middle" fill="white">{{ inBasketCount() }}</text>
                </g>
              </svg>
            </button>
            <button type="button" class="goods-buy__add__btn" @click="buy()" v-if="inBasketCount() === 0">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                <g fill="none" fill-rule="evenodd">
                  <circle cx="20" cy="20" r="20" fill="url(#svg-main-gradient)"/>
                  <ellipse cx="17.826" cy="27.4" fill="#FFF" rx="1.565" ry="1.6"/>
                  <ellipse cx="24.087" cy="27.4" fill="#FFF" rx="1.565" ry="1.6"/>
                  <path stroke="#FFF" stroke-linecap="round" stroke-width="2"
                        d="M11 14h2.5l2.78 8.801a1 1 0 0 0 .953.699h7.09a1 1 0 0 0 .928-.629l2.2-5.5A1 1 0 0 0 26.523 16H14.5"/>
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div class="goods-buy__wholesale" v-if="packageTypes.length">
          <div class="goods-buy__add">
            <quantity-input
                    v-if="+wholesalePackageTypeQuantity < 2"
                    class="quantity" :current-mode="wholesalePackageTypeQuantity"
                    :reinit-quantity="quantity" :min-quantity="+minQuantity"
                    :max-quantity="1000" @changed="quantity = +$event">

            </quantity-input>
            <quantity-input v-if="+wholesalePackageTypeQuantity > 1"
                            class="wholesale-quantity"
                            :current-mode="wholesalePackageTypeQuantity"
                            :reinit-quantity="wholesaleQuantity" :min-quantity="1"
                            :max-quantity="1000" @changed="wholesaleQuantity = +$event">

            </quantity-input>
            <div class="goods-buy__add__select-wrap">
              <select2 class="test" :options="packageTypes" v-model="wholesalePackageTypeQuantity"></select2>
            </div>
            <button type="button" class="goods-buy__add__btn" @click="goToBasket()" v-if="inBasketCount()">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                <g fill="none" fill-rule="evenodd">
                  <circle cx="20" cy="20" r="20" fill="url(#svg-main-gradient)"/>
                  <text class="text" x="50%" y="24" text-anchor="middle" fill="white">{{ inBasketCount() }}</text>
                </g>
              </svg>
            </button>
            <button type="button" class="goods-buy__add__btn" @click="buyPackageOrBox()" v-if="inBasketCount() === 0">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                <g fill="none" fill-rule="evenodd">
                  <circle cx="20" cy="20" r="20" fill="url(#svg-main-gradient)"/>
                  <ellipse cx="17.826" cy="27.4" fill="#FFF" rx="1.565" ry="1.6"/>
                  <ellipse cx="24.087" cy="27.4" fill="#FFF" rx="1.565" ry="1.6"/>
                  <path stroke="#FFF" stroke-linecap="round" stroke-width="2"
                        d="M11 14h2.5l2.78 8.801a1 1 0 0 0 .953.699h7.09a1 1 0 0 0 .928-.629l2.2-5.5A1 1 0 0 0 26.523 16H14.5"/>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import QuantityInput from '~/components/shared/QuantityInput'
  import select2 from '~/components/shared/Select2'

  export default {
    name: 'goods-buy',
    props: [
      'selectedOffer',
      'priceList',
      'minQuantity',
      'boxSize',
      'packageSize',
      'isInCatalog',
      'hasOffers'
    ],
    components: {
      select2,
      QuantityInput
    },
    data() {
      let wholesalePackageTypeQuantityId = 1;

      if (this.isInCatalog) {
        if (+this.boxSize > 1 && +this.boxSize !== +this.packageSize && +this.minQuantity === +this.boxSize) {
          wholesalePackageTypeQuantityId = 3;
        }

        if (+this.packageSize > 1 && +this.minQuantity === +this.packageSize) {
          wholesalePackageTypeQuantityId = 2;
        }
      } else {
        if (+this.packageSize > 1) {
          wholesalePackageTypeQuantityId = 2;
        }

        if (+this.packageSize < 2 && +this.boxSize > 1) {
          wholesalePackageTypeQuantityId = 3;
        }
      }

      return {
        isMounted: false,
        quantity: +this.minQuantity,
        wholesaleQuantity: 1,
        wholesalePrice: 0,
        wholesalePackageTypeQuantity: wholesalePackageTypeQuantityId,
        piecePrice: 0,
        boxPrice: 0,
        packagePrice: 0,
        basePrice: 0,
        lowestPrice: 0,
        lowestPriceFor: null,
        isAvailable: false,
        //mock
      };
    },

    watch: {
      selectedOffer() {
        this.getPrices();
      },

      wholesalePackageTypeQuantity(e) {
        this.getPrices();
      }
    },

    computed: {
      /**
       * Return available package types
       * @returns {Array}
       */
      packageTypes() {
        let packageTypes = [];

        if (
            this.isInCatalog
        // &&
        // (+this.boxSize || +this.packageSize) &&
        // ((+this.packageSize < 2 || +this.minQuantity !== +this.packageSize) && (+this.boxSize < 2 || +this.minQuantity !== +this.boxSize))
        ) {
          packageTypes.push({id: 1, text: 'Шт.'});
        }

        if (this.packageSize && +this.packageSize > 1) {
          packageTypes.push({
            id: 2,
            text: !this.isInCatalog ? `Упаковка ${this.packageSize} шт.` : `Уп. ${this.packageSize} шт.`
          });
        }

        if (this.boxSize && +this.boxSize > 1 && +this.boxSize !== +this.packageSize) {
          packageTypes.push({
            id: 3,
            text: !this.isInCatalog ? `Коробка ${this.boxSize} шт.` : `Кор. ${this.boxSize} шт.`
          });
        }

        return packageTypes;
      },

      selectedPackedPrice() {
        switch (+this.wholesalePackageTypeQuantity) {
          case 2:
            return this.packagePrice;
          case 3:
            return this.boxPrice;
          default:
            return this.piecePrice;
        }
      },

      selectedPackageSize() {
        switch (+this.wholesalePackageTypeQuantity) {
          case 2:
            return +this.packageSize;
          case 3:
            return +this.boxSize;
          default:
            return 0;
        }
      },

      getEconomy() {
        return (this.piecePrice - this.selectedPackedPrice) * (this.wholesaleQuantity * this.selectedPackageSize);
      },

      getEconomyForPackageQuantity() {
        if (this.isCountEqualToPackage()) {
          return (this.piecePrice - this.packagePrice) * this.quantity;
        } else {
          return 0;
        }
      },

      getEconomyForBoxQuantity() {
        if (this.isCountEqualToBox()) {
          return (this.piecePrice - this.boxPrice) * this.quantity;
        } else {
          return 0;
        }
      },
      basketData() {
        return this.$store.getters['basket/basket'];
      },
    },

    methods: {
      //My mock
      wholesalePackageTypeName() {
        // switch(+this.wholesalePackageTypeQuantity) {
        //   case 2:
        //     return 'package';
        //   case 3:
        //     return 'box';
        //   default:
        //     return 'goods';
        // }

        if (this.isCountEqualToBox() || +this.wholesalePackageTypeQuantity === 3) {
          return 'box';
        }

        if (this.isCountEqualToPackage() || +this.wholesalePackageTypeQuantity === 2) {
          return 'package';
        }

        return 'goods';
      },

      buyPackageOrBox(showBasket = false) {
        if (+this.wholesalePackageTypeQuantity < 2) {
          this.buy(showBasket);
        }

        if (+this.wholesalePackageTypeQuantity > 1) {
          this.$emit('add-to-basket', {
            quantity: this.wholesaleQuantity * this.selectedPackageSize,
            type: this.wholesalePackageTypeName(),
            showBasket
          });
        }
      },

      buy(showBasket = false) {
        let type = 'goods';

        if (this.isCountEqualToPackage()) {
          type = 'package';
        }

        if (this.isCountEqualToBox()) {
          type = 'box';
        }

        this.$emit('add-to-basket', {quantity: this.quantity, type, showBasket});
      },

      getPrices() {
        let piecePrice = this.priceList.filter((price) => (price.priceId === 6 || price.priceId === 8) &&
            +price[this.hasOffers ? 'skuId' : 'productId'] === +this.selectedOffer.id && !price.isBase && !price.disabled);

        if (piecePrice.length > 0) {
          this.piecePrice = piecePrice[0].price;
        }

        let boxPrice = this.priceList.filter((price) => price.priceId === 10 &&
            +price[this.hasOffers ? 'skuId' : 'productId'] === +this.selectedOffer.id && !price.isBase);

        if (boxPrice.length > 0) {
          this.boxPrice = boxPrice[0].price;
        }

        let packagePrice = this.priceList.filter((price) => price.priceId === 9 &&
            +price[this.hasOffers ? 'skuId' : 'productId'] === +this.selectedOffer.id && !price.isBase);

        if (packagePrice.length > 0) {
          this.packagePrice = packagePrice[0].price;
        }

        let basePrice = this.priceList.filter((price) => price.priceId === 8 &&
            +price[this.hasOffers ? 'skuId' : 'productId'] === +this.selectedOffer.id && price.isBase);

        if (basePrice.length > 0) {
          this.basePrice = basePrice[0].price;
        }

        if (!this.boxSize && !this.packageSize) {
          let lowestPrice = this.priceList.filter((price) => (price.priceId === 6) &&
              +price[this.hasOffers ? 'skuId' : 'productId'] === +this.selectedOffer.id && !price.isBase && price.disabled);
          if (lowestPrice.length > 0) {
            this.lowestPrice = lowestPrice[0].price;
            this.lowestPriceFor = 'goods';
          }
        } else if (+this.boxSize > 0) {
          this.lowestPrice = this.boxPrice;
          this.lowestPriceFor = 'box';
        } else if (+this.packageSize > 0) {
          this.lowestPrice = this.packagePrice;
          this.lowestPriceFor = 'package';
        }
      },

      inBasketCount() {
        let count = 0;
        if (this.basketData.length) {
          this.basketData.forEach(item => {
            if (item.id === this.selectedOffer.id) {
              switch (+this.wholesalePackageTypeQuantity) {
                case 2: {
                  if (item.type === 'package') count += item.quantity;
                  break;
                }

                case 3: {
                  if (item.type === 'box') count += item.quantity;
                  break;
                }

                default: {
                  if (item.type === 'goods') count += item.quantity;
                }
              }
            }
          });
        }

        return count;
      },

      goToBasket() {
        this.buyPackageOrBox(this.selectedOffer.id);
      },

      isCountEqualToBox() {
        let q = this.quantity;
        if (this.isInCatalog) {
          if (+this.wholesalePackageTypeQuantity === 3 && +this.wholesaleQuantity > 0) {
            return true;
          }
          if (+this.wholesalePackageTypeQuantity === 2) {
            return (this.packageSize * this.wholesaleQuantity) % +this.boxSize === 0 && (this.packageSize * this.wholesaleQuantity) >= +this.boxSize;
          } else {
            return +this.boxSize > 1 && (q % +this.boxSize === 0) && this.quantity > +this.packageSize;
          }
        } else {
          return +this.boxSize > 1 && (q % +this.boxSize === 0) && this.quantity > +this.packageSize;
        }
      },

      isCountEqualToPackage() {
        let q = this.quantity;
        if (this.isInCatalog) {
          if (+this.wholesalePackageTypeQuantity === 2 && +this.wholesaleQuantity > 0 && !this.isCountEqualToBox()) {
            return true;
          }
          return +this.packageSize > 1 && (q % +this.packageSize) === 0 && (this.boxSize > 1 ? !this.isCountEqualToBox() : true);
        } else {
          return +this.packageSize > 1 && (q % +this.packageSize) === 0 && (this.boxSize > 1 ? !this.isCountEqualToBox() : true);
        }
      }
    },

    mounted() {
      this.isMounted = true;
      this.getPrices();
    }
  }
</script>
