<template>
  <div class="flex cursor-pointer justify-end">
    <VCalendarDatePicker
      v-if="date && date.start && date.end"
      v-model.range="date"
      :columns="2"
      v-bind="{ ...attrs, ...$attrs }"
      @dayclick="onDayClick"
    />
    <VCalendarDatePicker
      v-else
      v-model="date"
      v-bind="{ ...attrs, ...$attrs }"
      @dayclick="onDayClick"
    />
  </div>
</template>

<script setup>
import { DatePicker as VCalendarDatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    default: null,
  },
});

const emit = defineEmits(["update:model-value", "close"]);

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:model-value", value);
    emit("close");
  },
});

const attrs = {
  transparent: true, // Make background transparent
  borderless: true, // Remove borders
  color: "blue",
  // "is-dark": { selector: "html", darkClass: "dark" },
  "first-day-of-week": 2,
};

function onDayClick(_, event) {
  const target = event.target;
  target.blur();
}
</script>

<style scoped>
.vc-highlight-content-solid {
  background: blue !important;
}
</style>
