import { GuideNav, GuideFooter, GuideCta, articleJsonLd } from "../parts";

const SITE = "https://www.lmbtechnology.com";
const TITLE = "How AI Image Detectors Work (and What the Score Means)";
const DESC =
  "What an AI image detector actually analyzes, how to read a likelihood score, and the honest limits of detection technology.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE}/guides/how-ai-image-detectors-work` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE}/guides/how-ai-image-detectors-work` },
};

export default function Page() {
  return (
    <>
      <GuideNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleJsonLd({ title: TITLE, description: DESC, path: "/guides/how-ai-image-detectors-work" })),
      }} />
      <main className="wrap article-wrap">
        <article className="article">
          <h1 className="display">How AI image detectors work</h1>
          <p className="article-lead">
            An AI image detector is itself a machine-learning model, trained on huge
            sets of real photographs and AI-generated images until it learns the subtle
            statistical differences between them. Here is what that means in practice.
          </p>

          <h2>What the detector looks at</h2>
          <p>
            Generators leave patterns that people rarely notice but models can measure:
            the way noise is distributed across the image, how sharp edges transition,
            color statistics, compression behavior, and micro-textures in skin, hair,
            and foliage. A detector reads thousands of these weak signals at once and
            combines them into a single judgment.
          </p>

          <h2>What the score means</h2>
          <p>
            The result is a probability, not a verdict. A score of 90% AI means the
            image strongly resembles the AI-generated images the model has seen, and a
            score near 50% means the evidence is genuinely mixed. Treat the score the
            way you would treat a smoke alarm: a strong signal worth acting on, not a
            court ruling.
          </p>

          <h2>Why cropping helps</h2>
          <p>
            Detectors analyze whatever you give them, and a full image averages the
            evidence across every region. If only one area looks suspicious, a hand, a
            face, a patch of background, cropping to that region concentrates the signal
            instead of diluting it, and often produces a much clearer score.
          </p>

          <h2>The honest limits</h2>
          <p>
            No detector is perfect. Heavy compression, small images, screenshots of
            screenshots, and aggressive filters all blur the evidence. Brand-new
            generators can also slip past detectors for a while until models catch up.
            And real photos that have been retouched can pick up AI-like fingerprints
            from the editing tools themselves.
          </p>

          <h2>How to use detection well</h2>
          <p>
            Combine the tools: look at the image yourself, run a detector, crop to the
            suspicious parts, and consider the source. Where did the image first appear,
            who posted it, and does a reverse image search find an original? Detection
            works best as one strong input into your judgment, not a replacement for it.
          </p>

          <GuideCta />
        </article>
      </main>
      <GuideFooter />
    </>
  );
}
