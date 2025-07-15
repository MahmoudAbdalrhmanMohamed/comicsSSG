<template>
  <div
    class="blog-card bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
  >
    <div class="relative h-48">
      <img
        :src="blog.coverImage || '/images/default-blog.jpg'"
        :alt="blog.title"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm"
      >
        {{ blog.category }}
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2 line-clamp-2">{{ blog.title }}</h3>
      <p class="text-gray-600 mb-4 line-clamp-3">{{ blog.excerpt }}</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img
            :src="blog.author.avatar"
            :alt="blog.author.name"
            class="w-8 h-8 rounded-full"
          />
          <span class="text-sm text-gray-700">{{ blog.author.name }}</span>
        </div>
        <span class="text-sm text-gray-500">{{ formatDate(blog.date) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Author {
  name: string;
  avatar: string;
}

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  date: string;
  author: Author;
}

defineProps<{
  blog: Blog;
}>();

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<style scoped>
.blog-card {
  @apply border border-gray-100;
}
</style>
