<template>
  <div class="flex">
    <button
      v-for="star in 5"
      :key="star"
      :class="[
        ' flex items-center justify-center rounded-full transition duration-200',
        star <= rating ? ' text-d36' : ' text-d36',
      ]"
      @click="setRating(star)"
      @mouseenter="hoverRating = star"
      @mouseleave="hoverRating = 0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        :fill="star <= (hoverRating || rating) ? 'currentColor' : 'none'"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.188c.969 0 1.371 1.24.588 1.81l-3.4 2.477a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.4-2.477a1 1 0 00-1.175 0l-3.4 2.477c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.49 9.393c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 00.95-.69l1.286-3.966z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(["stars"]);

const rating = ref(0);
const hoverRating = ref(0);

const setRating = (star) => {
  rating.value = star;
  emit("stars", rating);
};
</script>
