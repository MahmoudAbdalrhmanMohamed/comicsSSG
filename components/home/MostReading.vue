<template>
  <section class="mt-16" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <!-- Section Title -->
    <div
      v-if="data?.data?.length > 0"
      class="flex gap-2 items-center my-8 md:px-12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        viewBox="0 0 24 24"
        class="text-d36"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M14.243 2.514c.215.28.257.587.257.794c0 2.296.608 4.377 2.096 5.88a29 29 0 0 0 .827.802c.774.727 1.774 1.667 2.223 2.94c.23.654.354 1.35.354 2.07c0 4.005-3.732 7-8 7c-3.148 0-5.946-1.6-7.247-4.028A6.3 6.3 0 0 1 4 14.999v-.863c0-1.515.229-3.022.679-4.47c.097-.318.237-.702.485-.979c.141-.157.39-.362.757-.407c.377-.046.674.1.852.232c.299.221.48.559.576.746c.118.233.234.51.342.778c.117.289.284.565.492.823c.124.153.226.282.319.399l.19.239a1.16 1.16 0 0 0 .2-.548l.196-2.183c.102-1.143.312-2.41.784-3.552c.476-1.151 1.241-2.232 2.478-2.892c.22-.117.621-.308 1.061-.264c.271.027.596.15.832.456m-1.68 2.124c-.346.356-.622.806-.842 1.34c-.361.874-.547 1.913-.642 2.966l-.195 2.183c-.04.446-.175.878-.395 1.268c-.28.498-.743.96-1.358 1.131c-.692.192-1.395-.042-1.877-.628c-.098-.12-.217-.269-.339-.422l-.287-.36a6 6 0 0 1-.377-.526A13 13 0 0 0 6 14.136V15c0 .72.182 1.405.516 2.029C7.428 18.73 9.498 20 12 20c3.464 0 6-2.378 6-5c0-.489-.084-.96-.24-1.405c-.28-.79-.915-1.395-1.76-2.196l-.195-.187q-.307-.291-.63-.617c-1.643-1.66-2.403-3.78-2.613-5.957Z"
        />
      </svg>
      <h2 class="font-semibold md:font-bold text-white text-2xl md:text-4xl">
        {{ $t("mostReading.title") }}
      </h2>
      <hr class="flex-grow bg-[#747474] h-[0.25px]" />
    </div>

    <!-- Swiper Carousel -->
    <Swiper
      v-if="data?.data?.length > 0"
      :breakpoints="breakpoints"
      :loop="true"
      :centered-slides="true"
      class="my-swiper"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: true,
      }"
      :modules="modules"
      :navigation="{
        prevEl: '.prev',
        nextEl: '.next',
      }"
      :effect="'creative'"
      :creative-effect="creativeEffect"
    >
      <SwiperSlide v-for="(item, index) in data.data" :key="index">
        <NuxtLink
          :to="localePath(`/comic/${item?.slug}`)"
          class="slider-container relative z-[99]"
          :class="locale === 'ar' ? 'xl:flex-row-reverse' : 'xl:flex-row'"
        >
          <!-- Image -->
          <div class="block swiper-image relative z-[99]">
            <v-lazy-image
              :src-placeholder="load"
              :src="item.image"
              :alt="`${item.full_name || $t('mostReadingAlts.comicTitle')} ${$t('mostReadingAlts.coverImage')} - ${item.publisher.name}`"
              class="swiper-image rounded-t relative z-[99]"
              :class="
                locale === 'ar'
                  ? 'rounded-r-md xl:rounded-tl-none'
                  : 'rounded-l-md xl:rounded-tr-none'
              "
            />
          </div>
          <!-- Details Panel -->
          <div
            :class="locale === 'ar' ? 'xl:rounded-l-md' : 'xl:rounded-r-md'"
            class="bg-color14 px-4 lg:px-6 py-4 md:py-6 details transition-all duration-300 space-y-2 md:space-y-4 text-white"
          >
            <div>
              <p class="font-semibold text-lg md:text-2xl text-start truncate">
                {{ item.full_name || $t("mostReading.comicTitle") }}
              </p>
            </div>
            <PublicStars
              class="-mt-6 md:-mt-0"
              :value="Number(item.rate) || 0"
            />
            <div class="flex flex-wrap truncate">
              <p class="mx-2 md:mx-4">
                {{ $t("mostReading.publisherLabel") }}:
              </p>
              <p
                class="w-fit text-wrap hover:border-b-white transition-all duration-300 border-b border-b-transparent"
                @click.prevent="goToPublisher(item.publisher.slug)"
              >
                {{ item.publisher.name }}
              </p>
            </div>
            <div class="flex flex-wrap">
              <p class="mx-2 md:mx-4">{{ $t("mostReading.genreLabel") }}:</p>
              <p
                @click.prevent="
                  getSearchLink($t('mostReading.genre'), gen?.slug)
                "
                v-for="(gen, index) in item?.genres || []"
                class="inline-block w-fit hover:border-b-white transition-all duration-300 border-b border-b-transparent"
              >
                {{ gen?.name }}{{ item?.genres?.length !== index ? "," : "" }}
              </p>
            </div>
            <div
              v-html="item.descrition"
              class="text-sm md:text-base text-start text-wrap line-clamp-3"
            ></div>
            <div
              class="flex text-center xl:grid grid-cols-2 gap-2 items-center"
            >
              <div
                class="px-2 md:px-4 text-sm md:text-base py-2 rounded-lg border border-white hover:text-color14 hover:border-d36 bg-fc text-color14 font-semibold transition-all duration-300 hover:bg-d36"
              >
                {{ $t("mostReading.readNow") }}
              </div>
              <button
                type="button"
                @click.prevent="toggleFavComic(item.id)"
                class="px-2 md:px-4 py-2 text-sm md:text-base rounded-lg border border-white hover:text-color14 hover:border-d36 bg-transparent text-white font-semibold transition-all duration-300 hover:bg-d36"
              >
                {{
                  item?.checkFavorite
                    ? $t("mostReading.savedComic")
                    : $t("mostReading.saveComic")
                }}
              </button>
            </div>
          </div>
        </NuxtLink>
      </SwiperSlide>
    </Swiper>

    <!-- Navigation Buttons -->
    <div
      v-if="data?.data?.length > 0"
      :class="locale === 'ar' ? 'flex-row-reverse' : 'flex-row'"
      class="flex justify-center items-center mt-8 gap-4 md:gap-8 relative z-10"
    >
      <button
        type="button"
        @click="goToPrevious"
        class="w-[45px] h-[45px] md:w-[60px] md:h-[60px] prev transition-all duration-300 hover:bg-d36 hover:text-color14 hover:border-d36 active:bg-d36 active:text-color14 active:border-d36 cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
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

      <button
        type="button"
        @click="goToNext"
        class="w-[45px] h-[45px] md:w-[60px] md:h-[60px] next transition-all duration-300 hover:bg-d36 hover:text-color14 hover:border-d36 active:bg-d36 active:text-color14 active:border-d36 cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
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
  </section>
</template>

<script setup>
import load from "@/assets/loading.svg";
import VLazyImage from "v-lazy-image";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Navigation, EffectCreative, Autoplay } from "swiper/modules";

const { locale, t } = useI18n();

const modules = [Navigation, EffectCreative, Autoplay];

const breakpoints = {
  0: {
    slidesPerView: 1.5,
    spaceBetween: 30,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 2.5,
    spaceBetween: 20,
    centeredSlides: true,
  },
};

const { isMobileOrTablet } = useDevice();

const localePath = useLocalePath();

const creativeEffect = computed(() => {
  const isRTL = locale.value === "ar";
  return isMobileOrTablet === false
    ? {
        prev: {
          translate: [isRTL ? "120%" : "-120%", 0, -500],
        },
        next: {
          translate: [isRTL ? "-170%" : "170%", 0, -500],
        },
      }
    : {
        prev: {
          translate: [isRTL ? "120%" : "-120%", 0, -500],
        },
        next: {
          translate: [isRTL ? "-120%" : "120%", 0, -500],
        },
      };
});

const nuxtApp = useNuxtApp();

const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const { data } = await useFetch(`${url}/home/best-comics`, {
  headers: {
    "X-Localization": locale.value,
  },
  watch: [locale],
  // getCachedData: (key) => {
  //   return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  // },
});

const toast = useToast();

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
        // Find the index of the comic in the data array
        const indexVal = data.value?.data.findIndex((item) => item.id === id);

        // If the comic is found, toggle the checkFavorite property
        if (indexVal !== -1) {
          data.value.data[indexVal].checkFavorite =
            !data.value.data[indexVal].checkFavorite;
        }

        // Show success toast
        toast.add({
          title: response?.message || "Saved successfully!",
          type: "success",
          icon: "i-heroicons-check-badge",
          color: "green",
        });
      } else {
        // Handle API response error
        handleBackendErrors(response);
      }
    } else {
      toast.add({
        title: t("loginFirst"),
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
      await navigateTo({
        path: localePath("/login"),
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    handleBackendErrors(error?.data || { message: error.message });
  }
};

const getSearchLink = async (filterType, filterValue) => {
  const filterMap = {
    [t("mostReading.writer")]: "writer",
    [t("mostReading.publisher")]: "publisher",
    [t("mostReading.artist")]: "artist",
    [t("mostReading.genre")]: "genre",
  };

  const filterKey = filterMap[filterType];
  if (filterKey) {
    await navigateTo({
      path: localePath("/search"),
      query: { [filterKey]: filterValue },
    });
  }
};

const goToPublisher = async (slug) => {
  await navigateTo(localePath(`/publisher/${slug}`));
};
</script>

<style scoped>
/* Swiper Container */
.my-swiper {
  width: 100%;
  padding: 20px 0;
  perspective: 1200px;
  display: flex;
  justify-content: center;
}

/* Slide Container */
.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform-style: preserve-3d;
}

/* Image Styling */
.swiper-image {
  width: 215px;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* Desktop Image Styling */
@media (min-width: 768px) {
  .swiper-image {
    width: 300px;
    height: 400px;
  }
}

/* Details Panel */
.details {
  width: 215px;
  opacity: 0;
  transform: translateY(-100%);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

/* Desktop Details Panel */
@media (min-width: 768px) {
  .details {
    width: 300px;
  }
}

/* Desktop Layout: Image and Details in a Row */
@media (min-width: 1280px) {
  .slider-container {
    flex-direction: row;
    align-items: stretch;
    width: fit-content;
  }

  .swiper-slide-active .details {
    opacity: 1;
    width: 500px;
    max-width: 500px;
    min-width: 500px;
    transform: translateX(0);
  }

  .details {
    height: 400px;
    transform: translateX(-100%);
    transition:
      opacity 0.7s ease,
      transform 0.7s ease,
      width 0.7s ease;
    width: 0;
  }
  html[dir="rtl"] .slider-container {
    flex-direction: row-reverse;
  }

  html[dir="rtl"] .details {
    transform: translateX(-100%);
  }

  html[dir="rtl"] .swiper-slide-active .details {
    transform: translateX(0);
  }
  .swiper-slide-active {
    z-index: 99 !important;
  }
}

/* Center the active slide */
.swiper-slide-active {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .swiper-image {
    width: 215px;
    height: 300px;
  }

  .details {
    width: 215px;
  }

  /* Adjust Navigation Buttons for Mobile */
  .prev,
  .next {
    width: 40px;
    height: 40px;
  }
}

.swiper-slide-active .details {
  opacity: 1;
  transform: translateY(0);
}

/* RTL Adjustments */
</style>
