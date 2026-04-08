import { motion } from 'framer-motion';
import { GameCard } from './GameCard';
import { games, type GameCardData } from '../lib/arcadeFlow';

type Props = {
  onPlay: (game: GameCardData) => void;
};

export function ArcadeHome({ onPlay }: Props) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#06030c] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(51,246,255,0.16),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(255,79,216,0.14),transparent_22%),linear-gradient(180deg,#06030c_0%,#0d0616_55%,#08040f_100%)]" />
      <div className="absolute inset-0 bg-arcade-grid bg-[length:22px_22px] opacity-[0.08]" />
      <div className="absolute inset-0 scanlines pointer-events-none" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="arcade-panel rounded-[1.8rem] border-[4px] border-black bg-panel/95 p-5 shadow-[0_18px_0_rgba(0,0,0,0.72)] sm:p-7"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3 rounded-full border-[3px] border-black bg-black px-4 py-2 font-arcade text-[0.66rem] tracking-[0.24em] text-cyan shadow-neon">
                OPTIMIZED CONNECTION
              </div>
              <h2 className="font-arcade text-[1rem] text-white sm:text-[1.1rem]">Arcade Network Verified</h2>
              <p className="max-w-2xl font-mono text-[1.35rem] leading-7 text-white/72 sm:text-[1.5rem]">
                The platform has stabilized. The interface is intentionally low-refresh for that retro arcade feel.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['Latency', '0.8 ms'],
                ['Status', 'Slow UI'],
                ['Trust', '98%'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1rem] border-[3px] border-black bg-black/55 px-4 py-3">
                  <div className="font-arcade text-[0.58rem] tracking-[0.22em] text-white/45">{label}</div>
                  <div className="mt-2 font-mono text-[1.45rem] text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.header>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {games.map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 * index, duration: 0.65, ease: 'easeOut' }}
            >
              <GameCard game={game} onPlay={onPlay} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
