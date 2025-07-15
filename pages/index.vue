<template>
  <section>
    <LazyHomeComponent hydrate-on-visible />
    <LazyHomeSearchComponent hydrate-on-idle />
    <LazyHomeFollowerList v-if="false" hydrate-on-visible />
    <LazyHomeMostReading hydrate-on-visible />
    <LazyHomeLatestCompont hydrate-on-visible />
  </section>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
const { t, locale } = useI18n();
defineRouteRules({
  prerender: true,
});

const nuxtApp = useNuxtApp();
const isReady = ref(false);
nuxtApp.hook("app:mounted", () => {
  isReady.value = true;
});

const route = useRoute();

useSeoMeta({
  title: t("seoMega.home.title"),
  description: t("seoMega.home.description"),
  ogTitle: t("seoMega.home.title"),
  ogDescription: t("seoMega.home.description"),
  ogUrl: `https://www.ysk-comics.com${route.fullPath}`,
  ogImage: `https://www.ysk-comics.com/icones/logo.png`,
  keywords: `comic book pdf, comics pdf, english comics books pdf free, comics online free pdf, english comics pdf, comic book pdf free`,
  ogImageAlt: t("seoMega.home.title"),
  robots: "index, follow",
  ogType: "comics",
  ogImageType: "image/png",
  ogSiteName: "YSK Comics",
  ogLocale: locale.value,
  ogLocaleAlternate: "en",
  twitterTitle: t("seoMega.home.title"),
  twitterDescription: t("seoMega.home.description"),
  twitterImage: `https://www.ysk-comics.com/icones/logo.png`,
  twitterSite: "@YSK_Comics",
  twitterCard: "summary_large_image",
});

useHead({
  meta: [
    {
      name: "copyright",
      content: "YSK Comics",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, shrink-to-fit=no",
    },
  ],
  link: [
    {
      rel: "alternate",
      hreflang: locale.value,
      href: `https://www.ysk-comics.com${route.fullPath}`,
    },
  ],
});
</script>
