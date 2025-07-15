<template>
  <main>
    <NuxtRouteAnnouncer />
    <LazyNuxtLoadingIndicator color="#E9BD36" />
    <LazyPublicLoading :loading="load" />
    <!-- <NuxtPwaManifest /> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LazyUNotifications
      class="text-gray-50"
      :class="'top-12 md:top-0 right-0 z-[9999]'"
      :timeout="0"
      color="#111827"
    >
      <template #title="{ title }">
        <span v-html="title" />
      </template>
    </LazyUNotifications>

    <LazyHomeSuuportAds :hydrate-when="isReady" />
  </main>
</template>

<script setup>
const { locale } = useI18n();
import temp from "@/assets/tempAvatar.webp";

useCookie("image").value
  ? (useCookie("image").value = useCookie("image").value)
  : (useCookie("image").value = temp);

useHead({
  bodyAttrs: {
    class: "overflow-x-hidden bg-black",
  },
  htmlAttrs: {
    lang: locale,
  },
});

const nuxtApp = useNuxtApp();
const load = ref(false);
const isReady = ref(false);
nuxtApp.hook("page:start", () => {
  load.value = true;
});
nuxtApp.hook("page:finish", () => {
  load.value = false;
});

nuxtApp.hook("page:loading:end", () => {
  isReady.value = true;
});
// test
</script>

<style>
body {
  font-family: Roboto;
}

.fontBebasNeue {
  font-family: "Bebas Neue";
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  transform: translateY(100px);
}
.page-enter-to,
.page-leave-from {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}
</style>
