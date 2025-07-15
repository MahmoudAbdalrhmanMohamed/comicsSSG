<template>
  <div
    class="bg-oneA space-y-4 rounded-t-lg md:rounded-t-none w-full h-full z-10 relative flex flex-col justify-center items-center"
    :class="locale === 'ar' ? 'md:rounded-r-[20px]' : 'md:rounded-l-[20px]'"
  >
    <h1 class="capitalize text-d36 font-semibold text-2xl text-center">
      {{ $t("createNewPassword") }}
    </h1>
    <p class="text-bf font-semibold text-xs text-center">
      {{ $t("passwordRecommendation") }}
    </p>
    <VeeForm
      v-slot="{ isSubmiting }"
      @submit="submit"
      class="w-full containerClass md:w-[90%] lg:w-[80%]"
      v-auto-animate
    >
      <label
        for="password"
        class="text-bf capitalize font-medium text-base block"
      >
        {{ $t("newPassword") }}
      </label>
      <div
        data-aos="fade-left"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        class="relative"
      >
        <VeeField
          :type="show ? 'text' : 'password'"
          name="password"
          id="password"
          rules="required|min:8"
          :placeholder="$t('newPasswordPlaceholder')"
          class="outline-none text-seven4 placeholder:text-seven4 font-semibold text-xs placeholder:font-semibold placeholder:text-xs bg-ea border-five9 px-4 py-3 border rounded w-full"
        />
        <svg
          @click="show = !show"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          class="text-twoC cursor-pointer absolute top-1/2 -translate-y-1/2 right-4"
        >
          <path
            fill="currentColor"
            d="M12 6.5a9.77 9.77 0 0 1 8.82 5.5c-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12A9.77 9.77 0 0 1 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5m0 5a2.5 2.5 0 0 1 0 5a2.5 2.5 0 0 1 0-5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5s-2.02-4.5-4.5-4.5"
          />
        </svg>
      </div>
      <VeeErrorMessage
        name="password"
        class="text-xs font-medium text-red-500"
      />
      <label
        for="confirmPassword"
        class="text-bf mt-8 capitalize font-medium text-base block"
      >
        {{ $t("confirmPassword") }}
      </label>
      <div
        data-aos="fade-right"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        class="relative"
      >
        <VeeField
          :type="show ? 'text' : 'password'"
          name="confirmPassword"
          rules="required|min:8|confirmed:@password"
          id="confirmPassword"
          :placeholder="$t('confirmPasswordPlaceholder')"
          class="outline-none text-seven4 placeholder:text-seven4 font-semibold text-xs placeholder:font-semibold placeholder:text-xs bg-ea border-five9 px-4 py-3 border rounded w-full"
        />
        <svg
          @click="show = !show"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          class="text-twoC cursor-pointer absolute top-1/2 -translate-y-1/2 right-4"
        >
          <path
            fill="currentColor"
            d="M12 6.5a9.77 9.77 0 0 1 8.82 5.5c-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12A9.77 9.77 0 0 1 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5m0 5a2.5 2.5 0 0 1 0 5a2.5 2.5 0 0 1 0-5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5s-2.02-4.5-4.5-4.5"
          />
        </svg>
      </div>
      <VeeErrorMessage
        name="confirmPassword"
        class="text-xs font-medium text-red-500"
      />

      <button
        type="submit"
        :disabled="isSubmiting"
        class="w-full mt-8 px-4 py-3 capitalize transition-all duration-300 hover:text-color14 border border-transparent hover:border-five9 hover:shadow-lg bg-d36 hover:bg-white text-white rounded-lg"
      >
        {{ $t("done") }}
      </button>
    </VeeForm>
  </div>
</template>

<script setup>
const show = ref(false);
definePageMeta({
  layout: "login-layout",
  middleware: ["otp"],
});

// defineRouteRules({
//   prerender: true,
// });
const { locale, t } = useI18n();
const localePath = useLocalePath();

const toast = useToast();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;

const router = useRouter();
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

    const response = await $fetch(`${url}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: values.password,
        password_confirmation: values.confirmPassword,
        email: useCookie("email").value,
        token: useCookie("optToken").value,
      }), // Automatically stringifies the payload
    });

    toast.add({
      title: response.message,
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });

    // Handle navigation or token storage here if necessary
    useCookie("optToken").value = null;
    useCookie("authToken").value = response.data.token;
    router.replace(localePath("/"));
  } catch (error) {
    // Use the error handler to process backend errors
    handleBackendErrors(error.data || { message: error.message });
  } finally {
    loading.value = false;
  }
};

const route = useRoute();

useSeoMeta({
  title: t(`newpasswordSeo.title`),
  description: `newpasswordSeo.description`,
  ogTitle: t(`newpasswordSeo.title`),
  ogDescription: `newpasswordSeo.description`,
  ogUrl: `https://www.ysk-comics.com${route.fullPath}`,
  ogImage: `https://www.ysk-comics.com/logo.png`,
  ogImageAlt: t(`newpasswordSeo.title`),
  robots: "index, follow",
  ogType: "comics",
  ogImageType: "image/png",
  ogSiteName: "YSK Comics",
  ogLocale: locale.value,
  ogLocaleAlternate: "en",
  twitterTitle: t(`newpasswordSeo.title`),
  twitterDescription: `newpasswordSeo.description`,
  twitterImage: `https://www.ysk-comics.com/logo.png`,
  twitterSite: "@YSK_Comics",
  twitterCreator: `@YSK_Comics`,
  twitterCard: "summary_large_image",
});
</script>
