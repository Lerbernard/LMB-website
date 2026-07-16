# LMB Technologies

Company site for **LMB Technologies** (a software studio) with **OverlAI**
(the AI image detector) as a product page.

- `/`         → LMB Technologies landing (studio, what we do, products, contact)
- `/overlai`  → the OverlAI AI image detector (with crop tool)

## Choosing / changing the LMB logo
Six logo concepts ship in the `logos/` folder (PNG + SVG). The site currently
uses **option 3 (layers glyph)** via `app/LMBLogo.js`. To switch, open that file
and paste the `<g>...</g>` (or full inner markup) from the option's `.svg`.

## Before deploying — set your domain
Replace `https://lmbtech.dev` with your real URL in `app/layout.js`,
`app/overlai/layout.js`, `app/robots.js`, `app/sitemap.js`.

## Run
1. `npm install`
2. Copy `.env.local.example` → `.env.local` and fill in:
   ```
   PROXY_BASE=https://overlai-proxy.overlaisupport.workers.dev
   APP_TOKEN=your_app_token
   ```
   (The same two values your Android app uses.)
3. `npm run dev` → http://localhost:3000
   (Or press F5 → “Next.js: dev” to launch from VS Code.)

## How detection works
Browser → `POST /api/detect` (server route) → adds `X-App-Token` → forwards to
`{PROXY_BASE}/image` with `models=genai` → reads `type.ai_generated` (0–1) →
returns `{ pct }`. The token stays server-side; the client never sees it.

## Before deploying — set your domain
SEO files use a placeholder domain. Replace `https://overlai.app` with your real
URL in three files: `app/layout.js`, `app/robots.js`, `app/sitemap.js`.

## Deploy
- **Vercel:** import the folder, set `PROXY_BASE` and `APP_TOKEN` as Environment
  Variables, deploy.
- **Any Node host:** `npm run build && npm start`.

## Project layout
```
app/
  page.js              landing + detector UI
  CropModal.js         draggable/resizable crop tool (exports native-res JPEG)
  api/detect/route.js  server proxy to the Cloudflare worker
  Logo.js              OverlAI dual-arc mark
  globals.css          theme (purple/teal on dark)
.vscode/               settings, launch (F5 = dev), extension recommendations
```


## What's new
- **Light / dark mode** — toggle in the nav; remembers your choice, follows the
  OS preference on first visit, no flash on load.
- **SEO** — full Open Graph + Twitter cards, JSON-LD `WebApplication` schema,
  `robots.txt`, `sitemap.xml`, keyword-tuned title/description, and an `og.png`
  social preview. Set your real domain (see above) so these resolve correctly.
- **Crop tool front and centre** — named in the hero, given its own feature
  section, and highlighted in the share image.

## Troubleshooting the detector (502)
A 502 from `/api/detect` means the request reached your Cloudflare proxy but it
answered with an error. The route now logs the real reason to the server console
and returns a specific message:
- "check APP_TOKEN matches the proxy" → the token in `.env.local` differs from
  the worker's `APP_TOKEN`.
- "check PROXY_BASE points at the worker" → wrong/typo'd base URL.
- Look at the terminal running `npm run dev` for a `[detect] upstream …` line
  showing the exact status + body from the proxy.
