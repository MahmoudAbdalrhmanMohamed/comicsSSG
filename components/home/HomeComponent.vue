<template>
  <section
    class="relative w-screen h-screen overflow-hidden border-b-[8px] border-f0d"
  >
    <!-- Static Content Section -->
    <div
      class="containerClass gap-4 md:gap-0 pt-24 md:py-0 h-full grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 place-items-center md:items-center md:justify-between z-10 relative"
    >
      <div class="text-white">
        <div class="fontBebasNeue font-normal">
          <p
            class="text-[38px] w-fit leading-[45px] md:text-[64px] md:leading-[78px]"
          >
            {{ $t("welcomeTo") }}
          </p>
          <p
            class="text-[61px] text-nowrap leading-[74px] md:text-[100px] -mt-4 md:-mt-6 md:leading-[120px] bg-clip-text text-transparent bg-text-gradient w-fit"
          >
            {{ $t("yskComics") }}
          </p>
        </div>
        <p
          class="max-w-[32rem] font-semibold md:font-medium text-sm md:text-xl"
        >
          {{ $t("yskDescription") }}
        </p>
        <div
          v-if="!authToken"
          class="flex items-center gap-4 mt-4 font-semibold text-[22px] leading-[24px] *:transition-all *:duration-300"
        >
          <NuxtLink
            :to="localePath('/login')"
            class="border border-white hover:text-color14 rounded-lg py-4 px-8 hover:bg-d36 hover:border-d36"
          >
            {{ $t("logIn") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/signup')"
            class="border border-d36 bg-d36 hover:bg-transparent hover:text-white hover:border-white text-color14 rounded-lg py-4 px-8"
          >
            {{ $t("signUp") }}
          </NuxtLink>
        </div>
      </div>

      <!-- Carousel Section -->
      <div class="place-self-end w-full h-full relative overflow-hidden">
        <div
          v-if="$device.isDesktop"
          class="md:flex hidden flex-col w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
          :style="[{ transform: `translateY(-${currentSlide * 100}%)` }]"
        >
          <div
            class="w-full h-screen flex justify-center items-end transition-all duration-300"
            v-for="(item, index) in data"
            :key="index"
            :style="[{ opacity: currentSlide === index ? 1 : 0 }]"
          >
            <img
              :src="`./${item.main}`"
              :style="{ paddingTop: index === 1 ? '2rem' : '1.5rem' }"
              class="w-[500px] h-screen relative object-fill self-end"
              :alt="$t(item.alt)"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
          </div>
        </div>
        <div
          v-if="$device.isMobile"
          class="flex md:hidden flex-col w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
          :style="[{ transform: `translateY(calc(-${currentSlide * 50}vh))` }]"
        >
          <div
            class="w-full flex justify-center items-end transition-all duration-300"
            v-for="(item, index) in data"
            :style="[
              { height: `calc(50vh)` },
              { opacity: currentSlide === index ? 1 : 0 },
            ]"
            :key="index"
          >
            <img
              :src="`./${item.mobile}`"
              class="w-[250px] object-contain relative top-1"
              loading="eager"
              :alt="$t(item.alt)"
              :style="{ height: `calc(50vh)` }"
              decoding="async"
              fetchpriority="high"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic Background -->
    <div
      :style="`background: url(${currentBackground}) no-repeat center center; background-size: cover; width: 100%; height: 100%;`"
      class="absolute top-0 left-0 w-full h-full -z-20 animate-fade-in transition-opacity duration-1000 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
    >
      <!-- <img
        :src="`./${currentBackground}`"
        class="w-full h-full object-cover opacity-0 animate-fade-in"
        loading="eager"
        alt="background image"
        fetchpriority="high"
        decoding="async"
      /> -->
      <div class="bg-black/50 w-full h-full absolute top-0 left-0"></div>
    </div>
  </section>
</template>

<script setup>
const localePath = useLocalePath();
const authToken = useCookie("authToken");

const { isMobile } = useDevice();

// Carousel data
const data = ref([
  {
    main: "images/home/batman.webp",
    background: "images/home/batman_background.webp",
    mobile: "images/home/batman-mobile.webp",
    alt: "altImages.batmanComic",
  },
  {
    main: "images/home/blackPanther.webp",
    background: "images/home/blackpanther_background.webp",
    mobile: "images/home/blackPanther-mobile.webp",
    alt: "altImages.blackPantherComic",
  },
  {
    main: "images/home/spiderman.webp",
    background: "images/home/spiderman_background.webp",
    mobile: "images/home/spiderman-mobile.webp",
    alt: "altImages.spidermanComic",
  },
  {
    main: "images/home/superman.webp",
    background: "images/home/superman_background.webp",
    mobile: "images/home/superman-mobile.webp",
    alt: "altImages.supermanComic",
  },
]);

const preloadLinks = computed(() => {
  // Use device detection to determine which images to preload
  if (isMobile) {
    return [
      {
        rel: "preload",
        fetchpriority: "high",
        as: "image",
        href: `/${data.value[0].mobile}`,
        type: "image/webp",
      },
      {
        rel: "preload",
        fetchpriority: "high",
        as: "image",
        href: `/${data.value[0].background}`,
        type: "image/webp",
      },
    ];
  } else {
    return [
      {
        rel: "preload",
        fetchpriority: "high",
        as: "image",
        href: `/${data.value[0].main}`,
        type: "image/webp",
      },
      {
        rel: "preload",
        fetchpriority: "high",
        as: "image",
        href: `/${data.value[0].background}`,
        type: "image/webp",
      },
    ];
  }
});

// Add preloads dynamically to the head
useHead({
  link: preloadLinks,
});

// Tracks the current active slide
const currentSlide = ref(0);

// Computes the background based on the active slide
const currentBackground = computed(
  () => data.value[currentSlide.value].background
);

// Move to the next slide
function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % data.value.length;
}

// Move to the previous slide
function prevSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + data.value.length) % data.value.length;
}

// Automatically change slides every 5 seconds
let autoPlayInterval = null;

onMounted(() => {
  autoPlayInterval = setInterval(nextSlide, 5000);
});

// Clean up interval on component unmount
onUnmounted(() => {
  clearInterval(autoPlayInterval);
});
</script>
<style scoped>
/* Cool transitions */
img.animate-fade-in {
  animation: fadeIn 1s ease forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
