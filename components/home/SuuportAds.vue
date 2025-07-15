<template>
  <div></div>
</template>

<script setup>
useHead({
  script: [
    {
      src: "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js",
      // tagPosition: "bodyClose", // Optional: loads script at end of body if needed
      "data-name": "BMC-Widget",
      "data-cfasync": "false",
      "data-id": "yskcomics",
      "data-description": "Support me on Buy me a coffee!",
      "data-message":
        "Every donation helps us develop the site, provide more content, and enhance your experience.",
      "data-color": "#FF813F",
      "data-position": "Right",
      "data-x_margin": "18",
      "data-y_margin": "18",
    },
  ],
});
</script>
