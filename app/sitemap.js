const SITE = "https://www.lmbtechnology.com"; // ← your real domain
export default function sitemap() {
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/ai-image-detector`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/ai-image-detector/guides`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/ai-image-detector/guides/how-to-spot-ai-images`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/ai-image-detector/guides/how-ai-image-detectors-work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/ai-image-detector/guides/check-part-of-an-image-for-ai`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/ai-image-detector/guides/is-this-photo-of-a-person-real`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/ai-image-detector/guides/ai-detector-accuracy-explained`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/ai-image-detector/guides/reverse-image-search-and-ai-check`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
