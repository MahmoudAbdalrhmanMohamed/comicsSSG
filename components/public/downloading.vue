<template>
  <teleport to="#teleports">
    <transition name="download-fade">
      <div
        v-if="show"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div class="relative download-loader-container">
          <!-- Animated loader -->
          <div class="download-loader">
            <div class="download-spinner"></div>
            <div
              class="download-progress"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>

          <!-- Download status text -->
          <div class="download-status">
            <p class="download-message">{{ message }}</p>
            <p class="download-percentage">{{ progress.toFixed(2) }}%</p>
          </div>

          <!-- Cool animated background effect -->
          <div class="download-particles">
            <div
              v-for="i in 12"
              :key="i"
              class="download-particle"
              :style="{
                transform: `rotate(${i * 30}deg) translateY(-20px)`,
                animationDelay: `${i * 0.1}s`,
              }"
            ></div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
});

const show = ref(false);
const message = ref("Preparing download...");
const messages = [
  "Almost there...",
  "Getting things ready...",
  "Your download is on its way!",
  "Just a moment longer...",
  "Wrapping things up...",
];

// Watch loading state
watch(
  () => props.loading,
  (newVal) => {
    show.value = newVal;
    if (newVal) {
      startMessageRotation();
    }
  }
);

// Watch progress to update message
watch(
  () => props.progress,
  (newVal) => {
    if (newVal < 30) {
      message.value = "Starting download...";
    } else if (newVal < 70) {
      message.value = "Downloading...";
    } else {
      message.value = "Finalizing...";
    }
  }
);

// Rotate messages while loading
let messageInterval;
const startMessageRotation = () => {
  let counter = 0;
  messageInterval = setInterval(() => {
    counter = (counter + 1) % messages.length;
    message.value = messages[counter];
  }, 3000);
};

onMounted(() => {
  return () => {
    if (messageInterval) clearInterval(messageInterval);
  };
});
</script>

<style scoped>
/* Transition effects */
.download-fade-enter-active,
.download-fade-leave-active {
  transition: opacity 0.3s ease;
}
.download-fade-enter-from,
.download-fade-leave-to {
  opacity: 0;
}

/* Main container */
.download-loader-container {
  width: 300px;
  padding: 2rem;
  background: rgba(20, 20, 30, 0.9);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

/* Loader bar */
.download-loader {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  position: relative;
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.download-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* Spinner animation */
.download-spinner {
  position: absolute;
  top: -20px;
  right: -10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #7c3aed;
  animation: pulse 1.5s infinite;
  box-shadow: 0 0 10px #7c3aed;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.7;
  }
}

/* Status text */
.download-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.download-message {
  color: white;
  font-weight: 500;
  font-size: 1rem;
}

.download-percentage {
  color: #a5b4fc;
  font-weight: 600;
  font-size: 1rem;
}

/* Particles animation */
.download-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.download-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: rgba(124, 58, 237, 0.6);
  border-radius: 50%;
  animation: particle-pulse 1.5s infinite;
  opacity: 0;
}

@keyframes particle-pulse {
  0% {
    transform: rotate(0) translateY(-20px) scale(0.5);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(0) translateY(-60px) scale(1.2);
    opacity: 0;
  }
}
</style>
