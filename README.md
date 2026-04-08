# RIDE THE REDLINE

RIDE THE REDLINE is a cinematic front-end web experience that blends arcade-style game discovery with a dramatic, safe prank flow.
It combines full-screen visual storytelling, high-energy interactions, and a clear reveal sequence for a polished and memorable user experience.

## Live Link

https://ride-the-redline.netlify.app/

## Project Overview

RIDE THE REDLINE is designed as an immersive browser journey:

- A full-screen hero video and bold centered title create a high-impact first impression.
- A premium game showcase highlights every game with strong visual hierarchy and interactive calls to action.
- Clicking Play launches a rapid pre-chaos popup burst with "YOU ARE COOKED!!!" overlays.
- The flow transitions into controlled fake-system chaos with moving controls, popup alerts, and visual distortion.
- The experience ends with a clean April Fool reveal so the prank stays harmless and user-friendly.

## Creative Features

- Cinematic full-screen hero with layered overlays and motion
- Premium game lineup section with highlighted cards and featured styling
- Randomized popup burst sequence before prank execution
- Interactive fake chaos layer:
  - threat popups from random positions
  - lagging cursor simulation
  - moving override button challenge
  - live panic log stream
- Auto-generated prank PDF download named:
  - `You are cooked.exe.pdf`
- Multi-page PDF reveal content with custom messaging and embedded image
- Strong responsive behavior across laptop, tablet, and mobile displays

## Tech Stack

- React + TypeScript
- Vite
- Framer Motion
- pdf-lib
- Tailwind base setup + custom CSS system

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
  App.tsx                # Main flow, hero, game showcase, and prank phases
  styles.css             # Visual system, animations, responsive behavior
  lib/arcadeFlow.ts      # Game metadata and dynamic PDF generation/download
  components/            # Supporting UI components
  assets/games/          # Game poster assets
  images/                # Bike and reveal imagery
  videos/                # Hero video assets
public/
  favicon.svg            # Custom RIDE THE REDLINE favicon
```

## Notes

- This project is intentionally dramatic but harmless.
- All deceptive elements are visual simulations only.
- The experience provides a clear reveal to keep the interaction fun and safe.
