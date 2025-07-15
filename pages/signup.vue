<template>
  <div
    class="bg-oneA space-y-4 pt-12 px-8 md:px-16 lg:px-24 rounded-t-lg md:rounded-t-none w-full h-full z-10 relative mx-auto"
    :class="locale === 'ar' ? 'md:rounded-r-[20px]' : 'md:rounded-l-[20px]'"
  >
    <div
      class="flex items-center gap-4 w-full justify-between"
      data-aos="fade-down"
      data-aos-duration="500"
      data-aos-easing="ease-out-cubic"
    >
      <span class="rounded-lg w-full h-2 bg-d36"></span>
      <span
        class="rounded-lg w-full h-2"
        :class="secondShow ? 'bg-d36' : 'bg-seven4'"
      ></span>
      <span
        class="rounded-lg w-full h-2"
        :class="thridShow ? 'bg-d36' : 'bg-seven4'"
      ></span>
    </div>

    <transition name="fade" mode="out-in">
      <h1
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        v-if="one"
        class="text-d36 font-semibold text-2xl text-center"
      >
        {{ $t("signUpV2.title") }}
      </h1>
    </transition>
    <transition name="fade" mode="out-in">
      <h2
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-easing="ease-out-cubic"
        v-if="second"
        class="text-d36 font-semibold text-2xl text-center"
      >
        {{ $t("signUpV2.personalInfo") }}
      </h2>
    </transition>

    <transition name="fade" mode="out-in">
      <VeeForm
        v-if="one"
        @submit="submit"
        v-slot="{ isSubmitting }"
        class="space-y-4 md:space-y-6 w-full"
      >
        <div
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
        >
          <label class="text-bf font-medium text-base" for="name">
            {{ $t("signUpV2.fullName") }}
          </label>
          <VeeField
            :placeholder="$t('signUpV2.enterFullName')"
            id="name"
            v-model="form.name"
            name="name"
            type="text"
            rules="alphaSpaces|min:10|max:50|required"
            class="outline-none rounded w-full border capitalize border-five9 bg-ea font-semibold text-xs text-seven4 p-4"
          />
          <VeeErrorMessage
            name="name"
            class="text-red-500 font-medium text-sm"
          />
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
        >
          <label class="text-bf font-medium text-base" for="email">
            {{ $t("common.email") }}
          </label>
          <VeeField
            :placeholder="$t('signUpV2.enterEmail')"
            id="email"
            v-model="form.email"
            name="email"
            type="email"
            rules="email|min:10|max:100|required"
            class="outline-none rounded w-full border border-five9 bg-ea font-semibold text-xs text-seven4 p-4"
          />
          <VeeErrorMessage
            name="email"
            class="text-red-500 font-medium text-sm"
          />
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
        >
          <label
            for="password"
            class="text-bf capitalize font-medium text-base block"
          >
            {{ $t("signUpV2.newPassword") }}
          </label>
          <div class="relative">
            <VeeField
              :type="show ? 'text' : 'password'"
              name="password"
              v-model="form.newPassword"
              id="password"
              rules="required|min:8"
              :placeholder="$t('signUpV2.enterPassword')"
              class="outline-none text-xs text-seven4 lowercase font-semibold bg-ea border-five9 p-4 border rounded w-full"
            />
            <svg
              v-if="show"
              @click="show = !show"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              class="text-twoC cursor-pointer absolute top-1/2 -translate-y-1/2"
              :class="locale === 'en' ? 'right-4' : 'left-4'"
            >
              <path
                fill="currentColor"
                d="M12 6.5a9.77 9.77 0 0 1 8.82 5.5c-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12A9.77 9.77 0 0 1 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5m0 5a2.5 2.5 0 0 1 0 5a2.5 2.5 0 0 1 0-5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5s-2.02-4.5-4.5-4.5"
              />
            </svg>
            <svg
              v-else
              @click="show = !show"
              class="text-twoC cursor-pointer absolute top-1/2 -translate-y-1/2"
              :class="locale === 'en' ? 'right-4' : 'left-4'"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8.052 5.837A9.7 9.7 0 0 1 12 5c2.955 0 5.309 1.315 7.06 2.864c1.756 1.553 2.866 3.307 3.307 4.08a.1.1 0 0 1 .016.055a.1.1 0 0 1-.017.06a17 17 0 0 1-1.53 2.218a.75.75 0 1 0 1.163.946a18 18 0 0 0 1.67-2.42a1.61 1.61 0 0 0 .001-1.602c-.485-.85-1.69-2.757-3.616-4.46C18.124 5.034 15.432 3.5 12 3.5c-1.695 0-3.215.374-4.552.963a.75.75 0 0 0 .604 1.373Zm11.114 12.15C17.328 19.38 14.933 20.5 12 20.5c-3.432 0-6.125-1.534-8.054-3.24C2.02 15.556.814 13.648.33 12.798a1.6 1.6 0 0 1 .001-1.6A18.3 18.3 0 0 1 3.648 7.01L1.317 5.362a.75.75 0 1 1 .866-1.224l20.5 14.5a.75.75 0 1 1-.866 1.224ZM4.902 7.898c-1.73 1.541-2.828 3.273-3.268 4.044a.1.1 0 0 0-.017.059q-.002.023.016.055c.441.774 1.551 2.527 3.307 4.08C6.69 17.685 9.045 19 12 19c2.334 0 4.29-.82 5.874-1.927l-3.516-2.487a3.5 3.5 0 0 1-5.583-3.949L4.902 7.899Z"
              />
            </svg>
          </div>
          <VeeErrorMessage
            name="password"
            class="text-xs font-medium text-red-500"
          />
        </div>
        <div
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
        >
          <label
            for="confirmPassword"
            class="text-bf capitalize font-medium text-base block"
          >
            {{ $t("signUpV2.confirmPassword") }}
          </label>
          <div class="relative">
            <VeeField
              :type="show ? 'text' : 'password'"
              name="confirmPassword"
              v-model="form.confirmPassword"
              rules="required|min:8|confirmed:@password"
              id="confirmPassword"
              :placeholder="$t('signUpV2.confirmPasswordPlaceholder')"
              class="outline-none text-seven4 lowercase font-semibold text-xs bg-ea border-five9 p-4 border rounded w-full"
            />
            <svg
              v-if="show"
              @click="show = !show"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              class="text-twoC cursor-pointer absolute top-1/2 -translate-y-1/2"
              :class="locale === 'en' ? 'right-4' : 'left-4'"
            >
              <path
                fill="currentColor"
                d="M12 6.5a9.77 9.77 0 0 1 8.82 5.5c-1.65 3.37-5.02 5.5-8.82 5.5S4.83 15.37 3.18 12A9.77 9.77 0 0 1 12 6.5m0-2C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5m0 5a2.5 2.5 0 0 1 0 5a2.5 2.5 0 0 1 0-5m0-2c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5s-2.02-4.5-4.5-4.5"
              />
            </svg>
            <svg
              v-else
              @click="show = !show"
              class="text-twoC cursor-pointer absolute top-1/2 -translate-y-1/2"
              :class="locale === 'en' ? 'right-4' : 'left-4'"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8.052 5.837A9.7 9.7 0 0 1 12 5c2.955 0 5.309 1.315 7.06 2.864c1.756 1.553 2.866 3.307 3.307 4.08a.1.1 0 0 1 .016.055a.1.1 0 0 1-.017.06a17 17 0 0 1-1.53 2.218a.75.75 0 1 0 1.163.946a18 18 0 0 0 1.67-2.42a1.61 1.61 0 0 0 .001-1.602c-.485-.85-1.69-2.757-3.616-4.46C18.124 5.034 15.432 3.5 12 3.5c-1.695 0-3.215.374-4.552.963a.75.75 0 0 0 .604 1.373Zm11.114 12.15C17.328 19.38 14.933 20.5 12 20.5c-3.432 0-6.125-1.534-8.054-3.24C2.02 15.556.814 13.648.33 12.798a1.6 1.6 0 0 1 .001-1.6A18.3 18.3 0 0 1 3.648 7.01L1.317 5.362a.75.75 0 1 1 .866-1.224l20.5 14.5a.75.75 0 1 1-.866 1.224ZM4.902 7.898c-1.73 1.541-2.828 3.273-3.268 4.044a.1.1 0 0 0-.017.059q-.002.023.016.055c.441.774 1.551 2.527 3.307 4.08C6.69 17.685 9.045 19 12 19c2.334 0 4.29-.82 5.874-1.927l-3.516-2.487a3.5 3.5 0 0 1-5.583-3.949L4.902 7.899Z"
              />
            </svg>
          </div>
          <VeeErrorMessage
            name="confirmPassword"
            class="text-xs font-medium text-red-500"
          />
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="text-white rounded-lg capitalize w-full bg-d36 py-3 text-center transition-all duration-300 hover:bg-transparent hover:text-white hover:border-white border border-d36"
        >
          {{ $t("signUpV2.next") }}
        </button>
      </VeeForm>
    </transition>

    <transition name="fade" mode="out-in">
      <VeeForm
        v-if="second"
        @submit="submitFull"
        v-slot="{ isSubmitting }"
        class="space-y-4 md:space-y-6 w-full pb-8"
      >
        <div
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
          class="space-y-2 relative z-40"
        >
          <label for="gender" class="text-bf font-medium text-base">
            {{ $t("signUpV2.gender") }}
          </label>
          <VeeField
            rules="required"
            id="gender"
            v-slot="{ field }"
            name="gender"
          >
            <USelectMenu
              v-bind="field"
              class="w-full bg-ea rounded border border-five9 text-sm text-seven4 font-semibold"
              searchable
              :placeholder="$t('signUpV2.selectGender')"
              :popper="{ placement: 'bottom' }"
              :ui="{ color: { white: 'bg-ea' } }"
              size="xl"
              v-model="selectedgenders"
              :options="genders"
            />
          </VeeField>
          <VeeErrorMessage
            name="gender"
            class="text-red-500 font-medium text-base"
          />
        </div>

        <div
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          class="space-y-2 relative z-30"
          v-auto-animate
        >
          <label for="date" class="text-bf font-medium text-base">
            {{ $t("signUpV2.dateOfBirth") }}
          </label>

          <PublicDatePickerContanierV2 @newDate="selectedDate" />

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

        <div
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
          class="space-y-2 relative z-20"
        >
          <label for="lang" class="text-bf font-medium text-base">
            {{ $t("signUpV2.nationality") }}
          </label>
          <VeeField rules="required" id="lang" v-slot="{ field }" name="lang">
            <USelectMenu
              v-bind="field"
              class="w-full bg-ea rounded border border-five9 text-sm text-seven4 font-semibold"
              searchable
              :placeholder="$t('signUpV2.selectNationality')"
              :popper="{ placement: 'bottom', scroll: false }"
              size="xl"
              :ui="{ color: { white: 'bg-ea' } }"
              v-model="selected"
              :options="Nationality"
            />
          </VeeField>
          <VeeErrorMessage
            name="lang"
            class="text-red-500 font-medium text-base"
          />
        </div>

        <div
          data-aos="fade-right"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
          class="space-y-2"
        >
          <label class="text-bf font-medium text-base">
            {{ $t("signUpV2.uploadPhoto") }}
          </label>
          <label
            class="bg-ea rounded-lg w-full border-4 border-dashed border-spacing-96 border-oneA h-[100px] cursor-pointer flex items-center justify-center flex-col"
            for="photo"
          >
            <svg
              v-if="!img"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-8 text-zero3 md:h-24 md:-mt-8"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11 14.825V18q0 .425.288.713T12 19t.713-.288T13 18v-3.175l.9.9q.15.15.338.225t.375.063t.362-.088t.325-.225q.275-.3.288-.7t-.288-.7l-2.6-2.6q-.15-.15-.325-.212T12 11.425t-.375.063t-.325.212l-2.6 2.6q-.3.3-.287.7t.312.7q.3.275.7.288t.7-.288zM6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V20q0 .825-.587 1.413T18 22zm7-14V4H6v16h12V9h-4q-.425 0-.712-.288T13 8M6 4v5zv16z"
              />
            </svg>
            <p class="font-medium text-fourB md:-mt-8 text-xs" v-if="!img">
              {{ $t("signUpV2.uploadPhotoPlaceholder") }}
            </p>
            <div v-if="img" class="relative">
              <NuxtImg
                :src="img"
                placeholder
                loading="lazy"
                alt="img"
                class="h-[80px] w-[80px] rounded-full"
              />
              <svg
                @click="
                  img = '';
                  form.file = null;
                "
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 absolute rounded-full right-4 top-2 bg-red-500 text-white"
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
            id="photo"
            @change="changeImg"
            v-model="form.file"
            name="photo"
            type="file"
            rules="image"
            class="hidden"
            accept="image/*"
          />
          <VeeErrorMessage
            name="photo"
            class="text-red-500 font-medium text-sm"
          />
        </div>

        <div
          data-aos="fade-left"
          data-aos-duration="500"
          data-aos-easing="ease-out-cubic"
          v-auto-animate
        >
          <div class="flex gap-4 items-center">
            <VeeField
              rules="required"
              name="consent-checkbox"
              type="checkbox"
              value="checkbox"
              v-model="checkbox"
              id="consent-checkbox"
              class="hidden peer"
            />
            <label
              @click="visable = !visable"
              for="consent-checkbox"
              class="w-5 h-5 rounded-md border border-d36 bg-transparent peer-checked:bg-d36 peer-checked:border-d36 peer-checked:text-white flex items-center justify-center"
            >
              <span v-if="visable"> ✔ </span>
            </label>
            <label
              @click="visable = !visable"
              for="consent-checkbox"
              class="text-sm flex-shrink font-medium text-bf"
            >
              {{ $t("signUpV2.consent") }}
            </label>
          </div>
          <VeeErrorMessage
            name="consent-checkbox"
            class="text-red-500 font-medium text-base"
          />
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="text-white rounded-lg capitalize w-full bg-d36 py-3 text-center transition-all duration-300 hover:bg-transparent hover:text-white border border-d36 hover:border-white"
        >
          {{ $t("signUpV2.letsStart") }}
        </button>
      </VeeForm>
    </transition>

    <transition name="fade" mode="out-in">
      <UDivider
        v-if="one"
        :label="$t('signUpV2.orSignUpWith')"
        :ui="{
          label: 'text-bf dark:text-bf font-medium text-sm',
          border: { base: 'border-[#2C2C2C] dark:border-[#2C2C2C]' },
        }"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <div
        v-if="one"
        class="flex justify-center items-center gap-2 cursor-pointer"
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
    </transition>
    <transition name="fade" mode="out-in">
      <div
        v-if="one"
        class="flex items-center justify-center pb-16 md:pb-32 pt-6 md:pt-8 gap-1"
      >
        <p class="font-medium text-base text-seven4">
          {{ $t("signUpV2.alreadyHaveAccount") }}
        </p>
        <nuxt-link
          :to="localePath('/login')"
          class="transition-all duration-300 hover:opacity-50 text-d36 text-base font-semibold"
        >
          {{ $t("signUpV2.logIn") }}
        </nuxt-link>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div v-if="thrid" class="grid place-items-center gap-4 py-4 md:gap-8">
        <img
          :src="asset"
          class="w-[122px] h-[140px]"
          alt="final img"
          loading="lazy"
        />
        <div class="space-y-4 text-center">
          <p class="text-white font-semibold text-2xl">
            {{ $t("signUpV2.great") }}
          </p>
          <p class="text-white font-medium text-bae">
            {{ $t("signUpV2.thankYouMessage") }}
          </p>
        </div>
      </div>
    </transition>
    <PublicLoading :loading="loading" />
  </div>
</template>
<script setup>
import { format } from "date-fns";
import asset from "@/assets/final.svg";

const show = ref(false);
const thrid = ref(false);
const visable = ref(false);
const second = ref(false);
const secondShow = ref(false);
const thridShow = ref(false);
const selected = ref();
const selectedgenders = ref();
const one = ref(true);
const checkbox = ref(false);

const loading = ref(false);

definePageMeta({
  layout: "sign-up-layout",
  middleware: ["authed"],
});
const toast = useToast();

const { locale, t } = useI18n();
const localePath = useLocalePath();

const formatForDisplay = (date) => format(date, "dd,MM,yyyy"); // Display format
const formatForBackend = (date) => format(date, "yyyy-MM-dd"); // Backend format

const form = reactive({
  name: "",
  email: "",
  newPassword: "",
  confirmPassword: "",
  file: null,
  selected: false,
});

const submit = () => {
  one.value = false;
  second.value = true;
  secondShow.value = true;
};
const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const submitFull = async (values) => {
  try {
    loading.value = true;

    // Create a new FormData instance
    const formData = new FormData();

    // Append the form fields to the FormData object
    formData.append("username", form.name);
    formData.append("email", form.email);
    formData.append("password", form.newPassword);
    formData.append("password_confirmation", form.confirmPassword);
    formData.append("gender", String(selectedgenders.value).toLowerCase());
    formData.append("birthday", selectedDateVal.value.backend);
    formData.append("nationalty", values.lang);

    // Append the image file if it exists
    if (form.file) {
      formData.append("image_file", form.file);
    }

    // Make the POST request with FormData
    const response = await $fetch(`${url}/register`, {
      method: "POST",
      body: formData,
      headers: {
        // 'Content-Type' should not be set manually when using FormData
        // The browser will automatically set it to 'multipart/form-data'
      },
    });

    // Success case
    second.value = false;
    thrid.value = true;
    thridShow.value = true;
    toast.add({
      title: response.message,
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
  } catch (error) {
    handleBackendErrors(error.data);
  } finally {
    loading.value = false;
  }
};

const handleBackendErrors = (response) => {
  if (response.errors) {
    let isFormFieldError = false;

    Object.entries(response.errors).forEach(([field, messages]) => {
      messages.forEach((message) => {
        toast.add({
          title: message,
          type: "error",
          icon: "i-icon-park-outline-error",
          color: "red",
        });
      });

      // Check if the error field matches the form fields
      if (
        ["username", "email", "password", "password_confirmation"].includes(
          field
        )
      ) {
        isFormFieldError = true;
      }
    });

    // If there are form field errors, reset the form state
    if (isFormFieldError) {
      secondShow.value = false;
      one.value = true;
      second.value = false;
    }
  } else if (response.message) {
    // Generic message
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

const genders = ["Male", "Female"];
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

const selectedDateVal = ref(null);
const selectedDateVal2 = ref(null);

const selectedDate = (val) => {
  const date = new Date(val);
  selectedDateVal2.value = date;

  // Update the selected date for display and backend
  selectedDateVal.value = {
    display: formatForDisplay(date), // "dd,MM,yyyy"
    backend: formatForBackend(date), // "dd-MM-yyyy"
  };
};

const img = ref();
const changeImg = (event) => {
  const file = event.target.files[0];
  if (file) {
    img.value = URL.createObjectURL(file);
  }
};
const fecthData = async () => {
  window.location.href = `${url}/auth/google`;
};
const fecthDataFacebook = async () => {
  window.location.href = `${url}/auth/facebook`;
};

const route = useRoute();

useSeoMeta({
  title: t(`SignUpSeo.title`),
  description: `SignUpSeo.description`,
  ogTitle: t(`SignUpSeo.title`),
  ogDescription: `SignUpSeo.description`,
  ogUrl: `https://www.ysk-comics.com${route.fullPath}`,
  ogImage: `https://www.ysk-comics.com/logo.png`,
  ogImageAlt: t(`SignUpSeo.title`),
  robots: "index, follow",
  ogType: "comics",
  ogImageType: "image/png",
  ogSiteName: "YSK Comics",
  ogLocale: locale.value,
  ogLocaleAlternate: "en",
  twitterTitle: t(`SignUpSeo.title`),
  twitterDescription: `SignUpSeo.description`,
  twitterImage: `https://www.ysk-comics.com/logo.png`,
  twitterSite: "@YSK_Comics",
  twitterCreator: `@YSK_Comics`,
  twitterCard: "summary_large_image",
});
</script>
<style scoped>
/* Define the fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
