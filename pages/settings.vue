<template>
  <div
    data-aos="fade-up"
    data-aos-duration="500"
    data-aos-easing="ease-out-cubic"
    class="w-full bg-oneA rounded p-14 space-y-6 h-fit"
  >
    <p class="text-white font-bold text-base tracking-[5%]">
      {{ $t("deleteAccount.title") }}
    </p>
    <p class="text-bf font-medium text-base">
      {{ $t("deleteAccount.description") }}
    </p>
    <p
      @click="isOpen = true"
      class="text-f0d cursor-pointer w-fit hover:opacity-60 transition-all duration-300 text-base font-semibold"
    >
      {{ $t("deleteAccount.deletePrompt") }}
    </p>
    <UModal v-model="isOpen">
      <div class="bg-white rounded p-14">
        <p class="font-semibold text-2xl text-color14 text-center">
          {{ $t("deleteAccount.confirmationTitle") }}
        </p>
        <div class="flex items-center justify-center gap-4 pt-4">
          <button
            @click="del"
            type="button"
            class="border transition-all duration-300 text-three0 active:bg-red-500 active:text-white hover:bg-red-500 hover:text-white border-a0 rounded-lg px-8 py-4"
          >
            {{ $t("deleteAccount.confirmButton") }}
          </button>
          <button
            type="button"
            @click="isOpen = false"
            class="border transition-all duration-300 bg-d36 active:bg-transparent active:text-three0 text-white hover:bg-transparent hover:text-three0 border-d36 hover:border-a0 rounded-lg px-8 py-4"
          >
            {{ $t("deleteAccount.cancelButton") }}
          </button>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup>
const { t } = useI18n();
definePageMeta({
  layout: "account",
  middleware: ["auth"],
  name: "settings",
});
// defineRouteRules({
//   prerender: true,
// });

const { handleBackendErrors } = useBackendErrors();

const isOpen = ref(false);
const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const toast = useToast();

const del = async () => {
  try {
    const { data } = await useLazyFetch(`${url}/delete-account`, {
      headers: {
        Authorization: `Bearer ${useCookie("authToken").value}`,
      },
    });
    isOpen.value = false;
    toast.add({
      title: data.value.message,
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
  } catch (error) {
    handleBackendErrors(error.data || { message: error.message });
  }
};
</script>
