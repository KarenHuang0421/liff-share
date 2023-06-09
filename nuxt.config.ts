// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: "https://static.line-scdn.net/liff/edge/2/sdk.js",
          // charset: "utf-8",
        },
        // {
        //   src: "./plugins/addtohomescreen.js",

        // },
      ],
      // link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
        },
      ],
      // link: [
      //   { rel: 'manifest', href: '/manifest.json' }
      // ]
    },
  },
  devtools: { enabled: true },
  css: ["~/assets/css/global.css", "~/assets/css/base.css"],
  plugins: ["~/plugins/liff.js"],
  runtimeConfig: {
    public: {
      // lineLiffId: "1657931434-lbwp08oO" //test line account
      lineLiffId: "1661275837-PmpLpWJJ"
    }
  }
})
