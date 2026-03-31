# Pin Position

A demo frontend application for managing golf green pin positions across tournaments.

Built with React, TypeScript, and Vite — no backend, no database. All state lives in the browser.

---

## Features

- **Dashboard** — live overview of the active green section and current / upcoming / past tournaments with a real-time countdown to the next section rotation
- **Greens** — browse all 18 greens with SVG diagrams; see which pin section (A / B / C) is active this week per green
- **Tournaments** — create, edit, and remove tournaments; set pin positions per green by clicking directly on SVG maps
- **Section rotation** — active section is derived automatically from the ISO week number (cycles A → B → C weekly)
- **Dark / light theme** — persisted in `localStorage`, applied before first paint to avoid flash
- **Responsive layout** — works on desktop and tablet

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** (with `vite-plugin-svgr` for SVG imports as React components)
- **React Router v7**
- **SCSS Modules**
- **react-day-picker** — date range selection for tournament creation
- **Phosphor Icons**

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repository
git clone https://github.com/jakubguzikowski/demo-pinposition.git
cd demo-pinposition

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (exposed on local network via `--host`) |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
src/
├── assets/greens/     # SVG green diagrams (imported as React components)
├── components/        # Shared UI components (Card, CardsRow, GreenWithPin, DatePicker, Popup…)
├── context/           # TournamentContext — global tournament state
├── data/              # Static green definitions (id, name, dimensions)
├── hooks/             # useGreens, useSections, useTournaments
├── pages/             # Dashboard, Greens, Tournaments (+ Create / Edit / Detail)
├── styles/            # Global SCSS (tokens, reset, typography)
├── types/             # TypeScript interfaces (Tournament, PinPosition)
└── utils/             # Date formatting and countdown helpers
```

---

## Data Model

```ts
interface Tournament {
  id: string;
  name: string;
  startDate: string;    // "YYYY-MM-DD"
  endDate: string;
  createdAt: string;
  pins: (PinPosition | null)[];  // one entry per green (index 0 = Green 1)
}

interface PinPosition {
  x: number;     // relative X on the SVG canvas
  y: number;     // relative Y on the SVG canvas
  posX: string;  // human-readable label, e.g. "Left"
  posY: string;  // human-readable label, e.g. "Back"
}
```

---

## Green SVG Maps

The SVG diagrams for all 18 greens were hand-drawn based on aerial drone photography of the course. Tracing from drone footage (rather than schematic plans) means the shapes closely reflect the actual green geometry — including irregular edges and subtle curves that a generic diagram would miss.

---

## Section Rotation Logic

The active section (A, B, or C) is derived from the ISO week number modulo 3 — no configuration needed. Each green also has a fixed section mapping (which tee positions belong to which section), so the app always knows which pin locations are in play this week.

Section changes happen automatically every Monday and a live countdown on the Dashboard shows time remaining until the next rotation.
