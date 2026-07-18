import LMBLogo from "../LMBLogo";
import ThemeToggle from "../ThemeToggle";

const SITE = "https://www.lmbtechnology.com";

export const metadata = {
  title: "Privacy Policy | LMB Technology",
  description:
    "How LMB Technology handles images you check with the AI detector, what we don't store, and how advertising cookies work on this site.",
  alternates: { canonical: `${SITE}/privacy` },
};

export default function Privacy() {
  return (
    <>
      <nav className="nav">
        <div className="wrap nav-in">
          <a className="brand" href="/"><LMBLogo size={30} /> LMB<span className="ai">&nbsp;Technology</span></a>
          <div className="nav-right">
            <a className="nav-link" href="/ai-image-detector">AI Detector</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="wrap article-wrap">
        <article className="article">
          <h1 className="display">Privacy Policy</h1>
          <p className="article-lead">
            This page explains what happens to the images you check with our AI
            detector, what information this site collects, and the choices you have.
            Last updated: July 2026.
          </p>

          <h2>Images you upload</h2>
          <p>
            When you check an image, it is resized in your browser and sent over an
            encrypted connection to our detection service, which analyzes it and
            returns a score. Images are processed to produce that score and are not
            saved by us. We do not build a library of uploaded images, and we cannot
            retrieve an image after your check completes. Analysis is performed by
            our image-analysis provider (Sightengine) under their own privacy terms.
          </p>

          <h2>What we don&apos;t collect</h2>
          <p>
            The detector requires no account, sign-up, email address, or personal
            details. We do not sell personal information.
          </p>

          <h2>Server logs and rate limiting</h2>
          <p>
            Like most websites, our servers and hosting provider keep short-lived
            technical logs (such as IP address, browser type, and time of request)
            for security, debugging, and abuse prevention. We also use your IP
            address in memory, briefly, to rate-limit the detector so it stays free
            for everyone. These records are not used to identify you.
          </p>

          <h2>Advertising and cookies</h2>
          <p>
            This site shows ads served by Google AdSense. Google and its partners
            may use cookies or similar technologies to serve ads based on your
            visits to this and other websites, and to measure ad performance. You
            can opt out of personalized advertising in Google&apos;s{" "}
            <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">Ads Settings</a>,
            and learn more about how Google uses data at{" "}
            <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">
              policies.google.com/technologies/partner-sites</a>.
            Depending on your region, you may see a consent prompt controlling
            whether ads are personalized.
          </p>

          <h2>Your choices</h2>
          <p>
            You can use the detector without providing any personal information.
            You can block or clear cookies in your browser settings, and opt out of
            ad personalization through the Google links above. If you are in a
            region with privacy rights such as the GDPR or CCPA, you may have
            additional rights regarding personal data held about you; since we keep
            essentially none, the advertising controls above cover most of it.
          </p>

          <h2>Children</h2>
          <p>
            This site is not directed at children under 13, and we do not knowingly
            collect personal information from them.
          </p>

          <h2>Changes and contact</h2>
          <p>
            If this policy changes, we will update this page and the date at the
            top. Questions? Reach us through the contact section on the{" "}
            <a href="/">LMB Technology homepage</a>.
          </p>
        </article>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <span>© {new Date().getFullYear()} LMB Technology</span>
          <span>
            <a href="/ai-image-detector">AI Image Detection</a>&nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="/privacy">Privacy</a>
          </span>
        </div>
      </footer>
    </>
  );
}
