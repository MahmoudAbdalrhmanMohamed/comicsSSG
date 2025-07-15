<template>
  <section class="containerClass pt-32 pb-12 space-y-4">
    <h1
      v-if="dataTest.data.data_messages.length"
      class="text-white font-semibold text-2xl"
    >
      {{
        $t("search.results", {
          count:
            dataTest.data.data_messages.length * dataTest.data.meta.total_pages,
          query: "Comics",
        })
      }}
    </h1>
    <div class="flex md:flex-row flex-col gap-4">
      <div
        data-aos="fade-left"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
      >
        <!-- For Desktop -->
        <div
          class="bg-color14 h-fit border border-oneA rounded-lg md:block hidden w-[302px] max-w-[302px]"
        >
          <p
            class="bg-d36 mb-2 text-color14 p-4 text-lg font-semibold rounded-t-lg"
          >
            {{ $t("filters.title") }}
          </p>
          <div class="px-2">
            <PublicFilterSection
              :title="$t('filters.publisher')"
              fieldName="publisher"
              :filterArr="publisherArr"
              @update:filterArr="(val) => (publisherArr = val)"
            />
            <PublicFilterSection
              :title="$t('filters.artist')"
              fieldName="artist"
              :filterArr="artistArr"
              @update:filterArr="(val) => (artistArr = val)"
            />
            <PublicFilterSection
              :title="$t('filters.genre')"
              fieldName="genre"
              :filterArr="genreArr"
              @update:filterArr="(val) => (genreArr = val)"
            />
            <PublicFilterSection
              :title="$t('filters.writer')"
              fieldName="writer"
              :filterArr="writerArr"
              @update:filterArr="(val) => (writerArr = val)"
            />
            <div class="my-4 flex justify-between w-full items-center">
              <button
                type="button"
                @click="applyFilters"
                class="bg-fc rounded-lg px-3 transition-all duration-300 hover:bg-d36 text-color14 text-base font-semibold capitalize py-2"
              >
                {{ $t("filters.apply") }}
              </button>
              <button
                type="button"
                @click="reset"
                class="bg-transparent hover:text-color14 rounded-lg px-3 transition-all duration-300 hover:bg-d36 text-white text-base font-semibold capitalize py-2"
              >
                {{ $t("filters.reset") }}
              </button>
            </div>
          </div>
        </div>

        <!-- For Mobile -->
        <div class="md:hidden">
          <button
            @click="showMobileFilters = !showMobileFilters"
            class="bg-d36 text-color14 rounded-lg px-3 py-2 font-semibold flex items-center justify-between w-full"
          >
            <span>{{ $t("filters.title") }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              :class="showMobileFilters ? 'rotate-180' : ''"
              class="transition-all duration-300"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8l1.4 1.4z"
              />
            </svg>
          </button>
          <transition name="slide-fade">
            <div
              v-if="showMobileFilters"
              class="bg-color14 border border-oneA rounded-lg p-4 mt-2 space-y-4"
            >
              <PublicFilterSection
                :title="$t('filters.publisher')"
                fieldName="publisher"
                :filterArr="publisherArr"
                @update:filterArr="(val) => (publisherArr = val)"
              />
              <PublicFilterSection
                :title="$t('filters.artist')"
                fieldName="artist"
                :filterArr="artistArr"
                @update:filterArr="(val) => (artistArr = val)"
              />
              <PublicFilterSection
                :title="$t('filters.genre')"
                fieldName="genre"
                :filterArr="genreArr"
                @update:filterArr="(val) => (genreArr = val)"
              />
              <PublicFilterSection
                :title="$t('filters.writer')"
                fieldName="writer"
                :filterArr="writerArr"
                @update:filterArr="(val) => (writerArr = val)"
              />
              <div class="my-4 flex justify-between w-full items-center">
                <button
                  type="button"
                  @click="applyFilters"
                  class="bg-fc rounded-lg px-3 transition-all duration-300 hover:bg-d36 hover:text-white text-color14 text-base font-semibold capitalize py-2"
                >
                  {{ $t("filters.apply") }}
                </button>
                <button
                  type="button"
                  @click="reset"
                  class="bg-transparent rounded-lg px-3 transition-all duration-300 hover:bg-d36 text-white text-base font-semibold capitalize py-2"
                >
                  {{ $t("filters.reset") }}
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div v-if="!pending && dataTest.data.data_messages.length">
        <div
          ref="scrollTo"
          class="grid gap-y-6 gap-x-2 md:gap-8 lg:gap-12 grid-cols-2 md:grid-cols-1 place-items-center lg:grid-cols-2 xl:grid-cols-3"
        >
          <NuxtLink
            :to="localePath(`/comic/${item.slug}`)"
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-easing="ease-out-cubic"
            class="flex flex-col relative h-[407px] md:h-[502px] w-full md:w-[302px] md:hover:rounded-md group md:hover:shadow-combined-hover cursor-pointer transition-all duration-300"
            v-for="item in dataTest.data.data_messages"
            :key="item.id"
          >
            <div
              class="transition-all duration-300 absolute top-0 left-0 w-full h-full bg-black/50 hidden md:group-hover:block"
            ></div>

            <div class="block">
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
            </div>

            <div>
              <v-lazy-image
                :src-placeholder="load"
                :src="item.image"
                loading="lazy"
                placeholder
                :alt="`${item.full_name} ${$t('comicAlts.coverAlt')} ${$t('comicAlts.byWriter', { writer: item.writer })}`"
                class="transition-all w-full object-fill md:group-hover:h-[345px] h-[300px] md:h-[400px] duration-300 md:group-hover:rounded-b-lg flex-shrink"
              />
            </div>

            <p
              class="hidden transition-all truncate w-full md:block md:group-hover:hidden duration-300 font-semibold text-white md:text-2xl pt-4 pb-2"
            >
              {{ item.full_name }}
            </p>
            <p
              class="hidden md:block transition-all md:group-hover:hidden duration-300 text-base font-medium text-ea"
            >
              {{ item.writer }}
            </p>

            <div
              class="bg-black relative z-10 hidden transition-all duration-300 md:group-hover:block text-white px-4 py-5 space-y-2 rounded-b"
            >
              <div>
                <p class="font-semibold truncate text-lg">
                  {{ item.full_name }}
                </p>
              </div>
              <p class="font-medium text-sm">
                {{ item.writer }}
              </p>
              <PublicStars :value="Number(item.rate) || 0" />
              <div class="text-sm font-medium">
                {{
                  item.genres
                    .map((genre) => genre.name) // Use concise arrow function to directly return genre.name
                    .join(", ")
                }}
              </div>
              <div
                @click.prevent="toggleFavComic(item.id)"
                :class="locale === 'ar' ? 'left-4' : 'right-4 '"
                class="absolute bottom-5 w-[42px] h-[42px] rounded-full bg-[#747474] grid place-items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="transition-all duration-300"
                  :class="
                    item.checkFavorite
                      ? 'text-transparent hidden'
                      : 'text-white'
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
                    item.checkFavorite
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

            <div class="md:hidden bg-color14 p-4 space-y-2 text-white">
              <div>
                <p class="font-semibold truncate text-lg">
                  {{ item.full_name }}
                </p>
              </div>
              <p class="font-semibold text-sm text-ea">
                {{ item.writer }}
              </p>
            </div>
            <div
              @click.prevent="toggleFavComic(item.id)"
              :class="locale === 'ar' ? 'left-2' : 'right-2'"
              class="md:hidden text-white absolute top-3 w-[44px] h-[44px] rounded-full bg-color14 grid place-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="transition-all duration-300"
                :class="
                  item.checkFavorite ? 'text-transparent hidden' : 'text-white'
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
                  item.checkFavorite ? 'text-white' : 'text-transparent hidden'
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
          </NuxtLink>
        </div>

        <div
          v-if="
            dataTest.data.meta.total_pages && dataTest.data.meta.total_pages > 1
          "
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
              v-if="currentPage < dataTest.data.meta.total_pages - 3"
              class="bg-oneA grid place-items-center w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
            >
              ...
            </li>
            <li :key="'totalPages'">
              <button
                type="button"
                aria-label="totalPages"
                @click="goToPage(dataTest.data.meta.total_pages)"
                class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
                :class="
                  currentPage === dataTest.data.meta.total_pages
                    ? 'bg-f0d'
                    : 'bg-oneA'
                "
              >
                {{ dataTest.data.meta.total_pages }}
              </button>
            </li>
          </ul>
          <button
            aria-label="next"
            type="button"
            @click="goToNext"
            :disabled="currentPage === dataTest.data.meta.total_pages"
            class="w-[30px] h-[30px] md:w-[45px] md:h-[45px] transition-all duration-300 hover:bg-d36 hover:text-color14 hover:border-d36 active:bg-d36 active:text-color14 active:border-d36 cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        class="grid place-items-center w-full h-[50vh]"
        v-if="!dataTest.data.data_messages.length && pending"
      >
        <v-lazy-image
          :src-placeholder="load"
          :src="load"
          class="w-1/2"
          alt="img"
        />
      </div>
      <div
        class="grid place-items-center w-full h-[50vh]"
        v-if="!dataTest.data.data_messages.length && !pending"
      >
        <v-lazy-image
          :src-placeholder="load"
          :src="NoData"
          class="rounded-full w-1/2 xl:w-[500px] xl:h-[500px]"
          :alt="$t('searchAlts.noResultsAlt')"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import VLazyImage from "v-lazy-image";
import NoData from "@/assets/noData.webp";
import load from "@/assets/loading.svg";

const toast = useToast();

definePageMeta({
  layout: "default",
});

const route = useRoute();

const publisherArr = ref([]);
const artistArr = ref([]);
const genreArr = ref([]);
const writerArr = ref([]);

const currentPage = ref(1);
// Read query parameters and pre-select filters

const { writer, publisher, artist, genre } = route.query;

if (writer) {
  writerArr.value = [writer];
}
if (publisher) {
  publisherArr.value = [publisher];
}
if (artist) {
  artistArr.value = [artist];
}
if (genre) {
  genreArr.value = [genre];
}

const showMobileFilters = ref(false);

const reset = async () => {
  // Clear filter arrays
  publisherArr.value = [];
  artistArr.value = [];
  genreArr.value = [];
  writerArr.value = [];

  // Reset query parameters in the URL
  await navigateTo({
    path: route.path, // Keep the current path
    query: {}, // Clear all query parameters
  });

  // Optionally, close the mobile filters section
  showMobileFilters.value = false;
};

const localePath = useLocalePath();
const { locale, t } = useI18n();

const hasActiveFilters = Object.keys(route.query).some(
  (key) => route.query[key]
);
if (hasActiveFilters) {
  showMobileFilters.value = true;
}

const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const nuxtApp = useNuxtApp();
const data = ref();

const applyFilters = async () => {
  const query = {};

  if (publisherArr.value.length > 0) {
    const item = JSON.parse(JSON.stringify(publisherArr.value));

    const tosend = item.map((i) => i).join(",");
    if (tosend) {
      query.publisher = tosend;
    } else {
      const tosend2 = item.map((i) => i.slug).join(",");
      query.publisher = tosend2;
    }
  }
  if (artistArr.value.length > 0) {
    const item = JSON.parse(JSON.stringify(artistArr.value));

    const tosend = item.map((i) => i).join(",");
    if (tosend) {
      query.artist = tosend;
    } else {
      const tosend2 = item.map((i) => i.slug).join(",");
      query.artist = tosend2;
    }
  }
  if (genreArr.value.length > 0) {
    const item = JSON.parse(JSON.stringify(genreArr.value));
    const tosend = item.map((i) => i).join(",");
    if (tosend) {
      query.genre = tosend;
    } else {
      const tosend2 = item.map((i) => i.slug).join(",");
      query.genre = tosend2;
    }
  }
  if (writerArr.value.length > 0) {
    const item = JSON.parse(JSON.stringify(writerArr.value));
    const tosend = item.map((i) => i).join(",");
    if (tosend) {
      query.writer = tosend;
    } else {
      const tosend2 = item.map((i) => i.slug).join(",");
      query.writer = tosend2;
    }
  }

  await navigateTo({
    path: route.path,
    query,
  });

  // Optionally, close the mobile filters section
  showMobileFilters.value = false;
};

const {
  data: dataTest,
  pending,
  refresh,
} = await useFetch(
  () => {
    // Construct the base URL
    let queryString = `${url}/filter/comics?page=${currentPage.value}`;

    // Add query parameters if they exist
    const queryParams = [];
    if (route.query.publisher) {
      queryParams.push(`publisher_slugs=${route.query.publisher}`);
    }
    if (route.query.writer) {
      queryParams.push(`writer_slugs=${route.query.writer}`);
    }
    if (route.query.genre) {
      queryParams.push(`genre_slugs=${route.query.genre}`);
    }
    if (route.query.artist) {
      queryParams.push(`artist_slugs=${route.query.artist}`);
    }

    // Append query parameters to the URL
    if (queryParams.length > 0) {
      queryString += `&${queryParams.join("&")}`;
    }

    return queryString;
  },
  {
    headers: {
      "X-Localization": locale.value,
    },
  }
);

watchEffect(() => {
  useFetch(
    () => {
      // Construct the base URL
      let queryString = `${url}/filter/comics?page=${currentPage.value}`;

      // Add query parameters if they exist
      const queryParams = [];
      if (route.query.publisher) {
        queryParams.push(`publisher_slugs=${route.query.publisher}`);
      }
      if (route.query.writer) {
        queryParams.push(`writer_slugs=${route.query.writer}`);
      }
      if (route.query.genre) {
        queryParams.push(`genre_slugs=${route.query.genre}`);
      }
      if (route.query.artist) {
        queryParams.push(`artist_slugs=${route.query.artist}`);
      }
      // Append query parameters to the URL
      if (queryParams.length > 0) {
        queryString += `&${queryParams.join("&")}`;
      }
      return queryString;
    },
    {
      headers: {
        "X-Localization": locale.value,
      },
    }
  );
});

const { isMobile } = useDevice();
const pages = computed(() => {
  const range = [];
  if (isMobile) {
    // For mobile, show only 4 pages at max (e.g., 1 2 3 4)
    const start = Math.max(2, currentPage.value - 1);
    const end = Math.min(
      dataTest.value.data.meta.total_pages - 1,
      currentPage.value + 2
    );

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
  } else {
    // For desktop, show a wider range (e.g., 2 3 4 5 6 7 8)
    const start = Math.max(2, currentPage.value - 3);
    const end = Math.min(
      dataTest.value.data.meta.total_pages - 1,
      currentPage.value + 3
    );

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
  }
  return range;
});

const scrollTo = ref();
const goToPage = async (page) => {
  if (
    page < 1 ||
    page > dataTest.value.data.meta.total_pages ||
    page === currentPage.value
  )
    return;
  currentPage.value = page;
  await refresh();

  if (scrollTo.value) {
    const offset =
      scrollTo.value.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust 100 to your desired offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

const goToNext = async () => {
  if (currentPage.value >= dataTest.value.data.meta.total_pages) return;
  currentPage.value += 1;
  await refresh();

  if (scrollTo.value) {
    const offset =
      scrollTo.value.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust 100 to your desired offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

const goToPrevious = async () => {
  if (currentPage.value <= 1) return;
  currentPage.value -= 1;
  await refresh();
  if (scrollTo.value) {
    const offset =
      scrollTo.value.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust 100 to your desired offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

const handleBackendErrors = (response) => {
  if (response?.errors) {
    Object.entries(response.errors).forEach(([field, messages]) => {
      messages.forEach((message) => {
        toast.add({
          title: message,
          type: "error",
          icon: "i-icon-park-outline-error",
          color: "red",
        });
      });
    });
  } else if (response?.message) {
    toast.add({
      title: response.message,
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
  } else {
    toast.add({
      title: "An unknown error occurred. Please try again.",
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
  }
};
const { setLogin } = useLogined();

const toggleFavComic = async (id) => {
  try {
    if (useCookie("authToken").value) {
      const { data: dataVal } = await useLazyFetch(
        `${url}/favorites/toggle-comic`,
        {
          method: "POST",
          server: false,
          headers: {
            "X-Localization": locale.value,
            "Content-Type": "application/json",
            Authorization: `Bearer ${useCookie("authToken").value}`,
          },
          body: JSON.stringify({
            comic_id: id,
          }),
        }
      );

      if (dataVal.value.status) {
        const index = data.value.findIndex((item) => item.id === id);

        if (index !== -1) {
          data.value[index].checkFavorite = !data.value[index].checkFavorite;
        }

        toast.add({
          title: dataVal.value.message || "Saved successful!",
          type: "success",
          icon: "i-heroicons-check-badge",
          color: "green",
        });
      }
    } else {
      toast.add({
        title: t("loginFirst"),
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
      setLogin(route.path);
      await navigateTo({
        path: localePath("/login"),
      });
    }
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  }
};

// Add this computed property in your script setup section
const dynamicSeoData = computed(() => {
  const { writer, publisher, artist, genre } = route.query;

  // Build dynamic title and description based on query parameters
  let titleParts = [];
  let descriptionParts = [];
  let keywordParts = [
    "comic book pdf",
    "comics pdf",
    "english comics books pdf free",
    "comics online free pdf",
    "english comics pdf",
    "comic book pdf free",
  ];

  if (writer) {
    const writerNames = Array.isArray(writer) ? writer.join(", ") : writer;
    titleParts.push(`Comics by ${writerNames}`);
    descriptionParts.push(`Discover amazing comics written by ${writerNames}`);
    keywordParts.push(`${writerNames} comics`, `${writerNames} comic books`);
  }

  if (publisher) {
    const publisherNames = Array.isArray(publisher)
      ? publisher.join(", ")
      : publisher;
    titleParts.push(`${publisherNames} Comics`);
    descriptionParts.push(`Browse comics published by ${publisherNames}`);
    keywordParts.push(
      `${publisherNames} comics`,
      `${publisherNames} comic books`
    );
  }

  if (artist) {
    const artistNames = Array.isArray(artist) ? artist.join(", ") : artist;
    titleParts.push(`Comics by Artist ${artistNames}`);
    descriptionParts.push(`Explore comics illustrated by ${artistNames}`);
    keywordParts.push(`${artistNames} comics`, `${artistNames} comic art`);
  }

  if (genre) {
    const genreNames = Array.isArray(genre) ? genre.join(", ") : genre;
    titleParts.push(`${genreNames} Comics`);
    descriptionParts.push(`Read the best ${genreNames} comics online`);
    keywordParts.push(`${genreNames} comics`, `${genreNames} comic books`);
  }

  // Build final title and description
  let finalTitle =
    titleParts.length > 0
      ? `${titleParts.join(" | ")} - YSK Comics`
      : t("searchSeo.title");

  let finalDescription =
    descriptionParts.length > 0
      ? `${descriptionParts.join(". ")}. Download free comic books in PDF format from YSK Comics.`
      : t("searchSeo.description");

  // Ensure title doesn't exceed 60 characters for better SEO
  if (finalTitle.length > 60) {
    finalTitle = finalTitle.substring(0, 57) + "...";
  }

  // Ensure description doesn't exceed 160 characters for better SEO
  if (finalDescription.length > 160) {
    finalDescription = finalDescription.substring(0, 157) + "...";
  }

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: keywordParts.join(", "),
  };
});

// Replace your existing useSeoMeta with this dynamic version
useSeoMeta({
  title: dynamicSeoData.value.title,
  description: dynamicSeoData.value.description,
  ogTitle: dynamicSeoData.value.title,
  ogDescription: dynamicSeoData.value.description,
  ogUrl: `https://www.ysk-comics.com${route.fullPath}`,
  ogImage: `https://www.ysk-comics.com/icones/logo.png`,
  keywords: dynamicSeoData.value.keywords,
  ogImageAlt: dynamicSeoData.value.title,
  robots: "index, follow",
  ogType: "website",
  ogImageType: "image/png",
  ogSiteName: "YSK Comics",
  ogLocale: locale.value,
  ogLocaleAlternate: "en",
  twitterTitle: dynamicSeoData.value.title,
  twitterDescription: dynamicSeoData.value.description,
  twitterImage: `https://www.ysk-comics.com/icones/logo.png`,
  twitterSite: "@YSK_Comics",
  twitterCard: "summary_large_image",
});

// Optional: Add structured data using useHead
useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `https://www.ysk-comics.com${route.fullPath}`,
        name: dynamicSeoData.value.title,
        description: dynamicSeoData.value.description,
        url: `https://www.ysk-comics.com${route.fullPath}`,
        inLanguage: locale.value,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.ysk-comics.com",
          name: "YSK Comics",
          url: "https://www.ysk-comics.com",
        },
      }),
    },
  ],
});
</script>

<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide-Fade Transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
