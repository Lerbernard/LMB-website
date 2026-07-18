import { GuideNav, GuideFooter, GuideCta, articleJsonLd } from "../parts";

const SITE = "https://www.lmbtechnology.com";
const TITLE = "How to Check Part of an Image for AI (Crop-First Detection)";
const DESC =
  "Why checking a cropped region, a face, a hand, a background detail, often beats scanning the whole image, and how to do it in seconds.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE}/ai-image-detector/guides/check-part-of-an-image-for-ai` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE}/ai-image-detector/guides/check-part-of-an-image-for-ai` },
};

export default function Page() {
  return (
    <>
      <GuideNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleJsonLd({ title: TITLE, description: DESC, path: "/ai-image-detector/guides/check-part-of-an-image-for-ai" })),
      }} />
      <main className="wrap article-wrap">
        <article className="article">
          <h1 className="display">How to check part of an image for AI</h1>
          <p className="article-lead">
            Most people scan whole images. But AI artifacts usually live in one spot,
            and a whole-image score averages the strange region together with everything
            normal around it. Cropping first is the single biggest upgrade you can make
            to how you check images.
          </p>

          <h2>Why the full image can mislead</h2>
          <p>
            Imagine a photo where only the hands were retouched by AI, or a real scene
            with one generated person composited in. Nine tenths of that image is
            genuinely real, so a whole-image check leans real. The fake tenth gets
            outvoted. Cropping flips that: the detector sees only the region you chose,
            at full resolution, with nothing to dilute the signal.
          </p>

          <h2>What to crop to</h2>
          <p>
            Pick the region your eye snagged on. The high-value targets are hands and
            fingers, faces and eyes, any text or logos, jewelry and glasses, and busy
            background areas like crowds, foliage, or railings. If a friend sent the
            image asking is this real, crop to whatever made them ask.
          </p>

          <h2>How to do it here</h2>
          <p>
            Open the AI detector, upload the image, and press Crop and check. Drag the
            box over the region you want, using the corner handles to resize, and
            confirm. The detector scores exactly that selection at the image&apos;s native
            resolution, so nothing is lost to downscaling. You can re-crop and check a
            different region as many times as you like.
          </p>

          <h2>Reading a cropped result</h2>
          <p>
            A high AI score on a crop tells you that region carries AI fingerprints,
            which matters even when the full image scores low. If two or three
            different crops of the same image all come back high, confidence rises
            sharply. And if a suspicious crop comes back low, your eye may simply have
            caught an odd but genuine detail, which happens too.
          </p>

          <GuideCta />
        </article>
      </main>
      <GuideFooter />
    </>
  );
}
