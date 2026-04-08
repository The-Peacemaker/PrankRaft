import { motion } from 'framer-motion';
import { type GameCardData } from '../lib/arcadeFlow';

type Props = {
  game: GameCardData;
  onPlay: (game: GameCardData) => void;
};

const artByVariant: Record<GameCardData['thumbnail'], string> = {
  racer: 'from-cyan-500 via-fuchsia-500 to-yellow-300',
  orbit: 'from-fuchsia-500 via-indigo-500 to-cyan-300',
  maze: 'from-yellow-300 via-amber-500 to-rose-500',
  pulse: 'from-lime-300 via-emerald-500 to-cyan-500',
  city: 'from-indigo-500 via-violet-500 to-fuchsia-500',
  boss: 'from-orange-400 via-rose-500 to-pink-500',
};

const pixelRows: Record<GameCardData['thumbnail'], string[]> = {
  racer: ['0011100', '0111110', '1110111', '1111111', '1110111', '0111110', '0011100'],
  orbit: ['0001000', '0011100', '0111110', '1111111', '0111110', '0011100', '0001000'],
  maze: ['1111111', '1001001', '1011101', '1010001', '1011101', '1001001', '1111111'],
  pulse: ['0010000', '0111000', '1111100', '1111110', '1111100', '0111000', '0010000'],
  city: ['0010100', '0111110', '1111111', '1011101', '1111111', '0110110', '0010100'],
  boss: ['0111110', '1111111', '1101011', '1111111', '1101011', '1111111', '0111110'],
};

export function GameCard({ game, onPlay }: Props) {
  const art = pixelRows[game.thumbnail];

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.985 }}
      className="group relative overflow-hidden rounded-[1.7rem] border-[3px] border-black bg-panel/90 shadow-[0_20px_0_rgba(0,0,0,0.65)]"
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 0 30px ${game.glow}` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_55%)] opacity-60" />
      <div className="absolute inset-0 bg-arcade-grid bg-[length:22px_22px] opacity-[0.07]" />
      <div className="relative p-4 sm:p-5">
        <div className={`relative mb-4 aspect-[4/3] overflow-hidden rounded-[1.2rem] border-[3px] border-black bg-gradient-to-br ${artByVariant[game.thumbnail]} shadow-neon`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_46%),linear-gradient(to_bottom,rgba(0,0,0,0.12),rgba(0,0,0,0.35))]" />
          <div className="absolute inset-x-0 top-0 h-10 bg-white/12 blur-2xl" />
          <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 gap-1">
            {art.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1">
                {row.split('').map((pixel, pixelIndex) => (
                  <span
                    key={`${rowIndex}-${pixelIndex}`}
                    className={`h-3 w-3 rounded-[2px] ${pixel === '1' ? 'bg-black/85 shadow-[0_0_10px_rgba(0,0,0,0.45)]' : 'bg-white/0'}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="absolute bottom-2 left-3 rounded-full border-2 border-black bg-black/70 px-2 py-1 text-[0.55rem] font-arcade uppercase tracking-[0.35em] text-white/90">
            {game.genre}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-arcade text-[0.72rem] leading-5 text-white sm:text-[0.8rem]">{game.title}</h3>
              <p className="mt-2 max-w-[18rem] font-mono text-[1.2rem] leading-5 text-white/72">{game.subtitle}</p>
            </div>
            <div className="mt-1 h-4 w-4 rounded-full border-[3px] border-black" style={{ background: game.accent }} />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPlay(game)}
            className="w-full rounded-[1rem] border-[3px] border-black bg-white px-4 py-3 font-arcade text-[0.65rem] tracking-[0.25em] text-ink transition-shadow duration-200 group-hover:shadow-neon"
          >
            Play
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
