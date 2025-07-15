// indexnow-ping.js
import fetch from "node-fetch";

const key = "60d2091e788e4ed181d809fd5e6d0bdb";
const urls = [
  "https://www.ysk-comics.com/en/blogs",
  "https://www.ysk-comics.com/ar/blogs",

  "https://www.ysk-comics.com/en/DMCA",
  "https://www.ysk-comics.com/ar/DMCA",

  "https://www.ysk-comics.com/en/publishers",
  "https://www.ysk-comics.com/ar/publishers",

  "https://www.ysk-comics.com/en/search",
  "https://www.ysk-comics.com/ar/search",
];

urls.forEach(async (url) => {
  const pingUrl = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${key}`;
  try {
    const res = await fetch(pingUrl);
    if (res.ok) {
      console.log(`✅ Pinged: ${url}`);
    } else {
      console.warn(`⚠️ Failed: ${url}, status: ${res.status}`);
    }
  } catch (err) {
    console.error(`❌ Error pinging ${url}:`, err.message);
  }
});
