import { useEffect, useMemo, useRef, useState } from 'react';
import { boostLogs, clamp, loadingMessages, triggerPdfDownload, type GameCardData, type Phase } from '../lib/arcadeFlow';

type FinalStats = {
  waitedSeconds: number;
  boostClicks: number;
  confidenceScore: number;
  latencyDelta: string;
};

type DownloadContext = {
  game: GameCardData | null;
  fileName: string;
  downloadStarted: boolean;
};

export function useArcadeExperience() {
  const startedAt = useRef(Date.now());
  const timers = useRef<number[]>([]);
  const progressPulse = useRef(0);

  const [phase, setPhase] = useState<Phase>('loading');
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(66);
  const [readyToBoost, setReadyToBoost] = useState(false);
  const [boostClicks, setBoostClicks] = useState(0);
  const [boostSpeed, setBoostSpeed] = useState(0);
  const [boostLogLines, setBoostLogLines] = useState<string[]>([]);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadContext, setDownloadContext] = useState<DownloadContext>({
    game: null,
    fileName: 'game_patch_v2.pdf',
    downloadStarted: false,
  });
  const [finalStats, setFinalStats] = useState<FinalStats | null>(null);

  const clearTimers = () => {
    timers.current.forEach((timerId) => window.clearTimeout(timerId));
    timers.current = [];
  };

  const pushTimer = (callback: () => void, delay: number) => {
    timers.current.push(window.setTimeout(callback, delay));
  };

  useEffect(() => {
    clearTimers();

    if (phase === 'loading') {
      progressPulse.current = 0;
      setBoostLogLines([]);
      setBoostSpeed(0);
      setLoadingMessageIndex(0);
      setLoadingProgress(66);
      setReadyToBoost(false);

      const loadingTick = window.setInterval(() => {
        progressPulse.current += 1;
        setLoadingProgress((value) => clamp(value + (progressPulse.current % 2 === 0 ? 1 : 0), 65, 79));
        setLoadingMessageIndex((value) => (value + 1) % loadingMessages.length);
      }, 1600);

      pushTimer(() => setReadyToBoost(true), 3850);
      pushTimer(() => window.clearInterval(loadingTick), 7200);

      return () => {
        window.clearInterval(loadingTick);
      };
    }

    if (phase === 'boosting') {
      const totalBoostDuration = 2500;
      const logSchedule = boostLogs.map((_, index) => 180 + index * 240);

      setBoostSpeed(120);
      setBoostLogLines(['Booting accelerator core...']);

      logSchedule.forEach((delay, index) => {
        pushTimer(() => {
          setBoostLogLines((lines) => [...lines, boostLogs[index]]);
          setBoostSpeed((current) => clamp(current + 140 + index * 90, 0, 999));
        }, delay);
      });

      const speedRamp = window.setInterval(() => {
        setBoostSpeed((current) => clamp(current + 72 + Math.random() * 94, 0, 999));
      }, 120);

      pushTimer(() => {
        window.clearInterval(speedRamp);
        setBoostSpeed(999);
        setBoostLogLines((lines) => [...lines, 'Connection Optimized.', 'Performance Boost Successful.']);
      }, totalBoostDuration - 160);

      pushTimer(() => setPhase('home'), totalBoostDuration);

      return () => {
        window.clearInterval(speedRamp);
      };
    }

    if (phase === 'download') {
      setDownloadProgress(0);
      setDownloadContext((context) => ({ ...context, downloadStarted: false }));

      const downloader = window.setInterval(() => {
        setDownloadProgress((value) => {
          const next = value + (value < 55 ? 14 : value < 84 ? 9 : 4);
          return clamp(next + (Math.random() > 0.75 ? 2 : 0), 0, 100);
        });
      }, 220);

      pushTimer(() => {
        window.clearInterval(downloader);
        setDownloadProgress(100);
      }, 2500);

      pushTimer(() => setPhase('threat'), 2900);

      return () => {
        window.clearInterval(downloader);
      };
    }

    return () => undefined;
  }, [boostClicks, phase]);

  const triggerBoost = () => {
    if (!readyToBoost || phase !== 'loading') {
      return;
    }

    setBoostClicks((value) => value + 1);
    setPhase('boosting');
  };

  const triggerPlay = (game: GameCardData) => {
    if (phase !== 'home') {
      return;
    }

    const fileName = 'game_patch_v2.pdf';
    triggerPdfDownload(fileName, game.title);
    setDownloadContext({ game, fileName, downloadStarted: true });
    setPhase('download');
  };

  const triggerFixVirus = () => {
    setFinalStats({
      waitedSeconds: (Date.now() - startedAt.current) / 1000,
      boostClicks,
      confidenceScore: Math.min(99, 73 + boostClicks * 9),
      latencyDelta: 'Ultimate speed: 999 Mbps',
    });
    setPhase('reveal');
  };

  const replay = () => {
    clearTimers();
    startedAt.current = Date.now();
    setPhase('loading');
    setLoadingMessageIndex(0);
    setLoadingProgress(66);
    setReadyToBoost(false);
    setBoostClicks(0);
    setBoostSpeed(0);
    setBoostLogLines([]);
    setDownloadProgress(0);
    setDownloadContext({ game: null, fileName: 'game_patch_v2.pdf', downloadStarted: false });
    setFinalStats(null);
  };

  const loadingMessage = useMemo(() => loadingMessages[loadingMessageIndex], [loadingMessageIndex]);

  return {
    phase,
    loadingMessage,
    loadingProgress,
    readyToBoost,
    boostClicks,
    boostSpeed,
    boostLogLines,
    downloadProgress,
    downloadContext,
    finalStats,
    triggerBoost,
    triggerPlay,
    triggerFixVirus,
    replay,
  };
}
