import { motion } from 'framer-motion';
import { formatMbps } from '../lib/arcadeFlow';

type Props = {
  speed: number;
  logs: string[];
};

export function BoostSequence({ speed, logs }: Props) {
  const shards = [
    { x: -190, y: -120, color: 'bg-cyan' },
    { x: -120, y: -40, color: 'bg-yellow' },
    { x: -70, y: 100, color: 'bg-magenta' },
    { x: 24, y: -92, color: 'bg-lime' },
    { x: 110, y: 36, color: 'bg-cyan' },
    { x: 182, y: -18, color: 'bg-yellow' },
    { x: -26, y: 166, color: 'bg-magenta' },
    { x: 168, y: 118, color: 'bg-lime' },
  ];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090410] px-4 py-8 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(51,246,255,0.2),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(255,79,216,0.18),transparent_22%),linear-gradient(180deg,#090410_0%,#0d0617_100%)]" />
      <div className="absolute inset-0 scanlines pointer-events-none" />

      <motion.div
        key="boost"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-5xl"
      >
        <div className="absolute inset-0 pointer-events-none">
          {shards.map((shard, index) => (
            <span
              key={`${shard.x}-${shard.y}`}
              className={`absolute left-1/2 top-1/2 h-3 w-3 rounded-[2px] ${shard.color} shadow-neon animate-burst`}
              style={{ marginLeft: shard.x, marginTop: shard.y, animationDelay: `${index * 70}ms` }}
            />
          ))}
        </div>

        <div className="absolute inset-0 opacity-60">
          <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-cyan/25 blur-3xl animate-burst" />
          <div className="absolute right-6 top-20 h-28 w-28 rounded-full bg-magenta/25 blur-3xl animate-burst [animation-delay:180ms]" />
          <div className="absolute bottom-12 left-1/2 h-24 w-24 rounded-full bg-yellow/25 blur-3xl animate-burst [animation-delay:260ms]" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="arcade-panel relative overflow-hidden rounded-[2rem] border-[4px] border-black bg-panel/92 p-5 shadow-[0_18px_0_rgba(0,0,0,0.72)] sm:p-8">
            <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,0.12),transparent_42%)]" />
            <div className="relative space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-arcade text-[1rem] text-cyan sm:text-[1.1rem]">Boost Sequence</h2>
                <div className="rounded-full border-[3px] border-black bg-black px-4 py-2 font-mono text-[1.3rem] text-yellow shadow-neon">
                  {formatMbps(speed)}
                </div>
              </div>

              <div className="rounded-[1.5rem] border-[4px] border-black bg-[#0a0714] p-4 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-4 font-mono text-[1.25rem] text-white/75 sm:text-[1.4rem]">
                  <span>Throughput</span>
                  <span>{Math.max(0, Math.min(999, Math.round(speed)))} Mbps</span>
                </div>
                <div className="h-9 overflow-hidden rounded-full border-[3px] border-black bg-black/70">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#33f6ff_0%,#88ff7a_48%,#ffe86b_70%,#ff4fd8_100%)] shadow-neon"
                    animate={{ width: `${Math.max(14, Math.min(100, speed / 9.99))}%` }}
                    transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                  />
                </div>
                <p className="mt-4 font-mono text-[1.3rem] leading-7 text-white/70 sm:text-[1.45rem]">
                  The connection is being normalized across the arcade grid. This is the part where it feels real.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ['Packet Integrity', '99.4%'],
                  ['Jitter Envelope', 'Stable'],
                  ['Signal Lock', 'Locked'],
                  ['Route Sync', 'Active'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.1rem] border-[3px] border-black bg-black/55 p-4">
                    <div className="font-arcade text-[0.6rem] tracking-[0.24em] text-white/46">{label}</div>
                    <div className="mt-2 font-mono text-[1.45rem] text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="arcade-panel relative overflow-hidden rounded-[2rem] border-[4px] border-black bg-[#0b0716] p-5 shadow-[0_18px_0_rgba(0,0,0,0.72)] sm:p-8">
            <div className="relative flex h-full flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-arcade text-[0.7rem] tracking-[0.26em] text-magenta">CONSOLE LOG</span>
                <span className="rounded-full border-2 border-black bg-lime px-3 py-1 font-arcade text-[0.58rem] tracking-[0.22em] text-black">OK</span>
              </div>

              <div className="grid flex-1 gap-3 rounded-[1.3rem] border-[4px] border-black bg-black/70 p-4">
                {logs.length === 0 ? (
                  <div className="flex h-full items-center justify-center font-mono text-[1.35rem] text-white/45">
                    Preparing accelerator core...
                  </div>
                ) : (
                  logs.map((log, index) => (
                    <motion.div
                      key={`${log}-${index}`}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="rounded-[1rem] border-[3px] border-black bg-panel2/95 px-4 py-3 font-mono text-[1.28rem] text-white/84"
                    >
                      {log}
                    </motion.div>
                  ))
                )}
              </div>

              <div className="rounded-[1.3rem] border-[3px] border-black bg-gradient-to-r from-cyan via-magenta to-yellow p-[3px] shadow-neon">
                <div className="rounded-[1.2rem] border-[3px] border-black bg-[#08040f] px-4 py-4 text-center font-arcade text-[0.7rem] tracking-[0.24em] text-white">
                  Performance Boost Successful
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
