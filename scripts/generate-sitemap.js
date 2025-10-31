const fs = require("fs");
const path = require("path");

const generateSitemap = () => {
  const baseUrl = "https://serenaferraris.com";
  const currentDate = new Date().toISOString().split("T")[0];

  const pages = [
    {
      url: "/",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      url: "/gallery",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      url: "/contact_form",
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.9",
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  const buildDir = path.join(__dirname, "..", "build");
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);
  console.log("✅ Sitemap generated successfully!");
};

// Run if called directly
if (require.main === module) {
  generateSitemap();
}

module.exports = generateSitemap;
