<template>
  <div ref="tooltipTrigger" class="relative inline-block">
    <!-- Tooltip Trigger -->
    <div @click="toggleTooltip">
      <slot />
    </div>

    <!-- Tooltip Content Teleported to Body -->
    <teleport to="#teleports">
      <transition name="fade">
        <div
          v-if="isVisible"
          ref="tooltipContent"
          :style="tooltipStyle"
          role="tooltip"
          class="tooltip-content font-semibold flex flex-col px-4 py-2 bg-white rounded-md shadow-lg fixed z-50 text-color14 text-sm divide-y divide-gray-400"
        >
          <NuxtLink
            :to="localePath('/uploadcomic')"
            class="hover:opacity-70 py-2"
            >{{ $t("tooltip.uploadComic") }}</NuxtLink
          >
          <NuxtLink
            :to="localePath('/uploadchapter')"
            class="hover:opacity-70 py-2"
            >{{ $t("tooltip.uploadChapter") }}</NuxtLink
          >
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  position: { type: String, default: "bottom" },
});

const localePath = useLocalePath();
const isVisible = ref(false);
const tooltipStyle = ref({});
const tooltipTrigger = ref(null);

// Toggle Tooltip Visibility
const toggleTooltip = (event) => {
  isVisible.value = !isVisible.value;
  if (isVisible.value) {
    nextTick(() => {
      const rect = event.target.getBoundingClientRect();
      tooltipStyle.value = getTooltipPosition(rect);
    });
  }
};

// Close Tooltip on Outside Click
onClickOutside(tooltipTrigger, () => {
  isVisible.value = false;
});

// Dynamic Position Calculation
const getTooltipPosition = (rect) => {
  const positions = {
    top: { top: `${rect.top - 50}px`, left: `${rect.left + rect.width / 2}px` },
    bottom: {
      top: `${rect.bottom + 10}px`,
      left: `${rect.left + rect.width / 2}px`,
    },
  };
  return positions[props.position];
};
</script>

<style scoped>
/* Tooltip Style */
.tooltip-content {
  transform: translateX(-50%);
  pointer-events: auto; /* Allow clicking inside the tooltip */
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Bounce Transition */
.bounce-enter-active,
.bounce-leave-active {
  transition: opacity 0.4s;
}

.bounce-enter-from,
.bounce-leave-to {
  opacity: 0;
}

/* Slide Down Transition */
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
