// Server-side proxy: keeps APP_TOKEN off the client. Forwards the image to the
// Cloudflare worker (which holds the Sightengine keys) and returns { pct }.
// Contract mirrors the Android app: POST /image, multipart models=genai + media,
// response.type.ai_generated (0..1).
export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req) {
  const PROXY_BASE = process.env.PROXY_BASE;
  const APP_TOKEN = process.env.APP_TOKEN;
  if (!PROXY_BASE || !APP_TOKEN) {
    return Response.json(
      { error: "Server not configured. Set PROXY_BASE and APP_TOKEN in .env.local." },
      { status: 500 }
    );
  }

  let incoming;
  try {
    incoming = await req.formData();
  } catch {
    return Response.json({ error: "Invalid upload" }, { status: 400 });
  }
  const file = incoming.get("media");
  if (!file || typeof file === "string") {
    return Response.json({ error: "No image provided" }, { status: 400 });
  }
  const type = file.type || "";
  if (!type.startsWith("image/")) {
    return Response.json({ error: "Please upload an image file" }, { status: 400 });
  }
  if (file.size > 12 * 1024 * 1024) {
    return Response.json({ error: "Image is too large (max 12MB)" }, { status: 400 });
  }

  const forward = new FormData();
  forward.append("models", "genai");
  forward.append("media", file, file.name || "upload.jpg");

  const base = PROXY_BASE.replace(/\/$/, ""); // tolerate trailing slash
  let res;
  try {
    res = await fetch(`${base}/image`, {
      method: "POST",
      headers: { "X-App-Token": APP_TOKEN },
      body: forward,
    });
  } catch (e) {
    return Response.json(
      { error: "Couldn't reach the detector. Check PROXY_BASE.", detail: String(e) },
      { status: 502 }
    );
  }

  // read the body ONCE as text so we can surface the real reason on failure
  const bodyText = await res.text();
  if (!res.ok) {
    // log the true upstream response to the server console for debugging
    console.error("[detect] upstream", res.status, bodyText.slice(0, 500));
    const msg =
      res.status === 401 || res.status === 403
        ? "Detector rejected the request, check APP_TOKEN matches the proxy."
        : res.status === 404
        ? "Proxy endpoint not found, check PROXY_BASE points at the worker."
        : res.status === 429
        ? "Too many checks right now, try again shortly."
        : `The detector returned ${res.status}.`;
    return Response.json({ error: msg }, { status: 502 });
  }

  let data;
  try {
    data = JSON.parse(bodyText);
  } catch {
    console.error("[detect] non-JSON upstream:", bodyText.slice(0, 500));
    return Response.json({ error: "Couldn't read the result from the detector." }, { status: 502 });
  }

  const score = data?.type?.ai_generated;
  if (typeof score !== "number") {
    console.error("[detect] unexpected shape:", JSON.stringify(data).slice(0, 500));
    return Response.json({ error: "Detector response didn't include a score." }, { status: 502 });
  }
  const pct = Math.round(score * 100);
  // confidence = how far the score sits from the uncertain middle (50%)
  const distance = Math.abs(pct - 50);
  const confidence = distance >= 35 ? "High" : distance >= 18 ? "Medium" : "Low";
  const classification = pct >= 50 ? "Fake" : "Real";
  return Response.json({ pct, confidence, classification });
}
