<template>
  <section class="relative">
    <div
      class="md:px-12 px-4 xl:px-16 absolute w-full z-[99] -top-6 md:-top-20 left-1/2 -translate-x-1/2"
    >
      <div
        class="flex gap-4 w-full items-center justify-between flex-col md:flex-row bg-color14 border border-oneA rounded-[20px] px-12 py-6 lg:px-16 lg:py-8"
      >
        <div class="text-center">
          <p class="font-bold md:text-4xl md:leading-[44px] text-f0d">1,500+</p>
          <p
            class="font-semibold uppercase text-ea text-base md:text-2xl text-nowrap"
          >
            {{ $t("stats.comicBooks") }}
          </p>
        </div>
        <hr class="w-full h-[1px] md:w-[1px] md:h-[80px] rounded-lg bg-zeroA" />
        <div class="text-center">
          <p class="font-bold md:text-4xl md:leading-[44px] text-f0d">40+</p>
          <p class="font-semibold uppercase text-ea text-base md:text-2xl">
            {{ $t("stats.publishers") }}
          </p>
        </div>
        <hr class="w-full h-[1px] md:w-[1px] md:h-[80px] rounded-lg bg-zeroA" />

        <div class="text-center">
          <p class="font-bold md:text-4xl md:leading-[44px] text-f0d">
            265,600+
          </p>
          <p class="font-semibold uppercase text-ea text-base md:text-2xl">
            {{ $t("stats.readers") }}
          </p>
        </div>
      </div>
    </div>
    <div class="text-center mx-auto pt-60 md:pt-16 space-y-4 relative z-[99]">
      <div class="containerClass">
        <div
          class="w-full mt-8 relative z-10 rounded-lg mx-auto md:mt-12 text-center"
        >
          <LazyHomeGoogleAdsWithIns hydrate-on-idle />
        </div>
      </div>
      <h1
        class="text-white font-semibold text-2xl md:text-[30px] md:leading-[36px]"
      >
        {{ $t("search.title") }}
      </h1>
      <p class="font-medium text-base text-bf">
        {{ $t("search.subtitle") }}
      </p>
      <div
        v-auto-animate
        ref="outside"
        class="containerClass grid place-items-center relative z-[99]"
      >
        <div
          v-auto-animate
          class="bg-white rounded-lg py-2 px-4 w-[80%] sm:w-[500px] lg:w-[800px] flex items-center gap-2"
        >
          <div
            v-if="searchQuery.length >= 3 && dataVal?.length"
            class="absolute z-[99] left-0 w-full rounded-md shadow-lg top-full h-[50vh] overflow-y-auto bg-color14/60 backdrop-blur-lg px-3 py-2 sm:w-[500px] lg:w-[800px] space-y-4"
          >
            <NuxtLink
              v-for="data in dataVal"
              :key="data.id"
              :to="localePath(`/comic/${data.slug}`)"
              class="flex w-full items-center p-2 transition-all duration-300 hover:bg-gray-100 rounded-md cursor-pointer gap-2"
            >
              <NuxtImg
                :src="data.image || '/3.webp'"
                :placeholder="[60, 80, 5, 5]"
                loading="lazy"
                alt="img"
                width="60"
                height="80"
                class="w-[60px] h-[80px] rounded-md"
              />
              <p class="text-d36 text-base md:text-xl capitalize">
                {{ data.full_name }}
              </p>
            </NuxtLink>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            class="text-[#595959]"
          >
            <path
              fill="currentColor"
              d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
            />
          </svg>
          <VeeForm @submit="submit" class="w-full">
            <VeeField
              class="outline-none bg-transparent w-full placeholder:text-[#595959]"
              type="text"
              name="searchInput"
              id="searchInput"
              :placeholder="$t('search.placeholder')"
              rules="alphaNum|min:5|max:200"
              v-model="searchQuery"
            />
          </VeeForm>
        </div>
        <VeeErrorMessage
          name="searchInput"
          class="text-red-500 font-medium text-sm"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const searchQuery = ref("");
const submit = () => {
  if (searchQuery.value.trim()) {
    console.log(searchQuery.value);
    searchQuery.value = "";
  }
};

const { locale } = useI18n();

const outside = ref();
onClickOutside(outside, () => {
  if (searchQuery.value) {
    searchQuery.value = "";
  }
});

const dataVal = ref();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;

watch(
  () => searchQuery.value,
  async (newQuery) => {
    if (!newQuery || newQuery.trim().length < 3) {
      dataVal.value = null; // Clear results for empty input
      return;
    }

    try {
      // console.log(newQuery);
      const response = await $fetch(
        `${url}/search-comics-home?name=${newQuery}`,
        {
          headers: {
            "X-Localization": locale.value,
          },
        }
      );
      dataVal.value = response.data;
    } catch (error) {
      console.error("Search fetch error:", error);
      dataVal.value = null;
    }
  }
);
const localePath = useLocalePath();
</script>
