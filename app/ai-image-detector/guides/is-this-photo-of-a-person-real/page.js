import { GuideNav, GuideFooter, GuideCta, articleJsonLd } from "../parts";

const SITE = "https://www.lmbtechnology.com";
const TITLE = "Is This Photo of a Person Real? How to Check a Face for AI";
const DESC =
  "A practical checklist for telling whether a profile picture or portrait is a real person or AI-generated: what to look at, and how to verify.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE}/ai-image-detector/guides/is-this-photo-of-a-person-real` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE}/ai-image-detector/guides/is-this-photo-of-a-person-real` },
};

export default function Page() {
  return (
    <>
      <GuideNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleJsonLd({ title: TITLE, description: DESC, path: "/ai-image-detector/guides/is-this-photo-of-a-person-real" })),
      }} />
      <main className="wrap article-wrap">
        <article className="article">
          <h1 className="display">Is this photo of a person real?</h1>
          <p className="article-lead">
            Fake profile pictures are the most common AI images you&apos;ll meet: dating
            profiles, marketplace sellers, sudden new followers. Most can be caught
            in under a minute with the right checks.
          </p>

          <h2>Start with the parts AI still gets wrong</h2>
          <p>
            Look past the face itself, generators are excellent at faces now, and
            check the edges of the person instead. Ears and earrings often mismatch
            between sides. Teeth can blur together or repeat. Glasses frames bend or
            merge into skin. Hair strands dissolve into the background instead of
            crossing it. Necklaces, collars, and shirt seams frequently break or
            change pattern halfway across.
          </p>

          <h2>Check the background and the crop</h2>
          <p>
            AI portraits tend to have dreamy, out-of-focus backgrounds with melted
            details: text that isn&apos;t quite letters, windows that don&apos;t line up,
            other &quot;people&quot; who are shapes rather than persons. A suspiciously tight
            head-and-shoulders crop is itself a tell, it hides the hands and
            surroundings where mistakes live.
          </p>

          <h2>One photo is a red flag by itself</h2>
          <p>
            Real people leave trails: multiple photos across time, different
            lighting, different angles, tagged appearances in other people&apos;s
            pictures. An account with exactly one flawless, studio-quality portrait
            and nothing else behaves like a generated identity, because generating a
            second consistent photo of the same fake person is still hard.
          </p>

          <h2>Then let a detector look</h2>
          <p>
            Eyes catch the obvious fakes; a detector catches the statistical ones.
            Run the photo through the detector, and crop to the face region for the
            cleanest read, a full screenshot with interface chrome around it dilutes
            the signal. A high AI score plus any of the visual tells above is about
            as close to certainty as this gets.
          </p>

          <GuideCta />
        </article>
      </main>
      <GuideFooter />
    </>
  );
}
