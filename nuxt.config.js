module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'optovik101_dev_v2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/jquery.fancybox.min.css' },
      { rel: 'stylesheet', href: '/all.min.css' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js' },
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#3B8070',
    height: '3px'
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      "vee-validate/dist/rules",
    ],
  },
  plugins: [
    {src: '~/plugins/rating-star', ssr: false},
    {src: '~/plugins/vee-validate'},
    { src: "~/plugins/swiper", ssr: false },
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },
  axios: {
    proxy: true
  },
  proxy: {
    '/api/':
        {
          target: 'http://ca77265.tmweb.ru/api/v1',
          pathRewrite: {'^/api/v1': ''}
        }
  }
};

