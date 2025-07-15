<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton
      class="datepicker-button w-full px-4 py-3 justify-between flex-row-reverse"
      icon="i-heroicons-calendar-days-20-solid"
      >{{ formattedDate || "MMM/YYYY" }}</UButton
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
const props = defineProps({
  dateing: {
    type: Date,
    default: () => null,
  },
});

const emit = defineEmits(["newDate"]);
import { format } from "date-fns";
const date = ref(props.dateing);
const attrs = {
  color: "primary",
  "first-day-of-week": 1,
};

const formattedDate = computed(() => {
  return date.value
    ? format(new Date(date.value), "dd, MM, yyy")
    : "DD/MM/YYYY";
});

watch(date, (newDate) => {
  emit("newDate", newDate);
});
</script>

<style scoped>
.datepicker-button {
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #595959;
  background-color: #eaeaea !important;
  color: #747474 !important;
}
</style>
