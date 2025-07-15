import { useI18n } from "vue-i18n";

export async function useFetchData(urlParam = "settings") {
  const config = useRuntimeConfig();
  const url = `${config.public.ConstUrl}/${urlParam}`;
  const nuxtApp = useNuxtApp();
  const { locale } = useI18n();

  const { data, error, status } = await useLazyFetch(url, {
    headers: {
      // "K-secret": config.public.apiSecret,
      "X-localization": locale,
      Authorization: `Bearer ${useCookie("authToken")}`,
    },
    getCachedData: (key) => {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });

  if (error.value) {
    console.log("Error fetching data:", data.value);
    // handleBackendErrors(data.value);
  } else {
    return { data, status };
  }
}
const toast = useToast(); // Initialize toast

const handleBackendErrors = (response) => {
  if (response.errors) {
    // Handle structured errors
    Object.entries(response.errors).forEach(([field, messages]) => {
      messages.forEach((message) => {
        toast.add(message, {
          icon: "i-icon-park-outline-error", // Custom icon
        });
      });
    });
  } else if (response.message) {
    // Handle generic error message
    toast.add(response.message, {
      icon: "i-icon-park-outline-error", // Custom icon
    });
  } else {
    // Handle unknown error structure
    toast.add("An unknown error occurred. Please try again.", {
      icon: "i-icon-park-outline-error", // Custom icon
    });
  }
};
