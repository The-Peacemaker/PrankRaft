# PrankRaft

PrankRaft is a cinematic, front-end prank arcade experience built for the IEEE Computer Society Prankraft competition.
It combines high-impact visual storytelling, interactive misdirection, and playful reveal mechanics while staying safe and user-friendly.

## Project Overview

PrankRaft is designed as an immersive scrolling web experience:

- A full-screen hero video introduces the vibe with bold title-first storytelling.
- A second full-screen scroll-reveal video advances with page scroll, creating a trailer-like progression.
- Game cards appear on both sides of the reveal sequence, encouraging user interaction.
- A prank flow simulates urgency (download prompt, fake threat effects, moving controls) and resolves with a clear April Fool reveal.

The experience is intentionally dramatic but harmless, aligned with the competition focus on creativity, surprise, UI quality, and front-end execution.

## Core Features

- Full-screen looped hero video background
- Scroll-synced cinematic reveal video
- Side-rail game reveal cards with strong CTA flow
- Stylized loading sequence with live progress stats
- Interactive prank chain:
  - fake patch download
  - simulated threat overlays
  - moving override button challenge
  - final reveal screen
- Generated prank report PDF for cross-medium reveal effect
- Responsive layout for desktop and mobile
- Modern animation stack with Framer Motion

## Tech Stack

- React + TypeScript
- Vite
- Framer Motion
- Tailwind CSS + custom CSS system

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```text
src/
  App.tsx                # Main flow and screen composition
  styles.css             # Global styles and cinematic UI system
  lib/arcadeFlow.ts      # Game metadata and prank PDF generator
  components/            # UI components from earlier flow iterations
  videos/                # Hero and scroll video assets
  assets/games/          # Game poster art
```

## Competition Fit

This project is tailored to the Prankraft rules:

- Front-end only implementation
- Responsive and interactive
- Creative deceptive element that is non-harmful
- Meaningful customization and original execution

## Author

Built for the Prankraft challenge by the PRANKRAFT team.
