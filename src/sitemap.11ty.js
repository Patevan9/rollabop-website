// Only built once site.url is set in _data/site.json (sitemaps need full URLs).
export const data = {
  permalink: (data) => (data.site.url ? "/sitemap.xml" : false),
  eleventyExcludeFromCollections: true,
};
export function render({ site, collections }) {
  const urls = collections.all
    .filter((p) => !p.data.noindex && p.url && !p.url.endsWith(".txt") && p.url !== "/404.html" &&
      !(p.url === "/privacy/" && site.privacy.status !== "final"))
    .map((p) => `  <url><loc>${site.url}${p.url}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="utf-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
