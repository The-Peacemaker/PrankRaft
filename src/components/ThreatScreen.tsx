import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
  onFixVirus: () => void;
};

export function ThreatScreen({ onFixVirus }: Props) {
  const [showFixButton, setShowFixButton] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setShowFixButton(true);
    }, 3400);

    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <section className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden px-4 py-8 text-white">
      <div className="absolute inset-0 bg-[#040208]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,79,216,0.16),transparent_28%),radial-gradient(circle_at_75%_20%,rgba(255,232,107,0.11),transparent_24%)]" />
      <div className="absolute inset-0 opacity-65 mix-blend-screen" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)', backgroundSize: '100% 4px' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-3xl"
      >
        <div className="absolute inset-0 rounded-[2rem] border-[4px] border-red-500/70 blur-[0.5px] animate-glitch" />
        <div className="relative overflow-hidden rounded-[2rem] border-[4px] border-black bg-[#100713] p-6 shadow-[0_18px_0_rgba(0,0,0,0.8)] sm:p-8">
          <div className="space-y-6 text-center">
            <div className="font-arcade text-[0.7rem] tracking-[0.28em] text-red-300">SYSTEM ALERT</div>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-black bg-red-500 text-[2.3rem] text-black shadow-neon">
              !
            </div>
            <div className="space-y-3">
              <h3 className="font-arcade text-[1rem] text-white sm:text-[1.1rem]">Virus inside your system</h3>
              <p className="font-mono text-[1.35rem] leading-7 text-white/76 sm:text-[1.5rem]">
                Best of luck fixing it. This is a simulated scare effect only, not malware.
              </p>
            </div>
            <div className="rounded-[1.25rem] border-[3px] border-black bg-black/65 p-4 font-mono text-[1.2rem] leading-7 text-white/70 sm:text-[1.35rem]">
              Glitch layer engaged. RGB separation, scan tearing, and UI distortion are simulated only.
            </div>

            <div className="rounded-[1rem] border-[3px] border-black bg-red-600/30 px-4 py-3 font-mono text-[1.1rem] text-red-100 sm:text-[1.25rem]">
              System is unstable. Find the hidden repair control.
            </div>
          </div>
        </div>

        {showFixButton ? (
          <motion.button
            onClick={onFixVirus}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.72, y: 0, x: [0, -7, 9, -4, 0] }}
            transition={{ opacity: { duration: 0.45 }, x: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } }}
            whileHover={{ opacity: 1, scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="absolute -bottom-4 right-3 rounded-lg border-2 border-black bg-lime px-3 py-2 font-arcade text-[0.46rem] tracking-[0.16em] text-black shadow-neon sm:right-5"
          >
            FIX.VIRUS
          </motion.button>
        ) : null}
      </motion.div>
    </section>
  );
}
