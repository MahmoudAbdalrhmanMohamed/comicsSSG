<template>
  <div class="w-full">
    <div class="space-y-4 w-full">
      <!-- <div class="w-full flex justify-between pb-8">
        <div class="flex md:flex-row flex-col gap-4">
          <NuxtImg
            :src="data[0].image || '/avatr.webp'"
            :alt="$t('alt.avatar')"
            loading="lazy"
            class="w-[100px] h-[100px] border-[3px] rounded-full border-white"
            :placeholder="[100, 100, 5, 5]"
          />
          <div class="space-y-2">
            <p class="text-white font-semibold text-2xl capitalize">
              {{ data[0].name }}
            </p>
            <div class="flex md:flex-row flex-col">
              <p class="text-d36 text-xl font-medium">
                {{ data[0].experience_type || $t("accountPage2.professional") }}
                .
              </p>
              <PublicStars
                :value="
                  Number(
                    (data[0].rate_clarity + data[0].rate_translation) / 2
                  ) || 0
                "
              />
            </div>
            <p class="text-lg text-ea font-medium">
              {{ data[0].followers_count $t("comicTranslator.followers") }}
            </p>
          </div>
        </div>
        <div class="group space-y-1">
          <button
            type="button"
            class="capitalize border border-white rounded-lg font-semibold transition-all duration-300 hover:bg-d36 active:bg-d36 p-4 text-white text-[22px] leading-[24px]"
          >
            {{ $t("common.following") }}
          </button>
          <button
            @click="toggleFollow(data[0].id)"
            type="button"
            class="capitalize scale-0 group-hover:scale-100 group-hover:bottom-0 relative bottom-4 flex items-center space-x-2 border border-seven4 rounded-lg font-semibold transition-all duration-300 hover:bg-three0 active:bg-three0 py-2 px-4 text-white text-base"
          >
            <svg
              class="text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M14 14.252v2.09A6 6 0 0 0 6 22H4a8 8 0 0 1 10-7.749M12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m7 6.586l2.121-2.121l1.415 1.414L20.414 19l2.121 2.121l-1.414 1.415L19 20.414l-2.121 2.121l-1.415-1.414L17.587 19l-2.121-2.121l1.414-1.415z"
              />
            </svg>
            {{ $t("common.unfollow") }}
          </button>
        </div>
      </div> -->
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        v-for="(item, index) in data"
        :key="item"
        class="w-full flex justify-between border-b pt-8"
        :class="
          index !== data.length - 1 ? 'border-transparent' : 'border-three0'
        "
      >
        <div class="flex md:flex-row flex-col gap-4">
          <NuxtImg
            :src="item.image || '/avatr.webp'"
            :alt="$t('alt.avatar')"
            loading="lazy"
            class="w-[100px] h-[100px] border-[3px] rounded-full border-white"
            :placeholder="[100, 100, 5, 5]"
          />
          <div class="space-y-2">
            <p class="text-white font-semibold text-2xl capitalize">
              {{ item.name }}
            </p>
            <div class="flex md:flex-row flex-col">
              <p class="text-d36 text-xl font-medium">
                {{ $t("accountPage2.professional") }} .
              </p>
              <PublicStars
                :value="
                  Number((item.rate_clarity + item.rate_translation) / 2) || 0
                "
              />
            </div>
            <p class="text-lg text-ea font-medium">
              {{
                $t("comicTranslator.followers", { count: item.followers_count })
              }}
            </p>
          </div>
        </div>
        <div class="group space-y-1">
          <button
            type="button"
            class="capitalize border border-white rounded-lg font-semibold transition-all duration-300 hover:bg-d36 active:bg-d36 p-4 text-white text-[22px] leading-[24px]"
          >
            {{ $t("common.following") }}
          </button>
          <button
            @click="toggleFollow(item.id)"
            type="button"
            class="capitalize scale-0 group-hover:scale-100 group-hover:bottom-0 relative bottom-4 flex space-x-2 border border-seven4 rounded-lg font-semibold transition-all duration-300 hover:bg-three0 active:bg-three0 py-2 px-4 text-white text-base"
          >
            <svg
              class="text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M14 14.252v2.09A6 6 0 0 0 6 22H4a8 8 0 0 1 10-7.749M12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m7 6.586l2.121-2.121l1.415 1.414L20.414 19l2.121 2.121l-1.414 1.415L19 20.414l-2.121 2.121l-1.415-1.414L17.587 19l-2.121-2.121l1.414-1.415z"
              />
            </svg>
            {{ $t("common.unfollow") }}
          </button>
        </div>
      </div>

      <div v-if="!data?.length" class="grid place-items-center w-full h-[50vh]">
        <v-lazy-image :src="NoData" class="rounded-full w-1/2" alt="img" />
      </div>
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
      </transition-group>
      <button
        aria-label="next"
        type="button"
        @click="goToNext"
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
const { t } = useI18n();
import VLazyImage from "v-lazy-image";
import NoData from "@/assets/noData.webp";
definePageMeta({
  layout: "account",
  middleware: ["auth"],
  name: "following",
});
// defineRouteRules({
//   prerender: true,
// });

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

const goToPage = async (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return;
  currentPage.value = page;
  await refresh();
};

const goToNext = async () => {
  if (currentPage.value >= totalPages.value) return;
  currentPage.value += 1;
  await refresh();
};

const goToPrevious = async () => {
  if (currentPage.value <= 1) return;
  currentPage.value -= 1;
  await refresh();
};

const nuxtApp = useNuxtApp();
const data = ref();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;

const { locale } = useI18n();
const { data: dataTemp, refresh } = await useLazyFetch(
  `${url}/followers?page=${currentPage.value}`,
  {
    headers: {
      Authorization: `Bearer ${useCookie("authToken").value}`,
      "X-Localization": locale,
    },

    onResponse: ({ response }) => {
      data.value = response?._data?.data?.data_messages;
      console.log("API Response:", response?._data);
      totalPages.value = response._data?.data?.meta?.total_pages || 1;
    },
  }
);

const toggleFollow = async (id) => {
  try {
    if (useCookie("authToken").value) {
      const { data: dataVal } = await useLazyFetch(`${url}/followers`, {
        method: "POST",
        server: false,
        headers: {
          "X-Localization": locale.value,
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
        body: JSON.stringify({
          translator_id: id,
        }),
      });

      if (dataVal.value?.status) {
        if (data.value) {
          data.value = data.value.filter((item) => item.id !== id);
        }

        toast.add({
          title: dataVal.value.message || "Saved successfully!",
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
    }
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  }
};

const handleBackendErrors = (response) => {
  if (response.errors) {
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
  } else if (response.message) {
    // Generic message for errors without a structured `errors` field
    toast.add({
      title: response.message,
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
  } else {
    // Unknown error structure
    toast.add({
      title: "An unknown error occurred. Please try again.",
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
  }
};
</script>
