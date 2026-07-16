const SITE = "https://lmbtech.dev"; // ← your real domain
export default function sitemap() {
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/ai-image-detector`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}
