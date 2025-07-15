<template>
  <section class="w-screen h-screen">
    <PublicLoading :loading="loading" />
  </section>
</template>
<script setup>
definePageMeta({
  layout: "default",
});
const loading = ref(false);
const route = useRoute();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const localePath = useLocalePath();
if (route.query.token) {
  loading.value = true;
  try {
    const response = await $fetch(`${url}/info-user`, {
      headers: {
        Authorization: `Bearer ${route.query.token}`,
      },
    });
    if (response.status) {
      useCookie("authToken", { maxAge: 7776000 }).value = route.query.token;
      useCookie("image", { maxAge: 7776000 }).value = response.data.image;
      useCookie("type", { maxAge: 7776000 }).value = response.data.role;

      await navigateTo(localePath("/"));
      loading.value = false;
    } else {
      loading.value = false;

      await navigateTo(localePath("/login"));
    }
  } catch (error) {
    error.statusCode === 401;
    loading.value = true;
    await navigateTo(localePath("/login"));
    loading.value = false;
  }
} else {
  loading.value = true;
  await navigateTo(localePath("/login"));
  loading.value = false;
}
</script>
