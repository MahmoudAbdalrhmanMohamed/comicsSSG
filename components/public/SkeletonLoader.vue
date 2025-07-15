<template>
  <div class="skeleton-loader">
    <div class="skeleton-image"></div>
    <div class="skeleton-text"></div>
    <div class="skeleton-text"></div>
    <div class="skeleton-text"></div>
  </div>
</template>

<style scoped>
.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-image {
  width: 100%;
  height: 200px;
  background-color: #e0e0e0;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

.skeleton-text {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
