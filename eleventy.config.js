import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Rewrites root links like "/support/" when the site is served from a
  // sub-folder (e.g. GitHub Pages without a custom domain). See README.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets", "src/js": "js" });
  // Search-engine ownership files (e.g. Google Search Console), served exactly as provided.
  eleventyConfig.addPassthroughCopy("src/google*.html");
  eleventyConfig.ignores.add("src/assets/**");

  // True when an asset slot has a real file.
  eleventyConfig.addFilter("hasAsset", (a) => Boolean(a && a.src));
  eleventyConfig.addFilter("absoluteUrl", (path, base) => (base ? base.replace(/\/$/, "") + path : path));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
