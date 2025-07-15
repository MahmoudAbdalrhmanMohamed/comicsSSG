<template>
  <div class="overflow-hidden">
    <HeaderComponent />
    <div class="relative accountClass">
      <img
        class="absolute w-full h-full object-cover -z-30 scale-105 top-0"
        :src="asset"
        :alt="$t('backgroundImageAlt')"
        loading="lazy"
        placeholder="blur"
      />
      <div class="bg-black/80 w-full h-full absolute top-0 left-0 -z-20"></div>
      <section
        class="containerClass pt-32 flex flex-col lg:flex-row gap-6 pb-8 w-full"
      >
        <div
          class="bg-oneA hidden lg:block border h-fit min-w-[302px] max-w-[302px] border-three0 rounded px-6 py-11"
        >
          <div class="space-y-4">
            <nuxt-link
              v-for="(item, index) in sidebar"
              :to="localePath(item.value)"
              @click="active = index"
              :key="index"
              class="text-bf block cursor-pointer rounded py-3 px-4 hover:px-6 hover:text-color14 hover:bg-fc transition-all duration-300 font-medium text-lg"
            >
              {{ $t(`accountPage.${item.label}`) }}
            </nuxt-link>
            <p
              :key="5"
              @click="
                active = 5;
                isOpen = true;
              "
              class="text-bf hover:px-6 cursor-pointer rounded py-3 px-4 hover:text-color14 hover:bg-fc transition-all duration-300 font-medium text-lg"
            >
              {{ $t("accountPage.logOut") }}
            </p>
            <UModal v-model="isOpen">
              <div class="bg-white rounded p-14">
                <p class="font-semibold text-2xl text-color14 text-center">
                  {{ $t("accountPage.confirmLogout") }}
                </p>
                <div class="flex items-center justify-center gap-4 pt-4">
                  <button
                    @click="submit"
                    type="button"
                    class="border transition-all outline-none duration-300 text-three0 active:bg-red-500 active:text-white hover:bg-red-500 hover:text-white border-a0 rounded-lg px-8 py-4"
                  >
                    {{ $t("accountPage.yesSure") }}
                  </button>
                  <button
                    type="button"
                    @click="isOpen = false"
                    class="border outline-none transition-all duration-300 bg-d36 active:bg-transparent active:text-three0 text-white hover:bg-transparent hover:text-three0 border-d36 hover:border-a0 rounded-lg px-8 py-4"
                  >
                    {{ $t("accountPage.cancel") }}
                  </button>
                </div>
              </div>
            </UModal>
          </div>
          <div v-if="test" class="space-y-4 px-4">
            <svg
              class="w-full my-4 h-[1px] bg-three0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0" y1="0" x2="300" y2="200" />
            </svg>

            <nuxt-link
              :to="localePath('/translator-request')"
              class="border-five9 block text-center transition-all duration-300 hover:bg-fc hover:text-color14 border rounded-lg w-full py-4 text-white font-semibold"
            >
              {{ $t("accountPage.becomeTranslator") }}
            </nuxt-link>
          </div>
        </div>
        <div class="lg:hidden">
          <div class="space-y-2 relative accountClassSmall" v-auto-animate>
            <!-- Trigger Button -->
            <button
              @click.prevent="toggleDropdown"
              type="button"
              class="outline-none border border-five9 px-4 py-3 text-base font-medium text-oneA rounded bg-white w-full flex justify-between items-center"
            >
              {{ route.meta.name || $t("accountPage.selectOption") }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-oneA transition-all duration-500"
                :class="dropdownOpen ? 'rotate-180' : ''"
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
            <transition name="fade">
              <div
                v-show="dropdownOpen"
                class="absolute z-50 bg-white text-[#1A1A1A] rounded shadow-lg mt-2 w-full"
              >
                <ul>
                  <li
                    v-for="(item, index) in sidebar"
                    :key="index"
                    @click="selectMenuItem(item)"
                    class="hover:bg-gray-400 transition-all duration-300 hover:px-2 cursor-pointer rounded-lg"
                  >
                    <nuxt-link
                      :to="localePath(item.value)"
                      class="block px-4 py-2 w-full text-[#1A1A1A]"
                    >
                      {{ $t(`accountPage.${item.label}`) }}
                    </nuxt-link>
                  </li>
                  <li
                    :key="5"
                    @click="
                      active = 5;
                      isOpen = true;
                    "
                    class="hover:bg-gray-400 px-4 py-2 w-full text-[#1A1A1A] transition-all duration-300 hover:px-6 cursor-pointer rounded-lg"
                  >
                    {{ $t("accountPage.logOut") }}
                  </li>
                  <UModal v-model="isOpen">
                    <div class="bg-white rounded p-14">
                      <p
                        class="font-semibold text-2xl text-color14 text-center"
                      >
                        {{ $t("accountPage.confirmLogout") }}
                      </p>
                      <div class="flex items-center justify-center gap-4 pt-4">
                        <button
                          @click="submit"
                          type="button"
                          class="border transition-all outline-none duration-300 text-three0 active:bg-red-500 active:text-white hover:bg-red-500 hover:text-white border-a0 rounded-lg px-8 py-4"
                        >
                          {{ $t("accountPage.yesSure") }}
                        </button>
                        <button
                          type="button"
                          @click="isOpen = false"
                          class="border outline-none transition-all duration-300 bg-d36 active:bg-transparent active:text-three0 text-white hover:bg-transparent hover:text-three0 border-d36 hover:border-a0 rounded-lg px-8 py-4"
                        >
                          {{ $t("accountPage.cancel") }}
                        </button>
                      </div>
                    </div>
                  </UModal>
                </ul>
              </div>
            </transition>
          </div>
        </div>

        <slot></slot>
      </section>

      <LazyFooterComponet hydrate-on-visible />
    </div>
    <PublicLoading :loading="loading" />
  </div>
</template>

<script setup>
import asset from "@/assets/main.webp";
const type = useCookie("type");
const test = ref(type.value === "user");

const { isMobile } = useDevice();

const sidebar = computed(() => {
  if (test.value) {
    if (isMobile) {
      return [
        { label: "personalInfo", value: "/account" },
        { label: "history", value: "/history" },
        { label: "savedItems", value: "/savedItems" },
        { label: "following", value: "/following" },
        { label: "settings", value: "/settings" },
        { label: "becomeTranslator", value: "/translator-request" },
      ];
    } else {
      return [
        { label: "personalInfo", value: "/account" },
        { label: "history", value: "/history" },
        { label: "savedItems", value: "/savedItems" },
        { label: "following", value: "/following" },
        { label: "settings", value: "/settings" },
        // { label: "becomeTranslator", value: "/translator-request" },
      ];
    }
  } else {
    return [
      { label: "personalInfo", value: "/account" },
      { label: "history", value: "/history" },
      { label: "savedItems", value: "/savedItems" },
      { label: "following", value: "/following" },
      { label: "myWork", value: "/mywork" },
      // { label: "comments", value: "/comments" },
      { label: "settings", value: "/settings" },
      // { label: "becomeTranslator", value: "/translator-request" },
    ];
  }
});

const { t } = useI18n();

const active = ref(0);

const localePath = useLocalePath();
const isOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectMenuItem = (item) => {
  selectedLabel.value = t(`accountPage.${item.label}`);
  dropdownOpen.value = false;
};

const dropdownOpen = ref(false);
const selectedLabel = ref(t(`accountPage.${sidebar.value[0].label}`));
const config = useRuntimeConfig();
const url = config.public.ConstUrl;

const router = useRouter();
const loading = ref(false);
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

const submit = async (values) => {
  try {
    isOpen.value = false;
    loading.value = true;

    const response = await $fetch(`${url}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${useCookie("authToken").value}`,
      },
    });

    toast.add({
      title: response.message,
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });

    useCookie("authToken").value = null;
    useCookie("type").value = null;
    useCookie("image").value = null;

    router.replace(localePath("/"));

    // Handle navigation or token storage here if necessary
  } catch (error) {
    // Use the error handler to process backend errors
    handleBackendErrors(error.data || { message: error.message });
  } finally {
    loading.value = false;
  }
};
const layoutStore = useLayoutStore();

layoutStore.setData("account");

const route = useRoute();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(-100px);
  opacity: 0;
  filter: blur(1rem);
}
.fade-enter-to,
.fade-leave-from {
  transform: translateY(0);
  filter: blur(0);
  opacity: 1;
}
</style>
