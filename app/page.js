"use client";
import LMBLogo from "./LMBLogo";
import DetectorLogo from "./DetectorLogo";
import ThemeToggle from "./ThemeToggle";

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="wrap nav-in">
          <a className="brand" href="/"><LMBLogo size={32} /> LMB<span className="ai">&nbsp;Technologies</span></a>
          <div className="nav-right">
            <a className="nav-link" href="#products">Products</a>
            <a className="nav-link" href="#work">What we do</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="hero-glow" />
        <div className="wrap">
          <span className="eyebrow"><LMBLogo size={17} /> Software studio</span>
          <h1 className="display">
            We build <span className="g">software</span> people<br />actually want to use.
          </h1>
          <p>
            LMB Technologies is a small studio shipping web and mobile products end to
            end, from the first sketch to the app store. We design it, build it, and
            keep it running.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#products">See our products</a>
            <a className="btn btn-ghost" href="#contact">Work with us</a>
          </div>
        </div>
      </header>

      <main className="wrap">
        {/* WHAT WE DO */}
        <section className="how" id="work">
          <h2 className="display">What we do</h2>
          <p className="sub">One team, the whole build.</p>
          <div className="steps">
            <div className="step">
              <div className="n">DESIGN</div>
              <h4>Product &amp; interface</h4>
              <p>Interfaces that feel obvious. We shape the flow, the visuals, and the details that make a product click.</p>
            </div>
            <div className="step">
              <div className="n">BUILD</div>
              <h4>Web &amp; mobile</h4>
              <p>Fast, reliable apps for the browser, Android, and iOS, built on modern, maintainable foundations.</p>
            </div>
            <div className="step">
              <div className="n">SHIP</div>
              <h4>Launch &amp; run</h4>
              <p>Store submissions, infrastructure, and the ongoing care that keeps a product healthy after launch.</p>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="how" id="products">
          <h2 className="display">Products</h2>
          <p className="sub">Things we&apos;ve built and run ourselves.</p>
          <div className="products">
            <a className="product-card" href="/ai-image-detector">
              <div className="pc-head">
                <DetectorLogo size={44} />
                <div>
                  <h3>AI Image Detection</h3>
                  <span className="pc-tag">Web app · Free</span>
                </div>
              </div>
              <p>
                Check whether any image is AI-generated. A built-in crop tool lets you
                detect exactly the region you care about, in seconds.
              </p>
              <span className="pc-cta">Open the detector &rarr;</span>
            </a>

            <div className="product-card soon">
              <div className="pc-head">
                <div className="pc-dot" />
                <div>
                  <h3>More on the way</h3>
                  <span className="pc-tag">In the workshop</span>
                </div>
              </div>
              <p>We&apos;re always building. New tools and apps from LMB Technologies land here.</p>
              <span className="pc-cta muted">Coming soon</span>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact" id="contact">
          <h2 className="display">Have something to build?</h2>
          <p>Tell us what you&apos;re working on. We reply to every message.</p>
          <a className="btn btn-primary" href="mailto:hello@lmbtech.dev">Get in touch</a>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <span>© {new Date().getFullYear()} LMB Technologies</span>
          <span><a href="/ai-image-detector">AI Image Detection</a></span>
        </div>
      </footer>
    </>
  );
}
