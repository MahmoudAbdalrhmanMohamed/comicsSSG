<template>
  <div ref="tooltipTrigger" class="relative inline-block">
    <!-- Tooltip Trigger -->
    <div @mouseenter="showTooltip" @mouseleave="hideTooltip">
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
          class="tooltip-content font-semibold flex flex-col px-4 py-2 bg-white rounded-md shadow-lg fixed z-[9999] text-color14 text-sm divide-y divide-gray-400"
        >
          {{ $t("ask") }}
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>

const props = defineProps({
  position: { type: String, default: "bottom" },
});

const isVisible = ref(false);
const tooltipStyle = ref({});
const tooltipTrigger = ref(null);

// Show Tooltip
const showTooltip = (event) => {
  isVisible.value = true;
  nextTick(() => {
    const rect = event.target.getBoundingClientRect();
    tooltipStyle.value = getTooltipPosition(rect);
  });
};

// Hide Tooltip
const hideTooltip = () => {
  isVisible.value = false;
};

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
</style>
