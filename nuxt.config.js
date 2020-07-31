const features = ["fetch", "Object.entries", "IntersectionObserver"].join(
  "%2C"
);
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "财查到-智能、高效的一站式创新金融监管科技服务平台",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width,user-scalable=yes"
      },
      { name: "renderer", content: "webkit|ie-comp|ie-stand" }, // 强制让360浏览器使用Webkit内核
      { "http-equiv": "X-UA-Compatible", content: "IE=11,chrome=1" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    script: [
      { src: "https://hm.baidu.com/hm.js?2ba00b65470c0639c7eb4f1b6eb5d40e" }, //添加百度统计,
      // {
      //   src: `https://polyfill.io/v3/polyfill.min.js?features=${features}`,
      //   body: true
      // },
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    "normalize.css",
    "element-ui/lib/theme-chalk/index.css",
    "@/assets/scss/_index.scss",
    
    

  ],

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "@/plugins/element-ui",
    "@/plugins/vue-filter",
    "@/plugins/router",
    "@/plugins/axios",
    { src: "@/plugins/poly", ssr: true }
  ],
  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: "custom",
          path: "*",
          component: resolve(__dirname, "pages/404/index.vue")
        },
        {
          name: "keywordList",
          path: "/keywordList/:currentPage/:keywords.html",
          component: resolve(__dirname, "pages/keywords/keywords.vue")
        },
        {
          name: "consultingResult",
          path: "/consultingResult/:id.html",
          component: resolve(
            __dirname,
            "pages/consultingResult/consultingResult.vue"
          )
        },
        {
          // 
          name: "homePage",
          path: "/homePage/:currentPage.html",
          component: resolve(
            __dirname,
            "pages/home/home.vue"
          )
        },
        {
          // 
          name: "baidu_verify_MOPP67UWop",
          path: "/baidu_verify_MOPP67UWop.html",
          component: resolve(
            __dirname,
            "pages/baidu_verify_MOPP67UWop/baidu_verify_MOPP67UWop.vue"
          )
        },
      );
    }
  },
  // server: {
  //   open: true,
  //   autoOpenBrowser: true
  // },
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios"],
  // axios: {
  //   prefix: "/api/",
  //   proxy: true
  // },
  // proxy: {
  //   "/api/": {
  //     target: "https://jsonplaceholder.typicode.com/",
  //     pathRewrite: {
  //       "^/api/": ""
  //     }
  //   }
  // },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/^element-ui/],
    vendor: ["babel-polyfill"]
  },

};
