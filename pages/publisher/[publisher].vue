<template>
  <section class="pt-36">
    <div class="containerClass">
      <!-- Skeleton Loader for Publisher Data -->
      <div
        v-if="loadingPublisher"
        class="bg-color14/90 space-y-4 rounded-[20px] mb-8 py-8 px-6 md:px-12 lg:px-[70px]"
      >
        <div class="animate-pulse">
          <div class="h-10 w-48 bg-gray-300 rounded"></div>
          <div class="h-6 w-32 bg-gray-300 rounded mt-4"></div>
          <div class="h-6 w-64 bg-gray-300 rounded mt-4"></div>
          <div class="h-6 w-48 bg-gray-300 rounded mt-4"></div>
        </div>
      </div>

      <!-- Actual Publisher Data -->
      <div
        v-else-if="loopData"
        class="bg-color14/90 space-y-4 rounded-[20px] mb-8 py-8 px-6 md:px-12 lg:px-[70px]"
      >
        <v-lazy-image
          :src-placeholder="load"
          :src="loopData.image"
          :alt="`${loopData.name} ${$t('publisherAlts.logoAlt')}`"
          class="w-[225px] h-[102px] rounded-lg"
        />
        <h1 class="text-ea font-bold text-xl uppercase">
          {{ loopData.name }}
        </h1>
        <PublicStarsWithoutText :value="Number(loopData.rate) || 0" />

        <div class="flex gap-4 flex-col md:flex-row md:gap-48">
          <div class="flex gap-2">
            <p class="text-ea font-semibold text-lg uppercase">
              {{ $t("dataAge") }}:
            </p>
            <p class="text-white font-semibold text-lg">{{ loopData.year }}</p>
          </div>
          <div class="flex gap-2">
            <p class="text-ea font-semibold text-lg uppercase">
              {{ $t("country") }}:
            </p>
            <p class="text-white font-semibold text-lg">
              {{ loopData.Country }}
            </p>
          </div>
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-html="loopData.description"
          class="text-ea font-medium text-base"
        ></div>
      </div>

      <!-- Error Message for Publisher Data -->
      <div
        v-else
        class="bg-color14/90 rounded-[20px] mb-8 py-8 px-6 md:px-12 lg:px-[70px]"
      >
        <p class="text-red-500 font-semibold text-lg">
          Failed to load publisher data. Please try again later.
        </p>
      </div>
    </div>

    <div class="containerClass">
      <div class="w-full mt-8 rounded-lg md:mt-12 mx-auto text-center">
        <LazyHomeGoogleAdsWithIns hydrate-on-idle />
      </div>
    </div>
    <!-- Skeleton Loader for Comics -->
    <div v-if="loadingComics" class="px-2 md:px-12">
      <div
        class="grid gap-y-4 mb-8 gap-x-2 md:gap-4 place-items-center grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <template v-for="index in 4" :key="index">
          <div class="flex flex-col relative h-[407px] md:h-[502px]">
            <div class="animate-pulse">
              <div
                class="h-[300px] md:h-[400px] w-full bg-gray-300 rounded"
              ></div>
              <div class="h-6 w-3/4 bg-gray-300 rounded mt-4"></div>
              <div class="h-4 w-1/2 bg-gray-300 rounded mt-2"></div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Actual Comics Data -->
    <div v-else>
      <div
        v-if="Comics?.length > 0"
        class="flex gap-2 items-center mb-8 md:px-12"
      >
        <h2
          class="px-4 md:px-0 font-semibold md:font-bold text-white text-2xl md:text-4xl"
        >
          {{ $t("comics") }}
        </h2>
        <hr class="flex-grow bg-seven4 text-seven4 h-[0.25px]" />
      </div>
      <div v-if="Comics?.length > 0" class="px-2 md:px-12">
        <div
          ref="scrollTo"
          class="grid gap-y-6 gap-x-2 md:gap-8 lg:gap-12 place-items-center grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <template v-for="(item, index) in Comics || []" :key="item.id">
            <NuxtLink
              data-aos="flip-up"
              data-aos-duration="500"
              data-aos-easing="ease-out-cubic"
              data-allow-mismatch="class"
              :to="localePath(`/comic/${item.slug}`)"
              class="flex flex-col relative w-full h-[407px] md:h-[502px] md:hover:rounded-md group md:hover:shadow-combined-hover cursor-pointer transition-all duration-300"
            >
              <!-- Overlay on Hover -->
              <div
                class="transition-all duration-300 absolute top-0 left-0 w-full h-full bg-black/50 hidden md:group-hover:block"
              ></div>
              <div>
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
              <!-- Comic Image -->
              <div>
                <v-lazy-image
                  :src-placeholder="load"
                  :src="item.image"
                  loading="lazy"
                  placeholder
                  :alt="`${item.full_name} ${$t('publisherAlts.coverAlt')} ${$t('publisherAlts.byPublisher', { publisher: loopData.name })}`"
                  class="transition-all w-full object-fill md:group-hover:h-[345px] h-[280px] md:h-[400px] duration-300 md:group-hover:rounded-b-lg flex-shrink"
                />
              </div>

              <!-- Comic Details -->
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

              <!-- Hover Details -->
              <div
                class="bg-black rounded-b-lg h-full relative z-10 hidden transition-all duration-300 md:group-hover:block text-white px-4 py-5 space-y-2"
              >
                <div>
                  <p class="font-semibold text-lg">{{ item.full_name }}</p>
                </div>
                <p class="font-medium text-sm">
                  {{ item.writer }}
                </p>
                <PublicStarsWithoutText :value="Number(item.rate) || 0" />
                <p class="text-sm font-medium">
                  {{ item.genres.map((genre) => genre.name).join(", ") }}
                </p>
                <div
                  @click.prevent="toggleFavComic(item.id)"
                  :class="locale === 'ar' ? 'left-4' : 'right-4'"
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
                  <p class="font-semibold line-clamp-2 h-[50px] text-lg">
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
            </NuxtLink>
          </template>
        </div>

        <!-- Pagination -->
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
              <path
                fill="currentColor"
                d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <LazyHomeGoogleAds hydrate-on-idle />
  </section>
</template>

<script setup>
import load from "@/assets/loading.svg";
import VLazyImage from "v-lazy-image";

const route = useRoute();

definePageMeta({
  layout: "dynamic",
});

const nuxtApp = useNuxtApp();
const isReady = ref(false);
nuxtApp.hook("app:mounted", () => {
  isReady.value = true;
});

const loopData = ref({});
const { locale, t } = useI18n();
const toast = useToast();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const loadingPublisher = ref(false);
const loadingComics = ref(false);
const Comics = ref();
const currentPage = ref(1);
const totalPages = ref(1);
const visiblePages = 3;
const isMobile = ref(false); // Add logic to detect mobile devices if needed

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
      title: response?.message,
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

const goToPage = async (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return;
  currentPage.value = page;
  await fetchComics(); // Fetch comics when the page changes
  if (scrollTo.value) {
    const offset =
      scrollTo.value.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust 100 to your desired offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

const goToNext = async () => {
  if (currentPage.value >= totalPages.value) return;
  currentPage.value += 1;
  await fetchComics(); // Fetch comics when moving to the next page
  if (scrollTo.value) {
    const offset =
      scrollTo.value.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust 100 to your desired offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

const goToPrevious = async () => {
  if (currentPage.value <= 1) return;
  currentPage.value -= 1;
  await fetchComics(); // Fetch comics when moving to the previous page
  if (scrollTo.value) {
    const offset =
      scrollTo.value.getBoundingClientRect().top + window.pageYOffset - 100; // Adjust 100 to your desired offset
    window.scrollTo({ top: offset, behavior: "smooth" });
  }
};

const localePath = useLocalePath();

const scrollTo = ref();

const setI18nParams = useSetI18nParams();

// Fetch comics data
const fetchComics = async () => {
  try {
    const idVal = route.params.publisher;
    if (!idVal) {
      console.error("Publisher ID is undefined.");
      return;
    }

    loadingComics.value = true;

    // Trigger fetch explicitly
    const {
      data: comicsData,
      error,
      execute,
    } = await useLazyFetch(
      `${url}/publishers/${idVal}/comics?page=${currentPage.value}&paginate=${isMobile.value ? 5 : 10}`,
      {
        server: true,
        headers: {
          "X-Localization": locale.value,
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
      }
    );

    // Execute the fetch (if lazy: true is used)
    await execute();
    if (!comicsData.value) {
      await navigateTo(localePath(`/publishers`), { redirectCode: 301 });
    }

    if (error.value) {
      // console.log(error.value);
      // handleBackendErrors(error.value);
    } else if (comicsData.value) {
      Comics.value = comicsData.value.data.data_messages; // Set comics data
      totalPages.value = comicsData.value.data.meta.total_pages; // Set total pages
    }
  } catch (error) {
    console.log(error.message);

    // handleBackendErrors(error.data || { message: error.message });
  } finally {
    loadingComics.value = false;
  }
};

// Fetch publisher data
const fetchPublisherData = async () => {
  try {
    const idVal = route.params.publisher;
    if (!idVal) {
      console.error("Publisher ID is undefined.");
      return;
    }

    loadingPublisher.value = true;

    // Trigger fetch explicitly
    const { data, error, execute } = await useFetch(
      `${url}/publishers/${idVal}`,
      {
        server: true,
        headers: {
          "X-Localization": locale.value,
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
      }
    );

    // Execute the fetch (in case `lazy: true` is kept)
    await execute();

    if (error.value) {
      throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
    } else if (data.value) {
      loopData.value = data.value.data;

      // Set i18n params for localization
      setI18nParams({
        en: { publisher: loopData.value.slug.en },
        ar: { publisher: loopData.value.slug.ar },
      });
    }
  } catch (error) {
    // handleBackendErrors(error.data || { message: error.message });
  } finally {
    loadingPublisher.value = false;
  }
};
const { setLogin } = useLogined();

await Promise.all([fetchPublisherData(), fetchComics()]);

const publisher = computed(() => route.params.publisher);
watch(publisher, async () => {
  await Promise.all([fetchPublisherData(), fetchComics()]);
});

const toggleFavComic = async (id) => {
  try {
    if (useCookie("authToken").value) {
      const response = await $fetch(`${url}/favorites/toggle-comic`, {
        method: "POST",
        headers: {
          "X-Localization": locale.value,
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
        body: JSON.stringify({
          comic_id: id,
        }),
      });

      if (response?.status) {
        const comicIndex = Comics.value.findIndex((comic) => comic.id === id);

        if (comicIndex !== -1) {
          Comics.value[comicIndex].checkFavorite =
            !Comics.value[comicIndex].checkFavorite;
        }

        toast.add({
          title: response?.message || "Saved successful!",
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
    handleBackendErrors(error?.data || { message: error.message });
  }
};
// Fetch comics data

useSeoMeta({
  title: t("publisher.title", {
    publisherName: loopData.value?.name || "Publisher",
  }),
  description: t("publisher.des", {
    publisherName: loopData.value?.name || "Publisher",
  }),
  ogTitle: t("publisher.title", {
    publisherName: loopData.value?.name || "Publisher",
  }),
  ogDescription: t("publisher.des", {
    publisherName: loopData.value?.name || "Publisher",
  }),
  ogUrl: `https://www.ysk-comics.com${route.fullPath}`,
  ogImage: loopData.value?.image,
  keywords: `comic book pdf, comics pdf, english comics books pdf free, comics online free pdf, english comics pdf, comic book pdf free`,
  ogImageAlt: t("publisher.title", {
    publisherName: loopData.value?.name || "Publisher",
  }),
  robots: "index, follow",
  ogType: "comics",
  ogImageType: "png,jpg",
  ogSiteName: "YSK Comics",
  ogLocale: locale.value,
  ogLocaleAlternate: "en",
  twitterTitle: t("publisher.title", {
    publisherName: loopData.value?.name || "Publisher",
  }),
  twitterDescription: t("publisher.des", {
    publisherName: loopData.value?.name || "Publisher",
  }),
  twitterImage: loopData.value?.image,
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
