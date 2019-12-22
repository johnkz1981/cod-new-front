<template>
  <div class="bottom-nav">
    <nav>
      <ul>
        <li class="bottom-nav__item">
          <a href="/catalog/level2">
            <div class="bottom-nav__new">NEW</div>
            <span>Новинки</span>
          </a>
        </li>
        <li class="bottom-nav__goods">
          <a href="/catalog/level2" class="js-catalog-toggle">
            <img src="/local/templates/cente/assets/img/svg/bottom-nav-goods-white.svg">
            <span>Товары</span>
          </a>
        </li>
        <li class="bottom-nav__item">
          <a href="#" v-b-modal="'basket-modal'">
            <img src="/local/templates/cente/assets/img/svg/bottom-nav-basket.svg">
            <span>Корзина</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>