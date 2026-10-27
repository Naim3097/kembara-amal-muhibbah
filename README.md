# Kembara Amal Muhibbah (KAMI) — website

Front end for Pertubuhan Kembara Amal Muhibbah, a volunteer-run Malaysian NGO working with the Orang Asli community of Pos Piah, Sungai Siput, Perak.

React 18 + Vite + React Router. No backend yet; forms and checkout run client-side and the payment gateway (Lean X) is stubbed.

## Run

```bash
npm install
npm run dev
```

`npm run build` produces `dist/`.

## Languages

The site is bilingual (English and Bahasa Malaysia) with an EN/BM toggle in the header. The choice is kept in `localStorage` and the browser language picks the default.

- Interface strings live in `src/i18n/en.js` and `src/i18n/ms.js` (same keys in both files). Pages call `t('section.key')` from `useLang()`.
- Content in the data files uses `b('English', 'Bahasa Malaysia')` objects, rendered with `pick()`. Add both languages when you add a campaign.
- Programme names (Dakwah Belantara, Sedekah Jumaat, and so on), committee names and bank details are the same in both languages and stay as plain strings.

## Where things live

| Path | What |
| --- | --- |
| `src/data/organisation.js` | Name, email, bank account, committee, values, headline stats |
| `src/data/programs.js` | Programme areas (`pillars`), dated appeals (`campaigns`) and expedition itineraries |
| `src/data/events.js` | Calendar derived from campaigns with dates |
| `src/i18n/` | Language provider and the EN/BM string dictionaries |
| `src/context/DonationContext.jsx` | Pop-up state and the pending donation (kept in `sessionStorage`) |
| `src/components/DonationForm.jsx` | Shared form used by the pop-up and `/donate` |
| `src/components/AutoPrompt.jsx` | Opens the pop-up once per session (20 s or 55 % scroll) |
| `src/pages/Checkout.jsx` | Donor details, payment method, reference generation |
| `src/styles/global.css` | Design tokens and all component styles |
| `scripts/process-images.mjs` | Rebuilds `public/images` from the raw Facebook downloads |

## Content that still needs confirming

Everything below came from KAMI's Facebook posts and posters, or is a placeholder. Search the data files for `TODO`, `draft: true` and `indicative`.

- **Registration number** (`org.registration`).
- **Volunteer contribution** on each itinerary (`itinerary.fee.amount`, currently RM100–120 and marked indicative).
- **Itineraries** are reconstructed outlines (`draft: true`). Replace with the Secretariat's confirmed schedules.
- **Upcoming campaigns** (`dakwah-belantara-2026`, `iftar-di-belantara-2027`, `qurban-di-belantara-2027`, `sumbangan-jajan-2027`) have projected dates and targets copied from the previous edition. Set `start`/`end`, remove `tba`, and fix `target`.
- **Raised amounts**: set `raised` on a campaign to show a progress bar.
- **Bank account**: posters show `562740301315` three times and `522740301315` once (Qurban 1447H poster). The site uses `562740301315`. Confirm with the Treasurer.

## Lean X integration (next phase)

`Checkout.jsx` collects donor details and a payment method, then creates a reference `KAMI-YYYYMMDD-XXXX` and navigates to `/checkout/success`. To connect Lean X:

1. Replace the `submit` handler in `Checkout.jsx` with a call to your backend that creates a Lean X bill/collection for `pending.amount` and returns the hosted payment URL.
2. Redirect to that URL for `fpx`, `card` and `ewallet`; keep the manual `transfer` path as is.
3. Point Lean X's return/callback URL at `/checkout/success?ref=...` and have the page read the result from the backend instead of `sessionStorage`.
4. Store donor records server-side; the front end only keeps the pending gift for the session.

Forms on `/volunteer` and `/contact` currently fall back to WhatsApp and `mailto:` links until an endpoint exists.
