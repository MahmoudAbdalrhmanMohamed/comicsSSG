<template>
  <section class="my-8">
    <div class="flex gap-2 items-center my-8 md:px-12">
      <p
        class="px-4 md:px-0 font-semibold md:font-bold text-white text-2xl md:text-4xl"
      >
        {{ $t("newFromFollowers.title") }}
      </p>
      <hr class="flex-grow bg-[#747474] h-[0.25px]" />
    </div>
    <div class="containerClass">
      <Swiper
        :spaceBetween="20"
        :breakpoints="{
          1: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1023: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }"
        :loop="true"
        :modules="modules2"
        :navigation="{
          prevEl: '.prev2',
          nextEl: '.next2',
        }"
        class="my-swiper"
      >
        <SwiperSlide v-for="item in data" :key="item.id">
          <div
            data-aos="zoom-in-up"
            data-aos-duation="500"
            data-aos-easing="ease-out-cubic"
            class="flex flex-col relative h-[407px] md:h-[502px] overflow-hidden md:hover:rounded-md group md:hover:shadow-combined-hover cursor-pointer transition-all duration-300"
          >
            <NuxtLink
            :to="localePath(`/comic/${item.slug}`)"
            class="transition-all duration-300 absolute top-0 left-0 w-full h-full bg-black/50 hidden md:group-hover:block"
          ></NuxtLink>

            <NuxtLink :to="localePath(`/comic/${item.slug}`)" class="block">
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

            <NuxtLink :to="localePath(`/comic/${item.slug}`)" class="block">
              <img
                :src="item.image"
                :alt="$t('latest.imageAlt')"
                class="transition-all w-full md:object-cover md:group-hover:h-[345px] md:w-[302px] h-[300px] md:h-[400px] duration-300 md:group-hover:rounded-b-lg flex-shrink"
              />
            </NuxtLink>

            <p
              class="hidden md:block transition-all md:group-hover:hidden duration-300 font-semibold text-white md:text-2xl pt-4 pb-2"
            >
              {{ item.full_name || $t("latest.comicTitle") }}
            </p>
            <p
              class="hidden md:block transition-all md:group-hover:hidden duration-300 text-base font-medium text-ea"
            >
              {{ item.writer || $t("latest.author") }}
            </p>

            <div
              class="bg-black relative z-10 hidden transition-all duration-300 md:group-hover:block text-white px-4 py-5 space-y-2 rounded-b"
            >
              <NuxtLink :to="localePath(`/comic/${item.slug}`)" class="block">
                <p class="font-semibold text-lg">
                  {{ item.full_name || $t("latest.comicTitle") }}
                </p>
              </NuxtLink>
              <p class="font-medium text-sm">
                {{ item.writer || $t("latest.author") }}
              </p>
              <PublicStars :value="Number(item.rate) || 0" />
              <p class="text-sm font-medium">
                {{ item.genres.map((genere) => genere.name).join(", ") }}
              </p>
              <div
                @click="toggleFavComic(item.id)"
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
              <NuxtLink :to="localePath(`/comic/${item.slug}`)" class="block">
                <p class="font-semibold text-lg">
                  {{ item.full_name || $t("latest.comicTitle") }}
                </p>
              </NuxtLink>
              <p class="font-semibold text-sm text-ea">
                {{ item.full_name || $t("latest.author") }}
              </p>
            </div>
            <div
              @click="toggleFavComic(item.id)"
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
          </div>
        </SwiperSlide>
      </Swiper>
      <div
        :class="$t('flex-row')"
        class="flex flex-wrap justify-center items-center gap-2 md:gap-4 my-8"
      >
        <button
          type="button"
          @click="goToPrevious"
          class="w-[45px] prev2 h-[45px] transition-all duration-300 hover:bg-d36 hover:text-color14 hover:border-d36 active:bg-d36 active:text-color14 active:border-d36 cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
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
          class="w-[45px] next2 h-[45px] transition-all duration-300 hover:bg-d36 hover:text-color14 hover:border-d36 active:bg-d36 active:text-color14 active:border-d36 cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
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
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
const modules2 = [Navigation];

import "swiper/css";
import "swiper/css/navigation";

const localePath = useLocalePath();

const nuxtApp = useNuxtApp();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;

const { locale } = useI18n();
const toast = useToast();
const data = ref();
const {
  data: dataTemp,
  pending,
  refresh,
} = await useLazyFetch(`${url}/favorites?type=comics`, {
  headers: {
    "X-Localization": locale.value,
    Authorization: `Bearer ${useCookie("authToken").value}`,
  },

  onResponse: ({ response }) => {
    data.value = response?._data?.data_messages;
    console.log("API Response Comics:", response?._data);
    // totalPages2.value = response._data?.data?.meta?.total_pages || 1;
  },
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
      const { data } = await useLazyFetch(`${url}/favorites/toggle-comic`, {
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
      });

      if (data.value.status) {
        comicData.value.data.checkFavorite =
          !comicData.value.data.checkFavorite;

        toast.add({
          title: data.value.message || "Saved successful!",
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
      await navigateTo({
        path: localePath("/login"),
      });
    }
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  }
};
</script>

<style scoped>
.my-swiper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
