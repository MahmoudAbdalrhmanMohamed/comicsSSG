<template>
  <div class="w-full rounded-xl transition-all duration-300 containerClass">
    <div class="space-y-4">
      <div
        v-for="num in 5"
        :key="num"
        class="bg-oneA rounded-[20px] p-4 md:px-10 md:py-8 flex gap-4 md:flex-row flex-col"
      >
        <NuxtImg
          src="/avatr.webp"
          :alt="$t('alt.avatar')"
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
      class="flex pt-4 text-d36 cursor-pointer justify-center items-center my-8 gap-2"
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
</template>

<script setup>
const { t } = useI18n();

definePageMeta({
  layout: "account",
  middleware: ["auth"],
});
// defineRouteRules({
//   prerender: true,
// });
</script>
