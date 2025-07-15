<template>
  <div class="pt-24 containerClass">
    <p class="text-d36 font-semibold text-center text-2xl">
      {{ $t("translator.joinTeam") }}
    </p>
    <p class="text-ea text-base pt-4 pb-12 font-medium text-center">
      {{ $t("translator.helpBringStories") }}
      <br class="hidden md:block" />
      {{ $t("translator.fillForm") }}
    </p>
    <div class="bg-color14 mb-8 rounded py-6 lg:py-24 px-8 lg:px-[120px]">
      <VeeForm @submit="submit" v-slot="{ isSubmitting }" class="space-y-8">
        <div
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
          class="space-y-2"
        >
          <label for="des" class="text-white text-base">
            {{ $t("translator.descriptionLabel") }}
          </label>
          <VeeField
            class="outline-none border border-five9 block resize-none w-full text-seven4 font-semibold text-sm bg-f9 py-3 px-4 rounded"
            rules="required|min:50|max:300"
            type="text"
            as="textarea"
            :rows="4"
            id="des"
            name="des"
            :placeholder="$t('translator.des')"
          />
          <VeeErrorMessage
            name="des"
            class="text-red-500 block font-medium text-base"
          />
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
          class="space-y-2"
        >
          <label for="lang" class="text-white text-base">
            {{ $t("translator.languageLabel") }}
          </label>
          <VeeField rules="required" id="lang" v-slot="{ field }" name="lang">
            <USelectMenu
              v-bind="field"
              class="w-full bg-f9 rounded border border-five9 text-sm text-seven4 font-semibold"
              searchable
              :placeholder="$t('translator.selectLanguage')"
              :popper="{ placement: 'bottom' }"
              size="xl"
              :ui-menu="{
                background: 'bg-f9 dark:bg-f9',
                option: {
                  color: '#595959',
                  active: 'bg-gray-300 dark:bg-gray-300',
                },
                arrow: {
                  background: 'before:bg-black dark:before:bg-black',
                },
                selectedIcon: {
                  base: 'text-black dark:text-black',
                },
                input:
                  'block w-[calc(100%+0.5rem)] focus:ring-transparent text-sm px-3 py-1.5 text-gray-700 dark:text-gray-200 bg-gray-300 dark:bg-gray-300 border-0 border-b border-transparent dark:border-transparent sticky -top-1 -mt-1 mb-1 -mx-1 z-10 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none',
              }"
              v-model="selected"
              :options="spokenLanguages"
            />
          </VeeField>
          <VeeErrorMessage
            name="lang"
            class="text-red-500 font-medium text-base"
          />
        </div>
        <button
          :disabled="isSubmitting"
          class="bg-d36 w-full rounded-lg py-3 font-semibold text-white"
        >
          {{ $t("translator.apply") }}
        </button>
      </VeeForm>
    </div>
    <PublicLoading :loading="loading" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "auth",
});
// defineRouteRules({
//   prerender: true,
// });
const loading = ref(false);

const { t } = useI18n();

const selected = ref(null); // Single selection, so use `null` instead of an array
const localePath = useLocalePath();

const store = useThinkStore();
store.setData(t("think"), t("thinkDes"));

const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const toast = useToast();

// Language code mapping based on the current locale
const languageCodeMap = {
  [t("english")]: "en",
  [t("arabic")]: "ar",
  [t("chinese")]: "zh",
  [t("hindi")]: "hi",
  [t("italian")]: "it",
  [t("spanish")]: "es",
  [t("russian")]: "ru",
  [t("turkish")]: "tr",
  [t("french")]: "fr",
  [t("german")]: "de",
};

// Localized language options
const spokenLanguages = [
  t("english"), // en
  t("arabic"), // ar
  t("chinese"), // zh
  t("hindi"), // hi
  t("italian"), // it
  t("spanish"), // es
  t("russian"), // ru
  t("turkish"), // tr
  t("french"), // fr
  t("german"), // de
];

const submit = async (values) => {
  try {
    loading.value = true;

    // Map the selected language to its code
    const languageCode = languageCodeMap[selected.value];

    console.log(`${url}/translator-request`, useCookie("authToken").value);

    const response = await $fetch(`${url}/translator-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useCookie("authToken").value}`,
      },
      body: JSON.stringify({
        language_code: languageCode, // Send a single language code
        description: values.des,
      }),
    });

    toast.add({
      title: response.message || "Send successful!",
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });

    await navigateTo(localePath("/think"));
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  } finally {
    loading.value = false;
  }
};

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
</script>
