# AFFT Website V1

AFFT Website V1 built with Next.js App Router + Tailwind CSS.

## Local CRM Lite

The repo now includes a local-only CRM route at `/crm` for AFFT guest enquiries and partner outreach.

### What it does

- Stores guest leads and partner targets in one place
- Keeps the data in a local JSON file on your own computer
- Uses a password from `.env.local`
- Does not add any database or SaaS dependency
- Opens prefilled WhatsApp and Email drafts from each CRM record

### Files used by the CRM

- Route: `app/crm/page.tsx`
- Server actions: `app/crm/actions.ts`
- Local store helper: `lib/crm-store.ts`
- JSON template: `data/crm-template.json`
- Live local data file: `data/crm-data.json`

### Enable it locally

1. Copy `.env.example` to `.env.local`
2. Change `AFFT_CRM_PASSWORD`
3. Start the site locally
4. Open `http://localhost:3000/crm`

### Important data note

`data/crm-data.json` is ignored by Git so real customer data does not get pushed by accident. Back up that JSON file regularly.

## Website directory structure

```txt
afft-website-v1/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── SectionTitle.tsx
├── lib/
│   └── site-data.ts
├── public/
│   └── images/
├── styles/
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Homepage design draft

1. Hero: Mount Kinabalu / Sabah outdoor positioning, CTA to Experiences and Camping Packages.
2. Sabah Outdoor Experiences: main brand direction and four priority cards.
3. Camping Packages: RM399 / RM599 / RM799 package cards.
4. Rentals: Rent-it Series cards for camping, camera, mobility and family series.
5. Travel Services: private Sabah trip CTA with Tiggo 8 Pro comfort positioning.
6. Footer / Contact: WhatsApp-first conversion.

## AFFT brand colors

| Token | Hex | Usage |
|---|---:|---|
| AFFT Ink | #1F1B16 | Main text / dark background |
| Earth Brown | #734C24 | Brand base / outdoor premium tone |
| Clay Brown | #A7652A | Secondary warm accent |
| Flame Orange | #F28C28 | CTA / highlights |
| Sand | #F5E7D0 | Cards / soft section background |
| Cream | #FFF7EA | Main page background |
| Moss | #4A5B35 | Nature accent |
| Forest | #223322 | Deep outdoor background |
| Sabah Sky | #8DB7C8 | Optional sky accent |

## Font system

- Primary: Urbanist
- Display: Playfair Display
- Fallback: Inter / system-ui / sans-serif

## Mobile layout

- Header: logo + WhatsApp CTA; nav hidden on mobile.
- Hero: single-column, large title, stacked CTA buttons.
- Cards: 1 column on mobile, 3–4 columns on desktop.
- Sections: generous vertical spacing, clear CTA per section.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Upload to GitHub

```bash
git init
git add .
git commit -m "Initial AFFT Website V1"
git branch -M main
git remote add origin https://github.com/afft-sabah-info/afft-website-v1.git
git push -u origin main
```

Replace the GitHub remote URL with your actual repository URL.
