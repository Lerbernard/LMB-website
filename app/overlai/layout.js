const SITE = "https://lmbtech.dev"; // ← your real domain

export const metadata = {
  title: "AI Image Detection - Free Detector with Crop Tool | LMB Technologies",
  description:
    "Check if any image is AI-generated in seconds. Free AI image detector with a built-in crop tool: zoom into a face, object, or region and detect exactly what you select. No sign-up. A free tool by LMB Technologies.",
  keywords: [
    "AI image detector", "AI image checker", "detect AI generated images",
    "is this image AI", "crop tool AI detector", "free AI image detector",
  ],
  alternates: { canonical: `${SITE}/overlai` },
  openGraph: {
    type: "website", url: `${SITE}/overlai`, siteName: "LMB Technologies",
    title: "AI Image Detection - Free Detector with Crop Tool",
    description: "Upload any image, crop to the part that matters, get an AI-likelihood score instantly. Free.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI Image Detection by LMB Technologies" }],
  },
};

export default function OverlaiLayout({ children }) {
  return children;
}
