<template>
  <div
    class="bg-oneA space-y-4 rounded-t-lg md:rounded-t-none w-full h-full z-10 relative flex flex-col justify-center items-center"
    :class="locale === 'ar' ? ' md:rounded-r-[20px]' : ' md:rounded-l-[20px]'"
  >
    <h1 class="capitalize text-d36 font-semibold text-2xl text-center">
      {{ $t("writeResetCode") }}
    </h1>
    <p class="text-bf font-semibold text-xs text-center">
      {{ $t("otpSentMessage") }}
    </p>
    <VeeForm
      v-slot="{ isSubmitting }"
      @submit="submit"
      class="w-full containerClass"
    >
      <div
        class="flex items-center justify-center gap-2 md:gap-4"
        v-auto-animate
      >
        <VeeField
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-for="num in 6"
          :key="num"
          type="text"
          :name="`number${num}`"
          id="number"
          v-model.number="otp[num - 1]"
          rules="numeric|required|min:1|max:1"
          maxlength="1"
          inputmode="numeric"
          class="outline-none aspect-[1.25] w-[calc(100%/7)] sm:w-[12%] lg:w-[8%] xl:w-[70px] text-center font-semibold bg-ea border-five9 rounded"
          @input="handleInput($event, num)"
        />
      </div>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full mt-8 transition duration-300 hover:bg-white hover:shadow-lg hover:text-color14 border border-transparent hover:border-five9 px-4 py-3 bg-d36 text-white capitalize rounded-lg"
      >
        {{ $t("continue") }}
      </button>
      <button
        type="button"
        :disabled="isSubmitting"
        @click="resend"
        class="w-full border border-five9 hover:bg-d36 hover:text-color14 transition-all duration-300 hover:shadow hover:shadow-d36 hover:border-transparent mt-8 px-4 py-3 bg-transparent text-white capitalize rounded-lg"
      >
        {{ $t("resend") }}
      </button>
    </VeeForm>
    <PublicLoading :loading="loading" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const localePath = useLocalePath();
const { locale, t } = useI18n();
const router = useRouter();
const toast = useToast();
// Reactive OTP array
const otp = ref(Array(6).fill(""));

// Handles input constraints
const handleInput = (event, index) => {
  const value = event.target.value;
  if (!/^\d$/.test(value)) {
    otp.value[index - 1] = ""; // Clear invalid input
    return;
  }
  otp.value[index - 1] = value;

  // Move to the next input automatically
  const nextSibling = event.target.nextElementSibling;
  if (nextSibling) {
    nextSibling.focus();
  }
};

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

const submit = async (values) => {
  try {
    loading.value = true;

    const response = await $fetch(`${url}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: otp.value.join(""),
        email: useCookie("email").value,
        token: useCookie("optToken").value,
      }),
    });

    toast.add({
      title: response.message,
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
    router.replace(localePath("/newpassword"));

    // Handle navigation or token storage here if necessary
    useCookie("optToken").value = response.data.token;
  } catch (error) {
    // Use the error handler to process backend errors
    handleBackendErrors(error.data || { message: error.message });
  } finally {
    loading.value = false;
  }
};
const resend = async (values) => {
  try {
    loading.value = true;

    const response = await $fetch(`${url}/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // otp: otp.value.join(""),
        email: useCookie("email").value,
        token: useCookie("optToken").value,
      }),
    });

    toast.add({
      title: response.message,
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
    // router.replace(localePath("/newpassword"));

    // Handle navigation or token storage here if necessary
    useCookie("optToken").value = response.data.token;
  } catch (error) {
    // Use the error handler to process backend errors
    handleBackendErrors(error.data || { message: error.message });
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  layout: "login-layout",
  middleware: ["otp"],
});
// defineRouteRules({
//   prerender: true,
// });

const route = useRoute();

useSeoMeta({
  title: t(`OTPSeo.title`),
  description: `OTPSeo.description`,
  ogTitle: t(`OTPSeo.title`),
  ogDescription: `OTPSeo.description`,
  ogUrl: `https://www.ysk-comics.com${route.fullPath}`,
  ogImage: `https://www.ysk-comics.com/logo.png`,
  ogImageAlt: t(`OTPSeo.title`),
  robots: "index, follow",
  ogType: "comics",
  ogImageType: "image/png",
  ogSiteName: "YSK Comics",
  ogLocale: locale.value,
  ogLocaleAlternate: "en",
  twitterTitle: t(`OTPSeo.title`),
  twitterDescription: `OTPSeo.description`,
  twitterImage: `https://www.ysk-comics.com/logo.png`,
  twitterSite: "@YSK_Comics",
  twitterCreator: `@YSK_Comics`,
  twitterCard: "summary_large_image",
});
</script>
