# ANALYSIS.md — AdHarbor

## What was built

AdHarbor is a free, static, all-in-one AI marketing suite modelled on
Predis.ai, built from the deep-research report of 28 Oct 2026
(`~/workspace/research_notes/ai-marketing-tool-deep-research-20261028-1546/report.md`).
One brief → a full campaign kit, plus a canvas creative studio, a persistent
Brand Voice, and a content calendar with export. No server, no accounts, no
payments, no card. All data in browser localStorage.

## Why this target

- **Proven niche, biggest price umbrella.** Predis.ai is the closest
  all-in-one tool (claims 6.4M businesses, G2 4.7/5) and charges $32–$249/mo,
  credit-metered, with a card-required 3-day trial. The AI-in-marketing
  market is $27B (2025) → $35.4B (2026) — Grand View Research.
- **The #1 complaint is the meter.** Across Jasper (Trustpilot 3.5/5),
  Copy.ai (1.8/5), AdCreative.ai (3.2/5) and Predis.ai, billing — credit
  caps, card-required trials, charges after cancellation, surprise annual
  bills — dominates the complaints, not product quality. A free, no-meter
  tool sidesteps the entire complaint category.
- **Buildable free.** Text generation is free on the Gemini API free tier
  (Flash models, no card); canvas creatives, templates, brand kit and
  CSV/ICS/PNG export are all client-side. AI video, auto-posting,
  competitor analysis and predictive scoring are explicitly out of scope —
  they need servers and proprietary data.

## The 5 must-have features (from the research) — status

1. **One brief → full campaign kit** — DONE. Studio generates Meta (×3),
   Google (×3), TikTok (×3), LinkedIn (×2), captions (×4), hashtags (×12),
   email (3 subjects + body) and product description in one call.
2. **Truly unlimited, no-credit generation** — DONE. User's own free Gemini
   key, stored only in localStorage, with a "no credits, no card, no
   account" promise on the landing page, Studio and pricing page.
3. **Canvas ad-creative studio** — DONE. 24 editable templates, brand kit
   (colours, fonts, logo upload), own-photo upload, 14 free Unsplash stock
   photos, PNG export at 1080×1080, 1080×1920, 1200×628, 1080×1350.
4. **Persistent Brand Voice** — DONE. Tone, audience, banned words, saved
   hooks and past winners in localStorage, appended to every Studio prompt.
5. **Content calendar + bulk export** — DONE. Month grid, plan from saved
   kits, export captions as CSV, calendar as ICS, creatives as PNGs.
   Honest substitute for auto-posting, labelled as such on the page.

## Architecture

- Pure static HTML/CSS/JS. One shared stylesheet (`styles.css`, ~12 KB),
  one shared helper (`adharbor.js`: localStorage keys, Gemini fetch,
  copy/download/toast helpers), one JS file per app page.
- Gemini call: `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=...`
  with a structured JSON prompt; the response is parsed as JSON with a
  raw-text fallback. Per-section regeneration re-prompts for one section.
- localStorage keys: `ah_gemini_key`, `ah_brand_voice`, `ah_kits`,
  `ah_calendar`, `ah_brand_kit`.
- Canvas rendering: gradient or photo background (cover-fit, adjustable
  dim), wrapped headline, subheadline, CTA pill, brand name, logo, optional
  NEW badge. Export via `canvas.toBlob` → PNG download. Stock photos load
  from `images.unsplash.com` with `crossOrigin="anonymous"` so the canvas
  stays exportable.
- SEO: title, meta, OG/Twitter, canonical, JSON-LD (SoftwareApplication +
  FAQPage on index), 1 H1 per page, internal links, sitemap with 9 URLs,
  robots.txt. No `.html` in sitemap/canonical/og:url (clean-URL rule).

## Comparison with the original (Predis.ai)

| | AdHarbor | Predis.ai |
|---|---|---|
| Price | $0 forever | Core $32/mo, Rise $79/mo, Enterprise+ $249/mo |
| Credits | None — unlimited | 1,300 / 3,200 / 10,000 per month, expire |
| Card / account | None | Card required for 3-day trial |
| Email copy | Yes, same brief | No |
| Product descriptions | Yes, same brief | No |
| Ad-creative studio | 24 canvas templates, PNG export | AI image/video, credit-metered |
| Brand Voice | Yes, persistent, free | Brand kit on paid tiers |
| Auto-posting | Export (CSV/ICS/PNG), no cap | Capped ~2–3/day; none on Core |
| AI video / avatars | No (honest) | Yes (credit-heavy) |
| Competitor analysis / scoring | No (honest) | Paid tiers |

## What is missing / known limits

- **No AI image generation.** Gemini image models (Nano Banana) are
  paid-only; the Creative Studio renders templates + photos instead. This
  is stated on the page, not hidden.
- **No auto-posting.** Needs a server + OAuth. Calendar export is the
  substitute.
- **No accounts / sync.** Everything is per-browser localStorage. Clearing
  browser data wipes kits, Brand Voice and the calendar.
- **No usage analytics.** No way to know how many people use it.
- **Gemini free-tier limits.** ~250 requests/day for 2.5 Flash. A heavy
  user hits the limit; the error message says so and suggests waiting or a
  second key.
- **Stock photo reliability.** Unsplash direct URLs are used as-is; if
  Unsplash changes an ID, that thumbnail breaks (the picker fails
  gracefully with a toast).

## Files

16 HTML/JS/CSS files + sitemap + robots + 6 docs. Total site ~190 KB.
See README.md for the file list.
