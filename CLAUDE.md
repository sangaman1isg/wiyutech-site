# CLAUDE.md — Wiyule Technology Project Brief

> This file is Claude Code's persistent memory for the Wiyule Technology project. Read it fully at the start of every session before taking any action.

---

## 🎯 Mode Of Operation

**This project runs in TEACHING MODE.**

- Explain EVERY change before making it.
- Show me what file you'll edit, what you'll change, and WHY.
- After each change, briefly explain what the new code does and what I should learn from it.
- Don't make multiple changes in one shot without checkpoints. One step at a time.
- If I'm about to ship something risky (delete files, change dependencies, restructure), STOP and ask first.
- Treat me as an intermediate developer (BSc Computing student, "vibe coder") who is learning by doing.

---

## 🏢 Project Identity

- **Name:** Wiyule Technology
- **Type:** African IT & AI agency website (B2B services + AI products)
- **Founder:** Tamsanga Kayuni
- **Markets:** Malawi & Zambia (expanding across Africa)
- **Live URL:** https://wiyuletech.com
- **GitHub:** https://github.com/sangaman1isg/wiyutech-site
- **Local path:** ~/Documents/wiyule technology/wiyutech-site/

### Mission
We build websites, AI WhatsApp assistants, and operations systems for SMEs in Malawi & Zambia — so they never lose another customer to a slow reply.

### Public-facing tone
- Confident, founder-led, outcome-driven.
- "Outcomes, not deliverables."
- "Real prices. Real products."
- Specific examples over corporate fluff.

---

## 🧱 Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (CSS variables, not config-based)
- **Animations:** Framer Motion (`framer-motion ^12.40.0`) — still the only runtime dep beyond Next/React. Loaded via `LazyMotion` (`MotionProvider`) + the `m` components to keep the bundle lean. **Use `m.*`, not `motion.*`** (strict mode throws otherwise).
- **Payments:** PayChangu (MWK) + Pesapal (ZMW) — native `fetch`, no SDK (`src/lib/paychangu.ts`, `src/lib/pesapal.ts`). ⏸️ Built but HELD for KYC.
- **Orders DB:** Supabase (REST, service-role key, no SDK — `src/lib/orders.ts`)
- **AI:** Groq (on-site Wiyu via `/api/wiyu`, model `openai/gpt-oss-20b`)
- **Hosting:** Netlify (auto-deploy on push to `main`)
- **Repo:** GitHub (private until further notice)
- **Package manager:** npm
- **Node:** v20+

### Folder structure
wiyutech-site/
├── public/
│   ├── wiyule-mark.jpg           (square logo — 28x28 nav, 20x20 footer)
│   └── wiyule-logo.jpg           (horizontal wordmark)
├── app/                          (Next.js App Router — routes live here)
│   ├── globals.css               (design tokens, animations, brand colors)
│   ├── layout.tsx                (metadata, fonts, JSON-LD schema, root wrapper)
│   ├── page.tsx                  (homepage)
│   ├── about/
│   │   └── page.tsx              (/about — Our Origin story page)
│   ├── checkout/
│   │   ├── page.tsx              (/checkout — server wrapper + Suspense boundary)
│   │   └── CheckoutClient.tsx    (client component — reads URL params, renders payment UI)
│   ├── portal/                   (client portal — link-based, no auth, no DB)
│   │   ├── clients.ts            (typed client data — THE only file you edit per client)
│   │   ├── page.tsx              (/portal — "ask for your link" landing, noindex)
│   │   └── [code]/page.tsx       (/portal/[code] — private status page, noindex)
│   ├── template.tsx              (Framer Motion page-transition wrapper)
│   ├── sitemap.ts                (auto-generates /sitemap.xml — home, about, checkout)
│   ├── robots.ts                 (auto-generates /robots.txt — allows crawlers + sitemap)
│   ├── opengraph-image.tsx       (auto-generated OG image)
│   └── icon.tsx                  (auto-generated favicon)
├── src/
│   ├── components/
│   │   ├── Nav.tsx               (sticky nav + animated hamburger drawer)
│   │   ├── AuditCTA.tsx          (Free WhatsApp Audit banner — lead magnet)
│   │   ├── Services.tsx          (3 products · currency switch · "What's included" accordion · beam CTAs)
│   │   ├── HowWeWork.tsx         (4-step process — swipeable scroll-snap carousel)
│   │   ├── AnimatedNumber.tsx    (count-up numerals — re-count on scroll in)
│   │   ├── AnimatedPrice.tsx     (price count-up on scroll-in + currency switch)
│   │   ├── Magnetic.tsx          (magnetic-hover CTA wrapper — desktop only)
│   │   ├── CustomCursor.tsx      (Cuberto dot + ring cursor — desktop only)
│   │   ├── CursorGlow.tsx        (ambient cursor glow — in layout)
│   │   ├── MotionProvider.tsx    (LazyMotion provider — wraps app)
│   │   ├── AnimationObserver.tsx (scroll-reveal observer — in layout)
│   │   ├── PromoBanner.tsx       (sitewide WIYULE30 bar)
│   │   ├── WiyuChat.tsx          (reusable Wiyu chat UI)
│   │   ├── WiyuDemo.tsx          (homepage "Meet Wiyu" section)
│   │   ├── WiyuBubble.tsx        (sitewide floating Wiyu assistant)
│   │   ├── FAQ.tsx               (DORMANT — removed from homepage)
│   │   ├── WhatsAppButton.tsx    (DORMANT — replaced by WiyuBubble)
│   │   └── MobileStickyCTA.tsx   (DORMANT — unmounted)
│   └── lib/                       (server-only, native fetch, no SDKs)
│       ├── pricing.ts            (server-side checkout amounts by slug+currency)
│       ├── orders.ts             (Supabase REST — orders table)
│       └── pesapal.ts            (Pesapal API 3.0 — ZMW)
├── app/api/
│   ├── wiyu/route.ts             (on-site Wiyu → Groq)
│   ├── checkout/route.ts         (create order → gateway → redirect_url)
│   ├── webhooks/pesapal/route.ts (Pesapal IPN)
│   └── pesapal/register-ipn      (one-time IPN setup)
├── next.config.ts · tsconfig.json · package.json · netlify.toml
└── CLAUDE.md                     (this file)

⏸️ HELD on branch `wave8-hold` (for KYC, NOT on main):
   src/lib/paychangu.ts · app/api/webhooks/paychangu · RoiCalculator.tsx ·
   the "Pay now" form + checkout UX pass in CheckoutClient.tsx ·
   PayChangu routing in app/api/checkout + /checkout/success · pricing.ts content-pack sync
---

## 🎨 Brand System (DO NOT VIOLATE)

### Colors — ALWAYS use CSS variables, NEVER hardcode hex
--color-bg            (deep black, primary background)
--color-bg-soft       (slightly lifted black)
--color-bg-elev       (elevated card background)
--color-bg-card       (default card background)
--color-fg            (bone — primary text)
--color-fg-muted      (mid gray — secondary text)
--color-fg-faint      (dim gray — tertiary text)
--color-brand         (#EF2D2D — Wiyule signature red)
--color-brand-hot     (brighter red — hover states)
--color-line          (subtle separator line)
--color-line-bright   (visible border)
If hardcoded colors appear (`#EF2D2D`, `#aaaaaa`, etc.), refactor them to use the variables.

### Typography utilities
- `.headline` — display heading style (Bricolage Grotesque, tight tracking)
- `.numeral` — numeric display (Bricolage, looser)
- `.eyebrow` — small label text (tracked, uppercase)
- `.fade-up`, `.delay-1`, `.delay-2`, `.delay-3` — entrance animations
- `.pulse-dot` — animated dot for "live" indicators
- `.glow-soft`, `.glow-drift`, `.glow-bottom` — ambient red glow effects

### Fonts (loaded via next/font in layout.tsx)
- **Display:** Bricolage Grotesque (headlines)
- **Body:** Geist Sans (paragraphs)

### Voice
- Direct, founder-grade, no fluff.
- "We build X for Y" not "Our solutions enable transformative experiences."
- Numbers and specifics, not adjectives.
- Apostrophes in JSX must be escaped: `&apos;` or `&rsquo;`

---

## 💰 Active Products (3-product menu — current state)

Services.tsx was overhauled in Wave 5. There are now 3 core products with full multi-currency pricing (MWK / ZMW / USD) and a comparison table. **Don't change pricing without explicit user approval.**

### 1. Digital Storefront Kit ⭐ Most popular
- One-time: MWK 1,224,999 / ZMW 19,499 / $700
- Delivery: 10 days · Guarantee: 25% refund if not live in 10 days
- Checkout deposit (50%): MWK 612,500 / ZMW 9,750
- Renders FIRST in Services (sorted by `index`); carries the badge + border beam.

### 2. AutoReply AI
- Setup: MWK 699,000 / ZMW 11,199 / $400
- Monthly: MWK 124,999 / ZMW 1,999 / $70
- Delivery: 7 days · Guarantee: full refund if not live in 7 days
- Checkout deposit (50% of setup): MWK 349,500 / ZMW 5,600

### 3. Content & Design Pack  (renamed from "Monthly Content Pack")
- **Now INCLUDES graphic design** (posters, flyers) — Wiyule's design service lives here.
- Monthly: MWK 199,999 / ZMW 3,199 / $115   (bumped +15% when design was added)
- Quarterly: MWK 569,999 / ZMW 8,999 / $329
- Delivery: ongoing · Guarantee: full refund if not happy with month 1
- Checkout: full first month upfront (MWK 199,999 / ZMW 3,199)

### Payment collection
- **Automated checkout is BUILT but HELD for KYC** (see "Where We Are Now"):
  MWK → PayChangu, ZMW → Pesapal, each with a manual mobile-money fallback.
- Manual mobile money (current live method):
  - **Zambia (ZMW):** Airtel Money — 0774 668 193
  - **Malawi (MWK):** TNM Mpamba — 0893 306 186
- USD is cash-only (no online USD collection)
- Checkout page: `/checkout?product=[slug]&currency=[ZMW|MWK]`
- Slugs: `storefront-kit` · `autoreply-ai` · `content-pack`

---

## 🤖 Wiyu — Wiyule's Own AI WhatsApp Assistant

Wiyule's WhatsApp number (+260 774 668 193) is powered by an AI assistant called "Wiyu" — built on n8n + Groq. It is currently running in **Phase 2 (Twilio sandbox)** mode.

- **Architecture:** WhatsApp → Twilio Sandbox → n8n webhook → Groq HTTP → Twilio Send → WhatsApp reply
- **Webhook URL:** https://sangaman.app.n8n.cloud/webhook/wiyu-whatsapp
- **Workflow name in n8n:** "Wiyu — WhatsApp AI"
- **n8n cloud:** sangaman.app.n8n.cloud
- **Twilio sandbox number:** +14155238886, code "join close-state"
- ⚠️ **Model note:** Groq RETIRED `llama-3.3-70b-versatile`. The on-site demo now uses `openai/gpt-oss-20b`. **The n8n WhatsApp Wiyu may still point at the dead model — check/update it or it will silently fail.**

### On-site Wiyu (live, on `main`)
- **Live chat demo** in the homepage "Meet Wiyu" section + a **sitewide floating Wiyu bubble** (every page, replaced the floating WhatsApp button).
- **Backend:** `app/api/wiyu/route.ts` → Groq (`openai/gpt-oss-20b`), server-side system prompt with real products/pricing. Needs `GROQ_API_KEY` (in `.env.local` + Netlify).
- **UI:** `WiyuChat.tsx` (shared) · `WiyuDemo.tsx` (section) · `WiyuBubble.tsx` (floating).

### Phase 3 plan (future)
Migrate from Twilio sandbox to a production WhatsApp Business number after first paying client cash lands. Cost will be ~$15-20/mo + Twilio rates.

### Wiyu Mini = reusable productized version
The Wiyu workflow is the basis for the **Wiyu Mini** product sold to clients. Each new client = clone the workflow → swap system prompt → deploy. Takes ~15 minutes per setup.

---

## 🎯 Project Priorities (Both Build + Improve)

### What we're actively building:
- **Wave 2** ✅ Complete: HowWeWork component extracted and shipped
- **Wave 3** ✅ Complete: Page declutter + Services overhaul (11 products, CTAs, "Best for:" tags, ROI lines, bundle callout)
- **Wave 4** ✅ Complete: Mobile nav · grid fix · padding · OG image · favicon · lazy load · JSON-LD schema
- **Wave 5** ✅ Complete: Multi-currency Services (MWK/ZMW/USD, 3 products, comparison table) · /about page (founder origin) · AuditCTA moved above FAQ · Mobile money checkout (/checkout) · Domain updated to wiyuletech.com
- **Wave 6** 🔄 In progress:
  - ✅ Framer Motion animations (count-up numerals, scroll reveal, cursor glow, page transitions)
  - ✅ SEO: sitemap.xml + robots.txt (native Next MetadataRoute files) · Google Search Console verified on www.wiyuletech.com (meta-tag method)
  - ✅ Client portal (link-based, no auth/DB — /portal/[code] status pages off app/portal/clients.ts)
  - ⏳ Still open: Case studies page · Testimonials · Blog/insights

### What we're improving:
- Mobile responsiveness across all sections
- Performance (Lighthouse target: 95+ on all metrics)
- Conversion optimization (track which CTAs perform)
- Accessibility (a11y audit pass)
- SEO (structured data ✅, sitemap ✅, robots.txt ✅ — all live as of Wave 6)

### What we're NOT touching unless specifically asked:
- Hero section copy (tested, working)
- The NumericSection blocks (73%, 7 days)
- Footer (works, looks right)
- Pricing on the 3 active products
- The /about page copy (founder identity stays subtle)
- Mobile money numbers (0774 668 193 · 0893 306 186)

---
## 🔗 Sister Project — Wiyule Cargo

Wiyule Cargo is a separate venture launching in Blantyre as Wiyule 
Technology's first operational child business — a kabaza courier 
network. Currently in Phase 0 (2-week validation sprint).

DO NOT modify Wiyule Cargo assets from this codebase. It has its 
own project chat and its own (future) codebase for tracking pages, 
admin dashboards, and rider apps.
## 🔗 Sister Project — Wiyule Motors (REFERENCE ONLY)

Wiyule Motors is a **separate automotive listings/services project** that exists outside this folder. **DO NOT modify anything related to Wiyule Motors from this codebase.**

If the user mentions Wiyule Motors, treat it as a different project. They may:
- Reference it as a sister business
- Mention swapping concepts between Tech and Motors
- Ask for code patterns that could later port to Motors

But **Wiyule Technology (this project) is the primary focus.** Wiyule Motors has its own folder, its own deploy, its own brief.

---

## 📐 Code Conventions

### File naming
- Components: `PascalCase.tsx` (e.g., `AuditCTA.tsx`, `Services.tsx`)
- ⚠️ **Case-sensitive on Netlify (Linux).** `services.tsx` will work on Mac but BREAK on production. Always use `Services.tsx`.

### Imports
- The `@/` alias maps to the project root (confirmed in tsconfig.json: `"@/*": ["./*"]`)
- Correct import path: `import Services from "@/src/components/Services"`
- Do NOT write `@/components/...` — components live in `src/components/`, so `@/src/` is required
- Group imports: external first, then `@/components`, then relative

### Components
- Add `"use client"` at the top if the component uses state, effects, or browser APIs
- Server components (default) for static content
- Each component is its own file in `src/components/`
- Export default for primary component; named exports for helpers

### TypeScript
- Strict mode is enabled — fix type errors, don't suppress them
- Define explicit types for props (no `any`)
- Use `Readonly<>` for layout/root component props

### JSX text content
- Escape apostrophes: `you&apos;re` not `you're`
- Escape quotes: `&quot;` if needed
- Use `<br className="hidden md:block" />` for desktop-only line breaks

### CSS approach
- Tailwind utility classes for layout, spacing, color
- CSS variables for brand tokens (defined in `globals.css`)
- Custom utility classes for reusable patterns (`.headline`, `.eyebrow`, etc.)
- NO inline `style={{}}` unless absolutely necessary

### WhatsApp links pattern
Always build WA links with this pattern:
```ts
const WHATSAPP_NUMBER = "260774668193";
const message = encodeURIComponent("Pre-filled message text");
const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
```

Open in new tab: `target="_blank" rel="noopener noreferrer"`

---

## ✅ Always-Do Checklist (Before Any Commit)

Run through this before suggesting `git push`:

1. ✅ Does `npm run dev` show the change at localhost:3000 without errors?
2. ✅ Did you check mobile responsiveness (resize browser narrow)?
3. ✅ Are all hex colors using `var(--color-*)` instead of hardcoded?
4. ✅ Are all apostrophes escaped (`&apos;`)?
5. ✅ Are all `<a>` and `<Link>` tags properly opened/closed?
6. ✅ Did you use PascalCase for component filenames?
7. ✅ No TypeScript errors in terminal?
8. ✅ All `import` paths use `@/src/components/` (NOT `@/components/`)?

---

## 🚨 Things to NEVER Do

- ❌ Hardcode colors (`#EF2D2D` etc.) — always use CSS variables
- ❌ Use lowercase component filenames (breaks on Netlify)
- ❌ Skip the local dev test before pushing to GitHub
- ❌ Modify the brand colors in `globals.css` without explicit user approval
- ❌ Change the WhatsApp number (+260 774 668 193) — that's Tamsanga's real number
- ❌ Add new dependencies without asking ("Do we really need this library?")
- ❌ Push to GitHub with TypeScript errors or build failures
- ❌ Remove the "Powered by Wiyule" credit from any deliverable site
- ❌ Touch the Hero or Founder/Origin sections without explicit request
- ❌ Make multiple unrelated changes in one commit (one purpose per commit)

---

## 📝 Commit Style

- Imperative mood: "Add testimonial slot" not "Added testimonial slot"
- Reference the wave/sprint if applicable: "Wave 2: How We Work section"
- Keep first line under 60 chars; longer detail in commit body
- Examples:
  - ✅ `Wave 2: add How We Work 4-step section`
  - ✅ `Fix: mobile padding on Services cards`
  - ❌ `updates`
  - ❌ `Added some new stuff and fixed some bugs and also...`

---

## 🛠 Common Tasks (Quick Reference)

### Add a new product to Services
1. Open `src/components/Services.tsx`
2. Find the `PRODUCTS` array
3. Add a new product object matching the `Product` type: `{ index, slug, title, subtitle, tagline, priceType, setup?, monthly?, oneTime?, delivery, features, roi, bestFor, guarantee, addons, cta }`
4. All price fields must have `{ MWK, ZMW, USD }` values
5. Add the slug to `CHECKOUT_PRODUCTS` in `app/checkout/CheckoutClient.tsx`
6. Test on localhost before commit

### Update product pricing
1. Open `src/components/Services.tsx`
2. Find the product in `PRODUCTS` array
3. Update the relevant `PriceData` object (`setup`, `monthly`, `oneTime`)
4. Update matching deposit amounts in `app/checkout/CheckoutClient.tsx`
5. **WAIT** — confirm with user before committing (pricing is strategy, not just code)

### Update checkout deposit amounts
1. Open `app/checkout/CheckoutClient.tsx`
2. Find the product slug in the `PRODUCTS` record
3. Update `deposit.ZMW` and `deposit.MWK`
4. Update `balanceNote` to reflect the new balance owed
5. Confirm with user before committing

### Add a new homepage section
1. Decide WHERE in `page.tsx` it goes (between which existing sections)
2. Create the component in `src/components/NewSection.tsx`
3. Import in `page.tsx` (use `@/components/NewSection`)
4. Slot it into the JSX
5. Match existing visual rhythm (section padding, eyebrow + headline + body pattern)

### Fix a TypeScript error
1. Read the error carefully (line number, file, expected type)
2. NEVER use `any` to suppress
3. Add proper types (define interface if needed)
4. Re-run `npm run dev` to confirm clean

### Test before deploy
```bash
npm run build    # Catches build errors locally (same as Netlify CI)
npm run dev      # Visual check at localhost:3000
```

If `npm run build` errors, DO NOT push. Fix locally first.

---

## 🌐 Deployment

- **Auto-deploys** from GitHub `main` branch to Netlify
- **Wait time:** ~60-90 seconds after `git push`
- **Check deploy status:** https://app.netlify.com → wiyutech-site → Deploys
- **Config file:** `netlify.toml` in project root
- **Cache busting on live site:** Hard refresh (Cmd+Shift+R on Mac) or open in incognito

If a deploy fails:
1. Open the failed deploy in Netlify dashboard
2. Click "View build log"
3. Read the error — almost always: missing import, case mismatch, or TS error
4. Fix locally → `npm run build` → if clean → push again

---

## 🗣 How to Talk to Me (Tamsanga)

- Skip pleasantries. Don't open with "Great question!"
- Lead with the answer, not the setup.
- Show code in full files, not fragments, unless I ask for a snippet.
- If I ask for one thing, give me that thing. Don't bundle unsolicited improvements.
- When I'm tired (most evenings), keep it short. Save the strategy lectures for daytime.
- When I'm energized, push back if my idea is weak. I want a partner, not a yes-machine.
- Use emojis sparingly — only when they add clarity (✅ ❌ ⚠️ 🔥).
- Always end with a clear "Next Immediate Action" so I know what to do.

---

## 📍 Where We Are Now (Oct 2026)

- ✅ Waves 1–6 shipped (see Project Priorities above).
- ✅ **Wave 7 shipped (premium UI):** Cuberto custom cursor · magnetic CTAs · animated hamburger · `.press` tactile buttons sitewide · border-beam on product CTAs · film grain · heading mask-reveals · count-ups (numbers + prices) that fire on scroll-in · mobile polish (no tap-flash) · LazyMotion perf pass · focus-visible rings · reduced-motion scoped to only kill LOOPING effects · copy rewritten to drop em dashes · Storefront Kit set as #1 · graphic design merged into Content & Design Pack (+15%) · homepage FAQ removed.
- ✅ **On-site Wiyu:** live chat demo + sitewide floating bubble (`/api/wiyu`, Groq `openai/gpt-oss-20b`).
- ✅ **On `main` now (Wave 8 partial):** price count-on-scroll + the Wiyu bubble.

### ⏸️ HELD for KYC — on branch `wave8-hold`, NOT on `main`
Built, build-clean, verified locally, but NOT deployed — waiting on PayChangu **and** Pesapal business verification:
- **PayChangu (MWK) + Pesapal (ZMW) automated checkout** — `src/lib/paychangu.ts`, `/api/checkout` currency routing, `/api/webhooks/paychangu`, `/checkout/success` dual-verify, and the "Pay now" form + checkout UX pass (copy buttons, tabs, trust) in `CheckoutClient.tsx`.
- **ROI calculator** (`RoiCalculator.tsx` — "cost of a slow reply" homepage section).
- **Go-live steps:** finish KYC on both gateways · add `PAYCHANGU_SECRET_KEY` / `PAYCHANGU_PUBLIC_KEY` / `PAYCHANGU_WEBHOOK_SECRET` + confirm Supabase keys in **Netlify** · switch Pesapal to live base URL (`https://pay.pesapal.com/v3/api`) + live keys + re-register IPN · then merge `wave8-hold` → `main`.
- **Infra note:** Supabase project `edlqmvmpvnnvcatyxgbp` had PAUSED (free tier) and was restored. The `orders` table is the gateway-agnostic record store.

### ⚠️ Known issues / tech debt
- **Stale n8n Wiyu model** — the WhatsApp Wiyu likely still points at the retired Llama model (see Wiyu section).
- **pricing.ts drift on `main`:** `src/lib/pricing.ts` still has the OLD Content Pack name/price; the sync is in `wave8-hold`. Harmless (pricing.ts only feeds the not-yet-wired gateway); fixed when the branch merges.
- **Canonical host mismatch:** `metadataBase`/sitemap/robots use apex `https://wiyuletech.com` while Netlify canonical is `www`. Clean 301, but align for perfect signals.
- **`&apos;` inside `encodeURIComponent`:** `app/about/page.tsx` builds a WA prefill with `&apos;` — ships literal "&apos;". Use a real apostrophe in JS strings.

---

## 📚 How to Use This File

- **At session start:** Read this file fully before any action.
- **When in doubt:** Re-read the relevant section.
- **When the user says "remember when we..." :** Check this file first. If not here, ask.
- **When making suggestions:** Filter through "Project Priorities" and "Things to NEVER Do".
- **Updating this file:** Only with Tamsanga's explicit approval. Suggest changes, don't make them silently.

---

_Last updated: 12 Oct 2026. Maintained by Tamsanga + Claude._