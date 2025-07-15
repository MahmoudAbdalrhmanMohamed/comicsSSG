export default defineNuxtRouteMiddleware((to) => {
  if (process.server) {
    const headers = useRequestHeaders();
    const host = headers["host"];
    const protocol = headers["x-forwarded-proto"] || "http";
    // Ignore localhost
    if (host.includes("localhost")) return;

    // Check if we need to redirect
    const needsWww = !host.startsWith("www.");
    const needsHttps = protocol !== "https";

    if (needsWww || needsHttps) {
      // Prepare the new host - only add www. if it's missing
      const newHost = needsWww ? `www.${host}` : host;

      console.log(`https://${newHost}${to.fullPath}`);

      // Create the full redirect URL with the current path
      // return navigateTo(`https://${newHost}${to.fullPath}`, {
      //   external: true,
      //   redirectCode: 301, // Using 301 for permanent redirect
      // });
    }
  }
});
