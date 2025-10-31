import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  structuredData,
}) => {
  const defaultTitle =
    "Serena Ferraris - Fotografa Matrimoni Reportage | Emotion Photographer";
  const defaultDescription =
    "Fotografa specializzata in servizi fotografici matrimonio stile reportage. Emotion Photographer con formazione in psicologia per catturare emozioni autentiche.";
  const defaultKeywords =
    "fotografa matrimonio, servizi fotografici reportage, fotografa emozioni, Serena Ferraris, matrimonio spontaneo, fotografia psicologia, Torino, Piemonte";
  const defaultImage = "/logo192.png";
  const siteUrl = "https://serenaferraris.com";

  const seoTitle = title ? `${title} | Serena Ferraris` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />

      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
