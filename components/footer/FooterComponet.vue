<template>
  <footer
    :class="
      color
        ? 'bg-black border-t-2 border-d36 text-ea'
        : 'bg-black/70 border-t-2 border-d36 text-ea'
    "
  >
    <div class="containerClass flex justify-center gap-8 flex-col items-center">
      <NuxtImg
        loading="lazy"
        src="/logo.png"
        class="w-[100px] h-[35px] mt-8 mb-2"
        :placeholder="[100, 35, 5, 5]"
        :alt="$t('footer.logoAlt')"
      />
      <div
        class="mb-8 flex flex-wrap justify-center gap-4 md:flex-row flex-col font-medium text-base md:gap-6 lg:gap-11 items-center"
      >
        <NuxtLink class="uppercase linkClass" :to="localePath('/')">{{
          $t("footer.home")
        }}</NuxtLink>
        <NuxtLink
          class="uppercase linkClass"
          :to="localePath('/publisher/Marvel-Comics')"
          >{{ $t("footer.marvel") }}</NuxtLink
        >
        <NuxtLink
          class="uppercase linkClass"
          :to="localePath('/publisher/DC-Comics')"
          >{{ $t("footer.dc") }}</NuxtLink
        >
        <NuxtLink class="uppercase linkClass" :to="localePath('/publishers')">{{
          $t("footer.otherComics")
        }}</NuxtLink>
        <NuxtLink class="linkClass" :to="localePath('/publishers')">{{
          $t("footer.aboutUs")
        }}</NuxtLink>
        <NuxtLink class="linkClass" :to="localePath('/copyright')">{{
          $t("Copyright")
        }}</NuxtLink>
        <NuxtLink class="linkClass" :to="localePath('/DMCA')">{{
          $t("DMCA")
        }}</NuxtLink>
      </div>
      <div
        class="w-[95%] bg-color14 rounded-[20px] gap-[10px] md:gap-0 flex md:flex-row flex-col md:justify-between py-6 px-14"
      >
        <div class="space-y-4">
          <p class="font-semibold text-bf uppercase text-sm">
            {{ $t("footer.sites") }}:
          </p>
          <NuxtLink
            to="https://www.ysk-book.com/en"
            aria-label="https://www.ysk-book.com/en"
            target="_blank"
            class="transition-all block text-white duration-300 font-bold text-base hover:text-f0d"
          >
            {{ $t("YSK Book PDF") }}
          </NuxtLink>
        </div>
        <div class="space-y-4">
          <p class="font-semibold text-bf uppercase text-sm">
            {{ $t("footer.contactUs") }}:
          </p>
          <nuxt-link
            to="mailto:admin@ysk-comics.com"
            aria-label="admin@ysk-comics.com"
            target="_blank"
            class="flex items-center gap-1 text-white font-bold text-base transition-all duration-300 hover:text-f0d"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM12 12.116L4 6.885v10.5q0 .269.173.442t.443.173h14.769q.269 0 .442-.173t.173-.443v-10.5zM12 11l7.692-5H4.308zM4 6.885V6v11.385q0 .269.173.442t.443.173H4z"
              />
            </svg>
            <p>admin@ysk-comics.com</p>
          </nuxt-link>
        </div>
        <div class="space-y-4 *:transition-all *:duration-300 *:hover:text-f0d">
          <p class="font-semibold text-bf uppercase text-sm">
            {{ $t("footer.followUs") }}:
          </p>
          <div class="flex items-center gap-2 text-white font-bold text-base">
            <NuxtLink
              aria-label="https://www.facebook.com/share/1EJSTjFNRD/"
              to="https://www.facebook.com/share/1EJSTjFNRD/"
              target="_blank"
              class="text-color14 w-10 h-10 bg-e7 rounded-full grid place-items-center"
            >
              <Icon name="line-md:facebook" size="1.5rem" />
            </NuxtLink>
            <NuxtLink
              aria-label="https://www.reddit.com/user/YSK_Comics/submitted/?utm_source=share&utm_medium=mweb3x&utm_name=mweb3xcss&utm_term=1&utm_content=share_button"
              to="https://www.reddit.com/user/YSK_Comics/submitted/?utm_source=share&utm_medium=mweb3x&utm_name=mweb3xcss&utm_term=1&utm_content=share_button"
              target="_blank"
              class="text-color14 w-10 h-10 bg-e7 rounded-full grid place-items-center"
            >
              <Icon name="line-md:reddit-loop" size="1.5rem" />
            </NuxtLink>
            <NuxtLink
              aria-label="https://www.instagram.com/ysk_comics?igsh=MXdyendvZDE4M2s3ag=="
              to="https://www.instagram.com/ysk_comics?igsh=MXdyendvZDE4M2s3ag=="
              target="_blank"
              class="text-color14 w-10 h-10 bg-e7 rounded-full grid place-items-center"
            >
              <Icon name="line-md:instagram" size="1.5rem" />
            </NuxtLink>
            <NuxtLink
              aria-label="https://pin.it/7FXfotr6Q"
              to="https://pin.it/7FXfotr6Q"
              target="_blank"
              class="text-color14 w-10 h-10 bg-e7 rounded-full grid place-items-center"
            >
              <Icon name="fa6-brands:pinterest-p" size="1.5rem" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <NuxtLink
      to="https://www.megatron-soft.com/en"
      aria-label="link"
      class="mt-4 block hover:text-f0d transition-all duration-300 bg-color14 text-white py-[2px] text-center font-[300]"
    >
      {{ $t("footer.copyright") }} Megatron
    </NuxtLink>
  </footer>
</template>

<script setup>
const localePath = useLocalePath();

const props = defineProps({
  color: {
    default: false,
  },
});

// console.log("test");
</script>
