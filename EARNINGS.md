# EARNINGS.md — How AdHarbor can make money

*Honest version. A clone earns nothing on day one. This page is the plan, not a promise.*

## 1. How the original makes money

Predis.ai (predis.ai) sells a credit-metered AI social/ad generator.
Prices verified live on its pricing page, 28 Oct 2026:

- **Core — $32/mo ($19 annual, $230/yr):** 1,300 credits/month, 1 brand,
  10 channels, no auto-posting, 60 competitor runs.
- **Rise — $79/mo ($40 annual, $474/yr):** 3,200 credits/month, 4 brands,
  20 channels, 130 competitor runs.
- **Enterprise+ — $249/mo ($212 annual, $2,540/yr):** 10,000 credits/month,
  unlimited brands, 60 channels, 600 competitor runs, API access.
- **Add-ons:** extra credits $29/mo, extra brand $5/mo, extra channels
  $25–$99/mo.

The money mechanism is the meter: credits are consumed per generation,
video costs several times an image, unused credits expire monthly, and
heavy users are pushed up-tier or into add-ons. Every plan starts with a
3-day free trial **requiring a card**, charged when day 3 ends. Predis
claims 6.4M businesses and 200M+ pieces of content generated; no public
revenue figure exists. The wider category is proven: Jasper ~$88M/yr
estimated revenue, AdCreative.ai acquired by Appier for $38M (Mar 2025),
Creatify $9M ARR in 18 months.

## 2. How THIS clone can make money (same model, adapted)

The clone is a free static site today, so the earning version of it is:

| What to charge for | How | Why it can work |
|---|---|---|
| **Display ads** | AdSense on the site once it has real traffic (the landing + 3 SEO pages are the traffic surface) | Free tools get search traffic; ads pay per impression/click. Needs real users first and an approved AdSense account. |
| **Affiliate links** | Recommend the tools marketers already buy (Canva, Buffer, email tools) from the Studio/Calendar pages with disclosure | Fits the audience exactly; costs nothing to add; pays only when someone buys. |
| **Hosted AI plan (later)** | User pays monthly; the clone calls Gemini with *our* key and bills per use | This is Predis's model without the credit trap — but only worth building once real users exist, because every generation costs us money. |
| **Pro templates / template packs (later)** | One-time payment for premium creative-template packs | The canvas studio is the natural place to sell design, not generation. |
| **Keep free forever** | The Studio, Creative Studio, Brand Voice and Calendar exactly as they are | Free users are the funnel: directory listings, word of mouth, GitHub stars. Never paywall the generation that proves the product works. |

What stays free: all generation, all templates, the calendar and export.
Charging for something that costs the clone nothing (the user's own key)
would kill trust — the same trust problem that drives Predis's 1-star
billing reviews.

## 3. What's missing before it can earn a single rupee

- **Users.** Zero today. No one pays for, clicks ads on, or buys through a
  product nobody has heard of.
- **Traffic + AdSense approval.** Display ads need an approved AdSense
  account and real traffic. The site is days old; approval needs original
  content, age and traffic (see the Books site's four AdSense rejections —
  the same rules apply here).
- **Accounts + usage limits.** Today there is no sign-up, no login, no way
  to know who used how much. A hosted plan needs accounts and per-user
  request counters, or one user can burn the whole API budget.
- **Payments.** No payment provider is connected. For Pakistan, realistic
  options are **Paddle** (merchant of record, handles tax; works with
  Pakistani founders) or **Lemon Squeezy**. Stripe does not directly
  support Pakistan. Picking one is a real decision with paperwork — it is
  not a five-minute setup.
- **A hosted backend.** The Studio calls Google straight from the browser
  with the *user's* key. A paid plan needs a server (e.g. a Cloudflare
  Worker) that holds *our* key, counts usage, and refuses over-limit calls.
  That is a separate build.
- **Terms, privacy, refunds.** A paid product needs terms of service, a
  privacy policy, and a refund policy — and honest claims about what the
  tool does (it generates copy; it does not guarantee ad performance).

## 4. Realistic path & timeline (no income promises)

1. **Weeks 1–4 — users first.** Ship the site, list it (Product Hunt,
   AlternativeTo, SaaSHub, Toolify — see BACKLINKS.md), post the build log.
   Goal: real users trying the Studio, not revenue.
2. **Month 2 — measure.** If the Studio gets steady daily users, add the
   cheapest earning thing: affiliate links to tools marketers already buy,
   with disclosure. If usage is near zero, fix the product first.
3. **Month 3+ — display ads.** Once there is steady search traffic, apply
   for AdSense. Only after approval does the site earn anything at all.
4. **Later — hosted plan.** Only after a real audience exists: build the
   backend, launch a small monthly plan mirroring Predis's Core but without
   the credit trap, price it above API cost, and cap free usage.

**Bottom line:** Predis.ai's model took years and millions of users to
build. A free static clone starts at zero. The honest expectation is $0
for the first weeks, and the first rupee only after real users, traffic,
and (for any paid tier) accounts, payments, and a hosted backend exist.
Build the audience first; the money follows the audience.
