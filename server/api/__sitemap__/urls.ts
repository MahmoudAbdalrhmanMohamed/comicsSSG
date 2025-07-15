import type { SitemapUrl } from "#sitemap/types";

export default defineSitemapEventHandler(async () => {
  try {
    // Fetch data from your specific API endpoint
    const data = await $fetch<any[]>(
      "https://api.ysk-comics.com/api/v1/sitemaps?lang=en"
    );

    // Transform the API response to match Nuxt sitemap format
    return data.map(
      (item: any) =>
        ({
          loc: item.loc,
          lastmod: item.lastmod,
          priority: item.priority,
          changefreq: item.changefreq,
          images: item.images,
          _sitemap: item._sitemap || "main",
        }) satisfies SitemapUrl
    );
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
    return [];
  }
});
