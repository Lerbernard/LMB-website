import { GuideNav, GuideFooter, BackLink } from "./parts";

const SITE = "https://www.lmbtechnology.com";

export const metadata = {
  title: "Guides - Spotting and Detecting AI Images | LMB Technology",
  description:
    "Practical guides on AI-generated images: how to spot them by eye, how AI image detectors work, and how to check a specific part of an image.",
  alternates: { canonical: `${SITE}/ai-image-detector/guides` },
};

const guides = [
  {
    href: "/ai-image-detector/guides/how-to-spot-ai-images",
    title: "How to spot AI-generated images",
    blurb: "The visual tells that give AI images away: hands, text, backgrounds, lighting, and more.",
  },
  {
    href: "/ai-image-detector/guides/how-ai-image-detectors-work",
    title: "How AI image detectors work",
    blurb: "What a detector actually looks at, what the score means, and where detection has limits.",
  },
  {
    href: "/ai-image-detector/guides/check-part-of-an-image-for-ai",
    title: "How to check part of an image for AI",
    blurb: "Why cropping to a face, hand, or background detail gives a cleaner read than the full picture.",
  },
];

export default function GuidesIndex() {
  return (
    <>
      <GuideNav />
      <main className="wrap article-wrap">
        <BackLink href="/ai-image-detector" label="Back to the AI detector" />
        <header className="article-head">
          <h1 className="display">Guides</h1>
          <p>Short, practical reads on AI images and how to detect them.</p>
        </header>
        <div className="guide-list">
          {guides.map((g) => (
            <a key={g.href} className="guide-card" href={g.href}>
              <h2>{g.title}</h2>
              <p>{g.blurb}</p>
              <span className="pc-cta">Read the guide &rarr;</span>
            </a>
          ))}
        </div>
      </main>
      <GuideFooter />
    </>
  );
}
