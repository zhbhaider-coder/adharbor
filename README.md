# AdHarbor — unofficial rebuild

**Live site: https://adharbor.pages.dev/**

A free, static, all-in-one AI marketing suite modelled on Predis.ai: ad copy,
social posts, captions, hashtags, email and ad creatives from one brief.
Unlimited, no credits, no card, no account.

- Landing page: `index.html`
- Campaign Studio (one brief → full kit via the user's free Gemini key): `studio.html` + `studio.js`
- Creative Studio (20+ canvas templates, brand kit, PNG export): `creative-studio.html` + `creative.js`
- Brand Voice (persistent, localStorage): `brand-voice.html`
- Content calendar + CSV / ICS / PNG export: `calendar.html` + `calendar.js`
- Pricing: `pricing.html`
- SEO pages: `free-ai-marketing-tool.html`, `predis-ai-alternative.html`, `ai-ad-copy-generator.html`
- Shared helpers: `adharbor.js` · Styles: `styles.css`
- Docs: `ANALYSIS.md` · `EARNINGS.md` · `SEARCH-CONSOLE.md` · `BACKLINKS.md` · `BACKLINK-CHECKLIST.md`

## How it works (BYOK, like the Natively clone)

Paste your own free Gemini API key (from Google AI Studio, no card required)
into the Studio page. The key lives **only in your browser's localStorage** —
never in the code, never sent to our servers (there are none). Generation calls
Google's Gemini API directly from the browser. No sign-up, no account, no
backend, no payments.

- Campaign Studio: one brief → Meta/Google/TikTok/LinkedIn ad copy, captions,
  hashtags, email subject + body, product description. Copy buttons on every
  block, regenerate per section, save kits to a local library, send a kit to
  the calendar.
- Creative Studio: 24 canvas templates (Sale, Launch, Quote, Product,
  Testimonial, Announcement, Discount), brand kit (colours, font, logo),
  upload your own photo or pick free Unsplash stock photos, live canvas
  preview, PNG export at 1080×1080, 1080×1920, 1200×628, 1080×1350.
- Brand Voice: tone, audience, banned words, winning hooks — applied to
  every generation.
- Calendar: plan posts from saved kits, export captions as CSV, the calendar
  as an ICS file, attached creatives as PNGs. This is the honest substitute
  for auto-posting, which needs a server.

## What it deliberately does NOT do

AI video / avatars, auto-posting to social accounts, competitor analysis,
predictive performance scoring, and AI image generation on a free key
(Gemini image models are paid-only — no free tier). The site says so plainly
on the landing page, the Studio, the Creative Studio and the calendar.

## Name

"AdHarbor" was cleared by exact-phrase web search on 28 Oct 2026 — no live
product of that name was found. **This was a web-search clearance only, not
a trademark-register (USPTO/EUIPO) search**; a register check is still
advisable before commercial use.

## Performance

No framework, no external fonts, no images shipped with the site (stock
photos load from Unsplash only when the user picks one). The homepage is
~16 KB of HTML + one ~12 KB stylesheet.

## Disclaimer

Unofficial rebuild for personal use — not affiliated with Predis.ai.
Layout, structure, and functionality are recreated with equivalent wording;
no logos, brand images, or verbatim marketing copy were copied. Predis.ai
prices quoted were verified live on predis.ai/pricing on 28 Oct 2026.
