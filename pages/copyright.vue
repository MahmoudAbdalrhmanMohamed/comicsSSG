<template>
  <section class="containerClass pb-12 pt-24">
    <div class="bg-oneA/90 px-4 md:px-8 copyright text-white py-8 rounded-lg">
      <h1 class="text-center mb-4">{{ $t("Copyright") }}</h1>
      <h2>{{ $t("Copyright Compliance") }}</h2>
      <p>
        {{
          $t(
            "At YSK Comics, we adhere to the Digital Millennium Copyright Act (DMCA) and relevant copyright laws in the digital realm."
          )
        }}
      </p>
      <p>
        {{
          $t(
            "We may not always be aware of unauthorized use of intellectual property on our site. However, upon receiving a formal notice of copyright infringement, including specific details of the alleged violation and its location on our website, we will take prompt and appropriate action to stop the infringement."
          )
        }}
      </p>
      <h2>{{ $t("Reporting Copyright Infringement") }}</h2>
      <div class="my-4 text-lg">
        {{
          $t(
            "If you believe your copyright has been infringed on YSK Comics website, please inform us by sending a notice to."
          )
        }}
        <nuxt-link
          class="text-blue-500 underline ca"
          external
          target="_blank"
          aria-label="link"
          to="mailto:admin@ysk-comics.com"
          >admin@ysk-comics.com</nuxt-link
        >
        {{
          $t(
            "We will swiftly respond to your complaint by blocking access to the infringing material as detailed in your notification."
          )
        }}
      </div>
      <p>
        {{
          $t(
            "Your infringement notice must adhere to Section 512(c) of the DMCA and include the following:"
          )
        }}
      </p>

      <ul>
        <li>
          {{
            $t(
              "A physical or electronic signature of someone authorized to act on behalf of the copyright owner."
            )
          }}
        </li>
        <li>
          {{
            $t(
              "A detailed list of the copyrighted work(s) you claim has been infringed."
            )
          }}
        </li>
        <li>
          {{
            $t(
              "A precise description of the infringing material, with enough detail to allow us to locate it on our site."
            )
          }}
        </li>
        <li>
          {{
            $t(
              "Your contact details, including email, postal address, and, if available, phone number."
            )
          }}
        </li>
        <li>
          {{
            $t(
              "A declaration of your good faith belief that the material's use is not authorized by the copyright owner or law."
            )
          }}
        </li>
        <li>
          {{
            $t(
              "A statement, under penalty of perjury, that the information in your notice is accurate and that you are authorized to act on behalf of the copyright owner."
            )
          }}
        </li>
      </ul>
      <p>
        {{
          $t(
            "We will address the reported copyright infringement within 3 business days of receiving a valid notice."
          )
        }}
      </p>
      <h3>
        “{{
          $t(
            "Repeat infringers may face termination of their accounts on YSK Comics."
          )
        }}”
      </h3>
      <p>
        {{
          $t(
            "English Version: We are committed to responding to notices of alleged infringement that comply with the DMCA and other applicable intellectual property laws, potentially including the removal or disabling of access to allegedly infringing material."
          )
        }}
      </p>
      <p>
        {{
          $t(
            "If you're a copyright owner and believe that any content on our site infringes upon your rights, you can submit a DMCA notification to our Copyright Agent at. Please include all required information as per 17 U.S.C 512(c)(3).",
            { link: "admin@ysk-comics.com" }
          )
        }}
      </p>
      <p>
        {{
          $t(
            "Remember, failure to fulfill all requirements of Section 5(D) may result in your DMCA notice being deemed invalid."
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
  title: t("CopyrightSeo.title"),
  description: t("CopyrightSeo.des"),
  ogTitle: t("CopyrightSeo.title"),
  ogDescription: t("CopyrightSeo.des"),
  ogUrl: `https://www.ysk-comics.com${route.fullPath}`,
  ogImage: `https://www.ysk-comics.com/icones/logo.png`,
  keywords: `comic book pdf, comics pdf, english comics books pdf free, comics online free pdf, english comics pdf, comic book pdf free`,
  ogImageAlt: t("CopyrightSeo.title"),
  robots: "index, follow",
  ogType: "comics",
  ogImageType: "image/png",
  ogSiteName: "YSK Comics",
  ogLocale: locale.value,
  ogLocaleAlternate: "en",
  twitterTitle: t("CopyrightSeo.title"),
  twitterDescription: t("CopyrightSeo.des"),
  twitterImage: `https://www.ysk-comics.com/icones/logo.png`,
  twitterSite: "@YSK_Comics",
  twitterCard: "summary_large_image",
});
</script>
