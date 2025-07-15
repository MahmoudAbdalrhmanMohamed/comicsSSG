<template>
  <div>
    <HeaderComponent :color="true" />
    <section class="md:overflow-hidden">
      <div class="md:min-w-screen md:min-h-screen grid md:grid-cols-2">
        <div
          class="relative px-4 md:px-0 overflow-hidden w-full h-[110%] md:w-[105%]"
        >
          <NuxtImg
            src="images/login/loginBackground.webp"
            loading="lazy"
            placeholder
            :alt="$t('signupAlts.backgroundAlt')"
            class="w-full h-full absolute left-0 top-0 -z-10"
          />
          <div
            class="absolute backdrop-blur w-full h-full left-0 top-0 -z-10"
          ></div>
          <div
            class="flex flex-col h-[400px] md:h-[100vh] items-center justify-center space-y-4 relative z-10"
          >
            <p class="font-bold text-[60px] leading-[72px] text-white">
              {{ $t("createAn") }} <br />
              {{ $t("account") }}
            </p>
            <p class="font-bold text-xl text-ea pb-8">
              {{ $t("discover") }}
            </p>
          </div>
        </div>
        <slot></slot>
      </div>
      <LazyFooterComponet hydrate-on-visible :color="true" />
    </section>
  </div>
</template>
