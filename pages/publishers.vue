<template>
  <div class="containerClass pb-8 pt-24 md:pb-16">
    <!-- Data Grid -->
    <div
      v-if="data?.data?.data_messages?.length > 0"
      ref="scrollTo"
      class="grid grid-cols-2 place-items-center gap-4 lg:grid-cols-3 xl:grid-cols-4 perspective"
    >
      <template v-for="num in data.data.data_messages" :key="num">
        <NuxtLink
          data-aos="zoom-out-up"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          :to="localePath(`/publisher/${num.slug}`)"
          class="card cursor-pointer backdrop-blur-2xl border border-color14 shadow-lg rounded px-3 md:px-6 py-6 md:py-8 flex flex-col gap-4 transform transition-transform duration-300"
        >
          <v-lazy-image
            :src="num.image"
            :alt="`${num.name} ${$t('publisherAlts.logoAlt')}`"
            class="w-[150px] md:w-[250px] h-[50px] md:h-[100px] rounded-lg object-contain"
          />

          <PublicStarsV2 :value="Number(num.rate)" />
          <div
            class="flex items-center"
            :class="locale === 'ar' ? 'gap-2 md:gap-6' : 'gap-2 md:gap-6'"
          >
            <p class="text-bf font-medium text-sm md:text-base">
              {{ $t("dataAge") }}:
            </p>
            <p class="text-white font-bold text-base md:text-lg">
              {{ num.year }}
            </p>
          </div>
          <div
            class="flex items-center"
            :class="locale === 'ar' ? 'gap-2 md:gap-16' : 'gap-2 md:gap-9'"
          >
            <p class="text-bf font-medium text-sm md:text-base">
              {{ $t("country") }}:
            </p>
            <p class="text-white font-bold text-base md:text-lg">
              {{ num.Country }}
            </p>
          </div>
          <div
            class="flex items-center"
            :class="locale === 'ar' ? 'gap-2 md:gap-8' : 'gap-2 md:gap-5'"
          >
            <p class="text-bf font-medium text-base">{{ $t("noSeries") }}:</p>
            <p class="text-white font-bold text-base md:text-lg">
              {{ num.num_comics }}
            </p>
          </div>
          <div class="flex items-center gap-2 md:gap-14">
            <p class="text-bf font-medium text-base">{{ $t("Name") }}:</p>
            <p class="text-white font-bold text-base md:text-lg">
              {{ num.name }}
            </p>
          </div>
        </NuxtLink>
      </template>
    </div>

    <div
      v-if="totalPages && totalPages > 1"
      :class="locale === 'ar' ? 'flex-row-reverse' : ''"
      class="flex flex-wrap justify-center items-center gap-2 md:gap-8 my-8"
    >
      <button
        aria-label="prev"
        type="button"
        @click="goToPrevious"
        :disabled="currentPage === 1"
        class="w-[30px] h-[30px] md:w-[45px] md:h-[45px] transition-all duration-300 hover:bg-d36 hover:text-color14 hover:border-d36 active:bg-d36 active:text-color14 active:border-d36 cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
      >
        <svg
          class="w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"
          />
        </svg>
      </button>
      <ul class="flex flex-wrap gap-1 md:gap-2 items-center text-white">
        <li :key="'pageOne'">
          <button
            aria-label="pageOne"
            type="button"
            @click="goToPage(1)"
            class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
            :class="currentPage === 1 ? 'bg-f0d' : 'bg-oneA'"
          >
            1
          </button>
        </li>
        <li
          :key="'pointsStart'"
          aria-label="pointsStart"
          v-if="pages[0] > 2"
          class="bg-oneA grid place-items-center w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
        >
          ...
        </li>
        <li v-for="page in pages" :key="page">
          <button
            :aria-label="`goToPage ${page}`"
            type="button"
            @click="goToPage(page)"
            class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
            :class="currentPage === page ? 'bg-f0d' : 'bg-oneA'"
          >
            {{ page }}
          </button>
        </li>
        <li
          :key="'points'"
          aria-label="points"
          v-if="currentPage < totalPages - 3"
          class="bg-oneA grid place-items-center w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
        >
          ...
        </li>
        <li :key="'totalPages'">
          <button
            type="button"
            aria-label="totalPages"
            @click="goToPage(totalPages)"
            class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
            :class="currentPage === totalPages ? 'bg-f0d' : 'bg-oneA'"
          >
            {{ totalPages }}
          </button>
        </li>
      </ul>
      <button
        aria-label="next"
        type="button"
        @click="goToNext"
        :disabled="currentPage === totalPages"
        class="w-[30px] h-[30px] md:w-[45px] md:h-[45px] transition-all duration-300 hover:bg-d36 hover:text-color14 hover:border-d36 active:bg-d36 active:text-color14 active:border-d36 cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import VLazyImage from "v-lazy-image";

const localePath = useLocalePath();
definePageMeta({
  layout: "default",
});
defineRouteRules({
  prerender: true,
});

const scrollTo = ref();
const route = useRoute();
const { locale, t } = useI18n();
const { isMobile } = useDevice();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;

const currentPage = ref(1);
const totalPages = ref(0);

// Fetch data using useFetch
const { data } = await useFetch(
  computed(
    () =>
      `${url}/publishers?page=${currentPage.value}&paginate=${isMobile ? 5 : 10}`
  ),
  {
    headers: {
      "X-Localization": locale.value,
    },
  }
);
totalPages.value = data.value?.data?.meta?.total_pages || 1;

// Pagination logic
const pages = computed(() => {
  const range = [];
  if (isMobile) {
    // For mobile, show only 4 pages at max (e.g., 1 2 3 4)
    const start = Math.max(2, currentPage.value - 1);
    const end = Math.min(totalPages.value - 1, currentPage.value + 2);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
  } else {
    // For desktop, show a wider range (e.g., 2 3 4 5 6 7 8)
    const start = Math.max(2, currentPage.value - 3);
    const end = Math.min(totalPages.value - 1, currentPage.value + 3);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
  }
  return range;
});

const goToPage = async (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return;
  currentPage.value = page;
  console.log(
    currentPage.value,
    page,
    `${url}/publishers?page=${currentPage.value}&paginate=${isMobile ? 5 : 10}`
  );

  if (scrollTo.value) {
    const offset =
      scrollTo.value.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust 100 to your desired offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

const goToNext = async () => {
  if (currentPage.value >= totalPages.value) return;
  currentPage.value += 1;
  if (scrollTo.value) {
    const offset =
      scrollTo.value.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust 100 to your desired offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

const goToPrevious = async () => {
  if (currentPage.value <= 1) return;
  currentPage.value -= 1;
  if (scrollTo.value) {
    const offset =
      scrollTo.value.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust 100 to your desired offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

useSeoMeta({
  title: t("publishersSeo.title"),
  description: t("publishersSeo.des"),
  ogTitle: t("publishersSeo.title"),
  ogDescription: t("publishersSeo.des"),
  ogUrl: `https://www.ysk-comics.com${route.fullPath}`,
  ogImage: `https://www.ysk-comics.com/icones/logo.png`,
  keywords: `comic book pdf, comics pdf, english comics books pdf free, comics online free pdf, english comics pdf, comic book pdf free`,
  ogImageAlt: t("publishersSeo.title"),
  robots: "index, follow",
  ogType: "comics",
  ogImageType: "png,jpg",
  ogSiteName: "YSK Comics",
  ogLocale: locale.value,
  ogLocaleAlternate: "en",
  twitterTitle: t("publishersSeo.title"),
  twitterDescription: t("publishersSeo.des"),
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

<style scoped>
.perspective {
  perspective: 1000px;
}
.card {
  transform: none;
}

@media (min-width: 768px) {
  .card:hover {
    transform: translateZ(50px);
  }
}
</style>
