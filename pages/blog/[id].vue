<template>
  <div class="min-h-screen">
    <!-- Loading State -->
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="relative">
          <div
            class="w-16 h-16 border-4 border-f0d/20 rounded-full animate-spin"
          ></div>
          <div
            class="w-16 h-16 border-4 border-f0d border-t-transparent rounded-full animate-spin absolute top-0 left-0"
          ></div>
        </div>
        <p class="mt-4 text-seven4 font-medium">
          {{ $t("blog.loading") }}
        </p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="min-h-screen flex items-center justify-center"
    >
      <div
        class="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-custom-black border border-Dc/10"
      >
        <div
          class="w-16 h-16 bg-Dc/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-Dc"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-oneA mb-2">
          {{ $t("blog.error.title") }}
        </h2>
        <p class="text-seven4 mb-6">
          {{ error.message || $t("blog.error.message") }}
        </p>
        <button
          @click="refresh"
          class="bg-gradient-to-r from-f0d to-d36 text-color14 px-6 py-3 rounded-xl hover:from-f0d/90 hover:to-d36/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {{ $t("blog.error.retry") }}
        </button>
      </div>
    </div>

    <!-- Blog Content -->
    <div v-else-if="data" class="relative w-full">
      <!-- Hero Section with Featured Image -->
      <section class="relative pt-24 pb-8 overflow-hidden">
        <!-- Breadcrumb -->
        <div class="container mx-auto px-4 relative">
          <nav class="mb-8" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2 text-sm">
              <li>
                <nuxt-link
                  :to="localePath('/')"
                  class="text-white hover:text-f0d transition-colors"
                >
                  {{ $t("common.home") }}
                </nuxt-link>
              </li>
              <li class="text-ea">/</li>
              <li>
                <nuxt-link
                  :to="localePath('/blogs')"
                  class="text-ea hover:text-f0d transition-colors"
                >
                  {{ $t("blogs.title") }}
                </nuxt-link>
              </li>
              <li class="text-ea">/</li>
              <li class="text-white font-medium truncate max-w-xs">
                {{ data.title }}
              </li>
            </ol>
          </nav>
        </div>

        <!-- Featured Image -->
        <div class="container mx-auto px-4 relative">
          <div class="max-w-4xl mx-auto">
            <div
              class="relative h-full rounded-3xl overflow-hidden shadow-2xl group"
            >
              <VLazyImage
                :src="data.image || '/icones/logo.png'"
                :alt="data.title + 'blog image'"
                class="w-full h-32 md:h-[60vh] object-fill transition-transform duration-700 group-hover:scale-105"
                :src-placeholder="load"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-color14/60 via-color14/20 to-transparent"
              ></div>

              <!-- Article Meta Overlay -->
              <div class="absolute bottom-6 left-6 right-6 text-white">
                <div class="flex items-center space-x-4 mb-4">
                  <span
                    class="bg-gradient-to-r from-f0d to-d36 px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    {{ data.category }}
                  </span>
                  <span class="text-ea/80">•</span>
                  <time class="text-ea/80 text-sm" :dateTime="data.created_at">
                    {{ formatDate(data.created_at) }}
                  </time>
                  <span class="text-ea/80">•</span>
                  <span class="text-ea/80 text-sm">
                    {{ data.read_time }} {{ $t("blogs.readTime") }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Article Content -->
      <article class="containerClass w-full mx-auto">
        <div
          class="max-w-4xl bg-color14/80 containerClass pt-8 pb-16 rounded-lg mb-4 mx-auto xl:max-w-full"
        >
          <!-- Article Header -->
          <header class="mb-8">
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-f0d to-d36 bg-clip-text text-transparent mb-6 leading-tight"
            >
              {{ data.title }}
            </h1>

            <!-- Author Info -->
            <div class="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div class="flex items-center space-x-4">
                <VLazyImage
                  :src="'https://www.ysk-comics.com/icones/logo.png'"
                  :alt="'site image'"
                  class="w-12 h-12 rounded-full md:h-16 md:w-16 object-cover"
                  :src-placeholder="load"
                />
                <div>
                  <p class="font-semibold text-white">
                    {{ $t("common.siteName") }}
                  </p>
                  <p class="text-sm text-gray-200">
                    {{ formatDate(data.created_at) }}
                  </p>
                </div>
              </div>

              <!-- Social Share -->
              <div class="flex items-center space-x-3">
                <span class="text-sm text-gray-200"
                  >{{ $t("blog.share") }}:</span
                >
                <!-- Facebook Share -->
                <button
                  @click="shareOnFacebook"
                  class="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  :aria-label="$t('blog.shareFacebook')"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                </button>

                <!-- Instagram Share -->
                <button
                  @click="shareOnInstagram"
                  class="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                  :aria-label="$t('blog.shareInstagram')"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    />
                  </svg>
                </button>

                <!-- Reddit Share -->
                <button
                  @click="shareOnReddit"
                  class="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  :aria-label="$t('blog.shareReddit')"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"
                    />
                  </svg>
                </button>

                <!-- X (Twitter) Share -->
                <button
                  @click="shareOnX"
                  class="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  :aria-label="$t('blog.shareX')"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    />
                  </svg>
                </button>

                <!-- Copy Link -->
                <button
                  @click="copyLink"
                  class="p-2 bg-f9 text-seven4 rounded-lg hover:bg-f4 transition-colors"
                  :aria-label="$t('blog.copyLink')"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </header>

          <!-- Article Body -->
          <div
            class="prose prose-lg text-gray-100 max-w-none overflow-hidden"
            v-html="data.description"
          ></div>

          <!-- Related Articles -->
          <section class="mt-16" v-if="data.related_blogs.length">
            <h2 class="text-3xl font-bold text-white mb-8">
              {{ $t("blog.relatedArticles") }}
            </h2>
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto"
            >
              <!-- Related articles would be fetched separately -->
              <NuxtLink
                v-for="n in data.related_blogs"
                :key="n.id"
                class="bg-white block rounded-2xl shadow-custom-black overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                :to="n?.slug"
              >
                <VLazyImage
                  :src="n.image || '/icones/logo.png'"
                  :alt="n.title + 'related blog image'"
                  class="w-full h-40 lg:h-52 xl:h-60 object-fill transition-transform duration-700 group-hover:scale-105"
                  :src-placeholder="load"
                />

                <div class="p-6 relative">
                  <h3 class="text-lg font-semibold truncate text-oneA mb-2">
                    {{ n.title }}
                  </h3>
                  <p class="text-seven4 text-sm mb-4 line-clamp-2">
                    {{ n.short_description.replace(/<[^>]*>/g, "") }}
                  </p>
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-seven4">
                      {{ $t("blog.readMore") }}
                    </span>
                    <svg
                      class="w-4 h-4 text-f0d"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </section>

          <!-- Back to Blogs -->
          <div class="mt-12 text-center">
            <nuxt-link
              :to="localePath('/blogs')"
              class="inline-flex items-center bg-gradient-to-r from-f0d to-d36 text-color14 px-8 py-4 rounded-xl hover:from-f0d/90 hover:to-d36/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
            >
              <svg
                class="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              {{ $t("blog.backToBlogs") }}
            </nuxt-link>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
import load from "@/assets/loading.svg";
import VLazyImage from "v-lazy-image";

const route = useRoute();
const { t, locale } = useI18n();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const localePath = useLocalePath();

// Get blog slug from route params
const blogSlug = route.params.id;

// Reactive state
const openFaqs = ref([]);

// Fetch blog data
const { data, pending, error, refresh } = await useFetch(
  `${url}/blogs/${blogSlug}`,
  {
    key: `blog-${blogSlug}`,
    headers: {
      "X-Localization": locale.value,
    },
    server: true,
    transform: (response) => {
      if (!response?.status || !response?.data) {
        throw new Error("Blog not found");
      }
      return response.data;
    },
  }
);

const currentUrl = computed(() => {
  return `https://www.ysk-comics.com/${locale.value}/blog/${blogSlug}`;
});

// Methods
const formatDate = (date) => {
  return new Intl.DateTimeFormat(locale.value, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

// Social sharing methods
const shareOnFacebook = () => {
  const url = encodeURIComponent(currentUrl.value);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

const shareOnInstagram = () => {
  // Instagram doesn't have direct URL sharing, so we'll copy the link and show instructions
  copyLink();
  toast.add({
    title: "Link copied! You can now paste it in your Instagram story or bio.",
    type: "success",
    icon: "i-heroicons-check-badge",
    color: "green",
  });
};

const shareOnReddit = () => {
  const url = encodeURIComponent(currentUrl.value);
  const title = encodeURIComponent(data.value.title);
  window.open(
    `https://www.reddit.com/submit?url=${url}&title=${title}`,
    "_blank"
  );
};

const shareOnX = () => {
  const text = encodeURIComponent(`${data.value.title} - ${currentUrl.value}`);
  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
};

const toast = useToast();

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value);
    // You could add a toast notification here
    console.log("Link copied to clipboard");
    toast.add({
      title: "Link copied to clipboard",
      type: "success",
      icon: "i-heroicons-check-badge",
      color: "green",
    });
  } catch (err) {
    toast.add({
      title: "Failed to copy link: ",
      type: "error",
      icon: "i-icon-park-outline-error",
      color: "red",
    });
    console.error("Failed to copy link: ", err);
  }
};

// SEO Head configuration
const seoTitle = computed(() => data.value?.title || t("blog.defaultTitle"));
const seoDescription = computed(() => {
  if (data.value?.description) {
    return data.value.description.replace(/<[^>]*>/g, "").substring(0, 160);
  }
  return t("blog.defaultDescription");
});

useHead({
  title: seoTitle,
  htmlAttrs: {
    lang: locale.value,
  },
  meta: [
    { name: "description", content: seoDescription },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Ysk Comics" },

    // Open Graph
    { property: "og:title", content: seoTitle },
    { property: "og:description", content: seoDescription },
    { property: "og:type", content: "article" },
    { property: "og:url", content: currentUrl },
    { property: "og:image", content: data.value?.image },
    { property: "og:locale", content: locale.value },
    { property: "article:published_time", content: data.value?.created_at },
    { property: "article:author", content: "Ysk Comics" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seoTitle },
    { name: "twitter:description", content: seoDescription },
    { name: "twitter:image", content: data.value?.image },
  ],
  link: [{ rel: "canonical", href: currentUrl }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.value?.title,
        description: seoDescription.value,
        image: data.value?.image,
        author: {
          "@type": "Person",
          name: "Ysk Comics",
        },
        publisher: {
          "@type": "Organization",
          name: "YSK Comics",
          logo: {
            "@type": "Person",
            url: "https://www.ysk-comics.com/icones/logo.png",
          },
        },
        datePublished: data.value?.created_at,
        dateModified: data.value?.updated_at,
        url: currentUrl.value,
      }),
    },
  ],
});

// Handle 404 errors
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Blog post not found",
  });
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Custom prose styles */
:deep(.prose) {
  line-height: 1.75;
}

:deep(.prose h1) {
  @apply text-3xl font-bold text-gray-100 mb-6;
}

:deep(.prose h2) {
  @apply text-2xl font-bold text-gray-100 mb-4 mt-8;
}

:deep(.prose h3) {
  @apply text-xl font-semibold text-gray-100 mb-3 mt-6;
}

:deep(.prose p) {
  @apply mb-4 text-gray-200 leading-relaxed;
}

:deep(.prose ul) {
  @apply mb-4 pl-6;
}

:deep(.prose li) {
  @apply mb-2 text-gray-200;
}

:deep(.prose strong) {
  @apply font-semibold text-gray-100;
}

:deep(.prose a) {
  @apply text-blue-600 hover:text-blue-800 transition-colors underline;
}

:deep(.prose blockquote) {
  @apply border-l-4 border-blue-500 pl-6 italic text-gray-600 bg-blue-50 py-4 my-6 rounded-r-lg;
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

article {
  animation: fadeInUp 0.6s ease-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  :deep(.prose) {
    font-size: 16px;
  }

  :deep(.prose h1) {
    @apply text-2xl;
  }

  :deep(.prose h2) {
    @apply text-xl;
  }
}
</style>
