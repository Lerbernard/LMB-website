import { GuideNav, GuideFooter, GuideCta, BackLink, articleJsonLd } from "../parts";

const SITE = "https://www.lmbtechnology.com";
const TITLE = "How to Spot AI-Generated Images (7 Tells That Give Them Away)";
const DESC =
  "A practical guide to spotting AI-generated images by eye: hands and fingers, garbled text, warped backgrounds, lighting mismatches, textures, and more.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE}/ai-image-detector/guides/how-to-spot-ai-images` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE}/ai-image-detector/guides/how-to-spot-ai-images` },
};

export default function Page() {
  return (
    <>
      <GuideNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleJsonLd({ title: TITLE, description: DESC, path: "/ai-image-detector/guides/how-to-spot-ai-images" })),
      }} />
      <main className="wrap article-wrap">
        <BackLink href="/ai-image-detector/guides" label="All guides" />
        <article className="article">
          <h1 className="display">How to spot AI-generated images</h1>
          <p className="article-lead">
            AI image generators have improved fast, but they still leave fingerprints.
            If you know where to look, many fakes fall apart under thirty seconds of
            attention. Here are the tells that catch most of them.
          </p>

          <h2>1. Hands and fingers</h2>
          <p>
            Hands remain the classic giveaway. Count the fingers, then look at how they
            bend: AI images often show six fingers, joints that fold the wrong way, or
            two hands merging where they touch. Rings, watches, and held objects
            frequently melt into the skin.
          </p>

          <h2>2. Text and logos</h2>
          <p>
            Look at any writing in the image: signs, labels, book covers, shirts.
            Generators tend to produce letter-like shapes rather than real words, and
            brand logos come out slightly wrong. If the text looks like it is written in
            a dream, that is a strong signal.
          </p>

          <h2>3. Backgrounds and edges</h2>
          <p>
            The subject usually gets the most model attention, so the background is
            where quality slips: railings that do not line up, windows with impossible
            reflections, crowds of half-formed faces, and objects that blend into each
            other. Follow straight lines across the image and see if they stay straight.
          </p>

          <h2>4. Lighting and shadows</h2>
          <p>
            Check where the light comes from. AI images often mix light sources that do
            not agree: a face lit from the left with shadows falling the wrong way, or
            reflections in glasses and eyes that do not match the scene in front of the
            person.
          </p>

          <h2>5. Skin, hair, and texture</h2>
          <p>
            AI skin tends toward an airbrushed, waxy smoothness, and individual hair
            strands often merge into painterly clumps. Fabric patterns are another good
            check: stripes and checks that warp or change scale mid-garment are hard for
            generators to keep consistent.
          </p>

          <h2>6. Symmetry that is slightly off</h2>
          <p>
            Earrings that do not match, glasses with two different frames, eyes with
            different catchlights, collars that sit unevenly. Humans are roughly
            symmetric, and generators often lose track of the pair.
          </p>

          <h2>7. The gut check, then a detector</h2>
          <p>
            If something feels off but you cannot name it, that instinct is data. Run
            the image through an AI detector for a second opinion, and crop to the
            suspicious region, a hand, a face, a patch of background, so the detector
            scores exactly the part that worried you.
          </p>

          <GuideCta />
        </article>
      </main>
      <GuideFooter />
    </>
  );
}
