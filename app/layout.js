import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const SITE = "https://www.lmbtechnology.com"; // ← change to your real domain when you deploy

export const metadata = {
  metadataBase: new URL(SITE),
  title: "LMB Technology - Software Studio",
  description:
    "LMB Technology is a software studio that designs, builds, and ships web and mobile products end to end. Makers of a free AI image detection tool.",
  keywords: [
    "LMB Technology", "software studio", "app development", "web development",
    "mobile app studio", "product design", "AI image detection",
  ],
  applicationName: "LMB Technology",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website", url: SITE, siteName: "LMB Technology",
    title: "LMB Technology - Software Studio",
    description:
      "We build web and mobile software people actually want to use.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "LMB Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LMB Technology - Software Studio",
    description: "We design, build, and ship software end to end.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0E0E10" },
    { media: "(prefers-color-scheme: light)", color: "#F7F7FB" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LMB Technology",
  description: "Software studio building web and mobile products.",
  url: SITE,
  makesOffer: {
    "@type": "Offer",
    itemOffered: { "@type": "SoftwareApplication", name: "AI Image Detection", applicationCategory: "MultimediaApplication" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('overlai-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
        <link rel="apple-touch-icon" href="/icon-180.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3168595166500339"
          crossOrigin="anonymous"
        />
        {children}
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var sel='.step,.guide-card,.product-card,.faq-list details,.article h2,.article-cta,.feature-band,.contact';
var els=document.querySelectorAll(sel);
if(!els.length||!('IntersectionObserver' in window))return;
document.documentElement.classList.add('js-reveal');
var io=new IntersectionObserver(function(en){
  en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{rootMargin:'0px 0px -8% 0px',threshold:.08});
els.forEach(function(el){
  if(el.getBoundingClientRect().top<window.innerHeight*.9){el.classList.add('rv','in');}
  else{el.classList.add('rv');io.observe(el);}
});
})();`,
          }}
        />
      </body>
    </html>
  );
}
