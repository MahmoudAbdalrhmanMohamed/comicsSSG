<template>
  <div class="overflow-hidden relative">
    <section
      class="containerClass w-screen h-screen grid place-items-center gap-4 text-center"
    >
      <h1 class="text-white text-3xl md:text-6xl">
        {{ error?.statusCode || "Unknown Error" }}
      </h1>
      <p class="text-white text-xl md:text-4xl">
        {{ error?.message || "Something went wrong" }}
      </p>
      <NuxtLink
        :to="localePath('/')"
        class="border border-white hover:bg-d36 sm:w-[600px] text-white rounded-lg hover:text-colo14 bg-transparent hover:border-d36 transition-all duration-300 hover:text-color14 active:bg-d36 block px-4 py-3"
      >
        Back to home
      </NuxtLink>
    </section>
    <img
      class="absolute w-full h-full object-cover -z-30 scale-105 top-0"
      :src="asset"
      alt="Main background"
      loading="lazy"
      placeholder="blur"
    />
    <div class="bg-black/80 w-full h-full absolute top-0 left-0 -z-20"></div>
  </div>
</template>

<script setup>
import asset from "@/assets/main.webp";

const localePath = useLocalePath();
const error = useError();

const props = defineProps({
  error: Object,
});
</script>
