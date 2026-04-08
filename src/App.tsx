import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { games, triggerPdfDownload, type GameCardData } from './lib/arcadeFlow';
import byteMazePoster from './assets/games/byte-maze.svg';
import finalBossPoster from './assets/games/final-boss-fm.svg';
import metroCrashPoster from './assets/games/metro-crash.svg';
import neonDriftPoster from './assets/games/neon-drift.svg';
import starCircuitPoster from './assets/games/star-circuit.svg';
import turboPulsePoster from './assets/games/turbo-pulse.svg';
import heroCarVideo from './videos/hero-car.mp4';
import stitchHeroBike from './images/stitch-hero-bike.png';

type AppPhase = 'loading' | 'hub' | 'chaos' | 'reveal';

type ThreatPopup = {
  id: number;
  left: number;
  top: number;
  title: string;
  detail: string;
};

type CookedPopup = {
  id: number;
  left: number;
  top: number;
  rotate: number;
  scale: number;
};

const loadingStages = ['Warming up arcade network...', 'Syncing controllers...', 'Loading global arena...'];

const gamePosterByTitle: Record<string, string> = {
  'Neon Drift': neonDriftPoster,
  'Star Circuit': starCircuitPoster,
  'Byte Maze': byteMazePoster,
  'Turbo Pulse': turboPulsePoster,
  'Metro Crash': metroCrashPoster,
  'Final Boss FM': finalBossPoster,
};

const gameUrgency: Record<string, string> = {
  'Neon Drift': '2.1M PLAYING NOW',
  'Star Circuit': 'TRENDING IN 42 COUNTRIES',
  'Byte Maze': 'RANKED #1 REACTION GAME',
  'Turbo Pulse': '98% HYPE SCORE',
  'Metro Crash': 'LIVE TOURNAMENT MODE',
  'Final Boss FM': 'LEGENDARY MODE UNLOCKED',
};

function App() {
  const homeRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [phase, setPhase] = useState<AppPhase>('loading');
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(loadingStages[0]);
  const [activeGame, setActiveGame] = useState<GameCardData | null>(null);
  const [panicLogs, setPanicLogs] = useState<string[]>(['Awaiting user action...']);
  const [struggleClicks, setStruggleClicks] = useState(0);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [lagPulse, setLagPulse] = useState(0);
  const [threatPopups, setThreatPopups] = useState<ThreatPopup[]>([]);
  const [preChaos, setPreChaos] = useState(false);
  const [cookedPopups, setCookedPopups] = useState<CookedPopup[]>([]);
  const [lagCursor, setLagCursor] = useState({ x: -120, y: -120 });
  const targetCursorRef = useRef({ x: -120, y: -120 });
  const logsIndexRef = useRef(0);
  const popupIdRef = useRef(1);

  const loadedGames = Math.min(games.length, Math.floor((progress / 100) * games.length));
  const streamStability = 86 + Math.floor((progress / 100) * 13);
  const netLatency = Math.max(7, 38 - Math.floor((progress / 100) * 30));
  const featuredGame = games.find((game) => game.title === 'Final Boss FM') ?? games[0];
  const { scrollYProgress } = useScroll({ target: homeRef, offset: ['start start', 'end end'] });
  const heroMediaScale = useTransform(scrollYProgress, [0, 0.5], [1.04, 1.12]);
  const heroMediaY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const heroCopyOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.92]);
  const heroBackdropOpacity = useTransform(scrollYProgress, [0, 0.2], [0.7, 0.52]);

  useEffect(() => {
    if (phase !== 'loading') {
      return;
    }

    const started = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - started;
      const next = Math.min(100, Math.floor((elapsed / 2600) * 100));
      setProgress(next);
      setLoadingText(loadingStages[Math.min(loadingStages.length - 1, Math.floor(next / 34))]);

      if (next >= 100) {
        window.clearInterval(timer);
        setPhase('hub');
      }
    }, 90);

    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'chaos') {
      return;
    }

    const fakeBreaches = [
      'Injecting fake packet storm...',
      'Spawning emergency overlays...',
      'Disabling calm UI mode...',
      'Escalating panic meter...',
      'Locking controls... almost',
      'Warning: keyboard confidence dropping',
      'Analyzing rage clicks...',
      'Deploying April protocol',
      'Rendering fake malware animation...',
      'Simulating unstable GPU driver...',
    ];

    const popupPool = [
      { title: 'INTRUSION DETECTED', detail: 'Unknown process attempted camera access.' },
      { title: 'SYSTEM FILE ALERT', detail: 'Kernel profile mismatch at sector 0x41A.' },
      { title: 'REMOTE SESSION FOUND', detail: 'Input device mirrored to unknown host.' },
      { title: 'ENCRYPTION WARNING', detail: 'Critical game assets queued for lock.' },
      { title: 'FATAL NETWORK SPIKE', detail: 'Packet anomalies exceeded safe threshold.' },
    ];

    const logTimer = window.setInterval(() => {
      logsIndexRef.current = (logsIndexRef.current + 1) % fakeBreaches.length;
      setPanicLogs((lines) => [...lines.slice(-8), fakeBreaches[logsIndexRef.current]]);
    }, 520);

    const lagTimer = window.setInterval(() => {
      setLagPulse((value) => (value + 1) % 8);
    }, 180);

    const popupTimer = window.setInterval(() => {
      const entry = popupPool[Math.floor(Math.random() * popupPool.length)];
      const width = Math.max(320, window.innerWidth);
      const height = Math.max(320, window.innerHeight);
      const nextPopup: ThreatPopup = {
        id: popupIdRef.current,
        title: entry.title,
        detail: entry.detail,
        left: Math.random() * (width - 320),
        top: Math.random() * (height - 190),
      };
      popupIdRef.current += 1;

      setThreatPopups((items) => [...items.slice(-7), nextPopup]);
    }, 560);

    let frameId = 0;
    const animateCursor = () => {
      setLagCursor((current) => {
        const dx = targetCursorRef.current.x - current.x;
        const dy = targetCursorRef.current.y - current.y;
        return {
          x: current.x + dx * 0.06,
          y: current.y + dy * 0.06,
        };
      });
      frameId = window.requestAnimationFrame(animateCursor);
    };

    frameId = window.requestAnimationFrame(animateCursor);

    const jankTimer = window.setInterval(() => {
      const start = performance.now();
      while (performance.now() - start < 24) {
        // Intentional micro-freeze to simulate heavy lag.
      }
    }, 170);

    const dodge = (event: PointerEvent) => {
      targetCursorRef.current = { x: event.clientX, y: event.clientY };
      const areaX = Math.max(16, Math.min(window.innerWidth - 240, event.clientX + (Math.random() - 0.5) * 320));
      const areaY = Math.max(16, Math.min(window.innerHeight - 80, event.clientY + (Math.random() - 0.5) * 200));
      setButtonPos({ x: areaX, y: areaY });
    };

    window.addEventListener('pointermove', dodge);

    return () => {
      window.clearInterval(logTimer);
      window.clearInterval(lagTimer);
      window.clearInterval(popupTimer);
      window.clearInterval(jankTimer);
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', dodge);
    };
  }, [phase]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) {
      return;
    }

    const ensurePlay = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay may be blocked on some browsers; muted loop keeps the asset ready.
      }
    };

    void ensurePlay();
  }, [phase]);

  const resourceCards = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        left: `${(index * 13) % 95}%`,
        top: `${(index * 17) % 92}%`,
        delay: `${(index % 7) * 120}ms`,
      })),
    [],
  );

  const startChaos = async (game: GameCardData) => {
    if (preChaos || phase !== 'hub') {
      return;
    }

    setActiveGame(game);
    setPreChaos(true);
    setCookedPopups([]);

    const burstTimer = window.setInterval(() => {
      const width = Math.max(360, window.innerWidth);
      const height = Math.max(360, window.innerHeight);
      const nextPopup: CookedPopup = {
        id: popupIdRef.current,
        left: Math.random() * (width - 300),
        top: Math.random() * (height - 120),
        rotate: (Math.random() - 0.5) * 16,
        scale: 0.92 + Math.random() * 0.26,
      };
      popupIdRef.current += 1;
      setCookedPopups((items) => [...items.slice(-25), nextPopup]);
    }, 52);

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 720);
    });

    window.clearInterval(burstTimer);
    setPreChaos(false);
    setCookedPopups([]);

    void triggerPdfDownload('ultimate_patch_notes.pdf', game.title);
    setPanicLogs([`Patch started for ${game.title}...`, 'Resource flood initialized...']);
    setThreatPopups([]);
    setStruggleClicks(0);
    setButtonPos({ x: window.innerWidth * 0.5 - 110, y: window.innerHeight * 0.75 });
    targetCursorRef.current = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    setLagCursor({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 });
    setPhase('chaos');
  };

  const handlePanicButton = () => {
    setStruggleClicks((count) => {
      const next = count + 1;
      if (next % 3 === 0) {
        setButtonPos({
          x: Math.max(16, Math.random() * (window.innerWidth - 260)),
          y: Math.max(16, Math.random() * (window.innerHeight - 90)),
        });
      }
      if (next >= 12) {
        setPhase('reveal');
      }
      return next;
    });
  };

  const replay = () => {
    setProgress(0);
    setLoadingText(loadingStages[0]);
    setActiveGame(null);
    setPanicLogs(['Awaiting user action...']);
    setStruggleClicks(0);
    setButtonPos({ x: 0, y: 0 });
    setLagPulse(0);
    setThreatPopups([]);
    setPreChaos(false);
    setCookedPopups([]);
    setLagCursor({ x: -120, y: -120 });
    targetCursorRef.current = { x: -120, y: -120 };
    setPhase('loading');
  };

  return (
    <main className={`page ${phase === 'chaos' ? 'page-chaos' : ''}`}>
      {phase === 'loading' ? (
        <section className="loader-screen">
          <div className="loader-shell">
            <div className="loader-grid" aria-hidden="true" />
            <div className="loader-top">
              <p className="loader-label">RIDE THE REDLINE // RUNTIME HANDSHAKE</p>
              <h1>
                Initializing
                <br />
                Kinetic Arena
              </h1>
              <p className="loader-sub">{loadingText}</p>
            </div>

            <div className="loader-stats" aria-label="Optimization stats">
              <article>
                <h3>{progress}%</h3>
                <p>Core compile</p>
              </article>
              <article>
                <h3>
                  {loadedGames}/{games.length}
                </h3>
                <p>Game shards</p>
              </article>
              <article>
                <h3>{streamStability}%</h3>
                <p>Signal trust</p>
              </article>
              <article>
                <h3>{netLatency}ms</h3>
                <p>Arena ping</p>
              </article>
            </div>

            <div className="loader-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
              <span style={{ width: `${progress}%` }} />
            </div>

            <div className="loader-warning">
              <p>SAFE DECEPTION MODE ARMED</p>
              <span>Surprise interactions enabled. No harmful actions, no external access, no persistent changes.</span>
            </div>

            <div className="loader-gallery" aria-label="Featured games loading preview">
              {games.map((game, index) => (
                <article key={game.title} className={`loader-card ${index < loadedGames ? 'ready' : ''}`}>
                  <img src={gamePosterByTitle[game.title]} alt={`${game.title} loading poster`} loading="eager" />
                  <div>
                    <p>{game.title}</p>
                    <span>{index < loadedGames ? 'Ready' : 'Syncing'}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="loader-marquee" aria-hidden="true">
              {[...games, ...games].map((game, index) => (
                <span key={`${game.title}-${index}`}>{game.title}</span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {phase === 'hub' ? (
        <section className="home-shell" ref={homeRef}>
          <nav className="home-nav" aria-label="Primary">
            <a className="home-brand" href="#hero">
              RIDE THE REDLINE
            </a>
            <div className="home-navlinks">
              <a href="#hero" className="is-active">
                HOME
              </a>
              <a href="#games">GAMES</a>
            </div>
          </nav>

          <header className="hero-screen" id="hero">
            <motion.video
              ref={heroVideoRef}
              className="hero-bg-video"
              style={{ scale: heroMediaScale, y: heroMediaY }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={metroCrashPoster}
            >
              <source src={heroCarVideo} type="video/mp4" />
            </motion.video>
            <motion.div className="hero-bg-overlay" style={{ opacity: heroBackdropOpacity }} />
            <motion.div className="hero-copy-simple" style={{ opacity: heroCopyOpacity }}>
              <h1>
                <span>RIDE THE</span>
                <span className="hero-accent">REDLINE</span>
              </h1>
            </motion.div>
            <a className="hero-scroll-link" href="#reveal">
              SCROLL
            </a>
          </header>

          <section className="games-showcase" id="reveal">
            <div className="games-showcase-shell" id="games">
              <div className="games-showcase-left">
                <p className="games-showcase-kicker">FEATURED GAME LINEUP</p>
                <h2>Choose Your Next Arena</h2>
                <p className="games-showcase-intro">
                  Explore every title in the Redline lineup, compare game styles, and jump directly into the experience that matches your
                  mood.
                </p>

                <div className="games-showcase-list">
                  {games.map((game, index) => (
                    <motion.article
                      key={game.title}
                      className="games-showcase-item"
                      style={{ borderColor: game.accent }}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.28 }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
                    >
                      <img src={gamePosterByTitle[game.title]} alt={`${game.title} poster`} loading="lazy" />
                      <div>
                        <p>{gameUrgency[game.title]}</p>
                        <h3>{game.title}</h3>
                        <span>{game.genre}</span>
                        <small>{game.subtitle}</small>
                        <button type="button" onClick={() => startChaos(game)}>
                          PLAY NOW
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>

              <aside className="games-showcase-right">
                <figure>
                  <img src={stitchHeroBike} alt="Redline bike showcase" />
                  <figcaption>
                    <strong>REDLINE BIKE</strong>
                    <span>Precision handling. Aggressive speed. Built for cinematic arcade action.</span>
                  </figcaption>
                </figure>
              </aside>
            </div>
          </section>

          {preChaos ? (
            <div className="cook-burst-layer" aria-live="assertive" aria-label="You are Cooked warning">
              <div className="cook-burst-main">YOU ARE COOKED!!!</div>
              {cookedPopups.map((popup) => (
                <div
                  key={popup.id}
                  className="cook-burst-popup"
                  style={{
                    left: `${popup.left}px`,
                    top: `${popup.top}px`,
                    transform: `rotate(${popup.rotate}deg) scale(${popup.scale})`,
                  }}
                >
                  YOU ARE COOKED!!!
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {phase === 'chaos' ? (
        <section className="chaos">
          <div className="chaos-noise" aria-hidden="true" />
          <div className="chaos-banner">
            <h2>INTRUSION ACTIVE</h2>
            <p>
              {activeGame?.title ?? 'Selected game'} triggered a hostile patch chain. Cursor, rendering, and inputs are now
              destabilized.
            </p>
          </div>

          <div className="chaos-logs" aria-live="polite">
            {panicLogs.map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </div>

          {resourceCards.map((box) => (
            <div
              key={box.id}
              className={`resource-box pulse-${(box.id + lagPulse) % 4}`}
              style={{ left: box.left, top: box.top, animationDelay: box.delay }}
            >
              Resource spike {box.id + 1}
            </div>
          ))}

          {threatPopups.map((popup) => (
            <article key={popup.id} className="threat-popup" style={{ transform: `translate(${popup.left}px, ${popup.top}px)` }}>
              <h3>{popup.title}</h3>
              <p>{popup.detail}</p>
            </article>
          ))}

          <div className="lag-cursor" style={{ transform: `translate(${lagCursor.x}px, ${lagCursor.y}px)` }} />

          <button
            type="button"
            className="panic-btn"
            style={{ transform: `translate(${buttonPos.x}px, ${buttonPos.y}px)` }}
            onClick={handlePanicButton}
          >
            FORCE OVERRIDE ({struggleClicks}/12)
          </button>
        </section>
      ) : null}

      {phase === 'reveal' ? (
        <section className="reveal">
          <h2>APRIL FOOL.</h2>
          <p>
            No hack. No breach. Only a dramatic prank experience. The downloaded PDF contains the same reveal so the joke lands in
            both places.
          </p>
          <button type="button" onClick={replay}>
            Run It Again
          </button>
        </section>
      ) : null}
    </main>
  );
}

export default App;
