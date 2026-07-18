import LMBLogo from "../../LMBLogo";
import ThemeToggle from "../../ThemeToggle";

export function GuideNav() {
  return (
    <nav className="nav">
      <div className="wrap nav-in">
        <a className="brand" href="/"><LMBLogo size={32} /> LMB<span className="ai">&nbsp;Technology</span></a>
        <div className="nav-right">
          <a className="nav-link" href="/ai-image-detector/guides">Guides</a>
          <a className="nav-link" href="/ai-image-detector">AI Detector</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export function GuideFooter() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <span>© {new Date().getFullYear()} LMB Technology</span>
        <span>
          <a href="/ai-image-detector/guides">Guides</a>&nbsp;&nbsp;·&nbsp;&nbsp;
          <a href="/ai-image-detector">AI Image Detection</a>
        </span>
      </div>
    </footer>
  );
}

export function BackLink({ href, label }) {
  return <a className="back-link" href={href}>&larr; {label}</a>;
}

export function GuideCta() {
  return (
    <div className="article-cta">
      <h3>Try it yourself</h3>
      <p>Upload an image and get an AI-likelihood score in seconds, with a built-in
         crop tool to check exactly the region you care about. Free, no sign-up.</p>
      <a className="btn btn-primary" href="/ai-image-detector">Open the AI detector</a>
    </div>
  );
}

export function articleJsonLd({ title, description, path }) {
  const SITE = "https://www.lmbtechnology.com";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: title,
        description,
        url: `${SITE}${path}`,
        publisher: { "@type": "Organization", name: "LMB Technology", url: SITE },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "LMB Technology", item: SITE },
          { "@type": "ListItem", position: 2, name: "AI Image Detection", item: `${SITE}/ai-image-detector` },
          { "@type": "ListItem", position: 3, name: "Guides", item: `${SITE}/ai-image-detector/guides` },
          { "@type": "ListItem", position: 4, name: title, item: `${SITE}${path}` },
        ],
      },
    ],
  };
}
