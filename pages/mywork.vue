<template>
  <div>
    <div v-if="pending && !chapters?.data?.data?.length" class="containerClass">
      <div
        class="grid gap-4 py-8 place-items-center grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <template v-for="index in 4" :key="index">
          <div
            class="flex flex-col relative h-[357px] md:h-[502px] overflow-hidden"
          >
            <div
              class="h-[250px] md:h-[400px] w-full bg-gray-300 rounded animate-pulse"
            ></div>
            <div class="h-6 w-3/4 bg-gray-300 rounded mt-4 animate-pulse"></div>
            <div class="h-4 w-1/2 bg-gray-300 rounded mt-2 animate-pulse"></div>
          </div>
        </template>
      </div>
    </div>

    <div
      class="grid gap-4 place-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
      v-else
    >
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        class="flex flex-col relative h-[357px] md:h-[502px] overflow-hidden md:hover:rounded-md group md:hover:shadow-combined-hover cursor-pointer transition-all duration-300"
        v-for="chapter in chapters?.data?.data || []"
        :key="chapter?.id"
      >
        <NuxtLink
          :to="localePath(`/chapter/${chapter?.slug}`)"
          :class="
            chapter.type === 'translator_request'
              ? 'bg-black/15'
              : 'bg-black/50'
          "
          class="transition-all duration-300 absolute top-0 left-0 w-full h-full hidden md:group-hover:block"
        ></NuxtLink>
        >

        <div
          v-if="chapter?.type === 'translator_request'"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-oneA uppercase"
        >
          {{ chapter?.status }}
        </div>
        <NuxtLink
          v-if="chapter?.status"
          :to="localePath(`/chapter/${chapter?.slug}`)"
          class="block"
        >
          <svg
            width="71"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
            class="absolute opacity-0 transform scale-75 transition-all duration-300 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:group-hover:opacity-100 md:group-hover:scale-100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.46862"
              y="0.499866"
              width="68.6847"
              height="68.6847"
              rx="34.3423"
              fill="#FCF7E7"
            />
            <rect
              x="1.46862"
              y="0.499866"
              width="68.6847"
              height="68.6847"
              rx="34.3423"
              stroke="#747474"
              stroke-width="0.999733"
            />
            <g clip-path="url(#clip0_1303_1956)">
              <path
                d="M21.4708 19.0575H21.4673C21.2748 19.0571 21.0842 19.0948 20.9064 19.1685C20.7285 19.2422 20.5671 19.3503 20.4313 19.4867C20.2929 19.6241 20.1831 19.7877 20.1084 19.9678C20.0337 20.148 19.9955 20.3412 19.9961 20.5362V42.7091C19.9961 43.5222 20.6602 44.1853 21.4766 44.1874C24.9185 44.1956 30.685 44.913 34.6631 49.076V25.8714C34.6631 25.5958 34.5927 25.3369 34.4598 25.1226C31.1948 19.8645 24.9204 19.0656 21.4708 19.0575ZM51.6257 42.7091V20.5361C51.6257 20.1393 51.4711 19.7665 51.1905 19.4866C51.0547 19.3502 50.8933 19.2421 50.7155 19.1684C50.5377 19.0947 50.3471 19.057 50.1547 19.0574H50.151C46.7015 19.0656 40.4272 19.8645 37.162 25.1226C37.0291 25.3369 36.9589 25.5958 36.9589 25.8714V49.0758C40.937 44.9128 46.7035 44.1955 50.1453 44.1873C50.9616 44.1852 51.6257 43.5221 51.6257 42.7091Z"
                fill="#1A1A1A"
              />
              <path
                d="M54.9942 24.1709H53.9221V42.7091C53.9221 44.7851 52.2307 46.4779 50.1515 46.4831C47.232 46.49 42.4183 47.0609 39.0091 50.2875C44.9053 48.8439 51.1209 49.7823 54.6632 50.5896C54.8802 50.6396 55.1058 50.6399 55.3229 50.5904C55.54 50.5409 55.7431 50.4429 55.917 50.3038C56.0908 50.1657 56.2311 49.9901 56.3273 49.7901C56.4235 49.59 56.4732 49.3708 56.4727 49.1488V25.6493C56.4728 24.8341 55.8094 24.1709 54.9942 24.1709ZM17.701 42.7091V24.1709H16.6288C15.8138 24.1709 15.1504 24.8341 15.1504 25.6493V49.1484C15.1504 49.6006 15.353 50.0216 15.7061 50.3034C15.8799 50.4426 16.083 50.5406 16.3002 50.5901C16.5173 50.6396 16.7428 50.6393 16.9598 50.5891C20.5021 49.7818 26.7179 48.8434 32.6138 50.2871C29.2047 47.0606 24.391 46.4899 21.4716 46.4829C19.3925 46.4779 17.701 44.7851 17.701 42.7091Z"
                fill="#1A1A1A"
              />
            </g>
            <defs>
              <clipPath id="clip0_1303_1956">
                <rect
                  width="41.3223"
                  height="41.3223"
                  fill="white"
                  transform="translate(15.1504 14.181)"
                />
              </clipPath>
            </defs>
          </svg>
        </NuxtLink>

        <NuxtLink :to="localePath(`/chapter/${chapter?.slug}`)" class="block">
          <NuxtImg
            :src="chapter.image"
            loading="lazy"
            placeholder
            :alt="$t('alt.avatar')"
            class="transition-all w-full object-cover md:group-hover:h-[350px] md:w-[302px] h-[250px] md:h-[400px] duration-300 md:group-hover:rounded-b-lg flex-shrink"
          />
        </NuxtLink>

        <p
          class="hidden md:block transition-all md:group-hover:hidden duration-300 font-semibold text-white md:text-2xl pt-4 pb-2"
        >
          {{ chapter?.full_name }}
        </p>
        <p
          class="hidden -mt-2 md:block transition-all md:group-hover:hidden duration-300 text-base font-medium text-white"
        >
          #{{ chapter?.rank || "N/A" }}
        </p>
        <p
          class="hidden md:block transition-all md:group-hover:hidden duration-300 text-base font-medium text-ea"
        >
          {{ $t("common.visitor") }}: {{ chapter?.visitors || 0 }}
        </p>

        <!-- Chapter Details on Hover -->
        <div
          v-if="chapter.type === 'translated_chapter'"
          class="bg-black relative z-10 hidden transition-all duration-300 md:group-hover:block text-white px-4 py-5 space-y-2 rounded-b"
        >
          <NuxtLink :to="localePath(`/chapter/${chapter.slug}`)" class="block">
            <p class="font-semibold text-lg">
              {{ chapter?.full_name || $t("mostReading.comicTitle") }}
            </p>
          </NuxtLink>
          <p class="transition-all duration-300 font-medium text-white">
            #{{ chapter?.rank || "N/A" }}
          </p>
          <PublicStars :value="Number(chapter?.rate) || 0" />
          <p class="text-base font-medium text-ea">
            {{ $t("common.visitor") }}: {{ chapter?.visitors || 0 }}
          </p>

          <div
            @click="toggleFavChapter(chapter?.id)"
            :class="locale === 'ar' ? 'left-4' : 'right-4 '"
            class="absolute bottom-8 w-[42px] h-[42px] rounded-full bg-[#747474] grid place-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="transition-all duration-300"
              :class="
                chapter.checkFavorite ? 'text-transparent hidden' : 'text-white'
              "
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162zm0-2.2l5 2.15V5H7v12.95zM12 5H7h10z"
              />
            </svg>
            <svg
              class="transition-all duration-300"
              :class="
                chapter?.checkFavorite
                  ? 'text-white'
                  : 'text-transparent hidden'
              "
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"
              />
            </svg>
          </div>
        </div>

        <!-- Mobile View -->
        <div class="md:hidden bg-color14 p-4 space-y-2 text-white">
          <NuxtLink
            v-if="chapter?.type === 'translated_chapter'"
            :to="localePath(`/chapters/${chapter?.slug}`)"
            class="block"
          >
            <p class="font-semibold text-lg">
              {{ chapter?.full_name || $t("mostReading.comicTitle") }}
            </p>
          </NuxtLink>
          <div v-else>
            <p class="font-semibold text-lg">
              {{ chapter?.full_name }}
            </p>
          </div>

          <p class="transition-all duration-300 text-sm font-medium text-white">
            #{{ chapter?.rank || "N/A" }}
          </p>

          <p class="text-sm font-medium text-ea">
            {{ $t("common.visitor") }}: {{ chapter?.visitors || 0 }}
          </p>
        </div>

        <div
          v-if="chapter?.type === 'translated_chapter'"
          @click="toggleFavChapter(chapter?.id)"
          :class="locale === 'ar' ? 'left-2' : 'right-2'"
          class="md:hidden text-white absolute top-3 w-[44px] h-[44px] rounded-full bg-color14 grid place-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="transition-all duration-300"
            :class="
              chapter?.checkFavorite ? 'text-transparent hidden' : 'text-white'
            "
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162zm0-2.2l5 2.15V5H7v12.95zM12 5H7h10z"
            />
          </svg>
          <svg
            class="transition-all duration-300"
            :class="
              chapter?.checkFavorite ? 'text-white' : 'text-transparent hidden'
            "
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"
            />
          </svg>
        </div>

        <div
          v-if="chapter?.type === 'translated_chapter'"
          class="md:scale-0 md:group-hover:scale-100 transition-all duration-300 text-white absolute right-4 top-5 w-[44px] h-[44px] rounded-full bg-color14 grid place-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="grid place-items-center w-full h-[50vh]"
      v-if="!pending && !chapters?.data?.data?.length > 0"
    >
      <v-lazy-image :src="NoData" class="rounded-full w-1/2" alt="img" />
    </div>

    <!-- Pagination for Chapters -->
    <div
      v-if="totalPages && totalPages > 1"
      :class="locale === 'ar' ? 'flex-row-reverse' : ''"
      class="flex flex-wrap justify-center items-center gap-2 md:gap-8 my-8"
    >
      <button
        aria-label="prev"
        type="button"
        @click="goToPreviousChapter"
        :disabled="currentPage === 1"
        class="w-[45px] h-[45px] transition-all duration-300 hover:bg-d36 hover:text-color14 hover:border-d36 active:bg-d36 active:text-color14 active:border-d36 cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
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
      <transition-group
        name="fade"
        tag="ul"
        class="hidden md:flex flex-wrap gap-1 md:gap-2 items-center text-white"
      >
        <li :key="'pageOne'">
          <button
            aria-label="pageOne"
            type="button"
            @click="goToChapterPage(1)"
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
            @click="goToChapterPage(page)"
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
            @click="goToChapterPage(totalPages)"
            class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
            :class="currentPage === totalPages ? 'bg-f0d' : 'bg-oneA'"
          >
            {{ totalPages }}
          </button>
        </li>
      </transition-group>
      <button
        aria-label="next"
        type="button"
        @click="goToNextChapter"
        :disabled="currentPage === totalPages"
        class="w-[45px] h-[45px] transition-all duration-300 hover:bg-d36 hover:text-color14 hover:border-d36 active:bg-d36 active:text-color14 active:border-d36 cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
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
import NoData from "@/assets/noData.webp";
const { t } = useI18n();

definePageMeta({
  layout: "account",
  middleware: ["auth-type"],
  name: "myWork",
});
// defineRouteRules({
//   prerender: true,
// });
const nuxtApp = useNuxtApp();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const { locale } = useI18n();

// Pagination Logic
const currentPage = ref(1);
const totalPages = ref(1);
const visiblePages = 3;

const pages = computed(() => {
  const range = [];
  const start = Math.max(2, currentPage.value - visiblePages + 1);
  const end = Math.min(
    totalPages.value - 1,
    currentPage.value + visiblePages - 1
  );

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
});
// Pagination for Chapters
const goToChapterPage = (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return;
  currentPage.value = page;
};

const goToNextChapter = () => {
  if (currentPage.value >= totalPages.value) return;
  currentPage.value += 1;
};

const goToPreviousChapter = () => {
  if (currentPage.value <= 1) return;
  currentPage.value -= 1;
};

const { data: chapters, pending } = await useLazyFetch(
  computed(() => `${url}/translator/my-works?page=${currentPage.value}`),
  {
    headers: {
      "X-Localization": locale,
      Authorization: `Bearer ${useCookie("authToken").value}`,
    },
    getCachedData: (key) => {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);

totalPages.value = chapters.value?.data?.pagination?.last_page || 1;
const localePath = useLocalePath();

const filteredChapter = ref();
filteredChapter.value = chapters.value?.data?.data?.filter((item) => {
  return item?.status === "pending";
});
</script>
