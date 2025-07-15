<template>
  <UPopover :popper="{ placement: 'bottom' }">
    <UButton
      class="datepicker-button w-full px-4 py-3 justify-end hahahaahah"
      icon="i-heroicons-calendar-days-20-solid"
      
    />
    <template #panel="{ close }">
      <PublicDatePicker
        v-model="date"
        is-required
        :attributes="attrs"
        @close="close"
      />
    </template>
  </UPopover>
</template>

<script setup>
const emit = defineEmits(["newDate"]);

const date = ref(null); // Date model
const attrs = {
  color: "primary",
  "first-day-of-week": 1,
};

// const popover = ref(null);

watch(date, (newDate) => {
  emit("newDate", newDate);
});

// // Expose a method to open the popover
// const openPopover = () => {
//   if (popover.value) {
//     console.log(popover.value.trigger);

//     popover.value.trigger; // Ensure this matches the method used by UPopover
//   }
// };

// defineExpose({
//   open: openPopover, // Expose the `open` method to the parent
// });
</script>

<style scoped>
.datepicker-button {
  background: transparent !important; /* Transparent background */
  border: none; /* Remove button borders */
  color: #222222 !important; /* Icon color */
  font-size: 0; /* Hide value display */
}
</style>
