<template>
  <Transition name="notification">
    <div
      v-if="active"
      class="fixed top-16 end-4 w-80 p-4 rounded-lg shadow-lg border z-60"
      :class="[
        type === 'upload'
          ? 'bg-blue-50 border-blue-100'
          : 'bg-green-50 border-green-100',
        { 'animate-pulse': indeterminate },
      ]"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-center mb-1">
            <p
              class="text-sm font-medium truncate"
              :class="type === 'upload' ? 'text-blue-800' : 'text-green-800'"
            >
              {{ type === "upload" ? "Uploading" : "Downloading" }}:
              {{ fileName }}
            </p>
            <button
              v-if="showClose"
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-500 ml-2"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div
              class="h-2 rounded-full transition-all duration-300 ease-out"
              :class="type === 'upload' ? 'bg-blue-500' : 'bg-green-500'"
              :style="{ width: indeterminate ? '100%' : `${progress}%` }"
            ></div>
          </div>

          <div class="flex justify-between text-xs text-gray-500">
            <span>
              {{
                indeterminate
                  ? "Processing..."
                  : `${formatBytes(processedBytes)} of ${formatBytes(totalBytes)}`
              }}
            </span>
            <span v-if="speed > 0 && !indeterminate">
              {{ speed.toFixed(2) }} MB/s
            </span>
          </div>
        </div>
      </div>

      <div v-if="showCancel" class="flex justify-end mt-2">
        <button
          @click="$emit('cancel')"
          class="text-xs px-2 py-1 rounded hover:bg-opacity-20"
          :class="
            type === 'upload'
              ? 'text-blue-600 hover:bg-blue-200'
              : 'text-green-600 hover:bg-green-200'
          "
        >
          Cancel
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  active: Boolean,
  type: {
    type: String,
    default: "download",
    validator: (value) => ["upload", "download"].includes(value),
  },
  fileName: {
    type: String,
    default: "file",
  },
  progress: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100,
  },
  processedBytes: {
    type: Number,
    default: 0,
  },
  totalBytes: {
    type: Number,
    default: 0,
  },
  speed: {
    type: Number,
    default: 0,
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["cancel", "close"]);

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

.notification-enter-to,
.notification-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
