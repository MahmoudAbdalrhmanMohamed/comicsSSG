<template>
  <div
    class="containerClass w-screen h-screen pt-32 flex justify-center items-center flex-col space-y-4 md:space-y-8 text-center"
  >
    <div class="w-full p-4 md:p-8 rounded-md bg-color14">
      <p
        class="text-d36 transition-all duration-300 hover:opacity-50 text-center font-semibold text-2xl"
      >
        {{ $t("rejectionMessage.title") }}
      </p>
      <p
        class="text-center font-medium text-lg my-4 mx-auto max-w-[60rem] md:my-8 transition-all duration-300 hover:opacity-50 text-ea"
      >
        {{ $t("rejectionMessage.description") }}
        <span class="font-semibold">
          {{ $t("rejectionMessage.comicTitle") }}
        </span>
        {{ $t("rejectionMessage.continuation") }}
      </p>
    </div>
    <NuxtLink
      :to="localePath('/')"
      class="border border-white hover:text-color14 hover:border-d36 sm:w-[200px] text-white rounded-lg hover:bg-d36 transition-all duration-300 active:bg-d36 block px-4 py-3"
    >
      {{ $t("backToHome") }}
    </NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
// defineRouteRules({
//   prerender: true,
// });
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
