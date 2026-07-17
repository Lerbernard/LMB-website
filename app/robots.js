const SITE = "https://www.lmbtechnology.com"; // ← your real domain
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
