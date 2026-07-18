const SITE = "https://www.lmbtechnology.com"; // ← your real domain

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
    siteName: "LMB Technology",
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

export default function DetectorLayout({ children }) {
  return <>{children}</>;
}
