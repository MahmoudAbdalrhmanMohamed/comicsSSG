<template>
  <div v-if="dataing" class="space-y-4 md:space-y-8">
    <PublicLoading :loading="loading" />

    <!-- Personal Information Section -->
    <div class="bg-oneA px-8 py-11 h-fit rounded w-full">
      <div
        data-aos="fade-left"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        class="flex justify-between items-center"
      >
        <p class="text-white font-semibold capitalize text-2xl">
          {{ $t("accountPage2.personalInfo") }}
        </p>
        <p
          @click="show = true"
          class="capitalize transition-all duration-300 hover:opacity-70 cursor-pointer font-semibold text-base text-d36"
        >
          {{ $t("common.edit") }}
        </p>
      </div>
      <svg
        class="w-full my-4 h-[1px] bg-five9"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="0" x2="300" y2="200" />
      </svg>
      <div class="flex gap-4 md:gap-8 lg:gap-12 xl:gap-16 flex-col md:flex-row">
        <NuxtImg
          v-if="!test"
          :src="dataing?.image"
          :placeholder="[155, 155, 5, 5]"
          class="w-[155px] h-[155px] rounded-full mx-auto md:mx-0 object-cover"
          :alt="$t('alt.avatar')"
          loading="lazy"
        />
        <div v-else class="flex flex-col gap-2 items-center text-center">
          <NuxtImg
            :src="dataing?.image || '/avatr.webp'"
            :placeholder="[155, 155, 5, 5]"
            class="w-[155px] h-[155px] rounded-full object-cover"
            :alt="$t('alt.avatar')"
            loading="lazy"
          />
          <p class="text-d36 font-medium text-base">
            {{ dataing.translator.level }}
          </p>
          <p class="text-ea font-medium text-lg">
            {{
              $t("accountPage2.followers", {
                count: dataing.translator.num_followers,
              })
            }}
          </p>
        </div>
        <div class="flex md:flex-row flex-col gap-4 lg:gap-6 xl:gap-8">
          <svg
            class="w-[80%] h-[1px] md:w-[1px] md:h-[80%] bg-five9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="10" y1="10" x2="190" y2="190" />
          </svg>
          <div class="grid gap-8 xl:gap-16 md:grid-cols-2">
            <div class="space-y-8">
              <div class="space-y-2">
                <p class="text-bf font-medium text-base capitalize">
                  {{ $t("accountPage2.fullName") }}
                </p>
                <p class="text-white font-medium text-lg capitalize">
                  {{ dataing?.username }}
                </p>
              </div>
              <div class="space-y-2">
                <p class="text-bf font-medium text-base capitalize">
                  {{ $t("accountPage2.type") }}
                </p>
                <p class="text-white font-medium text-lg capitalize">
                  {{ dataing?.gender }}
                </p>
              </div>
              <div class="space-y-2">
                <p class="text-bf font-medium text-base capitalize">
                  {{ $t("accountPage2.dateOfBirth") }}
                </p>
                <p class="text-white font-medium text-lg capitalize">
                  {{ dataing?.birthday }}
                </p>
              </div>
            </div>
            <div class="space-y-8">
              <div class="space-y-2">
                <p class="text-bf font-medium text-base capitalize">
                  {{ $t("accountPage2.email") }}
                </p>
                <p class="text-white break-all text-wrap font-medium text-lg">
                  {{ dataing?.email }}
                </p>
              </div>
              <div class="space-y-2">
                <p class="text-bf font-medium text-base capitalize">
                  {{ $t("accountPage2.nationality") }}
                </p>
                <p class="text-white font-medium text-lg capitalize">
                  {{ dataing?.nationalty }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <teleport to="#teleports">
        <transition name="show">
          <div
            v-if="show"
            class="absolute mt-28 w-[90vw] md:w-[80%] bg-oneA rounded px-6 py-8 z-[500] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <VeeForm v-slot="{ isSubmitting }" @submit="submitPersonalInfo">
              <div
                class="flex justify-between items-center md:flex-row flex-col md:gap-0 gap-4"
              >
                <p class="font-semibold text-2xl capitalize text-white">
                  {{ $t("accountPage2.personalInfo") }}
                </p>
                <div class="flex items-center gap-2">
                  <button
                    @click="show = false"
                    type="button"
                    class="border capitalize transition-all duration-300 hover:bg-d36 hover:border-d36 hover:text-color14 text-white border-white rounded-lg px-4 md:px-8 py-2 md:py-4"
                  >
                    {{ $t("accountPage2.cancel") }}
                  </button>
                  <button
                    :disabled="isSubmitting"
                    type="submit"
                    class="border capitalize transition-all bg-white duration-300 hover:border-d36 text-color14 hover:bg-d36 border-white rounded-lg px-4 md:px-8 py-2 md:py-4"
                  >
                    {{ $t("accountPage2.save") }}
                  </button>
                </div>
              </div>
              <svg
                class="w-full my-4 h-[1px] bg-seven4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="0" y1="0" x2="300" y2="200" />
              </svg>

              <div class="relative w-fit">
                <NuxtImg
                  :src="img || dataing?.image"
                  :placeholder="[155, 155, 5, 5]"
                  class="w-[155px] h-[155px] rounded-full object-cover"
                  :alt="$t('alt.avatar')"
                  loading="lazy"
                />
                <label
                  class="cursor-pointer rounded-full grid place-items-center absolute right-0 bottom-4 bg-d36 w-[38px] h-[38px]"
                  for="file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    class="text-white"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                    />
                  </svg>
                </label>
                <input
                  accept=".jpg, .jpeg, .png"
                  type="file"
                  @change="changeImg"
                  id="file"
                  class="hidden absolute"
                />
              </div>

              <div class="space-y-4">
                <div class="space-y-1 grid" v-auto-animate>
                  <label for="name" class="text-bf font-medium text-base">
                    {{ $t("accountPage2.fullName") }}
                  </label>
                  <VeeField
                    v-model="formDataing.name"
                    rules="required|alphaSpaces|min:3|max:50"
                    type="text"
                    :placeholder="$t('accountPage2.fullName')"
                    name="name"
                    class="outline-none border border-five9 px-4 py-3 text-base font-medium text-oneA rounded bg-ea"
                    id="name"
                  />
                  <VeeErrorMessage
                    name="name"
                    class="text-red-500 font-medium text-sm md:text-base"
                  />
                </div>

                <div v-auto-animate class="space-y-2">
                  <label for="gender" class="text-bf font-medium text-base">
                    {{ $t("signUpV2.gender") }}
                  </label>
                  <USelectMenu
                    class="w-full bg-ea rounded border border-five9 text-sm text-seven4 font-semibold"
                    searchable
                    :placeholder="$t('signUpV2.selectGender')"
                    :popper="{ placement: 'bottom' }"
                    :ui="{ color: { white: 'bg-ea' } }"
                    size="xl"
                    v-model="formDataing.gender"
                    :options="genders"
                  />
                  <VeeField
                    rules="required"
                    id="gender"
                    v-model="formDataing.gender"
                    class="hidden"
                    name="gender"
                  >
                  </VeeField>
                  <VeeErrorMessage
                    name="gender"
                    class="text-red-500 font-medium text-base"
                  />
                </div>

                <div class="space-y-2" v-auto-animate>
                  <label for="date" class="text-bf font-medium text-base">
                    {{ $t("signUpV2.dateOfBirth") }}
                  </label>

                  <PublicDatePickerContanierV2
                    :dateing="selectedDateVal2"
                    @newDate="selectedDate"
                  />
                  <VeeField
                    name="selectedDate"
                    rules="required"
                    v-model="selectedDateVal2"
                    class="hidden"
                  />
                  <VeeErrorMessage
                    name="selectedDate"
                    class="text-red-500 font-medium text-sm"
                  />
                </div>

                <div v-auto-animate class="space-y-2">
                  <label for="lang" class="text-bf font-medium text-base">
                    {{ $t("signUpV2.nationality") }}
                  </label>
                  <USelectMenu
                    v-bind="field"
                    class="w-full bg-ea rounded border border-five9 text-sm text-seven4 font-semibold"
                    searchable
                    :placeholder="$t('signUpV2.selectNationality')"
                    :popper="{ placement: 'bottom' }"
                    size="xl"
                    :ui="{ color: { white: 'bg-ea' } }"
                    v-model="formDataing.na"
                    :options="Nationality"
                  />
                  <VeeField
                    rules="required"
                    id="lang"
                    v-model="formDataing.na"
                    class="hidden"
                    name="lang"
                  >
                  </VeeField>
                  <VeeErrorMessage
                    name="lang"
                    class="text-red-500 font-medium text-base"
                  />
                </div>
              </div>
            </VeeForm>
          </div>
        </transition>
        <transition name="show">
          <div
            v-if="show"
            @click="show = false"
            class="fixed z-[499] left-0 top-0 cursor-pointer w-screen h-screen bg-black/20 backdrop-blur-xl"
          ></div>
        </transition>
      </teleport>
    </div>

    <!-- Rating Section -->
    <div
      v-if="dataing.role === 'translator'"
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-easing="ease-out-cubic"
      class="bg-oneA rounded px-4 lg:px-6 xl:px-8 py-6 lg:py-8 xl:py-10"
    >
      <p class="capitalize text-white font-semibold text-2xl">
        {{ $t("accountPage2.rating") }}
      </p>
      <svg
        class="w-full my-4 h-[1px] bg-five9"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="0" x2="300" y2="200" />
      </svg>

      <div class="flex gap-4 lg:gap-8 sm:flex-row flex-col items-center">
        <div class="flex items-center gap-2">
          <p class="text-ea font-medium text-base">
            {{ $t("accountPage2.translationQuality") }}:
          </p>
          <PublicStarsWithoutText
            :value="Number(dataing.rate_translation) || 0"
          />
        </div>
        <div class="flex items-center gap-2">
          <p class="text-ea font-medium text-base">
            {{ $t("accountPage2.imageClarity") }}:
          </p>
          <PublicStarsWithoutText :value="Number(dataing.rate_clarity) || 0" />
        </div>
      </div>
    </div>

    <!-- Description Section -->
    <div
      v-if="dataing.role === 'translator'"
      data-aos="zoom-in"
      data-aos-duration="500"
      data-aos-easing="ease-out-cubic"
      class="bg-oneA rounded px-4 lg:px-6 xl:px-8 py-6 lg:py-8 xl:py-10"
    >
      <div class="flex justify-between items-center">
        <p class="capitalize text-white font-semibold text-2xl">
          {{ $t("accountPage2.description") }}
        </p>
        <p
          @click="showDes = true"
          class="capitalize transition-all duration-300 hover:opacity-70 cursor-pointer font-semibold text-base text-d36"
        >
          {{ $t("common.edit") }}
        </p>
      </div>
      <svg
        class="w-full my-4 h-[1px] bg-five9"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="0" x2="300" y2="200" />
      </svg>
      <teleport to="#teleports">
        <transition name="show">
          <div
            v-if="showDes"
            class="fixed md:mt-28 w-[90vw] md:w-[80%] bg-oneA rounded px-6 py-8 z-[500] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <VeeForm v-slot="{ isSubmitting }" @submit="submitDescription">
              <div
                class="flex justify-between items-center md:flex-row flex-col md:gap-0 gap-4"
              >
                <p class="font-semibold text-2xl capitalize text-white">
                  {{ $t("accountPage2.description") }}
                </p>
                <div class="flex items-center gap-2">
                  <button
                    @click="showDes = false"
                    type="button"
                    class="border capitalize transition-all duration-300 hover:bg-d36 hover:border-d36 hover:text-color14 text-white border-white rounded-lg px-4 md:px-8 py-2 md:py-4"
                  >
                    {{ $t("accountPage2.cancel") }}
                  </button>
                  <button
                    :disabled="isSubmitting"
                    type="submit"
                    class="border capitalize transition-all bg-white duration-300 hover:border-d36 text-color14 hover:bg-d36 border-white rounded-lg px-4 md:px-8 py-2 md:py-4"
                  >
                    {{ $t("accountPage2.save") }}
                  </button>
                </div>
              </div>
              <svg
                class="w-full my-4 h-[1px] bg-seven4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="0" y1="0" x2="300" y2="200" />
              </svg>

              <div class="space-y-4">
                <div class="space-y-1 grid" v-auto-animate>
                  <label
                    for="Description"
                    class="text-bf font-medium text-base"
                  >
                    {{ $t("accountPage2.description") }}
                  </label>
                  <VeeField
                    v-model="formDataing.description"
                    rules="required|min:3|max:500"
                    type="text"
                    as="textarea"
                    :placeholder="$t('accountPage2.description')"
                    name="Description"
                    class="outline-none h-40 md:h-20 border border-five9 px-4 py-3 text-base font-medium text-oneA rounded bg-ea"
                    id="Description"
                  />
                  <VeeErrorMessage
                    name="Description"
                    class="text-red-500 font-medium text-sm md:text-base"
                  />
                </div>
              </div>
            </VeeForm>
          </div>
        </transition>
        <transition name="show">
          <div
            v-if="showDes"
            @click="showDes = false"
            class="fixed z-[499] left-0 top-0 cursor-pointer w-screen h-screen bg-black/20 backdrop-blur-xl"
          ></div>
        </transition>
      </teleport>
      <p class="font-medium text-lg text-ea break-all text-wrap">
        {{ dataing.translator.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { format } from "date-fns";

const { t } = useI18n();

const formDataing = ref({
  name: "",
  gender: null,
  na: null,
  description: "",
});

const config = useRuntimeConfig();
const url = config.public.ConstUrl;

const dropdownOpen = ref(false);
const show = ref(false);
const showDes = ref(false);
const selectedDateVal = ref(null);
const selectedDateVal2 = ref(null);
const img = ref(null);
const imgtosend = ref(null);
const test = ref(useCookie("type").value !== "user");
const dataing = ref(null); // Initialize as null
const loading = ref(true); // Add a loading state

const toast = useToast();

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

const nuxtApp = useNuxtApp();

// Fetch user data and initialize formDataing
try {
  const { data } = await useFetch(`${url}/info-user`, {
    headers: {
      Authorization: `Bearer ${useCookie("authToken").value}`,
    },
    getCachedData: (key) => {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });

  // Initialize formDataing with fetched data
  dataing.value = data.value.data; // Set dataing to the fetched data
  formDataing.value.name = dataing.value.username || ""; // Set username as full name
  formDataing.value.gender = dataing.value.gender || null; // Set gender
  formDataing.value.na = dataing.value.nationalty || null; // Set nationality
  formDataing.value.description = dataing.value.translator?.description || ""; // Set description
  formDataing.value.birthday = dataing.value.birthday || ""; // Set description
  useCookie("type").value = data.value.data.role;

  // Set birthday
  const birthdayDate = new Date(dataing.value.birthday);
  selectedDateVal2.value = birthdayDate;
  selectedDateVal.value = {
    display: format(birthdayDate, "dd,MM,yyyy"),
    backend: format(birthdayDate, "yyyy-MM-dd"),
  };
} catch (error) {
  handleBackendErrors(error.data || { message: error.message });
} finally {
  loading.value = false; // Set loading to false after fetch completes
}

const selectedDate = (val) => {
  const date = new Date(val);
  selectedDateVal2.value = date;
  selectedDateVal.value = {
    display: format(date, "dd,MM,yyyy"),
    backend: format(date, "yyyy-MM-dd"),
  };
};

const changeImg = (event) => {
  const file = event.target.files[0];
  imgtosend.value = file;
  if (file) {
    img.value = URL.createObjectURL(file);
  }
};

const updatePersonalInfo = async () => {
  const formData = new FormData();
  formData.append("username", formDataing.value.name);
  formData.append("gender", formDataing.value.gender.toLowerCase()); // Ensure gender is lowercase
  formData.append("birthday", selectedDateVal.value.backend);
  formData.append("nationalty", formDataing.value.na);

  if (img.value) {
    formData.append("image", imgtosend.value);
  }

  try {
    loading.value = true;
    const response = await $fetch(`${url}/user/info-update?_method=PUT`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${useCookie("authToken").value}`,
      },
    });

    // Success handling
    toast.add({
      title: "Personal information updated successfully!",
      type: "success",
      icon: "i-icon-park-outline-check",
      color: "green",
    });
    useCookie("type").value = URL.createObjectURL(imgtosend.value);
    console.log("Personal info updated successfully:", response);
  } catch (error) {
    // Error handling
    handleBackendErrors(error.data || { message: error.message });
    console.error("Failed to update personal info:", error);
  } finally {
    loading.value = false;
  }
};

const updateDescription = async () => {
  try {
    loading.value = true;
    const response = await $fetch(`${url}/translator/info-update`, {
      method: "PUT",
      body: JSON.stringify({
        description: formDataing.value.description,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useCookie("authToken").value}`,
      },
    });

    // Success handling
    toast.add({
      title: "Description updated successfully!",
      type: "success",
      icon: "i-icon-park-outline-check",
      color: "green",
    });
    console.log("Description updated successfully:", response);
  } catch (error) {
    // Error handling
    handleBackendErrors(error.data || { message: error.message });
    console.error("Failed to update description:", error);
  } finally {
    loading.value = false;
  }
};

const submitPersonalInfo = async () => {
  try {
    await updatePersonalInfo();
    show.value = false;
  } catch (error) {
    console.error("Error during submission:", error);
  }
};

const submitDescription = async () => {
  try {
    await updateDescription();
    showDes.value = false;
  } catch (error) {
    console.error("Error during submission:", error);
  }
};

const genders = ["male", "female"];
const Nationality = [
  t("American"),
  t("British"),
  t("Canadian"),
  t("Australian"),
  t("New Zealander"),
  t("Irish"),
  t("South African"),
  t("Jamaican"),
  t("Indian"),
  t("Filipino"),
  t("Singaporean"),
  t("Nigerian"),
  t("Kenyan"),
  t("Saudi"),
  t("Egyptian"),
  t("Moroccan"),
  t("Algerian"),
  t("Tunisian"),
  t("Emirati"),
  t("Jordanian"),
  t("Iraqi"),
  t("Lebanese"),
  t("Syrian"),
  t("Sudanese"),
  t("Libyan"),
  t("Palestinian"),
  t("Omani"),
  t("Qatari"),
  t("Bahraini"),
  t("Kuwaiti"),
  t("Yemeni"),
  t("Chinese"),
  t("Taiwanese"),
  t("Hong Konger"),
  t("Fijian"),
  t("Mauritian"),
  t("Trinidadian"),
  t("Italian"),
  t("Spanish"),
  t("Mexican"),
  t("Argentine"),
  t("Colombian"),
  t("Chilean"),
  t("Peruvian"),
  t("Cuban"),
  t("Venezuelan"),
  t("Uruguayan"),
  t("Bolivian"),
  t("Ecuadorian"),
  t("Guatemalan"),
  t("Honduran"),
  t("Salvadoran"),
  t("Nicaraguan"),
  t("Costa Rican"),
  t("Panamanian"),
  t("Dominican"),
  t("Puerto Rican"),
  t("Equatoguinean"),
  t("Russian"),
  t("Belarusian"),
  t("Kazakh"),
  t("Ukrainian"),
  t("Kyrgyz"),
  t("Uzbek"),
  t("Tajik"),
  t("Turkish"),
  t("Cypriot"),
  t("Azeri"),
  t("French"),
  t("Belgian"),
  t("Swiss"),
  t("Monegasque"),
  t("Haitian"),
  t("Senegalese"),
  t("Ivorian"),
  t("Malian"),
  t("Cameroonian"),
  t("Congolese"),
  t("Rwandan"),
  t("Burundian"),
  t("Madagascan"),
  t("Central African"),
  t("German"),
  t("Austrian"),
  t("Liechtensteiner"),
  t("Luxembourgish"),
];

definePageMeta({
  layout: "account",
  middleware: ["auth"],
  name: "account",
});
// defineRouteRules({
//   prerender: true,
// });
</script>

<style scoped>
.show-enter-active,
.show-leave-active {
  transition: 0.3s;
}
.show-enter-from,
.show-leave-to {
  opacity: 0;
}
.show-enter-to,
.show-leave-from {
  opacity: 1;
}
</style>
