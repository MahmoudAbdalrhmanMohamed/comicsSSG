<template>
  <div class="lg:hidden flex items-center gap-3 flex-row-reverse">
    <!-- Hamburger Icon -->
    <transition name="fade">
      <svg
        v-show="!show"
        @click="toggleMenu"
        class="cursor-pointer my-auto text-ea"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
      </svg>
    </transition>

    <div
      v-if="authToken"
      class="relative show-data-element cursor-pointer"
      @click="showData"
    >
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

    <div ref="searchContainer" class="relative w-[180px] flex justify-end">
      <teleport to="#teleports">
        <div
          v-if="searchQuery.length >= 3 && dataVal?.length"
          class="fixed bg-color14/60 z-[999] top-16 overflow-y-scroll max-w-xs md:max-w-[500px] h-[50vh] left-1/2 -translate-x-1/2 rounded-md py-2 px-3 space-y-4 backdrop-blur-3xl w-max"
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
      </teleport>
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
          :class="!isSearchActive ? 'w-0' : 'w-full'"
          class="flex items-center transition-all duration-500 gap-2 border rounded-lg px-3 py-1 border-bf shadow-sm shadow-zeroD"
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
    <!-- Menu Overlay (Teleported) -->
    <teleport to="#teleports">
      <transition name="fade">
        <div
          data-allow-mismatch="node"
          v-show="show"
          class="fixed space-y-1 right-0 top-0 z-[9999] bg-color14/60 backdrop-blur-md font-bold text-[20px] w-full min-h-full text-white flex flex-col justify-center items-start p-5 shadow-lg"
        >
          <!-- Navigation Links -->
          <NuxtLink
            :to="localePath('/')"
            class="py-2 px-4 text-white hover:text-d36 transition-all duration-300"
            @click="toggleMenu"
          >
            {{ $t("footer.home") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/ask')"
            v-if="authToken"
            class="py-2 px-4 text-white hover:text-d36 transition-all duration-300"
            @click="toggleMenu"
          >
            {{ $t("askSmall") }}
          </NuxtLink>
          <NuxtLink
            :to="
              localePath(
                `/publisher/${locale === 'en' ? config.public.MarvelEn : config.public.MarvelAr}`
              )
            "
            @click="toggleMenu"
            class="py-2 px-4 text-white hover:text-d36 transition-all duration-300"
          >
            {{ $t("publishers.marvel") }}
          </NuxtLink>
          <NuxtLink
            :to="
              localePath(
                `/publisher/${locale === 'en' ? config.public.DcEn : config.public.DcAr}`
              )
            "
            @click="toggleMenu"
            class="py-2 px-4 text-white hover:text-d36 transition-all duration-300"
          >
            {{ $t("publishers.dc") }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/publishers')"
            @click="toggleMenu"
            class="py-2 px-4 text-white hover:text-d36 transition-all duration-300"
          >
            {{ $t("footer.otherComics") }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/search')"
            class="py-2 px-4 text-white hover:text-d36 transition-all duration-300"
            @click="toggleMenu"
          >
            {{ $t("menu.search") }}
          </NuxtLink>

          <NuxtLink
            :to="localePath('/blogs')"
            class="py-2 px-4 text-white hover:text-d36 transition-all duration-300"
            @click="toggleMenu"
          >
            {{ $t("blogs.name") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/uploadcomic')"
            class="py-2 px-4 text-white hover:text-d36 transition-all duration-300"
            @click="toggleMenu"
            v-if="authToken && type === 'translator'"
          >
            {{ $t("tooltip.uploadComic") }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/uploadchapter')"
            class="py-2 px-4 text-white hover:text-d36 transition-all duration-300"
            @click="toggleMenu"
            v-if="authToken && type === 'translator'"
          >
            {{ $t("tooltip.uploadChapter") }}
          </NuxtLink>

          <!-- Locale Switch -->
          <SwitchLocalePathLink
            :locale="locale === 'ar' ? 'en' : 'ar'"
            class="py-2 px-4 text-white hover:text-d36 flex items-center transition-all duration-300"
            @click="toggleMenu"
          >
            <p class="mr-2">{{ $t("lang") }}</p>
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
          </SwitchLocalePathLink>

          <div
            class="border-t border-b border-t-three0 py-4 px-4 border-b-three0 w-full"
          >
            <p v-if="!authToken" class="text-d36 uppercase font-medium">
              {{ $t("signup") }}
            </p>
            <p v-if="authToken" class="text-d36 uppercase font-medium">
              {{ $t("menu.account") }}
            </p>

            <div class="flex ps-4 flex-wrap gap-4 *:block">
              <NuxtLink
                v-if="!authToken"
                :to="localePath('/login')"
                class="py-2 px-4 text-white capitalize hover:text-d36 transition-all duration-300"
                @click="toggleMenu"
              >
                {{ $t("login") }}
              </NuxtLink>
              <NuxtLink
                v-if="!authToken"
                :to="localePath('/signup')"
                class="py-2 px-4 text-white capitalize hover:text-d36 transition-all duration-300"
                @click="toggleMenu"
              >
                {{ $t("signup") }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/account')"
                v-if="authToken"
                class="py-2 px-4 text-white hover:text-d36 transition-all duration-300"
                @click="toggleMenu"
              >
                {{ $t("menu.account") }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/history')"
                v-if="authToken"
                class="py-2 px-4 text-white hover:text-d36 transition-all duration-300"
                @click="toggleMenu"
              >
                {{ $t("accountPage.history") }}
              </NuxtLink>
            </div>
          </div>
          <div class="px-4 w-full py-4">
            <p class="text-d36 uppercase font-medium">{{ $t("social") }}</p>
            <div class="flex gap-4 pt-2">
              <NuxtLink
                data-allow-mismatch="children"
                to="https://www.facebook.com/share/1EJSTjFNRD/"
                class="uppercase text-white hover:text-d36 transition-all duration-300"
                @click="toggleMenu"
                target="_blank"
                aria-label="link"
              >
                <Icon name="line-md:facebook" size="2rem" />
              </NuxtLink>
              <NuxtLink
                data-allow-mismatch="children"
                to="https://www.reddit.com/user/YSK_Comics/submitted/?utm_source=share&utm_medium=mweb3x&utm_name=mweb3xcss&utm_term=1&utm_content=share_button"
                class="uppercase text-white hover:text-d36 transition-all duration-300"
                @click="toggleMenu"
                target="_blank"
                aria-label="link"
              >
                <Icon name="line-md:reddit-loop" size="2rem" />
              </NuxtLink>
              <NuxtLink
                data-allow-mismatch="children"
                to="https://www.instagram.com/ysk_comics?igsh=MXdyendvZDE4M2s3ag=="
                class="uppercase text-white hover:text-d36 transition-all duration-300"
                @click="toggleMenu"
                target="_blank"
                aria-label="link"
              >
                <Icon name="line-md:instagram" size="2rem" />
              </NuxtLink>
              <NuxtLink
                data-allow-mismatch="children"
                to="https://pin.it/7FXfotr6Q"
                class="uppercase text-white hover:text-d36 transition-all duration-300"
                @click="toggleMenu"
                target="_blank"
                aria-label="link"
              >
                <Icon name="fa6-brands:pinterest-p" size="2rem" />
              </NuxtLink>
            </div>
          </div>
          <NuxtLink
            to="https://www.megatron-soft.com/en"
            aria-label="link"
            class="text-white relative top-full h-full self-end w-full py-2 text-center text-xs font-light mt-4"
          >
            {{ $t("© 2024 Megatron Soft. All rights reserved.") }}
          </NuxtLink>
        </div>
      </transition>
      <!-- Close Icon -->
      <svg
        class="cursor-pointer my-auto text-white z-[9999] fixed top-4 right-4"
        @click="toggleMenu"
        v-show="show"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
        />
      </svg>
      <!-- Overlay -->
      <div
        v-show="show"
        class="bg-[rgba(0,0,0,0.3)] backdrop-blur-lg fixed top-0 left-0 min-w-full min-h-full z-[99]"
        @click="toggleMenu"
      ></div>
    </teleport>

    <teleport to="#teleports">
      <transition name="search2">
        <section ref="outSIde" v-if="showNot">
          <div
            v-if="initialNotifications?.data?.length > 0"
            class="bg-white block w-[90vw] md:w-[400px] lg:w-[600px] xl:w-[860px] fixed z-[999] top-16 max-h-[calc(100vh_-_8rem)] overflow-y-auto left-1/2 -translate-x-1/2 rounded-md py-4 md:py-6 shadow-custom-merged"
          >
            <div class="flex justify-between items-center px-4 xl:px-6">
              <p class="text-Dc text-base capitalize font-semibold">
                {{ $t("notifications.newForYou") }}
              </p>
              <p
                class="capitalize cursor-pointer hover:opacity-50 transition-all duration-300 text-xs text-seven4 font-semibold"
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
                class="flex relative items-center justify-between px-2 py-2 transition-all duration-300 hover:bg-gray-100 cursor-pointer"
              >
                <div class="flex items-center gap-2">
                  <NuxtImg
                    v-if="!item.image"
                    :placeholder="[18, 18, 5, 5]"
                    fit="cover"
                    width="18"
                    height="18"
                    :alt="$t('alt.notificationImage')"
                    densities="x1"
                    loading="lazy"
                    src="/smallLogo.svg"
                    class="w-[18px] h-[18px] object-cover"
                  />
                  <NuxtImg
                    v-else
                    :placeholder="[18, 18, 5, 5]"
                    fit="cover"
                    width="18"
                    height="18"
                    :alt="$t('alt.notificationImage')"
                    densities="x1"
                    loading="lazy"
                    :src="item.image"
                    class="w-[18px] h-[18px] rounded-full object-cover"
                  />
                  <div class="space-y-1">
                    <p class="text-two2 font-semibold text-xs">
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
            <div v-if="previousNotifications?.length" class="py-3">
              <div
                v-for="(item, index) in previousNotifications"
                :key="index"
                class="flex relative items-center justify-between px-2 py-2 transition-all duration-300 hover:bg-gray-100 cursor-pointer"
              >
                <div class="flex items-center gap-4">
                  <NuxtImg
                    v-if="!item.image"
                    :placeholder="[18, 18, 5, 5]"
                    fit="cover"
                    width="18"
                    height="18"
                    :alt="$t('alt.notificationImage')"
                    densities="x1"
                    loading="lazy"
                    src="/smallLogo.svg"
                    class="w-[18px] h-[18px] object-cover"
                  />
                  <NuxtImg
                    v-else
                    :placeholder="[18, 18, 5, 5]"
                    fit="cover"
                    width="18"
                    height="18"
                    :alt="$t('alt.notificationImage')"
                    densities="x1"
                    loading="lazy"
                    :src="item.image"
                    class="w-[18px] h-[18px] rounded-full object-cover"
                  />
                  <div class="space-y-1">
                    <p class="text-two2 font-semibold text-sm">
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
            <v-lazy-image :src="noData" alt="no data" calss="w-[50px]" />
          </div>
        </section>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import VLazyImage from "v-lazy-image";
import noData from "@/assets/no.webp";
const isSearchActive = ref(false);
const showNot = ref(false);
const outSIde = ref(false);
const searchQuery = ref("");
const searchContainer = ref(null);
// Toggle search bar
const toggleSearch = () => {
  isSearchActive.value = true;
};

const showData = () => {
  showNot.value = !showNot.value;
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
onClickOutside(outSIde, (event) => {
  const showDataElement = document.querySelector(".show-data-element"); // Add a class or ref to the showData element
  if (!showDataElement.contains(event.target)) {
    showNot.value = false;
  }
});
const show = ref(false);
const localePath = useLocalePath();
// const switchLocalePath = useSwitchLocalePath();

const toggleMenu = () => {
  show.value = !show.value;
};
const authToken = useCookie("authToken");
const type = useCookie("type");

const config = useRuntimeConfig();
const { locale } = useI18n();

const url = config.public.ConstUrl;
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
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}

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
