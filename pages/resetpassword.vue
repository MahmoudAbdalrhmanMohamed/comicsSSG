<template>
  <div
    class="bg-oneA space-y-4 rounded-t-lg md:rounded-t-none w-full h-full z-10 relative flex flex-col justify-center items-center"
    :class="locale === 'ar' ? 'md:rounded-r-[20px]' : 'md:rounded-l-[20px]'"
  >
    <h1 class="capitalize text-d36 font-semibold text-2xl text-center">
      {{ $t("resetPasswordTitle") }}
    </h1>
    <p class="text-bf font-semibold text-xs text-center">
      {{ $t("resetPasswordMessage") }}
    </p>
    <VeeForm
      v-slot="{ isSubmitting }"
      @submit="submit"
      class="w-full containerClass md:w-[90%] lg:w-[80%]"
      v-auto-animate
    >
      <label for="email" class="text-bf capitalize font-medium text-base block">
        {{ $t("common.email") }}
      </label>
      <VeeField
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        type="email"
        name="email"
        id="email"
        rules="email|required|min:4|max:50"
        :placeholder="$t('emailPlaceholder')"
        class="outline-none text-seven4 placeholder:text-seven4 font-semibold text-xs placeholder:font-semibold placeholder:text-xs bg-ea border-five9 px-4 py-3 border rounded w-full"
      />
      <VeeErrorMessage name="email" class="text-xs font-medium text-red-500" />

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full mt-8 px-4 py-3 bg-d36 text-white transition-all duration-300 hover:text-color14 hover:bg-white capitalize rounded-lg"
      >
        {{ $t("sendResetCode") }}
      </button>
    </VeeForm>
    <PublicLoading :loading="loading" />
  </div>
</template>

<script setup>
const localePath = useLocalePath();
const { locale, t } = useI18n();
const router = useRouter();

definePageMeta({
  layout: "login-layout",
  middleware: ["authed"],
});

const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const toast = useToast();

const loading = ref(false);

const handleBackendErrors = (response) => {
  if (response.errors) {
    Object.entries(response.errors).forEach(([field, messages]) => {
      messages.forEach((message) => {
        toast.add({
          title: message,
          type: "error",
          icon: "i-icon-park-outline-error",
          color: "red",
        });
      });
    });
  } else if (response.message) {
    // Generic message for errors without a structured `errors` field
    toast.add({
      title: response.message,
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
  } else {
    // Unknown error structure
    toast.add({
      title: "An unknown error occurred. Please try again.",
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
  }
};

const submit = async (values) => {
  try {
    loading.value = true;

    const response = await $fetch(`${url}/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), // Automatically stringifies the payload
    });

    toast.add({
      title: response.message,
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
    router.replace(localePath("/resetcode"));

    // Handle navigation or token storage here if necessary
    useCookie("optToken").value = response.data.token;
    useCookie("email").value = values.email;
    useCookie("authToken").value = null;
  } catch (error) {
    // Use the error handler to process backend errors
    handleBackendErrors(error.data || { message: error.message });
  } finally {
    loading.value = false;
  }
};

const route = useRoute();

useSeoMeta({
  title: t(`forgetPasswordSeo.title`),
  description: `forgetPasswordSeo.description`,
  ogTitle: t(`forgetPasswordSeo.title`),
  ogDescription: `forgetPasswordSeo.description`,
  ogUrl: `https://www.ysk-comics.com${route.fullPath}`,
  ogImage: `https://www.ysk-comics.com/logo.png`,
  ogImageAlt: t(`forgetPasswordSeo.title`),
  robots: "index, follow",
  ogType: "comics",
  ogImageType: "image/png",
  ogSiteName: "YSK Comics",
  ogLocale: locale.value,
  ogLocaleAlternate: "en",
  twitterTitle: t(`forgetPasswordSeo.title`),
  twitterDescription: `forgetPasswordSeo.description`,
  twitterImage: `https://www.ysk-comics.com/logo.png`,
  twitterSite: "@YSK_Comics",
  twitterCreator: `@YSK_Comics`,
  twitterCard: "summary_large_image",
});
</script>
