<template>
  <UPopover :popper="{ placement: 'bottom-start', scroll: false }">
    <UButton
      class="datepicker-button w-full px-4 py-3 justify-between flex-row-reverse"
      icon="i-heroicons-calendar-days-20-solid"
      >{{ date ? format(date, "dd, MM, yyy") : "DD/MM/YYYY" }}</UButton
    >
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
import { format } from "date-fns";
const date = ref();
const attrs = {
  color: "primary",
  "first-day-of-week": 1,
};

// const popover = ref(null);

watch(date, (newDate) => {
  emit("newDate", newDate);
});
</script>

<style scoped>
.datepicker-button {
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #595959;
  background-color: white !important;
  color: #141414 !important;
}
</style>
