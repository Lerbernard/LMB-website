import { GuideNav, GuideFooter, GuideCta, articleJsonLd } from "../parts";

const SITE = "https://www.lmbtechnology.com";
const TITLE = "Reverse Image Search + AI Check: The Two-Step Image Verification";
const DESC =
  "The most reliable way to verify a suspicious image: combine a reverse image search to find its origin with an AI detector to check how it was made.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE}/ai-image-detector/guides/reverse-image-search-and-ai-check` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE}/ai-image-detector/guides/reverse-image-search-and-ai-check` },
};

export default function Page() {
  return (
    <>
      <GuideNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleJsonLd({ title: TITLE, description: DESC, path: "/ai-image-detector/guides/reverse-image-search-and-ai-check" })),
      }} />
      <main className="wrap article-wrap">
        <article className="article">
          <h1 className="display">Reverse image search + AI check</h1>
          <p className="article-lead">
            The two questions that verify almost any image are &quot;where did this come
            from?&quot; and &quot;how was it made?&quot;. Reverse image search answers the first,
            an AI detector answers the second, and together they&apos;re far stronger
            than either alone.
          </p>

          <h2>Step 1: find the origin</h2>
          <p>
            Run the image through Google Lens (lens.google.com), TinEye
            (tineye.com), or Bing Visual Search, uploading the file directly works
            better than pasting a link. You&apos;re looking for the earliest and most
            authoritative appearance: a news agency, an original social post, a
            stock photo listing. Sort by date where the tool allows it.
          </p>

          <h2>What the origin tells you</h2>
          <p>
            An old photo attached to a new event is the most common form of image
            misinformation, no AI required. If the &quot;breaking news&quot; picture first
            appeared in 2019, the case is closed. If the image appears nowhere at
            all despite looking like a professional photo, that absence is itself
            suspicious: real photos of real events leave trails.
          </p>

          <h2>Step 2: check how it was made</h2>
          <p>
            When search finds nothing conclusive, run the image through the AI
            detector. Use the crop tool to focus on the region that matters, a
            face, a hand, the detail being claimed as evidence, since a focused
            crop gives a cleaner score than a full screenshot with borders and
            interface around it.
          </p>

          <h2>Reading the two results together</h2>
          <p>
            No trail plus a high AI score: almost certainly generated. A clear 2019
            origin plus a low AI score: real photo, recycled dishonestly. A real
            origin but a high score on one cropped region can indicate a genuine
            photo that&apos;s been AI-edited. And when both checks come back ambiguous,
            that&apos;s a result too, treat the image as unverified and don&apos;t share it
            as fact.
          </p>

          <GuideCta />
        </article>
      </main>
      <GuideFooter />
    </>
  );
}
