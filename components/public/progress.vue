<template>
  <section v-if="show">
    <teleport to="#teleports">
      <transition name="fade">
        <div
          v-if="shouldShow"
          class="w-screen h-screen z-[99999999] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center"
        >
          <div
            class="w-full left-0 top-0 h-full backdrop-blur-lg bg-black/50 fixed"
          ></div>
          <div class="progress-circle-container">
            <svg class="progress-circle" width="120" height="120">
              <circle
                class="progress-circle-bg"
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                stroke-width="8"
              />
              <circle
                class="progress-circle-fill"
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#progressGradient)"
                stroke-width="8"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="dashOffset"
              />
              <defs>
                <linearGradient
                  id="progressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style="stop-color: #3b82f6; stop-opacity: 1"
                  />
                  <stop
                    offset="50%"
                    style="stop-color: #8b5cf6; stop-opacity: 1"
                  />
                  <stop
                    offset="100%"
                    style="stop-color: #ec4899; stop-opacity: 1"
                  />
                </linearGradient>
              </defs>
            </svg>
            <div class="progress-content">
              <div class="progress-percentage">{{ progress.toFixed(2) }}%</div>
              <div class="progress-text">Loading...</div>
            </div>
            <div class="progress-glow"></div>
          </div>
        </div>
      </transition>
    </teleport>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  progress: {
    type: Number,
    required: true,
    default: 0,
    validator: (value) => value >= 0 && value <= 100,
  },
});

// Reactive variables
const show = ref(false);
const circumference = 2 * Math.PI * 50; // 2πr where r=50

// Computed properties
const shouldShow = computed(() => {
  return props.progress > 0 && props.progress < 100;
});

const dashOffset = computed(() => {
  return circumference - (props.progress / 100) * circumference;
});

// Watch the `progress` prop
watch(
  () => props.progress,
  (newVal) => {
    show.value = newVal > 0 && newVal < 100;
  },
  { immediate: true }
);
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  transform: scale(1);
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-circle-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-circle {
  transform: rotate(-90deg);
  filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
}

.progress-circle-fill {
  transition: stroke-dashoffset 0.3s ease-in-out;
  animation: pulse 2s ease-in-out infinite alternate;
}

.progress-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.progress-percentage {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

.progress-text {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-top: 0.25rem;
  letter-spacing: 0.05em;
}

.progress-glow {
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(139, 92, 246, 0.05) 50%,
    transparent 70%
  );
  animation: rotate 4s linear infinite;
  z-index: -1;
}

@keyframes pulse {
  0% {
    filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5));
  }
  100% {
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))
      drop-shadow(0 0 30px rgba(139, 92, 246, 0.4));
  }
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
