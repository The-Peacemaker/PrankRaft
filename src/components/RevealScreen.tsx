import { motion } from 'framer-motion';
import { formatSeconds } from '../lib/arcadeFlow';

type FinalStats = {
  waitedSeconds: number;
  boostClicks: number;
  confidenceScore: number;
  latencyDelta: string;
};

type Props = {
  stats: FinalStats | null;
  onReplay: () => void;
};

export function RevealScreen({ stats, onReplay }: Props) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4efe5] px-4 py-10 text-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_34%),linear-gradient(180deg,#f8f4ec_0%,#eee4d8_100%)]" />
      <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'linear-gradient(90deg, rgba(9,4,17,0.08) 1px, transparent 1px), linear-gradient(rgba(9,4,17,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative mx-auto w-full max-w-4xl"
      >
        <div className="overflow-hidden rounded-[2rem] border-[4px] border-black bg-white p-6 shadow-[0_20px_0_rgba(0,0,0,0.8)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="space-y-5 text-center lg:text-left">
              <div className="inline-flex rounded-full border-[3px] border-black bg-yellow px-4 py-2 font-arcade text-[0.62rem] tracking-[0.24em] text-ink">
                FINAL REVEAL
              </div>
              <motion.h2 initial={{ letterSpacing: '0.4em' }} animate={{ letterSpacing: '0.08em' }} transition={{ duration: 1.1 }} className="font-arcade text-[1.2rem] leading-[1.75] sm:text-[1.35rem]">
                April Fool.
              </motion.h2>
              <div className="space-y-4 font-mono text-[1.55rem] leading-8 text-ink/84 sm:text-[1.75rem]">
                <p>There was no slow internet.</p>
                <p>No network boost.</p>
                <p>No threat.</p>
                <p>Only design.</p>
                <p className="pt-2 text-[1.9rem] leading-9 sm:text-[2.1rem]">If a website can fix your internet... what else can it make you believe?</p>
              </div>
              <button onClick={onReplay} className="mt-2 rounded-[1rem] border-[3px] border-black bg-ink px-5 py-3 font-arcade text-[0.62rem] tracking-[0.24em] text-white transition-transform hover:-translate-y-0.5">
                Replay illusion
              </button>
            </div>

            <div className="grid gap-4 rounded-[1.6rem] border-[4px] border-black bg-[#f0e6da] p-4 sm:p-6">
              <div className="rounded-[1.25rem] border-[3px] border-black bg-white p-4">
                <div className="font-arcade text-[0.58rem] tracking-[0.24em] text-ink/55">YOU WAITED</div>
                <div className="mt-2 font-mono text-[2rem] text-ink">{stats ? formatSeconds(stats.waitedSeconds) : '0.0s'}</div>
              </div>
              <div className="rounded-[1.25rem] border-[3px] border-black bg-white p-4">
                <div className="font-arcade text-[0.58rem] tracking-[0.24em] text-ink/55">BOOST CLICKED</div>
                <div className="mt-2 font-mono text-[2rem] text-ink">{stats?.boostClicks ?? 0}x</div>
              </div>
              <div className="rounded-[1.25rem] border-[3px] border-black bg-white p-4">
                <div className="font-arcade text-[0.58rem] tracking-[0.24em] text-ink/55">TRUSTED THE SYSTEM</div>
                <div className="mt-2 font-mono text-[2rem] text-ink">{stats?.confidenceScore ?? 0}%</div>
              </div>
              <div className="rounded-[1.25rem] border-[3px] border-black bg-white p-4">
                <div className="font-arcade text-[0.58rem] tracking-[0.24em] text-ink/55">NETWORK READOUT</div>
                <div className="mt-2 font-mono text-[1.8rem] text-ink">{stats?.latencyDelta ?? '0 Mbps'}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
