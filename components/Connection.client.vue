<template>
  <div></div>
</template>

<script setup>
import Pusher from "pusher-js";
import { onMounted, onBeforeUnmount } from "vue";

const emits = defineEmits(["progress"]);
const props = defineProps(["id"]);
const config = useRuntimeConfig();

const url = config.public.ConstUrl;
const localePath = useLocalePath();
const authToken = useCookie("authToken");
const locale = useI18n().locale;
const route = useRoute();
let pusher = null;
let id = null;
let channel = null;

onMounted(async () => {
  if (import.meta.client) {
    try {
      // Initialize Pusher
      const response = await $fetch(`${url}/info-user`, {
        headers: {
          Authorization: `Bearer ${useCookie("authToken").value}`,
        },
      });
      if (response.status) {
        id = response.data.id;
      }
      pusher = new Pusher("03594b985c5c9701cb47", {
        cluster: "eu",
        forceTLS: true,
        authEndpoint: `${url}/admin/broadcasting/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${authToken.value}`,
            "X-localization": locale.value,
          },
        },
      });
      // Subscribe to private channel
      channel = pusher.subscribe(`private-pdf.progress.${id}`);

      // Bind to event
      channel.bind("progress.updated", (data) => {
        if (data) {
          console.log(data);
          emits("progress", data.progress);
        }
      });
    } catch (error) {
      console.error("Error in websocket setup:", error);
      await navigateTo(localePath("/"));
      useCookie("authToken").value = "";
    }
  }
});

onBeforeUnmount(() => {
  if (import.meta.client && pusher && channel) {
    channel.unbind_all();
    channel.unsubscribe();
    pusher.disconnect();
  }
});
</script>
