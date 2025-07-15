<template>
  <section>
    <DelayHydration>
      <div class="overflow-hidden">
        <LazyHeaderComponentTwo />
        <div class="relative flex overflow-hidden flex-col">
          <img
            class="absolute w-full h-full object-cover -z-30 scale-105 top-0"
            :src="asset"
            :alt="$t('layout.backgroundAlt')"
            loading="lazy"
          />
          <div
            class="bg-black/80 w-full h-full absolute top-0 left-0 -z-20"
          ></div>
          <div class="order-1">
            <slot></slot>
          </div>
          <LazyFooterComponet hydrate-on-visible class="order-2" />
        </div>
      </div>
    </DelayHydration>
  </section>
</template>

<script setup>
// Correct asset import path
import asset from "@/assets/main.webp";
</script>
