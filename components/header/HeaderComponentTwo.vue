<template>
  <header
    :class="
      color
        ? 'bg-color14 overflow-hidden shadow-b-lg z-[999] w-full sticky top-0'
        : 'bg-color14 shadow-b-lg backdrop-blur-2xl bg-opacity-20 fixed z-[999] w-full'
    "
  >
    <nav class="containerClass h-16 flex items-center justify-between">
      <NuxtLink
        class="no"
        :to="localePath('/')"
        :class="
          trnaslator === 'translator'
            ? 'w-[100px] basis-[30%] xl:basis-[70%] xl:w-full'
            : 'w-[100px] basis-[30%] xl:basis-full xl:w-full'
        "
      >
        <img
          src="/logo.png"
          class="w-[100px] h-[35px]"
          loading="eager"
          fetchpriority="high"
          :alt="$t('header.logoAlt')"
        />
      </NuxtLink>
      <HeaderLargeHeaderTwo :color="color" class="self-end" />
      <HeaderSmallHeaderTwo />
    </nav>
  </header>
</template>

<script setup>
const props = defineProps({
  color: {
    default: false,
  },
});
const localePath = useLocalePath();
useHead({
  link: [
    {
      rel: "preload",
      fetchpriority: "high",
      as: "image",
      href: "./logo.png",
      type: "image/png",
    },
  ],
});

const trnaslator = useCookie("type");
</script>
