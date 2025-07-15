export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig();
  const url = config.public.ConstUrl;
  const toast = useToast();
  const nuxtApp = useNuxtApp();

  // Access locale properly within a composable-friendly function
  const { locale, t } = useNuxtApp().$i18n;

  // Fetch comic data
  const { data, error } = await useFetch(`${url}/comics/${to.params.comic}`, {
    headers: {
      "X-Localization": locale.value,
      Authorization: `Bearer ${useCookie("authToken").value}`,
    },
    keepalive: true,
    key: to.params.comic,
    getCachedData: (key) => {
      return nuxtApp?.payload?.data[key] || nuxtApp?.static?.data[key];
    },
  });
  if (error.value || !data.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "comic not exits",
    });
  }
  if (
    data.value?.data?.language_code !== locale.value &&
    !data.value?.data?.slug_translated[locale.value]
  ) {
    // Check if we need to redirect
    locale.value = data.value?.data?.language_code;
    const dataToShow = ref();
    dataToShow.value = t("notAvabalileInThisLang");
    toast.add({
      title: dataToShow.value,
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
    return navigateTo(
      `/${data.value.data.language_code}/comic/${data.value.data.slug_translated[locale.value]}`,
      { replace: true }
    );
  } else if (
    data.value?.data?.language_code !== locale.value &&
    data.value?.data?.slug_translated[locale.value]
  ) {
    return navigateTo(
      `/${locale.value}/comic/${data.value.data.slug_translated[locale.value]}`,
      {
        replace: true,
      }
    );
  }
});
