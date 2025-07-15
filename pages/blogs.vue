<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 overflow-hidden">
      <div class="container mx-auto px-4 relative">
        <div class="text-center max-w-4xl mx-auto">
          <h1
            class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-d36 to-yellow-600 bg-clip-text text-transparent mb-6"
          >
            {{ $t("blogs.title") }}
          </h1>
          <p class="text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            {{ $t("blogs.subtitle") }}
          </p>
        </div>
      </div>
    </section>

    <div class="container mx-auto px-4 pb-16">
      <!-- Loading State -->
      <div
        v-if="pending"
        class="min-h-[600px] flex items-center justify-center"
      >
        <div class="text-center">
          <div class="relative">
            <div
              class="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"
            ></div>
            <div
              class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"
            ></div>
          </div>
          <p class="mt-4 text-white font-medium">
            {{ $t("blogs.loading") }}
          </p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="min-h-[400px] flex items-center justify-center"
      >
        <div
          class="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg border border-red-100"
        >
          <div
            class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-red-600"
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
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ $t("blogs.error.title") }}
          </h2>
          <p class="text-gray-600 mb-6">
            {{ error.message || $t("blogs.error.message") }}
          </p>
          <button
            @click="refresh"
            class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {{ $t("blogs.error.retry") }}
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!data?.items?.length"
        class="min-h-[400px] flex items-center justify-center"
      >
        <div class="text-center max-w-md mx-auto p-8">
          <div
            class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              ></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-3">
            {{ $t("blogs.empty.title") }}
          </h2>
          <p class="text-gray-600 text-lg">{{ $t("blogs.empty.message") }}</p>
        </div>
      </div>

      <!-- Blog Grid -->
      <div v-else class="space-y-12">
        <!-- Featured Blog (First item) -->
        <nuxt-link
          v-if="data.items.length > 0"
          :to="localePath(`/blog/${data.items[0].slug}`)"
          class="featured-blog block"
        >
          <article
            class="bg-color14/90 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <div class="grid lg:grid-cols-2 gap-0">
              <div
                class="relative overflow-hidden group h-full grid place-content-center place-items-center"
              >
                <VLazyImage
                  :src-placeholder="load"
                  :src="data.items[0].image || '/icones/logo.png'"
                  :alt="data.items[0].imageAlt || data.items[0].title"
                  @error="data.items[0].image = '/icones/logo.png'"
                  class="w-full lg:w-fit h-64 lg:h-[30vh] object-fill transition-transform duration-700 group-hover:scale-110 lg:m-auto"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                ></div>
                <div class="absolute top-4 left-4">
                  <span
                    class="bg-gradient-to-r from-d36 to-d36 text-white px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    {{ data.items[0].category }}
                  </span>
                </div>
              </div>
              <div class="p-8 lg:p-12 flex flex-col justify-center">
                <div class="flex items-center space-x-4 mb-4">
                  <span
                    class="text-d36 font-semibold text-sm uppercase tracking-wide"
                  >
                    {{ data.items[0].category }}
                  </span>
                  <span class="text-gray-100">•</span>
                  <time
                    class="text-gray-200 text-sm"
                    :dateTime="data.items[0].publishedAt"
                  >
                    {{ formatDate(data.items[0].publishedAt) }}
                  </time>
                </div>
                <h2
                  class="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight"
                >
                  {{ data.items[0].title }}
                </h2>
                <p
                  class="text-gray-300 text-lg leading-relaxed mb-6 line-clamp-3"
                >
                  {{ data.items[0].excerpt }}
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <img
                      src="/icones/logo.png"
                      :alt="'author alt logo'"
                      class="w-10 h-10 object-cover"
                    />
                    <div>
                      <p class="font-semibold text-gray-100">
                        {{ "Ysk comics" }}
                      </p>
                      <p class="text-sm text-gray-200">
                        {{ data.items[0].readTime }}
                      </p>
                    </div>
                  </div>
                  <button
                    class="bg-gradient-to-r from-d36 to-d36 text-white px-2 md:px-6 py-1 md:py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
                  >
                    {{ $t("blogs.readMore") }}
                    <svg
                      class="w-4 h-4 ml-2 inline-block transition-transform group-hover:translate-x-1"
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
                  </button>
                </div>
              </div>
            </div>
          </article>
        </nuxt-link>

        <!-- Regular Blog Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <nuxt-link
            v-for="blog in data.items.slice(1)"
            :key="blog.id"
            class="bg-color14/80 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer"
            :to="localePath(`/blog/${blog.slug}`)"
          >
            <div class="relative h-48 overflow-hidden">
              <VLazyImage
                :src-placeholder="load"
                :src="blog.image || '/icones/logo.png'"
                :alt="blog.imageAlt || blog.title"
                @error="blog.image = '/icones/logo.png'"
                class="w-full h-full object-fill transition-transform duration-700 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="absolute top-3 left-3">
                <span
                  class="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {{ blog.category }}
                </span>
              </div>
            </div>
            <div class="p-6 bg-color14/80">
              <div class="flex items-center space-x-2 mb-3">
                <time
                  class="text-gray-200 text-sm"
                  :dateTime="blog.publishedAt"
                >
                  {{ formatDate(blog.publishedAt) }}
                </time>
                <span class="text-gray-100">•</span>
                <span class="text-gray-300 text-sm">{{ blog.readTime }} </span>
              </div>
              <h3
                class="text-xl font-bold text-gray-400 mb-3 leading-tight line-clamp-2 group-hover:text-d36 transition-colors"
              >
                {{ blog.title }}
              </h3>
              <p class="text-gray-300 leading-relaxed line-clamp-3 mb-4">
                {{ blog.excerpt }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <img
                    :src="'/icones/logo.png'"
                    :alt="'ysk comics author image'"
                    class="w-8 h-8 object-cover"
                  />
                  <span class="text-sm font-medium text-gray-400">{{
                    "Ysk Comics"
                  }}</span>
                </div>
                <div
                  class="text-blue-600 group-hover:translate-x-1 transition-transform"
                >
                  <svg
                    class="w-5 h-5"
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
            </div>
          </nuxt-link>
        </div>

        <!-- Advanced Pagination -->
        <nav
          v-if="data.totalPages > 1"
          class="flex justify-center mt-16"
          aria-label="Pagination"
        >
          <div
            class="bg-white rounded-2xl shadow-lg p-2 flex items-center space-x-1"
          >
            <!-- Previous Button -->
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              :class="[
                'p-3 rounded-xl transition-all duration-300',
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
              ]"
              :aria-label="$t('pagination.previous')"
            >
              <svg
                class="w-5 h-5"
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
            </button>

            <!-- Page Numbers -->
            <div class="flex items-center space-x-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-4 py-2 rounded-xl transition-all duration-300 font-medium',
                  page === currentPage
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
                ]"
                :aria-label="`${$t('pagination.page')} ${page}`"
                :aria-current="page === currentPage ? 'page' : undefined"
              >
                {{ page }}
              </button>
            </div>

            <!-- Next Button -->
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === data.totalPages"
              :class="[
                'p-3 rounded-xl transition-all duration-300',
                currentPage === data.totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600',
              ]"
              :aria-label="$t('pagination.next')"
            >
              <svg
                class="w-5 h-5"
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
            </button>
          </div>
        </nav>

        <!-- Pagination Info -->
        <div v-if="data.totalPages > 1" class="text-center text-white mt-4">
          {{ $t("pagination.showing") }}
          {{ (currentPage - 1) * data.perPage + 1 }} -
          {{ Math.min(currentPage * data.perPage, data.total) }}
          {{ $t("pagination.of") }} {{ data.total }}
          {{ $t("pagination.results") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
import load from "@/assets/loading.svg";

import VLazyImage from "v-lazy-image";

const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();
const config = useRuntimeConfig();
const url = config.public.ConstUrl;
const localePath = useLocalePath();

// Reactive page state with URL sync
const currentPage = ref(parseInt(route.query.page) || 1);

// SSR-friendly data fetching
const { data, pending, error, refresh } = await useFetch(`${url}/blogs`, {
  key: "blogs-page",
  headers: {
    "X-Localization": locale,
  },
  server: true, // Enable SSR
  query: computed(() => ({
    page: currentPage.value,
  })),
  transform: (response) => {
    if (!response?.status || !response?.data) {
      return { items: [], totalPages: 0, total: 0 };
    }

    return {
      items: response.data.data_messages.map((item) => ({
        id: item.id,
        title: item.title,
        excerpt: item.short_description?.replace(/<[^>]*>/g, ""), // Strip HTML tags
        image: item.image,
        imageAlt: `${item.title} - Blog Image`,
        publishedAt: item.created_at,
        slug: item.slug,
        category: item.category,
        readTime: `${item.read_time} min`,
        author: {
          name: "Ysk Comics",
          avatar: "/icones/logo.png",
        },
      })),
      totalPages: response.data.meta.total_pages,
      total: response.data.meta.total,
      currentPage: response.data.meta.current_page,
      perPage: response.data.meta.per_page,
    };
  },
});

// Advanced pagination logic
const visiblePages = computed(() => {
  const total = data.value?.totalPages || 1;
  const current = currentPage.value;
  const delta = 2;
  const range = [];
  const rangeWithDots = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (current - delta > 2) {
    rangeWithDots.push(1, "...");
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (current + delta < total - 1) {
    rangeWithDots.push("...", total);
  } else if (total > 1) {
    rangeWithDots.push(total);
  }

  return rangeWithDots.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );
});

// Navigation functions
const goToPage = (page) => {
  if (
    page >= 1 &&
    page <= data.value?.totalPages &&
    page !== currentPage.value
  ) {
    currentPage.value = page;
    router.push({
      path: route.path,
      query: { ...route.query, page: page > 1 ? page : undefined },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const navigateToBlog = (id) => {
  // Use the slug from the blog data for SEO-friendly URLs
  const blog = data.value?.items.find((item) => item.id === id);
  if (blog && blog.slug) {
    router.push(localePath(`/blog/${blog.slug}`));
  } else {
    router.push(localePath(`/blog/${id}`));
  }
};

// Date formatting
const formatDate = (date) => {
  return new Intl.DateTimeFormat(locale.value, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

// Watch for route changes
watch(
  () => route.query.page,
  (newPage) => {
    const page = parseInt(newPage) || 1;
    if (page !== currentPage.value) {
      currentPage.value = page;
    }
  }
);

// Enhanced SEO with structured data
const seoTitle = computed(() => {
  const baseTitle = t("blogs.seo.title");
  return currentPage.value > 1
    ? `${baseTitle} - ${t("pagination.page")} ${currentPage.value}`
    : baseTitle;
});

const seoDescription = computed(() => t("blogs.seo.description"));
const currentUrl = computed(() => {
  const baseUrl = `https://www.ysk-comics.com/${locale.value}/blogs`;
  return currentPage.value > 1
    ? `${baseUrl}?page=${currentPage.value}`
    : baseUrl;
});

// Structured data for blogs
const structuredData = computed(() => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: seoTitle.value,
  description: seoDescription.value,
  url: currentUrl.value,
  inLanguage: locale.value,
  blogPost:
    data.value?.items?.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      image: blog.image,
      author: {
        "@type": "Organization",
        name: "Ysk Comics",
      },
      datePublished: blog.publishedAt,
      url: `https://www.ysk-comics.com/${locale.value}/blog/${blog.slug}`,
    })) || [],
}));

// Breadcrumb structured data
const breadcrumbSchema = computed(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: t("common.home"),
      item: `https://www.ysk-comics.com/${locale.value}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: t("blogs.title"),
      item: currentUrl.value,
    },
  ],
}));

// SEO Head configuration
useHead({
  title: seoTitle,
  htmlAttrs: {
    lang: locale.value,
  },
  meta: [
    { name: "description", content: seoDescription },
    { name: "keywords", content: t("blogs.seo.keywords") },
    { name: "robots", content: "index, follow" },

    // Open Graph
    { property: "og:title", content: seoTitle },
    { property: "og:description", content: seoDescription },
    { property: "og:type", content: "website" },
    { property: "og:url", content: currentUrl },
    { property: "og:locale", content: locale.value },
    {
      property: "og:locale:alternate",
      content: locale.value === "en" ? "ar" : "en",
    },
    { property: "og:site_name", content: t("common.siteName") },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seoTitle },
    { name: "twitter:description", content: seoDescription },

    // Additional SEO
    { name: "author", content: t("common.siteName") },
    { name: "publisher", content: t("common.siteName") },
  ],
  link: [
    { rel: "canonical", href: currentUrl },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.ysk-comics.com/en/blogs",
    },
    {
      rel: "alternate",
      hreflang: "ar",
      href: "https://www.ysk-comics.com/ar/blogs",
    },

    // Pagination SEO
    ...(currentPage.value > 1
      ? [
          {
            rel: "prev",
            href: `https://www.ysk-comics.com/${locale.value}/blogs${currentPage.value === 2 ? "" : `?page=${currentPage.value - 1}`}`,
          },
        ]
      : []),
    ...(currentPage.value < (data.value?.totalPages || 1)
      ? [
          {
            rel: "next",
            href: `https://www.ysk-comics.com/${locale.value}/blogs?page=${currentPage.value + 1}`,
          },
        ]
      : []),
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(structuredData.value),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbSchema.value),
    },
  ],
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.featured-blog {
  margin-bottom: 3rem;
}

@media (max-width: 768px) {
  .featured-blog .grid {
    grid-template-columns: 1fr;
  }

  .featured-blog .h-64 {
    height: 16rem;
  }
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

.featured-blog,
.grid > article {
  animation: fadeInUp 0.6s ease-out;
}

.grid > article:nth-child(2) {
  animation-delay: 0.1s;
}
.grid > article:nth-child(3) {
  animation-delay: 0.2s;
}
.grid > article:nth-child(4) {
  animation-delay: 0.3s;
}
</style>
