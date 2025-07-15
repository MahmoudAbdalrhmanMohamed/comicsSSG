<template>
  <section class="py-32 containerClass space-y-4">
    <p
      class="text-center text-white font-bold text-2xl md:text-3xl lg:text-4xl"
    >
      {{ $t("uploadComic.title") }}
    </p>
    <p class="text-ea text-base font-medium text-center">
      {{ $t("uploadComic.subtitle") }}
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
        <!-- Series Name Input with Search -->
        <div
          data-aos="zoom-out-right"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
          class="z-10 relative"
        >
          <label for="seriesName" class="text-white font-medium text-base mb-1">
            {{ $t("uploadComic.seriesName") }}
          </label>
          <div class="relative z-10">
            <VeeField
              v-model="seriesName"
              @input="searchComics"
              class="w-full bg-f9 rounded p-4 text-seven4 text-xs outline-none font-semibold"
              rules="required|min:3|max:100"
              type="text"
              name="seriesName"
              :placeholder="$t('uploadComic.seriesNamePlaceholder')"
              id="seriesName"
            />
            <div
              v-if="searchResults.length > 0 && show"
              ref="ouside"
              class="absolute overflow-y-auto z-10 top-full w-full left-0 max-h-[20vh] bg-white rounded-md"
            >
              <div
                class="px-4 cursor-pointer py-2 hover:bg-gray-400 transition-all duration-300"
                v-for="item in searchResults"
                @click="
                  selectedComic = item;
                  seriesName = item.full_name;
                  show = false;
                "
              >
                {{ item.full_name }}
              </div>
            </div>
          </div>
          <VeeErrorMessage
            name="seriesName"
            class="text-red-500 font-medium text-sm"
          />
          <!-- Search Results Dropdown -->
          <!-- <USelectMenu
            v-if="searchResults.length > 0"
            v-model="selectedComic"
            :options="searchResults"
            option-attribute="full_name"
            size="xl"
            searchable
            :placeholder="$t('uploadComic.selectComic')"
            class="mt-2"
          /> -->
        </div>

        <!-- tranlated name -->
        <div
          data-aos="zoom-out-left"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
        >
          <label
            for="tranlatedLangComicName"
            class="text-white font-medium text-base mb-1"
          >
            {{ $t("uploadComic.tranlatedLangComicName") }}
          </label>
          <VeeField
            v-model="name"
            class="w-full bg-f9 rounded p-4 text-seven4 text-xs outline-none font-semibold"
            rules="required|min:3|max:100"
            type="text"
            name="tranlatedLangComicName"
            :placeholder="$t('uploadComic.tranlatedLangComicNamePlaceholder')"
            id="tranlatedLangComicName"
          />
          <VeeErrorMessage
            name="tranlatedLangComicName"
            class="text-red-500 font-medium text-sm"
          />
        </div>

        <!-- Comic Cover Upload -->
        <div
          data-aos="zoom-in-right"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
        >
          <label class="text-bf font-medium text-base">
            {{ $t("uploadComic.comicCover") }}
          </label>
          <label
            class="bg-f9 rounded-lg w-full border border-dashed border-spacing-12 border-zero3 h-[100px] cursor-pointer flex items-center justify-center flex-col"
            for="photo"
          >
            <svg
              v-if="!img"
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-zero3 md:w-6 md:h-24 -mt-8"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11 14.825V18q0 .425.288.713T12 19t.713-.288T13 18v-3.175l.9.9q.15.15.338.225t.375.063t.362-.088t.325-.225q.275-.3.288-.7t-.288-.7l-2.6-2.6q-.15-.15-.325-.212T12 11.425t-.375.063t-.325.212l-2.6 2.6q-.3.3-.287.7t.312.7q.3.275.7.288t.7-.288zM6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V20q0 .825-.587 1.413T18 22zm7-14V4H6v16h12V9h-4q-.425 0-.712-.288T13 8M6 4v5zv16z"
              />
            </svg>
            <p class="font-medium text-fourB -mt-8 text-xs" v-if="!img">
              {{ $t("uploadComic.uploadPhotoPlaceholder") }}
            </p>
            <div v-if="img" class="relative">
              <NuxtImg
                :src="img"
                placeholder
                loading="lazy"
                alt="img"
                class="h-[90px] w-[90px] rounded-xl"
              />
              <svg
                @click="
                  img = '';
                  form.file = null;
                "
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 absolute rounded-full right-1 top-1 bg-red-500 text-white"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z"
                />
              </svg>
            </div>
          </label>

          <VeeField
            :placeholder="$t('uploadComic.uploadPhotoPlaceholder')"
            id="photo"
            @change="changeImg"
            v-model="form.file"
            name="photo"
            type="file"
            rules="required|image"
            class="hidden"
            accept="image/*"
          />
          <VeeErrorMessage
            name="photo"
            class="text-red-500 font-medium text-sm"
          />
        </div>

        <!-- Comic Description -->
        <div
          data-aos="zoom-in-left"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
        >
          <label
            for="description"
            class="text-white outline-none font-medium text-base mb-1"
          >
            {{ $t("uploadComic.comicDescription") }}
          </label>
          <VeeField
            as="textarea"
            class="w-full h-20 md:h-24 resize-none lg:h-28 bg-f9 rounded p-4 text-seven4 outline-none text-xs font-semibold"
            rules="min:20|max:300"
            type="text"
            name="description"
            :placeholder="$t('uploadComic.comicDescriptionPlaceholder')"
            id="description"
          />
          <VeeErrorMessage
            name="description"
            class="text-red-500 font-medium text-sm"
          />
        </div>

        <!-- Translation Language -->
        <div
          data-aos="zoom-out"
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
              v-model="form.selectedLanguage"
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

        <!-- Submit Button -->
        <button
          type="submit"
          class="bg-d36 py-3 transition-all duration-500 hover:text-white hover:bg-transparnet border border-d36 hover:border-white w-full rounded-lg text-white font-semibold text-base"
          :disabled="isSubmitting"
        >
          {{ $t("uploadComic.uploadButton") }}
        </button>
      </VeeForm>
    </div>
    <PublicLoading :loading="loading" />
  </section>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: ["auth-type"],
});
// defineRouteRules({
//   prerender: true,
// });

const { t } = useI18n();
const localePath = useLocalePath();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const toast = useToast();
const loading = ref(false);
const show = ref(false);
const ouside = ref();

onClickOutside(ouside, () => {
  show.value = false;
});
// Reactive state
const seriesName = ref("");
const name = ref("");
const searchResults = ref([]);
const selectedComic = ref(null); // Ensure this is reactive
const img = ref("");
const form = reactive({
  file: null,
  selectedLanguage: null,
});
const store = useThinkStore();

store.setData(t("thinkComic"), t("thinkDesComic"));

// Language options
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

// Search comics after 3 characters
const searchComics = async () => {
  if (seriesName.value.length >= 3) {
    try {
      const response = await $fetch(
        `${url}/search-comics-orginal?name=${seriesName.value}`,
        {
          headers: {
            Authorization: `Bearer ${useCookie("authToken").value}`,
          },
        }
      );

      searchResults.value = response.data;
      show.value = true;
    } catch (error) {
      toast.add({
        title: "Failed to search comics.",
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
    }
  } else {
    searchResults.value = [];
  }
};

// Handle image upload
const changeImg = (event) => {
  const file = event.target.files[0];
  if (file) {
    img.value = URL.createObjectURL(file);
    form.file = file;
  }
};

// Submit form
const submit = async () => {
  if (!selectedComic.value) {
    toast.add({
      title: "Please select a comic.",
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
    return;
  }

  loading.value = true;
  const formData = new FormData();
  formData.append("comic_id", selectedComic.value.id);
  formData.append("description", form.description);
  formData.append("image_file", form.file);
  const languageCode = languageCodeMap[form.selectedLanguage];

  formData.append("language_code", languageCode);
  formData.append("name", name.value);
  console.log(languageCode);

  try {
    const response = await $fetch(`${url}/translator-comic-request`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${useCookie("authToken").value}`,
      },
    });

    loading.value = false;

    toast.add({
      title: response.message || "Upload successful!",
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });

    await navigateTo(localePath("/think"));
  } catch (error) {
    loading.value = false;

    toast.add({
      title: error.data?.message || "Failed to upload comic.",
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
  }
};
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
</script>
