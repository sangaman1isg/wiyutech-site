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
- **Live URL:** https://wiyuletech.vercel.app
- **GitHub:** https://github.com/sangaman1isg/wiyutech-site
- **Local path:** ~/Desktop/wiyule technology/wiyutech-site/

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
- **Hosting:** Vercel (auto-deploy on push to `main`)
- **Repo:** GitHub (private until further notice)
- **Package manager:** npm
- **Node:** v20+

### Folder structure
wiyutech-site/
├── public/
│   ├── wiyule-mark.jpg       (square logo — 28x28 nav, 20x20 footer)
│   └── wiyule-logo.jpg       (horizontal wordmark)
├── src/
│   ├── app/
│   │   ├── globals.css       (design tokens, animations, brand colors)
│   │   ├── layout.tsx        (metadata, fonts, root wrapper)
│   │   └── page.tsx          (homepage — single-page site for now)
│   └── components/
│       ├── AuditCTA.tsx      (Free WhatsApp Audit banner — pulls leads)
│       ├── Services.tsx      (8-product menu in 3 tiers)
│       ├── HowWeWork.tsx     (4-step process section — Discovery → Build → Launch → Support)
│       ├── FAQ.tsx           (accordion FAQ)
│       └── WhatsAppButton.tsx (floating WA button — sitewide)
├── next.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md                 (this file)
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
- `.marquee-track` — horizontal scroll animation

### Fonts (loaded via next/font in layout.tsx)
- **Display:** Bricolage Grotesque (headlines)
- **Body:** Geist Sans (paragraphs)

### Voice
- Direct, founder-grade, no fluff.
- "We build X for Y" not "Our solutions enable transformative experiences."
- Numbers and specifics, not adjectives.
- Apostrophes in JSX must be escaped: `&apos;` or `&rsquo;`

---

## 💰 Active Products (8-product menu — current state)

This is the canonical list. Pricing reflects the current page.

### Quick Wins (Tier 1)
1. **WhatsApp Audit** — FREE, 24h delivery (lead magnet)
2. **Status Designer Pack** — $60 / or $40/mo, 48h delivery
3. **Wiyu Mini** — $80 + $25/mo, 24h delivery (FEATURED — Most Popular)

### Growth Products (Tier 2)
4. **GMB Boost** — $80 + $30/mo, 3-day delivery
5. **Digital Storefront Kit** — from $350, 7-10 days

### Full Systems (Tier 3)
6. **AutoReply AI** — $250 + $40/mo, 5-7 days
7. **Operations OS Lite** — from $500 + $50/mo, 3-4 weeks
8. **Wiyule Care** — $50/mo retainer

**Don't change pricing without explicit user approval.** These are tested numbers.

---

## 🤖 Wiyu — Wiyule's Own AI WhatsApp Assistant

Wiyule's WhatsApp number (+260 774 668 193) is powered by an AI assistant called "Wiyu" — built on n8n + Groq (Llama 3.3 70B). It is currently running in **Phase 2 (Twilio sandbox)** mode.

- **Architecture:** WhatsApp → Twilio Sandbox → n8n webhook → Groq HTTP → Twilio Send → WhatsApp reply
- **Webhook URL:** https://sangaman.app.n8n.cloud/webhook/wiyu-whatsapp
- **Workflow name in n8n:** "Wiyu — WhatsApp AI"
- **n8n cloud:** sangaman.app.n8n.cloud
- **Twilio sandbox number:** +14155238886, code "join close-state"
- **Model:** llama-3.3-70b-versatile (Groq, free tier)

### Phase 3 plan (future)
Migrate from Twilio sandbox to a production WhatsApp Business number after first paying client cash lands. Cost will be ~$15-20/mo + Twilio rates.

### Wiyu Mini = reusable productized version
The Wiyu workflow is the basis for the **Wiyu Mini** product sold to clients. Each new client = clone the workflow → swap system prompt → deploy. Takes ~15 minutes per setup.

---

## 🎯 Project Priorities (Both Build + Improve)

### What we're actively building:
- **Wave 2** ✅ Complete: HowWeWork component extracted and shipped (Live Counter + Testimonial slot dropped — not needed)
- **Wave 3 site upgrades** (next): Performance polish · OG tags · Schema markup · Lazy load · Favicon
- **Future:** Case studies page · Blog/insights · Pricing calculator · Client portal

### What we're improving:
- Mobile responsiveness across all sections
- Performance (Lighthouse target: 95+ on all metrics)
- Conversion optimization (track which CTAs perform)
- Accessibility (a11y audit pass)
- SEO (structured data, sitemap, robots.txt)

### What we're NOT touching unless specifically asked:
- Hero section copy (tested, working)
- The 4 NumericSection blocks (73%, 7 days, 24/7, 2 countries)
- The founder/origin section (founder identity stays subtle)
- Footer (works, looks right)
- Pricing on existing 8 products

---

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
- ⚠️ **Case-sensitive on Vercel (Linux).** `services.tsx` will work on Mac but BREAK on production. Always use `Services.tsx`.

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
8. ✅ All `import` paths use `@/components/` not `@/src/components/`?

---

## 🚨 Things to NEVER Do

- ❌ Hardcode colors (`#EF2D2D` etc.) — always use CSS variables
- ❌ Use lowercase component filenames (breaks on Vercel)
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
2. Find the `tiers` array
3. Add new product object matching existing schema: `{ title, price, priceSub, delivery, outcome, bullets, highlighted? }`
4. Place in the appropriate tier
5. Test on localhost before commit

### Update product pricing
1. Open `src/components/Services.tsx`
2. Find the product in `tiers` array
3. Update `price` and/or `priceSub`
4. **WAIT** — confirm with user before committing (pricing is strategy, not just code)

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
npm run build    # Catches Vercel-style build errors locally
npm run dev      # Visual check at localhost:3000
```

If `npm run build` errors, DO NOT push. Fix locally first.

---

## 🌐 Deployment

- **Auto-deploys** from GitHub `main` branch to Vercel
- **Wait time:** ~60-90 seconds after `git push`
- **Check deploy status:** https://vercel.com/dashboard → wiyutech-site → Deployments
- **Cache busting on live site:** Hard refresh (Cmd+Shift+R on Mac) or open in incognito

If a deploy fails:
1. Open the failed deployment in Vercel dashboard
2. Click "View build logs"
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

## 📍 Where We Are Now (May 2026)

- ✅ Wave 1 shipped: AuditCTA + Services grid
- ✅ Wave 2 shipped: HowWeWork component (Live Counter + Testimonial dropped)
- ⏳ Wave 3 next: Performance + SEO + OG polish
- 🤖 Wiyu AI live on Twilio sandbox (Phase 2 complete)
- 🎯 Active product menu: 8 SKUs across 3 tiers

---

## 📚 How to Use This File

- **At session start:** Read this file fully before any action.
- **When in doubt:** Re-read the relevant section.
- **When the user says "remember when we..." :** Check this file first. If not here, ask.
- **When making suggestions:** Filter through "Project Priorities" and "Things to NEVER Do".
- **Updating this file:** Only with Tamsanga's explicit approval. Suggest changes, don't make them silently.

---

_Last updated: May 2026. Maintained by Tamsanga + Claude (the assistant in claude.ai)._