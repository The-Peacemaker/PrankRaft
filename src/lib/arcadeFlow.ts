import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import aprilFoolsMeme2 from '../images/April-Fools-Memes-2.jpg';

export type Phase = 'loading' | 'boosting' | 'home' | 'download' | 'threat' | 'reveal';

export type GameCardData = {
  title: string;
  subtitle: string;
  genre: string;
  accent: string;
  glow: string;
  thumbnail: 'racer' | 'orbit' | 'maze' | 'pulse' | 'city' | 'boss';
};

export const loadingMessages = [
  'Loading assets...',
  'Connecting to servers...',
  'Syncing game data...',
  'Checking network...',
];

export const boostLogs = [
  'Optimizing packets...',
  'Reducing latency...',
  'Stabilizing connection...',
  'Reseeding route tables...',
  'Bypassing congestion...',
  'Refining throughput...',
];

export const games: GameCardData[] = [
  {
    title: 'Neon Drift',
    subtitle: 'Night racing with impossible corners',
    genre: 'Arcade Racer',
    accent: '#33f6ff',
    glow: 'rgba(51, 246, 255, 0.22)',
    thumbnail: 'racer',
  },
  {
    title: 'Star Circuit',
    subtitle: 'Orbit through a synthwave arena',
    genre: 'Velocity Puzzle',
    accent: '#ff4fd8',
    glow: 'rgba(255, 79, 216, 0.22)',
    thumbnail: 'orbit',
  },
  {
    title: 'Byte Maze',
    subtitle: 'Wired corridors and reactive traps',
    genre: 'Labyrinth Run',
    accent: '#ffe86b',
    glow: 'rgba(255, 232, 107, 0.22)',
    thumbnail: 'maze',
  },
  {
    title: 'Turbo Pulse',
    subtitle: 'Beat-driven combat with hyper timing',
    genre: 'Rhythm Fighter',
    accent: '#88ff7a',
    glow: 'rgba(136, 255, 122, 0.2)',
    thumbnail: 'pulse',
  },
  {
    title: 'Metro Crash',
    subtitle: 'Skyscraper jumps with arcade chaos',
    genre: 'Action Runner',
    accent: '#8d7aff',
    glow: 'rgba(141, 122, 255, 0.22)',
    thumbnail: 'city',
  },
  {
    title: 'Final Boss FM',
    subtitle: 'One screen, one boss, no mercy',
    genre: 'Boss Rush',
    accent: '#ff8d4f',
    glow: 'rgba(255, 141, 79, 0.22)',
    thumbnail: 'boss',
  },
];

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const formatSeconds = (value: number) => `${value.toFixed(1)}s`;

export const formatMbps = (value: number) => `${Math.round(value).toLocaleString()} Mbps`;

function drawCenteredText(
  page: import('pdf-lib').PDFPage,
  text: string,
  size: number,
  y: number,
  font: import('pdf-lib').PDFFont,
  color: ReturnType<typeof rgb>,
) {
  const textWidth = font.widthOfTextAtSize(text, size);
  const x = Math.max(24, (page.getWidth() - textWidth) / 2);
  page.drawText(text, { x, y, size, font, color });
}

function drawWrappedText(
  page: import('pdf-lib').PDFPage,
  text: string,
  maxWidth: number,
  startX: number,
  startY: number,
  size: number,
  lineHeight: number,
  font: import('pdf-lib').PDFFont,
  color: ReturnType<typeof rgb>,
) {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      current = candidate;
    } else {
      if (current) {
        lines.push(current);
      }
      current = word;
    }
  }

  if (current) {
    lines.push(current);
  }

  lines.forEach((line, index) => {
    page.drawText(line, {
      x: startX,
      y: startY - index * lineHeight,
      size,
      font,
      color,
    });
  });
}

export async function createAprilFoolsPdf(gameTitle: string) {
  const pdfDoc = await PDFDocument.create();
  const pageSize = { width: 612, height: 792 };
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const page1 = pdfDoc.addPage([pageSize.width, pageSize.height]);
  page1.drawRectangle({ x: 0, y: 0, width: pageSize.width, height: pageSize.height, color: rgb(0.05, 0.05, 0.06) });
  drawCenteredText(page1, 'YOU ARE HACKED', 68, 430, fontBold, rgb(1, 0.2, 0.2));
  drawCenteredText(page1, 'Do not close your browser...', 20, 380, fontRegular, rgb(0.9, 0.9, 0.95));

  const page2 = pdfDoc.addPage([pageSize.width, pageSize.height]);
  page2.drawRectangle({ x: 0, y: 0, width: pageSize.width, height: pageSize.height, color: rgb(0.07, 0.08, 0.11) });
  drawCenteredText(page2, 'JUST KIDDING,', 52, 460, fontBold, rgb(0.45, 0.92, 1));
  drawCenteredText(page2, "I DON'T KNOW HACKING", 40, 408, fontBold, rgb(0.45, 0.92, 1));
  drawCenteredText(page2, `Target selected: ${gameTitle}`, 18, 362, fontRegular, rgb(0.95, 0.95, 0.98));

  const memeBytes = await fetch(aprilFoolsMeme2).then((response) => response.arrayBuffer());
  const memeImage = await pdfDoc.embedJpg(memeBytes);

  const page3 = pdfDoc.addPage([pageSize.width, pageSize.height]);
  page3.drawRectangle({ x: 0, y: 0, width: pageSize.width, height: pageSize.height, color: rgb(0.05, 0.05, 0.07) });

  const maxImageWidth = 520;
  const maxImageHeight = 470;
  const imageScale = Math.min(maxImageWidth / memeImage.width, maxImageHeight / memeImage.height);
  const drawWidth = memeImage.width * imageScale;
  const drawHeight = memeImage.height * imageScale;
  const imageX = (pageSize.width - drawWidth) / 2;
  const imageY = 250;

  page3.drawImage(memeImage, {
    x: imageX,
    y: imageY,
    width: drawWidth,
    height: drawHeight,
  });

  page3.drawText('HAPPY APRIL FOOL!', {
    x: 56,
    y: 165,
    size: 42,
    font: fontBold,
    color: rgb(1, 0.45, 0.27),
  });
  drawWrappedText(
    page3,
    'You survived the prank. Now launch a game and prank your friends.',
    500,
    56,
    126,
    15,
    22,
    fontRegular,
    rgb(0.88, 0.9, 0.97),
  );

  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: 'application/pdf' });
}

export async function triggerPdfDownload(_fileName: string, gameTitle: string) {
  try {
    const blob = await createAprilFoolsPdf(gameTitle);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'You are cooked.exe.pdf';
    anchor.rel = 'noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  } catch (error) {
    console.error('PDF download failed:', error);
  }
}
