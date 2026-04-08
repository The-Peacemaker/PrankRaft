import { motion } from 'framer-motion';
import { type GameCardData } from '../lib/arcadeFlow';

type Props = {
  progress: number;
  fileName: string;
  game: GameCardData | null;
};

export function DownloadModal({ progress, fileName, game }: Props) {
  return (
    <section className="fixed inset-0 z-30 flex items-center justify-center px-4 py-8 text-white">
      <div className="absolute inset-0 bg-[#06030c]/82 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,216,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(51,246,255,0.16),transparent_22%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border-[4px] border-black bg-panel/96 p-5 shadow-[0_18px_0_rgba(0,0,0,0.72)] sm:p-8"
      >
        <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(255,255,255,0.09),transparent_45%)]" />
        <div className="relative space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-arcade text-[0.65rem] tracking-[0.24em] text-yellow">Loading game...</div>
              <h3 className="mt-2 font-arcade text-[1rem] text-white sm:text-[1.1rem]">Asset Sync Terminal</h3>
            </div>
            <div className="rounded-full border-[3px] border-black bg-lime px-4 py-2 font-arcade text-[0.58rem] tracking-[0.22em] text-black">SYNC</div>
          </div>

          <div className="grid gap-4 rounded-[1.4rem] border-[4px] border-black bg-black/65 p-4 sm:grid-cols-[0.9fr_1.1fr] sm:p-5">
            <div className="rounded-[1.2rem] border-[3px] border-black bg-[#12091f] p-4">
              <div className="font-arcade text-[0.55rem] tracking-[0.2em] text-white/45">FILE</div>
              <div className="mt-2 break-words font-mono text-[1.35rem] text-white">{fileName}</div>
              <div className="mt-5 font-arcade text-[0.55rem] tracking-[0.2em] text-white/45">TARGET</div>
              <div className="mt-2 font-mono text-[1.3rem] text-white/84">{game?.title ?? 'Unknown Game'}</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 font-mono text-[1.25rem] text-white/74 sm:text-[1.35rem]">
                <span>Loading game assets...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-5 overflow-hidden rounded-full border-[3px] border-black bg-[#12091f]">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#33f6ff_0%,#88ff7a_50%,#ffe86b_100%)] shadow-neon"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                />
              </div>
              <div className="rounded-[1.2rem] border-[3px] border-black bg-black/50 p-4 font-mono text-[1.2rem] leading-7 text-white/72 sm:text-[1.3rem]">
                Preparing the selected game for launch. A surprise patch PDF is being written to your downloads folder.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
