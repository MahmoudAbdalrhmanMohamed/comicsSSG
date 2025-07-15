<template>
  <section>
    <HeaderComponent />
    <section class="md:overflow-hidden">
      <div
        class="md:min-w-screen md:min-h-screen md:overflow-hidden grid md:grid-cols-2"
      >
        <div
          class="relative px-4 md:px-0 overflow-hidden w-full h-[110%] pt-24 pb-4 md:pb-0 md:pt-0 md:w-[105%]"
        >
          <NuxtImg
            src="images/login/loginBackground.webp"
            loading="lazy"
            placeholder
            :alt="$t('loginLats.backgroundAlt')"
            class="w-full h-full absolute left-0 top-0 -z-10"
          />
          <div class="absolute backdrop-blur w-full h-full left-0 top-0"></div>
          <div
            class="flex flex-col h-full items-center justify-center space-y-4 text-center relative z-10"
          >
            <p class="font-bold text-[60px] leading-[72px] text-white">
              {{ $t("welcome") }} <br />
              {{ $t("back") }}
            </p>
            <p class="font-bold text-xl text-ea pb-8">
              {{ $t("discover") }}
            </p>
          </div>
        </div>
        <slot></slot>
      </div>
      <LazyFooterComponet hydrate-on-visible class="z-20" :color="true" />
    </section>
  </section>
</template>
