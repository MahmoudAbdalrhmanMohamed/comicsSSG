<template>
  <section class="containerClass pb-12 pt-24">
    <div class="bg-oneA/90 px-4 md:px-8 copyrightV2 text-white py-8 rounded-lg">
      <h1 class="text-center mb-4">{{ $t("DMCA") }}</h1>
      <h2>{{ $t("DMCA Policy of YSK Comics") }}</h2>
      <p>
        {{
          $t(
            "YSK Comics, as defined under the Digital Millennium Copyright Act (DMCA), is an online service provider offering copyright owners a platform to self-publish through uploading, storing, and displaying their media. We do not actively monitor user-uploaded content but take copyright infringement very seriously."
          )
        }}
      </p>
      <h2>{{ $t("Designated Agent") }}</h2>

      <p>
        {{
          $t("For DMCA infringement claims, contact our Designated Agent at:")
        }}
      </p>
      <div class="my-4 text-lg">
        {{ $t("Email:") }}
        <nuxt-link
          class="text-blue-500 underline ca"
          external
          target="_blank"
          aria-label="link"
          to="mailto:admin@ysk-comics.com"
          >admin@ysk-comics.com</nuxt-link
        >
      </div>
      <h2>{{ $t("Copyright Infringement Claims") }}</h2>
      <p>
        {{ $t("To file an infringement claim, include:") }}
      </p>

      <ul>
        <li>
          {{
            $t(
              "Authorized Signature: The electronic or physical signature of the copyright owner or their authorized agent."
            )
          }}
        </li>
        <li>
          {{
            $t(
              "Work Identification: Description of the copyrighted work claimed to be infringed."
            )
          }}
        </li>
        <li>
          {{
            $t(
              "Location of Infringing Material: Identification of the infringing content and its location."
            )
          }}
        </li>
        <li>
          {{
            $t(
              "Contact Information: Address, phone number, and email for contact purposes."
            )
          }}
        </li>
        <li>
          {{
            $t(
              "Good Faith Belief: A statement confirming that the use of the content is not authorized."
            )
          }}
        </li>
        <li>
          {{
            $t(
              "Accuracy Statement: A statement confirming the accuracy of the information and authorization to act on behalf of the copyright owner."
            )
          }}
        </li>
      </ul>
      <p>
        {{
          $t(
            "Failure to provide complete information may delay DMCA notification processing."
          )
        }}
      </p>
      <h2>{{ $t("Notice and Takedown Procedure") }}</h2>
      <p>
        {{
          $t(
            "On receiving a proper infringement notification, we will act expeditiously to remove or disable access to the alleged infringing content. Compliance with DMCA provisions applies upon receiving a valid counter-notification."
          )
        }}
      </p>
      <h2>{{ $t("Repeat Infringers") }}</h2>
      <p>
        {{
          $t(
            "Users who repeatedly infringe copyrights may have their access terminated under appropriate circumstances."
          )
        }}
      </p>
      <h2>{{ $t("Technical Measures") }}</h2>
      <p>
        {{
          $t(
            "Our policy accommodates and does not interfere with standard technical measures for copyright protection."
          )
        }}
      </p>
    </div>
  </section>
</template>
<script setup>
const { t, locale } = useI18n();
const route = useRoute();
useSeoMeta({
  title: t("DEMCAtSeo.title"),
  description: t("DEMCAtSeo.des"),
  ogTitle: t("DEMCAtSeo.title"),
  ogDescription: t("DEMCAtSeo.des"),
  ogUrl: `https://www.ysk-comics.com${route.fullPath}`,
  ogImage: `https://www.ysk-comics.com/icones/logo.png`,
  keywords: `comic book pdf, comics pdf, english comics books pdf free, comics online free pdf, english comics pdf, comic book pdf free`,
  ogImageAlt: t("DEMCAtSeo.title"),
  robots: "index, follow",
  ogType: "comics",
  ogImageType: "image/png",
  ogSiteName: "YSK Comics",
  ogLocale: locale.value,
  ogLocaleAlternate: "en",
  twitterTitle: t("DEMCAtSeo.title"),
  twitterDescription: t("DEMCAtSeo.des"),
  twitterImage: `https://www.ysk-comics.com/icones/logo.png`,
  twitterSite: "@YSK_Comics",
  twitterCard: "summary_large_image",
});
</script>
