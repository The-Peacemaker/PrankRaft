import { motion } from 'framer-motion';

type Props = {
  progress: number;
  message: string;
  readyToBoost: boolean;
  onBoost: () => void;
};

export function LoadingScreen({ progress, message, readyToBoost, onBoost }: Props) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08040f] px-4 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,79,216,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(51,246,255,0.16),transparent_28%),linear-gradient(160deg,#12081f_0%,#07040d_55%,#030208_100%)]" />
      <div className="absolute inset-0 bg-arcade-grid bg-[length:26px_26px] opacity-[0.08]" />
      <div className="absolute inset-0 scanlines pointer-events-none" />
      <div className="absolute inset-0 opacity-35 mix-blend-screen" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '100% 6px' }} />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-4xl"
      >
        <div className="absolute -left-12 top-0 hidden h-32 w-32 rounded-full bg-cyan/30 blur-3xl md:block" />
        <div className="absolute -right-10 bottom-10 hidden h-36 w-36 rounded-full bg-magenta/25 blur-3xl md:block" />

        <div className="arcade-panel relative overflow-hidden rounded-[2rem] border-[4px] border-black bg-panel/95 p-5 shadow-[0_18px_0_rgba(0,0,0,0.75)] sm:p-8 md:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.1),transparent_44%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_50%)]" />

          <div className="relative grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full border-[3px] border-black bg-black px-4 py-2 font-mono text-[1.2rem] uppercase tracking-[0.18em] text-cyan shadow-neon">
                <span className="h-3 w-3 rounded-full bg-lime shadow-[0_0_20px_rgba(136,255,122,0.8)]" />
                Arcade Sync
              </div>

              <h1 className="max-w-xl font-arcade text-[1.45rem] leading-[1.55] text-white sm:text-[1.8rem] md:text-[2.15rem] md:leading-[1.45]">
                BOOST.EXE
                <span className="mt-3 block font-mono text-[1.55rem] leading-none text-white/82 sm:text-[2rem] md:text-[2.3rem]">
                  Retro Arcade Network Accelerator
                </span>
              </h1>

              <p className="max-w-lg font-mono text-[1.35rem] leading-7 text-white/72 sm:text-[1.5rem]">
                The platform is calibrating your connection. Please hold while assets finish initializing.
              </p>

              <div className="space-y-3 rounded-[1.4rem] border-[3px] border-black bg-black/45 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                <div className="flex items-center justify-between gap-3 font-mono text-[1.25rem] text-white/80 sm:text-[1.4rem]">
                  <span>{message}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-5 overflow-hidden rounded-full border-[3px] border-black bg-[#10091e]">
                  <div className="relative h-full rounded-full bg-[linear-gradient(90deg,#33f6ff_0%,#ff4fd8_45%,#ffe86b_100%)] shadow-neon animate-stutter" style={{ width: `${progress}%` }}>
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)] opacity-80" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-[2rem] border-[3px] border-dashed border-white/12" />
              <div className="relative grid w-full gap-4 rounded-[2rem] border-[4px] border-black bg-[#0d0718] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-arcade text-[0.68rem] tracking-[0.28em] text-yellow sm:text-[0.75rem]">NETWORK STATUS</span>
                  <span className="rounded-full border-2 border-black bg-magenta px-3 py-1 font-arcade text-[0.58rem] tracking-[0.25em] text-black">LIVE</span>
                </div>

                <div className="grid gap-3 rounded-[1.25rem] border-[3px] border-black bg-panel2/95 p-4">
                  <div className="flex items-center justify-between gap-3 font-mono text-[1.3rem] text-white/78">
                    <span>Signal Integrity</span>
                    <span>77%</span>
                  </div>
                  <div className="h-3 rounded-full bg-black/70">
                    <motion.div
                      initial={{ width: '62%' }}
                      animate={{ width: ['66%', '71%', '68%', '76%', '74%'] }}
                      transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="h-full rounded-full bg-lime shadow-[0_0_18px_rgba(136,255,122,0.6)]"
                    />
                  </div>

                  {readyToBoost ? (
                    <div className="space-y-2 rounded-[1rem] border-[3px] border-black bg-black/55 p-3">
                      <div className="font-arcade text-[0.6rem] tracking-[0.22em] text-yellow sm:text-[0.66rem]">
                        ⚠ Slow Network Detected
                      </div>
                      <div className="font-mono text-[1.15rem] leading-6 text-white/72 sm:text-[1.3rem]">
                        Your connection may impact gameplay performance.
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-[1rem] border-[3px] border-black bg-black/55 p-3 font-mono text-[1.15rem] leading-6 text-white/72 sm:text-[1.3rem]">
                      Warning: perceived latency may impact gameplay responsiveness.
                    </div>
                  )}
                </div>

                {readyToBoost ? (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onBoost}
                    className="relative mt-2 overflow-hidden rounded-[1.3rem] border-[4px] border-black bg-gradient-to-r from-cyan to-magenta px-5 py-4 text-left shadow-neon"
                  >
                    <span className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.5),transparent)] opacity-80" />
                    <span className="relative block font-arcade text-[0.72rem] tracking-[0.22em] text-black sm:text-[0.8rem]">⚡ Download Network Booster</span>
                    <span className="relative mt-2 block font-mono text-[1.35rem] text-black/82 sm:text-[1.5rem]">
                      Unlock ultimate speed.
                    </span>
                  </motion.button>
                ) : (
                  <div className="mt-2 rounded-[1.3rem] border-[4px] border-black bg-black/55 px-5 py-4 font-mono text-[1.2rem] text-white/56 sm:text-[1.35rem]">
                    Calibrating input buffer...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
