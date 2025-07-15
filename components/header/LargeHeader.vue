<template>
  <div v-auto-animate class="lg:contents hidden">
    <div
      v-auto-animate
      :class="authToken ? 'lg:px-2 xl:px-6' : ''"
      class="flex w-full flex-grow-1 lg:gap-4 xl:gap-6 xl:justify-center lg:justify-end items-center link"
    >
      <NuxtLink
        :to="localePath('/')"
        class="linkClass font-medium text-base text-ea"
      >
        {{ $t("footer.home") }}
      </NuxtLink>
      <NuxtLink
        :to="
          localePath(
            `/publisher/${locale === 'en' ? config.public.MarvelEn : config.public.MarvelAr}`
          )
        "
        class="linkClass font-medium text-base text-ea"
      >
        {{ $t("publishers.marvel") }}
      </NuxtLink>
      <NuxtLink
        :to="
          localePath(
            `/publisher/${locale === 'en' ? config.public.DcEn : config.public.DcAr}`
          )
        "
        class="linkClass font-medium text-base text-ea"
      >
        {{ $t("publishers.dc") }}
      </NuxtLink>
      <NuxtLink
        :to="localePath('/publishers')"
        class="linkClass font-medium text-base text-ea"
      >
        {{ $t("footer.otherComics") }}
      </NuxtLink>
      <NuxtLink
        :to="localePath('/blogs')"
        class="linkClass font-medium text-base text-ea"
      >
        {{ $t("blogs.name") }}
      </NuxtLink>
    </div>

    <div :class="authToken ? 'gap-6' : 'gap-2'" class="flex items-center">
      <div
        ref="searchContainer"
        class="relative lg:w-[180px] xl:w-[220px] flex justify-end"
      >
        <div
          v-if="searchQuery.length >= 3 && dataVal?.length"
          class="absolute bg-color14/60 z-50 top-full overflow-y-scroll h-[50vh] left-1/2 -translate-x-1/2 rounded-md py-2 px-3 space-y-4 backdrop-blur-3xl w-max"
        >
          <NuxtLink
            v-for="data in dataVal"
            :key="data.id"
            :to="localePath(`/comic/${data.slug}`)"
            class="flex items-center transition-all duration-300 border-b border-b-transparent hover:border-b-d36 w-full p-2 cursor-pointer gap-2"
          >
            <NuxtImg
              :src="data.image"
              :placeholder="[40, 60, 5, 5]"
              loading="lazy"
              alt="img"
              width="40"
              height="60"
              class="w-[40px] h-[60px] rounded-md"
            />
            <p class="text-d36 text-base capitalize">
              {{ data.full_name }}
            </p>
          </NuxtLink>
        </div>
        <transition name="search" mode="out-in">
          <div
            v-if="!isSearchActive"
            @click="toggleSearch"
            class="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              class="text-ea"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
              />
            </svg>
          </div>

          <div
            v-else
            class="flex items-center gap-2 border rounded-lg px-3 py-1 border-bf shadow-sm shadow-zeroD"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              class="text-ea"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
              />
            </svg>
            <input
              v-model="searchQuery"
              type="search"
              class="outline-none bg-transparent text-ea w-full"
              :placeholder="$t('common.search')"
              @keyup.enter="performSearch"
              @keyup.esc="closeSearch"
            />
            <button
              type="button"
              @click="closeSearch"
              class="text-ea hover:text-red-500 transition-colors"
            >
              ✕
            </button>
          </div>
        </transition>
      </div>
      <NuxtLink
        :to="localePath('/signup')"
        v-if="!authToken"
        type="button"
        class="border no w-[140px] grid place-items-center xl:w-[152px] border-d36 rounded py-2 px-3 transition-all duration-300 text-d36 hover:bg-d36 hover:text-color14"
      >
        {{ $t("common.signUpLogin") }}
      </NuxtLink>
      <PublicTooltip v-if="authToken && type && type !== 'user'">
        <button
          class="capitalize hover:border-white h-11 xl:h-12 w-[115px] xl:w-[125px] text-white font-semibold text-base hover:bg-white hover:text-color14 transition-all duration-300 rounded-lg border border-seven4"
          type="button"
        >
          + {{ $t("common.upload") }}
        </button>
      </PublicTooltip>

      <PublicHoverTooltip v-if="authToken">
        <NuxtLink class="no" :to="localePath('/ask')">
          <svg
            v-if="authToken"
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.89986 17.494C7.81348 17.4682 7.72747 17.4412 7.64186 17.413L2.43186 20.837C2.27035 20.9435 2.08141 21.0009 1.88795 21.0022C1.69449 21.0034 1.50481 20.9486 1.34191 20.8442C1.17901 20.7398 1.04988 20.5905 0.970178 20.4142C0.890474 20.2379 0.863615 20.0423 0.892859 19.851L1.94086 12.944C1.24921 11.7445 0.883753 10.3847 0.880859 9.00002C0.880859 4.08302 5.54586 -0.000976562 11.3869 -0.000976562C17.0319 -0.000976562 21.5769 3.81402 21.8759 8.50902C25.9819 9.74902 28.8939 13.114 28.8939 17.001C28.8939 18.414 28.5159 19.751 27.8359 20.945L28.8829 27.852C28.9119 28.0431 28.885 28.2385 28.8053 28.4146C28.7257 28.5907 28.5967 28.74 28.4339 28.8443C28.2712 28.9486 28.0818 29.0035 27.8885 29.0024C27.6952 29.0013 27.5064 28.9442 27.3449 28.838L22.1349 25.414C20.9729 25.794 19.7099 26.002 18.3899 26.002C12.7459 26.002 8.19986 22.188 7.89986 17.494ZM14.8729 20.359L17.3739 21.859C17.5722 21.9781 17.8056 22.0247 18.0345 21.991C18.2633 21.9573 18.4733 21.8452 18.6289 21.674L23.6309 16.174C23.7192 16.0768 23.7876 15.9632 23.8321 15.8396C23.8765 15.716 23.8962 15.5849 23.89 15.4536C23.8838 15.3224 23.8518 15.1937 23.7958 15.0749C23.7399 14.9561 23.661 14.8494 23.5639 14.761C23.4667 14.6726 23.353 14.6043 23.2294 14.5598C23.1058 14.5153 22.9747 14.4957 22.8435 14.5019C22.7123 14.5081 22.5836 14.5401 22.4647 14.5961C22.3459 14.652 22.2392 14.7308 22.1509 14.828L17.7009 19.722L15.9019 18.644C15.7892 18.5764 15.6644 18.5316 15.5345 18.5122C15.4046 18.4928 15.2721 18.4992 15.1447 18.531C15.0172 18.5628 14.8973 18.6194 14.7917 18.6976C14.6861 18.7757 14.597 18.8739 14.5294 18.9865C14.4617 19.0991 14.4169 19.224 14.3976 19.3539C14.3782 19.4838 14.3846 19.6163 14.4164 19.7437C14.4482 19.8712 14.5048 19.9911 14.5829 20.0967C14.6611 20.2022 14.7603 20.2914 14.8729 20.359ZM19.8179 8.08302C19.2719 4.61302 15.6669 1.99902 11.3859 1.99902C6.73486 2.00002 2.88286 5.08502 2.88286 9.00002C2.88286 10.158 3.22686 11.25 3.82986 12.207C3.95741 12.41 4.0078 12.652 3.97186 12.889L3.20786 17.934L6.95686 15.469C7.08879 15.3822 7.23939 15.3279 7.39635 15.3106C7.5533 15.2932 7.71214 15.3132 7.85986 15.369C8.54712 15.6263 9.26083 15.8064 9.98786 15.906C10.4429 15.969 10.9099 16.001 11.3859 16.001C15.5939 16.001 19.1479 13.475 19.7869 10.094C19.9128 9.43044 19.924 8.75007 19.8179 8.08302ZM11.3859 8.00002C11.6562 7.9998 11.9215 7.9265 12.1537 7.78788C12.3858 7.64925 12.5762 7.45046 12.7046 7.21252C12.833 6.97459 12.8948 6.70637 12.8833 6.43623C12.8718 6.16609 12.7875 5.90408 12.6393 5.67793C12.4911 5.45177 12.2845 5.26987 12.0415 5.15147C11.7984 5.03308 11.5278 4.98259 11.2584 5.00535C10.989 5.0281 10.7307 5.12326 10.5109 5.28075C10.2911 5.43824 10.118 5.65221 10.0099 5.90002C9.90377 6.14323 9.70542 6.33433 9.45843 6.43128C9.21145 6.52824 8.93606 6.52311 8.69286 6.41702C8.44966 6.31094 8.25856 6.11258 8.1616 5.8656C8.06464 5.61861 8.06977 5.34323 8.17586 5.10002C8.49904 4.36459 9.06517 3.76257 9.77938 3.39486C10.4936 3.02715 11.3125 2.91607 12.0988 3.08026C12.8852 3.24444 13.5912 3.67391 14.0986 4.29669C14.606 4.91947 14.884 5.69771 14.8859 6.50102C14.8852 7.25458 14.6416 7.98784 14.1913 8.59202C13.7409 9.1962 13.1078 9.63911 12.3859 9.85502V11C12.3743 11.2575 12.264 11.5006 12.0777 11.6787C11.8914 11.8569 11.6436 11.9563 11.3859 11.9563C11.1281 11.9563 10.8803 11.8569 10.694 11.6787C10.5078 11.5006 10.3974 11.2575 10.3859 11V9.00002C10.3859 8.73481 10.4912 8.48045 10.6788 8.29292C10.8663 8.10538 11.1206 8.00002 11.3859 8.00002ZM11.3859 13C11.6515 13 11.9062 13.1055 12.094 13.2934C12.2818 13.4812 12.3874 13.7359 12.3874 14.0015C12.3874 14.2671 12.2818 14.5219 12.094 14.7097C11.9062 14.8975 11.6515 15.003 11.3859 15.003C11.1202 15.003 10.8655 14.8975 10.6777 14.7097C10.4899 14.5219 10.3844 14.2671 10.3844 14.0015C10.3844 13.7359 10.4899 13.4812 10.6777 13.2934C10.8655 13.1055 11.1202 13 11.3859 13Z"
              fill="white"
            />
          </svg>
        </NuxtLink>
      </PublicHoverTooltip>

      <NuxtLink
        :to="localePath('/account')"
        v-if="authToken"
        class="w-[30px] no h-[30px] rounded-full"
      >
        <NuxtImg
          :src="useCookie('image').value || '/tempAvatar.webp'"
          class="w-[30px] h-[30px] rounded-full object-cover"
          :alt="$t('user.avatarAlt')"
          loading="eager"
          :placeholder="[30, 30]"
          @error="useCookie('image').value = '/tempAvatar.webp'"
        />
      </NuxtLink>

      <div v-if="authToken" class="relative cursor-pointer" @click="showData">
        <svg
          class="text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 19v-2h2v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h2v2zm8 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-4-5h8v-7q0-1.65-1.175-2.825T12 6T9.175 7.175T8 10z"
          />
        </svg>
        <div v-if="newNotifications.length" class="absolute top-0 right-0">
          <span class="relative flex h-[10px] w-[10px]">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-[10px] w-[10px] bg-red-500"
            ></span>
          </span>
        </div>
      </div>

      <!-- Locale Switch -->
      <NuxtLink
        :to="switcher(locale === 'ar' ? 'en' : 'ar')"
        class="flex transition-all no duration-300 cursor-pointer hover:text-d36 items-center text-ea"
      >
        <p>{{ locale === "ar" ? "En" : "Ar" }}</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2s.06-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.92 7.92 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8 8 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.7 15.7 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
          />
        </svg>
      </NuxtLink>
    </div>
    <teleport to="#teleports">
      <transition name="search2">
        <section ref="outSIde" v-if="showNot">
          <div
            v-if="initialNotifications?.data?.length > 0"
            class="bg-white hidden lg:block md:w-[400px] lg:w-[600px] xl:w-[860px] fixed z-[999] top-16 max-h-[calc(100vh_-_8rem)] overflow-y-auto left-1/2 -translate-x-1/2 rounded-md py-4 md:py-6 shadow-custom-merged"
          >
            <div class="flex justify-between items-center px-4 xl:px-6">
              <p class="text-Dc text-lg capitalize font-semibold">
                {{ $t("notifications.newForYou") }}
              </p>
              <p
                class="capitalize cursor-pointer hover:opacity-50 transition-all duration-300 text-sm text-seven4 font-semibold"
                @click="markAllAsRead"
              >
                {{ $t("notifications.markAllRead") }}
              </p>
            </div>

            <!-- New Notifications -->
            <div class="py-6">
              <div
                v-for="(item, index) in newNotifications"
                :key="index"
                @click="markAsRead(item.id)"
                class="flex relative items-center justify-between px-6 py-2 xl:px-8 transition-all duration-300 hover:bg-gray-100 cursor-pointer"
              >
                <div class="flex items-center gap-4">
                  <NuxtImg
                    v-if="!item.image"
                    :placeholder="[34, 34, 5, 5]"
                    fit="cover"
                    width="34"
                    height="34"
                    :alt="$t('alt.notificationImage')"
                    densities="x1"
                    loading="lazy"
                    src="/smallLogo.svg"
                    class="w-[34px] h-[34px] object-cover"
                  />
                  <NuxtImg
                    v-else
                    :placeholder="[40, 40, 5, 5]"
                    fit="cover"
                    width="40"
                    height="40"
                    :alt="$t('alt.notificationImage')"
                    densities="x1"
                    loading="lazy"
                    :src="item.image"
                    class="w-[40px] h-[40px] rounded-full object-cover"
                  />
                  <div class="space-y-1">
                    <p class="text-two2 font-semibold text-base">
                      {{ item.title }}
                    </p>
                    <p class="text-seven4 font-semibold text-xs">
                      {{ item.created_at }}
                    </p>
                  </div>
                </div>
                <p
                  v-if="!item.readIs"
                  :class="
                    locale === 'ar'
                      ? 'left-6 xl:left-12'
                      : 'right-6 xl:right-12'
                  "
                  class="cursor-pointer bg-Dc w-[10px] absolute top-1/2 -translate-y-1/2 h-[10px] rounded-full"
                  :title="$t('notifications.read')"
                ></p>
              </div>
            </div>

            <!-- Previous Notifications -->
            <div
              v-if="previousNotifications?.length"
              class="px-4 xl:px-6 py-4 bg-fc border-b border-t border-black/5"
            >
              <p class="text-two8 font-bold text-base">
                {{ $t("notifications.previousNotifications") }}
              </p>
            </div>
            <div v-if="previousNotifications?.length" class="py-6">
              <div
                v-for="(item, index) in previousNotifications"
                :key="index"
                class="flex relative items-center justify-between px-6 py-2 xl:px-8 transition-all duration-300 hover:bg-gray-100 cursor-pointer"
              >
                <div class="flex items-center gap-4">
                  <NuxtImg
                    v-if="!item.image"
                    :placeholder="[34, 34, 5, 5]"
                    fit="cover"
                    width="34"
                    height="34"
                    :alt="$t('alt.notificationImage')"
                    densities="x1"
                    loading="lazy"
                    src="/smallLogo.svg"
                    class="w-[34px] h-[34px] object-cover"
                  />
                  <NuxtImg
                    v-else
                    :placeholder="[40, 40, 5, 5]"
                    fit="cover"
                    width="40"
                    height="40"
                    :alt="$t('alt.notificationImage')"
                    densities="x1"
                    loading="lazy"
                    :src="item.image"
                    class="w-[40px] h-[40px] rounded-full object-cover"
                  />
                  <div class="space-y-1">
                    <p class="text-two2 font-semibold text-base">
                      {{ item.title }}
                    </p>
                    <p class="text-seven4 font-semibold text-xs">
                      {{ item.created_at }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Load More Trigger -->
            <div ref="loadMoreTrigger" class="text-center py-4">
              <span v-if="loading" class="loader">Loading...</span>
              <!-- <span v-else-if="!hasMore">No more notifications</span> -->
            </div>
          </div>
          <div
            v-else
            class="bg-white grid place-items-center w-[90vw] md:w-[400px] lg:w-[600px] xl:w-[860px] fixed z-[999] top-16 max-h-[calc(100vh_-_8rem)] overflow-y-auto left-1/2 -translate-x-1/2 rounded-md py-4 md:py-6 shadow-custom-merged"
          >
            <v-lazy-image :src="noData" alt="no data" class="w-[50px]" />
          </div>
        </section>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import VLazyImage from "v-lazy-image";
import noData from "@/assets/no.webp";
const localePath = useLocalePath();
const switcher = useSwitchLocalePath();
const { locale } = useI18n();

// Access the layout injection (if provided)
// const layoutStore = useLayoutStore();

const showNot = ref(false);
const outSIde = ref();

const showData = () => {
  showNot.value = !showNot.value;
};
onClickOutside(outSIde, (event) => {
  const showDataElement = document.querySelector(".show-data-element"); // Add a class or ref to the showData element
  if (!showDataElement.contains(event.target)) {
    showNot.value = false;
  }
});

// Close the search results when clicking outside

// Search-related refs
const isSearchActive = ref(false);
const searchQuery = ref("");
const searchContainer = ref(null);

// Toggle search bar
const toggleSearch = () => {
  isSearchActive.value = true;
};

// Close search bar
const closeSearch = () => {
  isSearchActive.value = false;
  searchQuery.value = "";
};

// Perform search
const performSearch = () => {
  if (searchQuery.value.trim()) {
    console.log("Searching for:", searchQuery.value);
    // searchQuery.value = "";
  }
};

onClickOutside(searchContainer, () => {
  if (isSearchActive.value) {
    closeSearch();
  }
});

const getBodyAttrs = (localeValue) => ({
  style: {
    direction: localeValue === "ar" ? "rtl" : "ltr",
  },
});

const getHtmlAttrs = (localeValue) => ({
  dir: localeValue === "ar" ? "rtl" : "ltr",
});

useHead({
  bodyAttrs: getBodyAttrs(locale.value),
  htmlAttrs: getHtmlAttrs(locale.value),
});

watch(locale, (newLocale) => {
  useHead({
    bodyAttrs: getBodyAttrs(newLocale),
    htmlAttrs: getHtmlAttrs(newLocale),
  });
});

const authToken = useCookie("authToken");
const type = useCookie("type");
const toast = useToast();

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
    if (response.message === "Unauthenticated.") {
      useCookie("authToken").value = "";
    } else {
      toast.add({
        title: response.message,
        type: "error",
        icon: "i-icon-park-outline-error",
        color: "red",
      });
    }
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

const config = useRuntimeConfig();
const url = config.public.ConstUrl;

const page = ref(1); // Track the current page
const loading = ref(false); // Track loading state
const hasMore = ref(true); // Track if there are more notifications to load
const initialNotifications = ref();

// Fetch initial notifications on the server side
if (authToken.value) {
  const { data } = await useAsyncData("notifications", async () => {
    try {
      const response = await $fetch(`${url}/notifications?page=1`, {
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("errror");

      authToken.value = null;
      await navigateTo(localePath("/login"));
      handleBackendErrors(error.data || { message: error.message });
      return { data: [], meta: {} }; // Return empty data if there's an error
    }
  });

  initialNotifications.value = data.value; // Set the fetched data
} else {
  // If the user is not authenticated, set initialNotifications to an empty structure
  initialNotifications.value = { data: [], meta: {} };
}

// Set initial data for notifications
const data = ref(initialNotifications.value.data);
const meta = ref(initialNotifications.value.meta);

// Fetch more notifications on the client side
const fetchMoreNotifications = async () => {
  if (loading.value || !hasMore.value) return;

  loading.value = true;
  try {
    const response = await $fetch(
      `${url}/notifications?page=${page.value + 1}`,
      {
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
      }
    );

    if (response.data.data.length > 0) {
      data.value = [...data.value, ...response.data.data]; // Append new notifications
      meta.value = response.data.meta;
      page.value++; // Increment page for the next fetch
    } else {
      hasMore.value = false; // No more notifications to load
    }
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  } finally {
    loading.value = false;
  }
};

// Mark a notification as read
const markAsRead = async (notificationId) => {
  try {
    // Send a request to mark the specific notification as read
    const response = await $fetch(
      `${url}/notifications/${notificationId}/read`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
      }
    );

    if (response.status) {
      // Update the local state to mark the specific notification as read
      data.value = data.value.map((item) =>
        item.id === notificationId ? { ...item, readIs: true } : item
      );
    }
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  }
};

// Mark all notifications as read
const markAllAsRead = async () => {
  try {
    // Send a request to mark all notifications as read
    const response = await $fetch(`${url}/notifications/all-read`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });

    if (response.status) {
      // Update the local state to mark all notifications as read
      data.value = data.value.map((item) => ({
        ...item,
        readIs: true, // Set readIs to true for all notifications
      }));

      // Optionally, refresh the notifications list from the server
      await fetchMoreNotifications();
    }
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  }
};

// Computed properties to filter notifications
const newNotifications = computed(() => {
  return data.value.filter((item) => !item.readIs);
});
// console.log(newNotifications.value.length);

const previousNotifications = computed(() => {
  return data.value.filter((item) => item.readIs);
});

// Intersection Observer to load more notifications
const loadMoreObserver = ref(null);
const loadMoreTrigger = ref(null);

onMounted(() => {
  // Set up Intersection Observer
  loadMoreObserver.value = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value) {
        fetchMoreNotifications(); // Fetch more notifications
      }
    },
    { threshold: 1.0 }
  );

  if (loadMoreTrigger.value) {
    loadMoreObserver.value.observe(loadMoreTrigger.value);
  }
});

onUnmounted(() => {
  if (loadMoreObserver.value) {
    loadMoreObserver.value.disconnect();
  }
});

const dataVal = ref();
watch(
  () => searchQuery.value,
  async (newQuery) => {
    if (!newQuery || newQuery.trim().length < 3) {
      dataVal.value = null; // Clear results for empty input
      return;
    }

    try {
      // console.log(newQuery);
      const response = await $fetch(
        `${url}/search-comics-home?name=${newQuery}`,
        {
          headers: {
            "X-Localization": locale.value,
          },
        }
      );
      dataVal.value = response.data;
    } catch (error) {
      console.error("Search fetch error:", error);
      dataVal.value = null;
    }
  }
);

const nuxtApp = useNuxtApp();
if (authToken.value) {
  const { data: roles } = await useFetch(`${url}/info-user`, {
    headers: {
      Authorization: `Bearer ${useCookie("authToken").value}`,
    },
    getCachedData: (key) => {
      return nuxtApp?.payload?.data[key] || nuxtApp?.static?.data[key];
    },
  });
  useCookie("type", { maxAge: 7776000 }).value = roles.value.data.role;
}
</script>

<style scoped>
/* Shared transition */
.search-enter-active,
.search-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.search-enter-to,
.search-leave-from {
  opacity: 1;
  transform: scale(1);
}

.search2-enter-active,
.search2-leave-active {
  transition:
    opacity 0.3s ease,
    filter 0.3s ease;
}
.search2-enter-from,
.search2-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.search2-enter-to,
.search2-leave-from {
  opacity: 1;
  filter: blur(0rem);
}

/* clears the ‘X’ from Internet Explorer */
input[type="search"]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}
input[type="search"]::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}
/* clears the ‘X’ from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
</style>
