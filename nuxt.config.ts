// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  devServer: {
    port: 5648,
  },

  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/html-validator",
    "@nuxt/fonts",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@formkit/auto-animate/nuxt",
    "@nuxt/ui",
    "nuxt-swiper",
    "nuxt-delay-hydration",
    "@nuxtjs/device",
    "nuxt-aos",
    // "@vite-pwa/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/sitemap",
  ],

  image: {
    // Enable image optimization
    provider: "ipx",
    format: ["webp", "avif", "jpeg"],
    quality: 85,
    // Preload critical images
    preload: true,
    // Enable responsive images
    responsive: {
      modifier: "width",
      sizes: "270px md:300px lg:360px",
    },
  },

  runtimeConfig: {
    public: {
      ConstUrl: process.env.NUXT_PUBLIC_CONSTURL,
      apiSecret: process.env.NUXT_PUBLIC_APISECRET,
      ConstUrlTemp: process.env.NUXT_PUBLIC_CONSTURL_TEMP,
      MarvelEn: process.env.NUXT_PUBLIC_MARVEL_EN,
      MarvelAr: process.env.NUXT_PUBLIC_MARVEL_AR,
      DcEn: process.env.NUXT_PUBLIC_DC_EN,
      DcAr: process.env.NUXT_PUBLIC_DC_AR,
    },
  },
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/icones/favicon.ico" },
        {
          rel: "apple-touch-icon",
          href: "/icones/apple-touch-icon.png",
        },
        {
          rel: "apple-touch-icon",
          href: "/icones/apple-touch-icon-57x57.png",
          sizes: "57x57",
        },
        {
          rel: "apple-touch-icon",
          href: "/icones/apple-touch-icon-72x72.png",
          sizes: "72x72",
        },
        {
          rel: "apple-touch-icon",
          href: "/icones/apple-touch-icon-76x76.png",
          sizes: "76x76",
        },
        {
          rel: "apple-touch-icon",
          href: "/icones/apple-touch-icon-114x114.png",
          sizes: "114x114",
        },
        {
          rel: "apple-touch-icon",
          href: "/icones/apple-touch-icon-120x120.png",
          sizes: "120x120",
        },
        {
          rel: "apple-touch-icon",
          href: "/icones/apple-touch-icon-144x144.png",
          sizes: "144x144",
        },
        {
          rel: "apple-touch-icon",
          href: "/icones/apple-touch-icon-152x152.png",
          sizes: "152x152",
        },
        {
          rel: "apple-touch-icon",
          href: "/icones/apple-touch-icon-180x180.png",
          sizes: "180x180",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  colorMode: {
    preference: "light",
  },
  delayHydration: {
    mode: "init",
  },
  experimental: {
    inlineRouteRules: true,
    payloadExtraction: false,
    defaults: {
      nuxtLink: {
        prefetchOn: {
          interaction: true,
          visibility: false,
        },
      },
    },
  },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  htmlValidator: {
    usePrettier: true,
  },
  i18n: {
    experimental: {
      switchLocalePathLinkSSR: true,
    },
    customRoutes: "config",
    langDir: "locales",
    baseUrl: "https://ysk-comics.com",
    locales: [
      { code: "en", name: "English", file: "en.json", language: "en-US" },
      { code: "ar", name: "Arabic", file: "ar.json", language: "ar-SA" },
    ],
    defaultLocale: "en",
    strategy: "prefix",
  },

  // pwa: {
  //   registerType: "autoUpdate",
  //   manifest: {
  //     name: "YSK Comcis App",
  //     short_name: "YSKComcis",
  //     description: "YSK Comcis App",
  //     theme_color: "#ffffff",
  //     icons: [
  //       {
  //         src: "/icones/apple-touch-icon.png",
  //         type: "image/png",
  //         purpose: "any maskable",
  //       },
  //       {
  //         src: "/icones/apple-touch-icon-180x180.png",
  //         sizes: "180x180",
  //         type: "image/png",
  //         purpose: "any maskable",
  //       },
  //     ],
  //   },
  // },
  routeRules: {
    "/en/publisher/Marvel-Comics": { prerender: true },
    "/ar/publisher/مارفل-كوميكس": { prerender: true },
    "/en/publisher/DC-Comics": { prerender: true },
    "/ar/publisher/دي-سي-كوميكس": { prerender: true },
    "/_nuxt/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
      swr: true,
    },
    "/assets/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
      swr: true,
    },
    "/_fonts/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
      swr: true,
    },
  },

  site: {
    url: "https://ysk-comics.com",
    name: "YSK Comics",
    defaultLocale: "en",
  },
  sitemap: {
    autoI18n: true,
    exclude: [
      // Use relative paths instead of full URLs
      "/en/account",
      "/ar/account",

      "/en/resetpassword",
      "/ar/resetpassword",

      "/en/history",
      "/ar/history",

      "/en/newpassword",
      "/ar/newpassword",

      "/en/resetcode",
      "/ar/resetcode",

      "/en/savedItems",
      "/ar/savedItems",

      "/en/settings",
      "/ar/settings",

      "/en/auth/callback",
      "/ar/auth/callback",

      "/en/login",
      "/ar/login",

      "/en/signup",
      "/ar/signup",

      "/en/ask",
      "/ar/ask",

      "/en/comments",
      "/ar/comments",

      "/en/following",
      "/ar/following",

      "/en/mywork",
      "/ar/mywork",

      "/en/reject",
      "/ar/reject",

      "/en/think",
      "/ar/think",

      "/ar/translator-request",
      "/en/translator-request",

      "/en/translatorAccount",
      "/ar/translatorAccount",

      "/en/translatorDetails",
      "/ar/translatorDetails",

      "/en/uploadchapter",
      "/ar/uploadchapter",

      "/en/uploadcomic",
      "/ar/uploadcomic",
    ],

    sources: ["/api/__sitemap__/urls"],
    xslColumns: [
      { label: "URL", width: "50%" },
      { label: "Last Modified", select: "sitemap:lastmod", width: "25%" },
      { label: "Priority", select: "sitemap:priority", width: "12.5%" },
      { label: "Images", select: "1", width: "12.5%" },
      {
        label: "Change Frequency",
        select: "sitemap:changefreq",
        width: "12.5%",
      },
    ],
    defaults: {
      changefreq: "monthly",
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    discoverImages: true,
    chunks: true,
    urls: [
      {
        loc: "/en",
        lastmod: new Date().toISOString(),
        priority: 1,
        changefreq: "monthly",
        images: [
          {
            loc: "https://www.ysk-comics.com/logo.png",
            title: "ysk comics",
            caption: "ysk comics logo image",
          },
        ],
      },
      {
        loc: "/ar",
        lastmod: new Date().toISOString(),
        priority: 1,
        changefreq: "monthly",
        images: [
          {
            loc: "https://www.ysk-comics.com/logo.png",
            title: "ysk comics",
            caption: "ysk comics logo image",
          },
        ],
      },
      {
        loc: "/en/blogs",
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "monthly",
        images: [
          {
            loc: "https://www.ysk-comics.com/logo.png",
            title: "ysk comics",
            caption: "ysk comics logo image",
          },
        ],
      },
      {
        loc: "/ar/blogs",
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "monthly",
        images: [
          {
            loc: "https://www.ysk-comics.com/logo.png",
            title: "ysk comics",
            caption: "ysk comics logo image",
          },
        ],
      },
      {
        loc: "/ar/copyright",
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "monthly",
        images: [
          {
            loc: "https://www.ysk-comics.com/logo.png",
            title: "ysk comics",
            caption: "ysk comics logo image",
          },
        ],
      },
      {
        loc: "/en/copyright",
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "monthly",
        images: [
          {
            loc: "https://www.ysk-comics.com/logo.png",
            title: "ysk comics",
            caption: "ysk comics logo image",
          },
        ],
      },
      {
        loc: "/ar/DMCA",
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "monthly",
        images: [
          {
            loc: "https://www.ysk-comics.com/logo.png",
            title: "ysk comics",
            caption: "ysk comics logo image",
          },
        ],
      },
      {
        loc: "/en/DMCA",
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "monthly",
        images: [
          {
            loc: "https://www.ysk-comics.com/logo.png",
            title: "ysk comics",
            caption: "ysk comics logo image",
          },
        ],
      },
      {
        loc: "/ar/publishers",
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "monthly",
        images: [
          {
            loc: "https://www.ysk-comics.com/logo.png",
            title: "ysk comics",
            caption: "ysk comics logo image",
          },
        ],
      },
      {
        loc: "/en/publishers",
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "monthly",
        images: [
          {
            loc: "https://www.ysk-comics.com/logo.png",
            title: "ysk comics",
            caption: "ysk comics logo image",
          },
        ],
      },
      {
        loc: "/en/search",
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "monthly",
        images: [
          {
            loc: "https://www.ysk-comics.com/logo.png",
            title: "ysk comics",
            caption: "ysk comics logo image",
          },
        ],
      },
      {
        loc: "/ar/search",
        lastmod: new Date().toISOString(),
        priority: 0.9,
        changefreq: "monthly",
        images: [
          {
            loc: "https://www.ysk-comics.com/logo.png",
            title: "ysk comics",
            caption: "ysk comics logo image",
          },
        ],
      },
    ],
  },
});
