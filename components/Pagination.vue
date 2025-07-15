<template>
  <div
    class="flex justify-center items-center space-x-2 mt-8"
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
  >
    <!-- Previous Page -->
    <button
      @click="handlePageChange(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      :class="{ 'order-last': $i18n.locale === 'ar' }"
    >
      <span class="sr-only">{{ $t("pagination.previous") }}</span>
      <i
        class="fas"
        :class="$i18n.locale === 'ar' ? 'fa-chevron-right' : 'fa-chevron-left'"
      ></i>
    </button>

    <!-- Page Numbers -->
    <template v-for="page in displayedPages" :key="page">
      <button
        v-if="page !== '...'"
        @click="handlePageChange(page)"
        :class="[
          'px-4 py-2 rounded-lg border',
          currentPage === page
            ? 'bg-primary text-white border-primary'
            : 'border-gray-300 hover:bg-gray-50',
        ]"
      >
        {{ page }}
      </button>
      <span v-else class="px-2">...</span>
    </template>

    <!-- Next Page -->
    <button
      @click="handlePageChange(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      :class="{ 'order-first': $i18n.locale === 'ar' }"
    >
      <span class="sr-only">{{ $t("pagination.next") }}</span>
      <i
        class="fas"
        :class="$i18n.locale === 'ar' ? 'fa-chevron-left' : 'fa-chevron-right'"
      ></i>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  maxVisiblePages: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["update:currentPage"]);

const handlePageChange = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit("update:currentPage", page);
  }
};

const displayedPages = computed(() => {
  const pages = [];
  const halfVisible = Math.floor(props.maxVisiblePages / 2);

  let start = Math.max(1, props.currentPage - halfVisible);
  let end = Math.min(props.totalPages, start + props.maxVisiblePages - 1);

  if (end - start + 1 < props.maxVisiblePages) {
    start = Math.max(1, end - props.maxVisiblePages + 1);
  }

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < props.totalPages) {
    if (end < props.totalPages - 1) pages.push("...");
    pages.push(props.totalPages);
  }

  return pages;
});
</script>
