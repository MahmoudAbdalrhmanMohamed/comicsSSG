<template>
  <div
    class="containerClass w-screen h-screen pt-24 flex justify-center items-center flex-col gap-8 text-center"
  >
    <p class="text-d36 font-semibold text-xl sm:text-2xl capitalize">
      {{ header }}
    </p>
    <p
      class="text-ea font-base font-medium text-balance md:text-wrap max-w-[600px] mx-auto"
      v-html="content"
    ></p>
    <NuxtLink
      :to="localePath('/')"
      class="border border-white font-semibold hover:text-color14 hover:border-d36 sm:w-[600px] text-white rounded-lg hover:bg-d36 transition-all duration-300 active:bg-d36 block px-4 py-3"
      >{{ $t("backToHome") }}</NuxtLink
    >
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
// defineRouteRules({
//   prerender: true,
// });

const { t } = useI18n();

import { useThinkStore } from "@/stores/thinkStore";

const store = useThinkStore();

const header = computed(() => store.header || t("think"));
const content = computed(() => store.content || t("thinkDes"));

const localePath = useLocalePath();
</script>

<style>
.responsive-break {
  display: none;
}
@media (min-width: 640px) {
  .responsive-break {
    display: block;
  }
}
</style>
