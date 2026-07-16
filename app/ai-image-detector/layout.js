const SITE = "https://lmbtech.dev"; // ← your real domain

export const metadata = {
  title: "AI Detector with Crop Tool - Free AI Image Checker",
  description:
    "Free AI image detector with a built-in crop tool. Check if a photo is AI-generated in seconds - zoom into a face, object, or region and detect exactly what you select. No sign-up, nothing stored.",
  keywords: [
    "AI detector", "AI image detector", "AI detector with crop tool",
    "AI image checker", "detect AI generated images", "is this image AI",
    "check if image is AI", "free AI image detector", "AI photo detector",
    "AI art detector", "AI or real image", "crop tool AI detector",
  ],
  alternates: { canonical: `${SITE}/ai-image-detector` },
  openGraph: {
    type: "website",
    url: `${SITE}/ai-image-detector`,
    siteName: "LMB Technologies",
    title: "AI Detector with Crop Tool - Free AI Image Checker",
    description:
      "Upload any image, crop to the part that matters, and get an AI-likelihood score instantly. Free, no sign-up.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI Detector with Crop Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Detector with Crop Tool - Free AI Image Checker",
    description:
      "Check if any image is AI-generated. Built-in crop tool detects exactly the region you select. Free.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// Rich structured data: WebApplication + FAQ + Breadcrumbs.
// FAQ schema can surface as expandable Q&A directly in Google results.
const SITE_URL = "https://lmbtech.dev";
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "AI Detector with Crop Tool",
      url: `${SITE_URL}/ai-image-detector`,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any (web browser)",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Detect AI-generated images",
        "Built-in crop tool to check a specific region",
        "Instant AI-likelihood score",
        "Works on photos, screenshots, and art",
        "No sign-up required",
      ],
      publisher: { "@type": "Organization", name: "LMB Technologies", url: SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "LMB Technologies", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "AI Detector with Crop Tool", item: `${SITE_URL}/ai-image-detector` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I check if an image is AI-generated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Upload the image to the AI detector, optionally crop to the part you want to check, and it returns an AI-likelihood score in seconds. No sign-up is required.",
          },
        },
        {
          "@type": "Question",
          name: "Is the AI image detector free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The AI detector is completely free to use, with no account or sign-up needed. Images are analyzed and not stored.",
          },
        },
        {
          "@type": "Question",
          name: "What does the crop tool do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The built-in crop tool lets you draw a box around a specific area - like a face, hand, or background detail - so the detector scores exactly that region at full resolution instead of the whole image.",
          },
        },
        {
          "@type": "Question",
          name: "How accurate is AI image detection?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Results are probability estimates, not proof. No detector is perfect, so treat the score as a strong signal and verify anything important through other sources.",
          },
        },
        {
          "@type": "Question",
          name: "Can it detect AI-generated art and photos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. It works on photographs, screenshots, and digital art in common formats like JPG, PNG, and WebP.",
          },
        },
      ],
    },
  ],
};

export default function DetectorLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
