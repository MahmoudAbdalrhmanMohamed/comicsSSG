<template>
  <div class="flex items-center">
    <div v-for="star in stars" :key="star" class="relative w-[15px] h-[15px]">
      <!-- Empty Star -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute inset-0 text-gray-300"
        width="15"
        height="15"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m7.625 6.4l2.8-3.625q.3-.4.713-.587T12 2t.863.188t.712.587l2.8 3.625l4.25 1.425q.65.2 1.025.738t.375 1.187q0 .3-.088.6t-.287.575l-2.75 3.9l.1 4.1q.025.875-.575 1.475t-1.4.6q-.05 0-.55-.075L12 19.675l-4.475 1.25q-.125.05-.275.063T6.975 21q-.8 0-1.4-.6T5 18.925l.1-4.125l-2.725-3.875q-.2-.275-.288-.575T2 9.75q0-.625.363-1.162t1.012-.763zM8.85 8.125L4 9.725L7.1 14.2L7 18.975l5-1.375l5 1.4l-.1-4.8L20 9.775l-4.85-1.65L12 4zM12 11.5"
        />
      </svg>
      <!-- Filled Star -->
      <div
        class="absolute inset-0 overflow-hidden"
        :style="{ width: calculateFillWidth(star) + '%' }"
      >
        <svg
          :class="color"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m7.625 6.4l2.8-3.625q.3-.4.713-.587T12 2t.863.188t.712.587l2.8 3.625l4.25 1.425q.65.2 1.025.738t.375 1.187q0 .3-.088.6t-.287.575l-2.75 3.9l.1 4.1q.025.875-.575 1.475t-1.4.6q-.05 0-.55-.075L12 19.675l-4.475 1.25q-.125.05-.275.063T6.975 21q-.8 0-1.4-.6T5 18.925l.1-4.125l-2.725-3.875q-.2-.275-.288-.575T2 9.75q0-.625.363-1.162t1.012-.763z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    required: true,
    validator: (val) => val >= 0 && val <= 5, // Ensure value is within the range
  },
  color: {
    default: "text-d36",
  },
});

const stars = [1, 2, 3, 4, 5];

// Function to calculate the percentage of the star that should be filled
const calculateFillWidth = (star) => {
  if (star <= Math.floor(props.value)) {
    return 100; // Fully filled stars
  } else if (star === Math.ceil(props.value)) {
    return (props.value % 1) * 100; // Partially filled star
  }
  return 0; // Empty stars
};
</script>
