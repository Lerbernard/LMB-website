const SITE = "https://www.lmbtechnology.com"; // ← your real domain
export default function sitemap() {
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/ai-image-detector`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/ai-image-detector/guides`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/ai-image-detector/guides/how-to-spot-ai-images`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/ai-image-detector/guides/how-ai-image-detectors-work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/ai-image-detector/guides/check-part-of-an-image-for-ai`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
