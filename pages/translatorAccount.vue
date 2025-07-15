<template>
  <div class="bg-oneA px-8 py-11 h-fit rounded w-full">
    <div class="flex justify-between items-center">
      <p class="text-white font-semibold capitalize text-2xl">
        {{ $t("accountPage.personalInfo") }}
      </p>
      <p
        @click="
          show = true;
          hidden = 'overflow-y-hidden';
        "
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
    <div class="flex gap-16 md:flex-row flex-col">
      <div class="flex flex-col gap-2 items-center text-center">
        <NuxtImg
          data-aos="flip-up"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          :src="'/avatr.webp'"
          :placeholder="[155, 155, 5, 5]"
          class="w-[155px] h-[155px] rounded-full"
          alt="img"
          loading="lazy"
        />
        <p class="text-d36 font-medium text-base">
          {{ $t("accountPage.professional") }}
        </p>
        <PublicStars :value="4.3" />
        <p class="text-ea font-medium text-lg">
          {{ $t("accountPage.followers", { count: 47 }) }}
        </p>
      </div>
      <div
        data-aos="zoom-out"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        class="grid gap-4 md:gap-16 md:grid-cols-2"
      >
        <div class="space-y-8">
          <div class="space-y-2">
            <p class="text-bf font-medium text-base capitalize">
              {{ $t("accountPage.fullName") }}
            </p>
            <p class="text-white font-medium text-lg capitalize">Ahmed Ali</p>
          </div>
          <div class="space-y-2">
            <p class="text-bf font-medium text-base capitalize">
              {{ $t("accountPage.type") }}
            </p>
            <p class="text-white font-medium text-lg capitalize">
              {{ $t("accountPage.male") }}
            </p>
          </div>
          <div class="space-y-2">
            <p class="text-bf font-medium text-base capitalize">
              {{ $t("accountPage.dateOfBirth") }}
            </p>
            <p class="text-white font-medium text-lg capitalize">12/4/1997</p>
          </div>
        </div>
        <div class="space-y-8">
          <div class="space-y-2">
            <p class="text-bf font-medium text-base capitalize">
              {{ $t("common.email") }}
            </p>
            <p class="text-white break-all font-medium text-lg">
              ahmedali5@gmail.com
            </p>
          </div>
          <div class="space-y-2">
            <p class="text-bf font-medium text-base capitalize">
              {{ $t("accountPage.nationality") }}
            </p>
            <p class="text-white font-medium text-lg capitalize">
              {{ $t("accountPage.egyptian") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <teleport to="#teleports">
      <transition name="show">
        <div
          v-if="show"
          class="absolute mt-28 w-full md:w-[80%] bg-oneA rounded px-6 py-8 z-[500] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <VeeForm v-slot="{ isSubmitting }" @submit="submit">
            <div
              class="flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <p class="font-semibold text-2xl capitalize text-white">
                {{ $t("accountPage.personalInfo") }}
              </p>
              <div class="flex items-center gap-2">
                <button
                  @click="
                    show = false;
                    hidden = 'overflow-y-auto';
                  "
                  type="button"
                  class="border capitalize transition-all duration-300 hover:bg-white hover:text-color14 text-white border-white rounded-lg px-8 py-4"
                >
                  {{ $t("common.cancel") }}
                </button>
                <button
                  :disabled="isSubmitting"
                  type="submit"
                  class="border capitalize transition-all bg-white duration-300 hover:bg-transparent text-color14 hover:text-white border-white rounded-lg px-8 py-4"
                >
                  {{ $t("common.save") }}
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
                :src="img || '/avatr.webp'"
                :placeholder="[155, 155, 5, 5]"
                class="w-[155px] h-[155px] rounded-full"
                alt="img"
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
                  {{ $t("accountPage.fullName") }}
                </label>
                <VeeField
                  rules="required|alphaSpaces|min:3|max:50"
                  type="name"
                  name="name"
                  class="outline-none border border-five9 px-8 py-3 text-base font-medium text-oneA rounded bg-ea"
                  id="name"
                />
                <VeeErrorMessage
                  name="name"
                  class="text-red-500 font-medium text-sm md:text-base"
                />
              </div>
              <div class="space-y-1 grid" v-auto-animate>
                <label for="email" class="text-bf font-medium text-base">
                  {{ $t("common.email") }}
                </label>
                <VeeField
                  rules="required|email|min:3|max:50"
                  type="email"
                  name="email"
                  class="outline-none border border-five9 px-8 py-3 text-base font-medium text-oneA rounded bg-ea"
                  id="email"
                />
                <VeeErrorMessage
                  name="email"
                  class="text-red-500 font-medium text-sm md:text-base"
                />
              </div>
              <div class="space-y-2" v-auto-animate>
                <label for="gender" class="text-bf font-medium text-base">
                  {{ $t("accountPage.gender") }}
                </label>
                <VeeField
                  name="gender"
                  rules="required"
                  v-slot="{ field, meta }"
                >
                  <div>
                    <!-- Gender Button -->
                    <button
                      @click.prevent="toggleDropdown"
                      type="button"
                      class="outline-none border border-five9 px-4 py-3 text-base font-medium text-oneA rounded bg-ea w-full flex justify-between items-center"
                    >
                      {{ field.value || $t("accountPage.selectGender") }}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-oneA"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>

                    <!-- Dropdown Menu -->
                    <div
                      v-show="dropdownOpen"
                      class="absolute z-[501] bg-[#EAEAEA] text-[#1A1A1A] rounded shadow-lg mt-2 w-full"
                    >
                      <ul>
                        <li
                          v-for="(gender, index) in genders"
                          :key="index"
                          @click="() => selectGender(gender, field)"
                          class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          {{ $t(`accountPage.${gender.toLowerCase()}`) }}
                        </li>
                      </ul>
                    </div>

                    <!-- Validation Error Message -->
                    <VeeErrorMessage
                      name="gender"
                      class="text-red-500 font-medium text-sm md:text-base"
                    />
                  </div>
                </VeeField>
              </div>

              <!-- Date Picker -->
              <div class="space-y-2" v-auto-animate>
                <div class="space-y-2">
                  <label for="date" class="text-bf font-medium text-base">
                    {{ $t("accountPage.dateOfBirth") }}
                  </label>
                  <div
                    class="flex items-center justify-between border border-five9 px-4 py-3 text-base font-medium text-oneA bg-ea rounded"
                  >
                    <p>
                      {{ selectedDateVal || $t("accountPage.noDateSelected") }}
                    </p>
                    <VeeField name="date" rules="required" v-slot="{ field }">
                      <div v-bind="field">
                        <PublicDatePickerContanier
                          @newDate="selectedDate"
                          v-model="field.value"
                        />
                      </div>
                    </VeeField>
                  </div>
                </div>
                <VeeErrorMessage
                  name="date"
                  class="text-red-500 font-medium text-sm md:text-base"
                />
              </div>

              <div class="space-y-2" v-auto-animate>
                <label for="Nationality" class="text-bf font-medium text-base">
                  {{ $t("accountPage.nationality") }}
                </label>
                <VeeField
                  name="Nationality"
                  rules="required"
                  v-slot="{ field, meta }"
                >
                  <div>
                    <!-- Nationality Button -->
                    <button
                      @click.prevent="toggleDropdown2"
                      type="button"
                      class="outline-none border border-five9 px-4 py-3 text-base font-medium text-oneA rounded bg-ea w-full flex justify-between items-center"
                    >
                      {{ field.value || $t("accountPage.selectNationality") }}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 text-oneA"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>

                    <!-- Dropdown Menu -->
                    <div
                      v-show="dropdownOpen2"
                      class="absolute z-[501] bg-[#EAEAEA] text-[#1A1A1A] rounded shadow-lg mt-2 w-full"
                    >
                      <ul>
                        <li
                          v-for="(nationality, index) in Nationality"
                          :key="index"
                          @click="() => selectNationality(nationality, field)"
                          class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          {{ $t(`accountPage.${nationality.toLowerCase()}`) }}
                        </li>
                      </ul>
                    </div>

                    <!-- Validation Error Message -->
                    <VeeErrorMessage
                      name="Nationality"
                      class="text-red-500 font-medium text-sm md:text-base"
                    />
                  </div>
                </VeeField>
              </div>
            </div>
          </VeeForm>
        </div>
      </transition>
      <transition name="show">
        <div
          v-if="show"
          @click="
            show = false;
            hidden = 'overflow-y-auto';
          "
          class="fixed z-[499] left-0 top-0 cursor-pointer w-screen h-screen bg-black/20 backdrop-blur-xl"
        ></div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "account",
  middleware: ["auth"],
});
// defineRouteRules({
//   prerender: true,
// });
const open = ref(null);
const selectedGender = ref(null);

const genders = ["Male", "Female"];
const Nationality = ["egy", "fr"];
const dropdownOpen = ref(false);
const dropdownOpen2 = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
const toggleDropdown2 = () => {
  dropdownOpen2.value = !dropdownOpen2.value;
};

const selectGender = (gender, field) => {
  field.value = gender; // Update field value for VeeValidate
  dropdownOpen.value = false;
};
const selectNationality = (nationality, field) => {
  field.value = nationality; // Update field value for VeeValidate
  dropdownOpen2.value = false;
};

// State management
const show = ref(false);
const hidden = ref("");
const selectedDateVal = ref(null);

const selectedDate = (val) => {
  const date = new Date(val); // Ensure it's a Date object
  const day = date.getDate(); // Get day (1-31)
  const month = date.getMonth() + 1; // Get month (1-12)
  const year = date.getFullYear(); // Get year (e.g., 2024)

  selectedDateVal.value = `${day}, ${month}, ${year}`; // Format: "day month year"
  console.log(selectedDateVal.value); // Logs the formatted date
};

// Submit Handler
const submit = (values) => {
  console.log("Submitted values:", values);
  hidden.value = "overflow-y-auto";
  show.value = false;
};

const img = ref(null);

const changeImg = (event) => {
  const file = event.target.files[0];
  if (file) {
    img.value = URL.createObjectURL(file); // Create preview URL
  }
};
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
.dropdown-menu {
  background-color: #eaeaea !important;
  color: #1a1a1a !important;
}
.dropdown-menu li:hover {
  background-color: #dcdcdc !important;
}
</style>
