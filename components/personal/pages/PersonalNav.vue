<template>
  <aside class="personal__aside-left col-12 col-xl-3">
    <div class="personal-nav">
      <nav>
        <ul>
          <li class="active">
            <a href="/personal">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21">
                  <g transform="translate(-1)">
                    <ellipse cx="10.5" cy="6.5" rx="4.5" ry="5.5" fill="none" fill-rule="evenodd" stroke="#979797"
                             stroke-width="2"/>
                    <path stroke-linecap="round" d="M2 20c1-5.333 3.833-8 8.5-8s7.5 2.667 8.5 8" fill="none"
                          fill-rule="evenodd" stroke="#979797" stroke-width="2"/>
                    </g>
                </svg>
              </div>
              <i class="d-none d-md-block">Мой</i>&nbsp;профиль
            </a>
          </li>
          <li>
            <a href="/personal/history">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22">
                  <path fill="none" fill-rule="evenodd" stroke-width="2" stroke="#949494"
                        d="M1 21h15a2 2 0 0 0 2-2V5.414L13.586 1H3a2 2 0 0 0-2 2v18z"/>
                  <path fill="none" fill-rule="evenodd" stroke-width="2" stroke="#979797" d="M12 2v4h5"/>
                  <path fill="none" fill-rule="evenodd" stroke-width="2" stroke="#979797" stroke-linecap="round"
                        d="M5.5 9.5h5M5.5 13.5H9"/>
                </svg>
              </div>
              <i class="d-none d-md-block">Итория заказов</i>&nbsp;<span
                    v-if="user">({{ user.orderCount }})</span>
              <i class="d-md-none">Заказы</i>
            </a>
          </li>
          <li>
            <a href="/personal/favorite">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20">
                  <path fill="none" fill-rule="evenodd" stroke="#949494" stroke-width="2"
                        d="M11.5 3L9.18 8.25H3L7.635 12 6.09 18l5.41-3 5.406 3-1.545-6L20 8.25h-6.184z"/>
                </svg>
              </div>
              <i class="d-none d-md-block">Избранные</i>&nbsp;товары <span v-if="user">({{ user.favoriteProductCount }})</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18">
                  <path fill="#949494" fill-rule="evenodd"
                        d="M15.158.002C13.33.006 11.597.599 10.422 2 9.247.599 7.514.006 5.686.002A5.539 5.539 0 0 0 .002 5.686a8.648 8.648 0 0 0 1.894 4.736c2.201 3.205 7.539 7.164 7.768 7.333.45.324 1.056.324 1.506 0 .239-.17 5.577-4.129 7.777-7.333a8.645 8.645 0 0 0 1.895-4.736A5.539 5.539 0 0 0 15.158.002zm1.895 9.473c-2.095 3.052-6.631 6.63-6.631 6.63s-4.536-3.578-6.631-6.63c-.774-1.128-1.895-2.31-1.895-3.79a3.869 3.869 0 0 1 3.79-3.789c1.86 0 4.027 1.222 4.736 2.842.71-1.617 2.878-2.842 4.736-2.842a3.751 3.751 0 0 1 3.79 3.79c0 1.241-1.122 2.661-1.895 3.789z"/>
                </svg>
              </div>
              <i class="d-none d-md-block">Избранные</i>&nbsp;страницы <span v-if="user">({{ user.favoritePagesCount }})</span>
            </a>
          </li>
          <li class="d-none d-sm-block">
            <a href="/api/v1/auth/logout">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24">
                  <path fill="none" fill-rule="evenodd" stroke="#949494" stroke-width="2" stroke-linecap="round"
                        d="M3.7 16.02a1.739 1.739 0 0 1-1.72-1.756V3.725c-.01-.96.76-1.746 1.72-1.756h11.315"/>
                  <path fill="none" fill-rule="evenodd" stroke="#949494" stroke-width="2"
                        d="M10 4l5.234-2A1.792 1.792 0 0 1 17 3.818v13.636c.014.989-.506 2.046-1.766 2.546L10.5 22c-1.5.5-2.34-.829-2.325-1.818V6.545C8.161 5.555 9.06 4.273 10 4z"/>
                </svg>
              </div>
              Выход
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
<script>
  export default {
    computed: {
      user() {
        return this.$store.getters['user/user'];
      }
    }
  }
</script>
