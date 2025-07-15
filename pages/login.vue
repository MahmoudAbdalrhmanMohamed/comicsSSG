<template>
  <div
    class="bg-oneA space-y-4 py-8 md:py-0 rounded-t-[20px] md:rounded-t-none w-full h-full z-10 relative flex flex-col justify-center items-center"
    :class="locale === 'ar' ? 'md:rounded-r-[20px]' : 'md:rounded-l-[20px]'"
  >
    <h1 class="capitalize text-d36 font-semibold text-2xl text-center">
      {{ $t("logIn") }}
    </h1>
    <VeeForm
      v-slot="{ isSubmiting }"
      @submit="submit"
      class="w-full containerClass md:w-[90%] lg:w-[80%]"
      v-auto-animate
    >
      <label for="email" class="text-bf capitalize font-medium text-base block">
        {{ $t("common.email") }}
      </label>
      <VeeField
        data-aos="fade-left"
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
      <label
        for="password"
        class="text-bf mt-8 capitalize font-medium text-base block"
      >
        {{ $t("common.password") }}
      </label>
      <VeeField
        data-aos="fade-right"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        type="password"
        name="password"
        rules="required|min:4"
        id="password"
        :placeholder="$t('passwordPlaceholder')"
        class="outline-none text-seven4 placeholder:text-seven4 font-semibold text-xs placeholder:font-semibold placeholder:text-xs bg-ea border-five9 px-4 py-3 border rounded w-full"
      />
      <VeeErrorMessage
        name="password"
        class="text-xs font-medium text-red-500"
      />
      <nuxt-link
        :to="localePath('/resetpassword')"
        class="text-a0 capitalize block font-semibold text-xs hover:text-d36 transition-all duration-300"
        :class="locale === 'en' ? 'text-right' : 'text-left'"
      >
        {{ $t("forgetPassword") }}
      </nuxt-link>
      <button
        type="submit"
        :disable="isSubmiting"
        class="w-full mt-8 px-4 py-3 bg-d36 border border-d36 hover:border-white text-white rounded-lg transition-all duration-300 hover:bg-transparent hover:text-white"
      >
        {{ $t("logIn") }}
      </button>
    </VeeForm>
    <div
      data-aos="fade-left"
      data-aos-duration="500"
      data-aos-easing="ease-out-cubic"
      class="flex items-center gap-2"
    >
      <hr class="w-full h-[1px] text-twoC" />
      <p class="text-bf font-semibold text-xs text-nowrap">
        {{ $t("orLogInWith") }}
      </p>
      <hr class="w-full h-[1px] text-twoC" />
    </div>
    <div
      data-aos="fade-right"
      data-aos-duration="500"
      data-aos-easing="ease-out-cubic"
      class="flex items-center justify-center gap-4"
    >
      <div
        @click="fecthData"
        class="w-[56px] transition-all duration-300 hover:bg-d36 grid place-items-center h-[56px] bg-white rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 128 128"
        >
          <path
            fill="#fff"
            d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.3 74.3 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.2 36.2 0 0 1-13.93 5.5a41.3 41.3 0 0 1-15.1 0A37.2 37.2 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.3 38.3 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.3 34.3 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.2 61.2 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
          />
          <path
            fill="#e33629"
            d="M44.59 4.21a64 64 0 0 1 42.61.37a61.2 61.2 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.3 34.3 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
          />
          <path
            fill="#f8bd00"
            d="M3.26 51.5a63 63 0 0 1 5.5-15.9l20.73 16.09a38.3 38.3 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"
          />
          <path
            fill="#587dbd"
            d="M65.27 52.15h59.52a74.3 74.3 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"
          />
          <path
            fill="#319f43"
            d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.2 37.2 0 0 0 14.08 6.08a41.3 41.3 0 0 0 15.1 0a36.2 36.2 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.7 63.7 0 0 1 8.75 92.4"
          />
        </svg>
      </div>
      <div
        @click="fecthDataFacebook"
        class="w-[56px] transition-all duration-300 hover:bg-d36 grid place-items-center h-[56px] bg-white rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          class="text-[#3D6AD6]"
          height="24"
          viewBox="0 0 64 64"
        >
          <path
            fill="currentColor"
            d="M47.4 25.8h-7.6V15.6H46c1.1 0 2-.8 2-2V3c0-1.1-.8-2-2-2h-7.3c-7.9 0-13.4 5.6-13.4 13.9v10.7h-8.8c-1.4 0-2.7 1.1-2.7 2.7v7.2c0 1.4 1.1 2.7 2.7 2.7h8.6v22.1c0 1.4 1.1 2.7 2.7 2.7h9.4c.6 0 1.1-.3 1.5-.7s.7-1.1.7-1.7V38.3H46c1.3 0 2.3-.8 2.5-2v-.2l1.4-6.9c.1-.7 0-1.5-.6-2.3c-.2-.5-1.1-1-1.9-1.1"
          />
        </svg>
      </div>
    </div>
    <div class="flex items-center justify-center gap-4">
      <p class="text-seven4 text-base font-medium">
        {{ $t("dontHaveAccount") }}
      </p>
      <NuxtLink
        :to="localePath('/signup')"
        class="text-d36 hover:opacity-50 transition-all duration-300 font-semibold capitalize text-base"
      >
        {{ $t("signUp") }}
      </NuxtLink>
    </div>
    <PublicLoading :loading="loading" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "login-layout",
  middleware: ["authed"],
});

const { resetLogin, login } = useLogined();
// defineRouteRules({
//   prerender: true,
// });
const { locale, t } = useI18n();
const toast = useToast();
const localePath = useLocalePath();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;

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

const router = useRouter();
const route = useRoute();

const submit = async (values) => {
  try {
    loading.value = true;

    const response = await $fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), // Automatically stringifies the payload
    });
    useCookie("authToken", { maxAge: 7776000 }).value = response.data.token;
    useCookie("type", { maxAge: 7776000 }).value = response.data.type;
    useCookie("image", { maxAge: 7776000 }).value = response.data.image;

    toast.add({
      title: response.message || "Login successful!",
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
    if (login.value) {
      router.replace(login.value);
      resetLogin();
      return;
    }
    router.replace(localePath("/"));

    // Handle navigation or token storage here if necessary
  } catch (error) {
    // Use the error handler to process backend errors
    handleBackendErrors(error.data || { message: error.message });
  } finally {
    loading.value = false;
  }
};

const fecthData = async () => {
  // window.open(
  //   `${url}/auth/google`,
  //   "",
  //   `${window.innerWidth > 768 ? "width=600, height=600" : ""}`
  // );
  window.location.href = `${url}/auth/google`;
};
const fecthDataFacebook = async () => {
  // window.open(
  //   `${url}/auth/facebook`,
  //   "",
  //   `${window.innerWidth > 768 ? "width=600, height=600" : ""}`
  // );
  window.location.href = `${url}/auth/facebook`;
};

useSeoMeta({
  title: t(`loginSeo.title`),
  description: `loginSeo.description`,
  ogTitle: t(`loginSeo.title`),
  ogDescription: `loginSeo.description`,
  ogUrl: `https://www.ysk-comics.com${route.fullPath}`,
  ogImage: `https://www.ysk-comics.com/logo.png`,
  ogImageAlt: t(`loginSeo.title`),
  robots: "index, follow",
  ogType: "comics",
  ogImageType: "image/png",
  ogSiteName: "YSK Comics",
  ogLocale: locale.value,
  ogLocaleAlternate: "en",
  twitterTitle: t(`loginSeo.title`),
  twitterDescription: `loginSeo.description`,
  twitterImage: `https://www.ysk-comics.com/logo.png`,
  twitterSite: "@YSK_Comics",
  twitterCreator: `@YSK_Comics`,
  twitterCard: "summary_large_image",
});
</script>
