<template>
  <section class="py-32 containerClass space-y-4">
    <p
      class="text-center text-white font-bold text-2xl md:text-3xl text-balance lg:text-4xl"
    >
      {{ $t("askHead") }}
    </p>
    <p class="text-ea text-base font-medium text-center">
      {{ $t("askDes") }}
    </p>
    <div
      class="w-full bg-color14 rounded shadow py-4 md:py-6 lg:py-8 px-4 md:px-8 lg:px-12"
    >
      <p class="text-d36 text-xl md:text-2xl font-semibold">
        {{ $t("uploadComic.detailsTitle") }}
      </p>
      <svg
        class="h-[1px] w-full mt-4 mb-8"
        viewBox="0 0 1040 1"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="0.5" x2="1040.01" y2="0.5" stroke="#303030" />
      </svg>

      <VeeForm
        v-slot="{ isSubmitting }"
        class="w-full space-y-8"
        @submit="submit"
      >
        <div
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          class="grid md:grid-cols-12 gap-8"
        >
          <div v-auto-animate class="md:col-span-8 xl:col-span-10">
            <label
              for="name"
              class="text-white outline-none font-medium text-base mb-1"
            >
              {{ $t("uploadChapter.seriesName") }}
            </label>
            <VeeField
              class="w-full bg-f9 rounded p-4 text-seven4 outline-none text-xs font-semibold"
              rules="min:5|max:50|required"
              type="text"
              name="name"
              :placeholder="$t('uploadChapter.seriesNamePlaceholder')"
              id="name"
            />
            <VeeErrorMessage
              name="name"
              class="text-red-500 font-medium text-sm"
            />
          </div>
          <div v-auto-animate class="md:col-span-4 xl:col-span-2">
            <label
              for="number"
              class="text-white outline-none font-medium text-base mb-1"
            >
              {{ $t("uploadChapter.chapterNumber") }}
            </label>
            <VeeField
              class="w-full bg-f9 rounded p-4 text-seven4 outline-none text-xs font-semibold"
              rules="numeric|min:1|max:4"
              type="text"
              name="number"
              :placeholder="$t('uploadChapter.chapterNumberPlaceholder')"
              id="number"
            />
            <VeeErrorMessage
              name="number"
              class="text-red-500 font-medium text-sm"
            />
          </div>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
          class="md:col-span-8 xl:col-span-10"
        >
          <label
            for="lang"
            class="text-white outline-none font-medium text-base mb-1"
          >
            {{ $t("uploadComic.translationLanguage") }}
          </label>
          <VeeField v-slot="{ field }" rules="required" name="lang" id="lang">
            <USelectMenu
              v-bind="field"
              size="xl"
              :popper="{ placement: 'bottom' }"
              v-model="form.selected"
              :options="spokenLanguages"
              searchable
              :placeholder="$t('uploadComic.selectTranslationLanguage')"
            />
          </VeeField>
          <VeeErrorMessage
            name="lang"
            class="text-red-500 font-medium text-sm"
          />
        </div>
        <button
          type="submit"
          class="bg-d36 py-3 transition-all duration-500 hover:text-color14 hover:bg-white w-full rounded-lg text-white font-semibold text-base"
          :disabled="isSubmitting"
        >
          {{ $t("askNow") }}
        </button>
      </VeeForm>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const { t } = useI18n();
const localePath = useLocalePath();
const toast = useToast();
const store = useThinkStore();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const { locale } = useI18n();
store.setData(t("askThink"), t("askThinkDes"));

const handleBackendErrors = (response) => {
  if (response?.errors) {
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
  } else if (response?.message) {
    toast.add({
      title: response.message,
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
  } else {
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
    if (useCookie("authToken").value) {
      const { data: dataVal, error } = await useLazyFetch(
        `${url}/ask-chapter`,
        {
          method: "POST",
          server: false,
          headers: {
            "X-Localization": locale.value,
            "Content-Type": "application/json",
            Authorization: `Bearer ${useCookie("authToken").value}`,
          },
          body: JSON.stringify({
            name: values.name,
            rank: values.number,
            language_code: values.lang,
          }),
        }
      );

      if (dataVal.value?.status) {
        // console.log("togglinged");
        // fliter chapters.value and toggle item.saved
        await navigateTo(localePath("/think"));

        toast.add({
          title: dataVal.value.message || "Saved successful!",
          type: "success",
          icon: "i-heroicons-check-badge",
          color: "green",
        });
      } else {
        handleBackendErrors(error.value.data);
      }
    } else {
      toast.add({
        title: t("loginFirst"),
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
      await navigateTo({
        path: localePath("/login"),
      });
    }
  } catch (error) {
    handleBackendErrors(error?.data || { message: error?.message });
  }
};

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

const form = reactive({
  file: null,
  pdf: null,
  selected: null,
});
const changeImg = (event) => {
  const file = event.target.files[0];
  if (file) {
    img.value = URL.createObjectURL(file);
  }
};
const pdf = ref();
const img = ref();
const changePdf = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log(file);
    pdf.value = file;
  }
};
// defineRouteRules({
//   prerender: true,
// });
</script>
