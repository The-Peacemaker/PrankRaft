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

const escapePdfText = (value: string) => value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

export function createAprilFoolsPdf(gameTitle: string) {
  const now = new Date();
  const sessionCode = Math.random().toString(36).slice(2, 8).toUpperCase();
  const uptime = `${Math.floor(Math.random() * 18) + 7}.${Math.floor(Math.random() * 10)}s`;

  const lines = [
    'BOOST.EXE - Interactive Patch Report',
    `Target game: ${gameTitle}`,
    `Session code: ${sessionCode}`,
    `Generated: ${now.toLocaleString()}`,
    `Perceived wait: ${uptime}`,
    '--- User Prompt Checklist ---',
    '1) Slow internet warning accepted.',
    '2) Network booster button clicked.',
    '3) Patch download trusted.',
    '4) Threat message emotionally processed.',
    '--- Reveal ---',
    'There was no virus and no booster.',
    'This was an interactive April Fool design experiment.',
    'Question: If this felt real, what made it believable?',
    'Write your answer in this PDF and send it to your future self.',
  ].map(escapePdfText);

  const contentLines = [
    'BT',
    '/F1 21 Tf',
    '72 720 Td',
    `(${lines[0]}) Tj`,
    '0 -30 Td',
    '/F1 14 Tf',
    `(${lines[1]}) Tj`,
    '0 -22 Td',
    `(${lines[2]}) Tj`,
    '0 -22 Td',
    `(${lines[3]}) Tj`,
    '0 -22 Td',
    `(${lines[4]}) Tj`,
    '0 -28 Td',
    '/F1 14 Tf',
    `(${lines[5]}) Tj`,
    '0 -20 Td',
    `(${lines[6]}) Tj`,
    '0 -18 Td',
    `(${lines[7]}) Tj`,
    '0 -18 Td',
    `(${lines[8]}) Tj`,
    '0 -18 Td',
    `(${lines[9]}) Tj`,
    '0 -30 Td',
    `(${lines[10]}) Tj`,
    '0 -20 Td',
    `(${lines[11]}) Tj`,
    '0 -20 Td',
    `(${lines[12]}) Tj`,
    '0 -20 Td',
    `(${lines[13]}) Tj`,
    '0 -20 Td',
    `(${lines[14]}) Tj`,
    'ET',
  ].join('\n');

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${contentLines.length} >>\nstream\n${contentLines}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];

  const chunks: string[] = ['%PDF-1.4\n'];
  const offsets = [0];

  objects.forEach((objectBody, index) => {
    offsets.push(chunks.join('').length);
    chunks.push(`${index + 1} 0 obj\n${objectBody}\nendobj\n`);
  });

  const xrefStart = chunks.join('').length;
  const xrefEntries = ['0000000000 65535 f '];

  for (let index = 1; index <= objects.length; index += 1) {
    xrefEntries.push(`${String(offsets[index]).padStart(10, '0')} 00000 n `);
  }

  chunks.push(`xref\n0 ${objects.length + 1}\n${xrefEntries.join('\n')}\n`);
  chunks.push(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`);

  return new Blob([chunks.join('')], { type: 'application/pdf' });
}

export function triggerPdfDownload(fileName: string, gameTitle: string) {
  const blob = createAprilFoolsPdf(gameTitle);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.rel = 'noreferrer';
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
