"use client";
import { useRef, useState, useCallback } from "react";
import CropModal from "./CropModal";
import AdUnit from "./AdUnit";
import LMBLogo from "../LMBLogo";
import DetectorLogo from "../DetectorLogo";
import ThemeToggle from "../ThemeToggle";

// Rich structured data: WebApplication + FAQ + Breadcrumbs.
// FAQ schema can surface as expandable Q&A directly in Google results.
const SITE_URL = "https://www.lmbtechnology.com";
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
      publisher: { "@type": "Organization", name: "LMB Technology", url: SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "LMB Technology", item: SITE_URL },
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


export default function Home() {
  const fileInput = useRef(null);
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState(null);   // object URL for display
  const [rawFile, setRawFile] = useState(null);   // File/Blob to send
  const [cropSrc, setCropSrc] = useState(null);   // when set, crop modal is open
  const [status, setStatus] = useState("idle");   // idle | loading | done | error
  const [pct, setPct] = useState(null);
  const [meta, setMeta] = useState(null); // { confidence, classification }
  const [error, setError] = useState(null);

  const reset = () => {
    setPreview(null); setRawFile(null); setPct(null);
    setStatus("idle"); setError(null); setCropSrc(null);
  };

  const accept = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please choose an image file."); setStatus("error"); return; }
    setError(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    setRawFile(file);
    setPct(null);
    setStatus("idle");
  }, []);

  const onPick = (e) => accept(e.target.files?.[0]);
  const onDrop = (e) => {
    e.preventDefault(); setDrag(false);
    accept(e.dataTransfer.files?.[0]);
  };

  const runDetect = async (blob) => {
    setStatus("loading"); setError(null); setPct(null); setMeta(null);
    const fd = new FormData();
    fd.append("media", blob, "image.jpg");
    try {
      const res = await fetch("/api/detect", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); setStatus("error"); return; }
      setPct(data.pct); setMeta({ confidence: data.confidence, classification: data.classification }); setStatus("done");
    } catch {
      setError("Couldn't reach the detector. Check your connection."); setStatus("error");
    }
  };

  const check = () => rawFile && runDetect(rawFile);
  const openCrop = () => preview && setCropSrc(preview);
  const onCropped = (blob) => {
    const url = URL.createObjectURL(blob);
    setPreview(url); setRawFile(blob); setCropSrc(null); setPct(null); setStatus("idle");
    runDetect(blob);
  };

  const verdict = pct == null ? null : pct >= 50
    ? { label: "Likely AI-generated", color: "var(--ai)" }
    : { label: "Likely human-made", color: "var(--human)" };

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="nav">
        <div className="wrap nav-in">
          <div className="brand-group">
            <a className="brand" href="/"><LMBLogo size={30} /> LMB</a>
            <a className="brand product" href="/ai-image-detector"><DetectorLogo size={28} /> AI Image Detection</a>
          </div>
          <div className="nav-right">
            <a className="nav-link" href="/ai-image-detector/guides">Guides</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-glow" />
        <div className="wrap">
          <span className="eyebrow"><DetectorLogo size={18} /> Seeing isn&apos;t believing</span>
          <h1 className="display">AI Detector <span className="g">with Crop Tool</span></h1>
          <p className="hero-tagline">Is this image real, or made by AI?</p>
          <p>Upload any image, use the <strong>built-in crop tool</strong> to zoom into a
             face, object, or suspicious region, and get an AI-likelihood score in seconds.</p>
          <a className="btn btn-primary" href="#detector">Check an image</a>
        </div>
      </header>

      <main className="wrap">
        <section className="detector" id="detector">
          {!preview && (
            <div
              className={`dz${drag ? " drag" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={onDrop}
              onClick={() => fileInput.current?.click()}
              role="button" tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileInput.current?.click()}
            >
              <div className="dz-badge"><DetectorLogo size={96} /></div>
              <h3>Drop an image, or tap to browse</h3>
              <p>JPG, PNG or WebP, up to 12MB. Nothing is stored.</p>
              <div className="dz-actions">
                <span className="btn btn-primary">Choose image</span>
              </div>
              <input ref={fileInput} type="file" accept="image/*" hidden onChange={onPick} />
            </div>
          )}

          {preview && (
            <div className="result">
              <div className="result-media">
                <img src={preview} alt="Your upload" />
                {status === "loading" && <div className="scanline" />}
              </div>
              <div className="result-body">
                {status === "done" && verdict && (
                  <>
                    <div className="stat">
                      <span className="stat-k">AI Likelihood</span>
                      <span className="stat-v" style={{ color: verdict.color }}>{pct}%</span>
                    </div>
                    <div className="meter"><i style={{ width: `${pct}%`, background: verdict.color }} /></div>
                    <div className="stat">
                      <span className="stat-k">Confidence</span>
                      <span className="stat-v">{meta?.confidence}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-k">Classification</span>
                      <span className="stat-v" style={{ color: verdict.color }}>{meta?.classification}</span>
                    </div>
                    <p className="result-note">
                      This is a probability estimate, not proof. No detector is perfect,
                      so treat it as a strong signal and verify anything important.
                    </p>
                  </>
                )}
                {status === "loading" && (
                  <div className="verdict">
                    <DetectorLogo size={30} spinning />
                    <span className="lbl" style={{ color: "var(--text2)" }}>Analyzing…</span>
                  </div>
                )}
                {status === "idle" && (
                  <p style={{ color: "var(--text2)", fontSize: 14.5 }}>
                    Ready to check. Crop first to focus on a specific area, or check the whole image.
                  </p>
                )}
                {status === "error" && <div className="err">{error}</div>}

                <div className="result-actions">
                  {status !== "loading" && (
                    <>
                      <button className="btn btn-primary" onClick={check}>
                        {status === "done" ? "Check again" : "Check this image"}
                      </button>
                      <button className="btn btn-teal" onClick={openCrop}>Crop &amp; check</button>
                      <button className="btn btn-grey" onClick={reset}>New image</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {status === "error" && !preview && <div className="err">{error}</div>}
        </section>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP} />

        <section className="feature-band">
          <div className="fb-copy">
            <div className="n">The crop tool</div>
            <h2 className="display">Check the part that matters, not the whole picture</h2>
            <p>AI artifacts often hide in one spot: a hand, an eye, a background detail.
               The crop tool lets you drag a box around exactly that area, so the
               detector scores the region you care about at full resolution, not a
               shrunk-down version of the entire image.</p>
            <a className="btn btn-primary" href="#detector">Try the crop tool</a>
          </div>
          <div className="fb-visual" aria-hidden="true">
            <div className="fb-frame">
              <div className="fb-cropbox">
                <span className="fb-h nw" /><span className="fb-h ne" />
                <span className="fb-h sw" /><span className="fb-h se" />
              </div>
            </div>
          </div>
        </section>

        <section className="how">
          <h2 className="display">How it works</h2>
          <p className="sub">Three steps, a few seconds.</p>
          <div className="steps">
            <div className="step">
              <div className="n">STEP 01</div>
              <h4>Upload</h4>
              <p>Drop in a photo, screenshot, or any image you&apos;re unsure about.</p>
            </div>
            <div className="step">
              <div className="n">STEP 02</div>
              <h4>Crop</h4>
              <p>Zoom the box to a face, an object, or a suspicious region, detection runs on exactly what you select.</p>
            </div>
            <div className="step">
              <div className="n">STEP 03</div>
              <h4>Read the score</h4>
              <p>Get an AI-likelihood percentage with a clear verdict, right away.</p>
            </div>
          </div>
        </section>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM} />

        <section className="faq" id="faq">
          <h2 className="display">Frequently asked questions</h2>
          <div className="faq-list">
            <details>
              <summary>How do I check if an image is AI-generated?</summary>
              <p>Upload the image above, optionally use the crop tool to focus on a
                 specific area, and the AI detector returns an AI-likelihood score in
                 seconds. No sign-up is required.</p>
            </details>
            <details>
              <summary>Is the AI image detector free?</summary>
              <p>Yes, it is completely free with no account needed. Images are analyzed
                 to produce a score and are not stored.</p>
            </details>
            <details>
              <summary>What does the crop tool do?</summary>
              <p>The built-in crop tool lets you draw a box around a specific area, like a
                 face, a hand, or a background detail, so the detector scores exactly that
                 region at full resolution instead of a shrunk-down version of the whole
                 image. AI artifacts often hide in one spot, and cropping to it gives a
                 cleaner read.</p>
            </details>
            <details>
              <summary>How accurate is AI image detection?</summary>
              <p>Results are probability estimates, not proof. No detector is perfect, so
                 treat the score as a strong signal and verify anything important through
                 other sources.</p>
            </details>
            <details>
              <summary>Can it detect AI-generated art and photos?</summary>
              <p>Yes. It works on photographs, screenshots, and digital art in common
                 formats including JPG, PNG, and WebP.</p>
            </details>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <span>© {new Date().getFullYear()} LMB Technology</span>
          <span>Results are estimates, verify anything that matters.</span>
        </div>
      </footer>

      {cropSrc && (
        <CropModal src={cropSrc} onCancel={() => setCropSrc(null)} onCrop={onCropped} />
      )}
    </>
  );
}
