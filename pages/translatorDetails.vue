<template>
  <section>
    <div
      data-aos="flip-right"
      data-aos-duration="500"
      data-aos-easing="ease-out-cubic"
      class="bg-color14/90 px-8 pt-24 pb-8 lg:pb-16 border-b border-b-d36 rounded-b-[20px]"
    >
      <div
        class="containerClass flex items-center gap-4 lg:gap-0 lg:justify-between lg:flex-row flex-col"
      >
        <div
          class="space-y-2 lg:space-y-4 w-full justify-center lg:justify-start lg:w-[150px] flex flex-col items-center"
        >
          <div class="relative w-fit">
            <NuxtImg
              src="/tempAvatar.webp"
              class="w-[120px] h-[120px] border-4 border-white rounded-full"
              :placeholder="[120, 120, 5, 5]"
              alt="avtar"
              loading="lazy"
            />
            <p
              class="text-d36 grid place-items-center text-sm font-semibold absolute bottom-0 left-1/2 -translate-x-1/2 border border-twoC bg-oneA/90 rounded w-[96px] h-[28px]"
            >
              {{ $t("accountPage.professional") }}
            </p>
          </div>
          <p class="font-semibold text-2xl lg:w-[170px] text-white text-center">
            Drew Johnson
          </p>
          <p class="text-lg text-ea font-medium text-center">
            {{ $t("comicTranslator.followers") }}
          </p>
        </div>
        <svg
          class="hidden lg:block w-[1px] h-full mx-8"
          viewBox="0 0 1 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0.5" y1="200" x2="0.5" stroke="#595959" />
        </svg>

        <svg
          class="w-full h-[1px] lg:hidden"
          viewBox="0 0 100 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#595959" />
        </svg>

        <div
          class="flex flex-col w-full items-start md:items-center lg:items-start gap-4 lg:gap-8"
        >
          <p class="w-full xl:w-[730px] text-ea text-lg font-medium">
            {{ $t("accountPage2.descriptionPlaceholder") }}
          </p>
          <div class="space-y-2 w-full lg:w-auto">
            <div class="flex items-center gap-2">
              <p class="text-ea font-medium text-base">
                {{ $t("comicTranslator.translationQuality") }}
              </p>
              <PublicStarsWithoutText :value="4.5" />
            </div>
            <div class="flex items-center gap-2">
              <p class="text-ea font-medium text-base">
                {{ $t("comicTranslator.imageClarity") }}
              </p>
              <PublicStarsWithoutText :value="4" />
            </div>
          </div>
        </div>

        <button
          type="button"
          @click="activeFollow = !activeFollow"
          :style="{
            color: activeFollow ? 'white' : '#141414',
            backgroundColor: activeFollow ? 'transparent' : 'white',
            borderColor: 'white',
          }"
          class="capitalize w-full my-4 lg:w-[159px] border border-white rounded-lg py-4 transition-all duration-300 hover:bg-white hover:text-color14 text-[22px] leading-[24px]"
        >
          {{ activeFollow ? $t("common.following") : $t("common.follow") }}
        </button>
      </div>
    </div>
    <div
      data-aos="flip-left"
      data-aos-duration="500"
      data-aos-easing="ease-out-cubic"
      class="containerClass"
    >
      <div class="w-full">
        <div class="flex mt-8 items-center w-full relative">
          <p
            @click="active = 1"
            :key="1"
            :class="
              active === 1
                ? 'border-d36 text-d36'
                : 'border-transparent text-white'
            "
            class="cursor-pointer rounded transition-all duration-300 border-b-[5px] pt-2 pb-6 px-4 font-medium text-lg capitalize text-center"
          >
            {{ $t("chapters") }}
          </p>
          <p
            :key="0"
            @click="active = 0"
            :class="
              active === 0
                ? 'border-d36 text-d36'
                : 'border-transparent text-white'
            "
            class="cursor-pointer rounded transition-all duration-300 border-b-[5px] pt-2 pb-6 px-4 font-medium text-lg capitalize text-center"
          >
            {{ $t("common.comments") }}
          </p>
          <div
            class="absolute w-[80%] bottom-[1px] -z-10 bg-three0 h-[1px]"
          ></div>
        </div>
        <div class="py-4">
          <div v-if="active === 1">
            <div
              class="grid gap-4 overflow-hidden place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <div
                class="flex flex-col relative h-[502px] overflow-hidden md:hover:rounded-md group md:hover:shadow-combined-hover cursor-pointer transition-all duration-300"
                v-for="item in 8"
                :key="item"
              >
                <div
                  class="transition-all duration-300 absolute top-0 left-0 w-full h-full bg-black/50 hidden md:group-hover:block"
                ></div>
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

                <NuxtImg
                  src="images/mostReading/1.webp"
                  loading="lazy"
                  placeholder
                  alt="img"
                  class="transition-all object-cover md:group-hover:h-[345px] md:w-[302px] h-[400px] duration-300 md:group-hover:rounded-b-lg flex-shrink"
                />
                <p
                  class="hidden md:block transition-all md:group-hover:hidden duration-300 font-semibold text-white md:text-2xl pt-4 pb-2"
                >
                  {{ $t("comic.title") }}
                </p>
                <p
                  class="hidden -mt-2 md:block transition-all md:group-hover:hidden duration-300 text-base font-medium text-white"
                >
                  #5
                </p>
                <p
                  class="hidden md:block transition-all md:group-hover:hidden duration-300 text-base font-medium text-ea"
                >
                  {{ $t("mostReading.views") }}
                </p>

                <div
                  class="bg-oneA relative z-10 hidden transition-all duration-300 md:group-hover:block text-white px-4 py-5 space-y-2 rounded-b"
                >
                  <p class="font-semibold text-lg">{{ $t("comic.title") }}</p>
                  <p class="font-medium text-sm">{{ $t("comic.author") }}</p>
                  <PublicStars :value="3.4" />

                  <p class="text-sm font-medium">{{ $t("comic.genres") }}</p>
                  <div
                    class="absolute right-4 bottom-5 w-[42px] h-[42px] rounded-full bg-[#747474] grid place-items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162zm0-2.2l5 2.15V5H7v12.95zM12 5H7h10z"
                      />
                    </svg>
                  </div>
                </div>

                <div class="md:hidden bg-color14 p-4 space-y-2 text-white">
                  <p class="font-semibold text-2xl">{{ $t("comic.title") }}</p>
                  <p class="font-semibold text-basse text-ea">
                    {{ $t("comic.author") }}
                  </p>
                </div>
              </div>
            </div>
            <div
              class="flex flex-wrap justify-center items-center gap-2 md:gap-8 my-8"
            >
              <button
                @click="goToPrevious"
                :disabled="currentPage === 1"
                class="w-[45px] h-[45px] cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
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
              <ul
                class="hidden md:flex flex-wrap gap-1 md:gap-2 items-center text-white"
              >
                <li>
                  <button
                    @click="goToPage(1)"
                    class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
                    :class="currentPage === 1 ? 'bg-f0d' : 'bg-oneA'"
                  >
                    1
                  </button>
                </li>
                <li
                  v-if="pages[0] > 2"
                  class="bg-oneA grid place-items-center w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
                >
                  ...
                </li>
                <li v-for="page in pages" :key="page">
                  <button
                    @click="goToPage(page)"
                    class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
                    :class="currentPage === page ? 'bg-f0d' : 'bg-oneA'"
                  >
                    {{ page }}
                  </button>
                </li>
                <li
                  v-if="currentPage < totalPages - 3"
                  class="bg-oneA grid place-items-center w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
                >
                  ...
                </li>
                <li>
                  <button
                    @click="goToPage(totalPages)"
                    class="w-[30px] h-[30px] md:w-[50px] md:h-[50px] rounded-full font-semibold text-base md:text-3xl"
                    :class="currentPage === totalPages ? 'bg-f0d' : 'bg-oneA'"
                  >
                    {{ totalPages }}
                  </button>
                </li>
              </ul>
              <button
                @click="goToNext"
                :disabled="currentPage === totalPages"
                class="w-[45px] h-[45px] cursor-pointer rounded-full bg-oneA grid place-items-center text-white border border-twoC"
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
            v-else
            class="bg-color14 rounded-xl my-8 border border-three0 py-8 px-4 transition-all duration-300 hover:shadow-lg"
          >
            <p
              class="uppercase text-ea font-semibold text-2xl pb-4 hidden md:block"
            >
              {{ $t("common.comments") }}
            </p>
            <hr class="w-full h-[1px] bg-f0d hidden md:block" />
            <div class="flex py-4 gap-4 md:flex-row flex-col">
              <NuxtImg
                src="/avatr.webp"
                alt="img"
                loading="lazy"
                :placeholder="[100, 100, 5, 5]"
                class="w-[100px] h-[100px] rounded-full"
              />
              <div class="w-full space-y-4">
                <p class="font-medium text-lg text-white">
                  {{ $t("common.feedback") }}
                </p>
                <div class="space-y-4 w-full">
                  <PublicStarsUser />
                  <VeeForm
                    v-slot="{ isSubmitting }"
                    @submit="submit"
                    v-auto-animate
                    class="w-full"
                  >
                    <VeeField
                      type="text"
                      as="textarea"
                      class="w-full h-[130px] resize-none outline-none bg-twoC rounded-xl text-bf font-medium text-base p-4"
                      name="text"
                      id="text"
                      :placeholder="$t('common.commentPlaceholder')"
                      rules="alphaSpaces"
                    />
                    <VeeErrorMessage
                      name="text"
                      class="md:text-base text-sm font-medium text-red-500"
                    />
                    <button
                      :disabled="isSubmitting"
                      type="submit"
                      class="bg-fc my-4 transition-all duration-300 hover:bg-d36 rounded-lg text-color14 font-semibold px-4 py-3 text-base"
                    >
                      {{ $t("common.send") }}
                    </button>
                  </VeeForm>
                </div>
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-full mt-4 mb-8 md:hidden"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
            >
              <rect width="100%" height="1" fill="#222222" rx="0.5" />
            </svg>

            <div class="space-y-4">
              <div
                v-for="num in 5"
                :key="num"
                class="bg-oneA rounded-[20px] p-4 md:px-10 md:py-8 flex gap-4 md:flex-row flex-col"
              >
                <NuxtImg
                  src="/avatr.webp"
                  alt="img"
                  loading="lazy"
                  class="w-[70px] h-[70px] rounded-full"
                  :placeholder="[70, 70, 5, 5]"
                />
                <div class="space-y-4">
                  <p class="text-bf font-medium text-lg">Omar Ali</p>
                  <PublicStars :value="3" />
                  <p class="text-bf font-medium text-base">
                    {{ $t("common.commentExample") }}
                  </p>
                </div>
              </div>
            </div>

            <div
              class="flex pt-4 text-d36 cursor-pointer justify-center items-center gap-2"
            >
              <p class="font-semibold text-base">{{ $t("common.viewMore") }}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
// defineRouteRules({
//   prerender: true,
// });
const active = ref(0);
const activeFollow = ref(false);

const currentPage = ref(1);
const totalPages = ref(40);
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

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return;
  currentPage.value = page;
};

const goToNext = () => {
  if (currentPage.value >= totalPages.value) return;
  currentPage.value += 1;
};

const goToPrevious = () => {
  if (currentPage.value <= 1) return;
  currentPage.value -= 1;
};

const submit = () => {};
</script>
