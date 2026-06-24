import { useEffect, useState } from "react";

import kleoBreathing from "../../assets/bronto/kleo_breathing.png";
import kleoHappy from "../../assets/bronto/bronto_happy.png";
import kleoCalm from "../../assets/bronto/bronto_calm.png";
import kleoThinking from "../../assets/bronto/bronto_thinking.png";
import kleoWave from "../../assets/bronto/bronto_wave.png";

const timers = [
  {
    id: "breathing-movement-music",
    title: "Respiration + mouvement + musique",
    icon: "🎵",
    duration: 900,
    label: "Un circuit doux de 10 à 15 minutes.",
    image: kleoBreathing,
    stages: [
      {
        title: "Atelier 1 : Ancrage",
        duration: "2 min",
        durationSeconds: 120,
        items: [
          "Assis sur un coussin, ballon ou chaise.",
          "Ecoute d'une musique calme sans paroles.",
          "Respirer tranquillement en posant les mains sur le ventre.",
        ],
      },
      {
        title: "Atelier 2 : Respiration guidée",
        duration: "3 min",
        durationSeconds: 180,
        items: [
          "Musique avec rythme lent, environ 60 battements/minute.",
          "Inspirer pendant 4 ou 5 temps.",
          "Expirer pendant 5 ou 6 temps.",
          "Utiliser un support visuel : bulle, sablier ou carte de respiration.",
        ],
      },
      {
        title: "Atelier 3 : Mouvement régulateur",
        duration: "3 min",
        durationSeconds: 180,
        items: [
          "Marche lente sur un parcours.",
          "Pas synchronisés avec la respiration.",
          "Possibilité d'ajouter des dalles sensorielles ou un parcours moteur simple.",
        ],
      },
      {
        title: "Atelier 4 : Retour au calme",
        duration: "2 à 5 min",
        items: [
          "Coin cocon, pouf ou couverture lestée si approprié.",
          "Musique douce ou sons de nature.",
          "Observation d'un objet lumineux calme : bouteille sensorielle ou projecteur d'étoiles.",
        ],
      },
    ],
  },
  {
    id: "breathing",
    title: "Respiration guidée",
    icon: "🫁",
    duration: 60,
    label: "Prêt ? Clique sur démarrer.",
    image: kleoBreathing,
  },
  {
    id: "calm",
    title: "Retour au calme",
    icon: "😌",
    duration: 180,
    label: "On ralentit doucement.",
    image: kleoCalm,
  },
  {
    id: "energy",
    title: "Reprendre de l'énergie",
    icon: "⚡",
    duration: 120,
    label: "Une petite relance.",
    image: kleoWave,
  },
  {
    id: "focus",
    title: "Focus 5 min",
    icon: "🎯",
    duration: 300,
    label: "Une seule tâche.",
    image: kleoThinking,
  },
];

const BREATH_SECONDS = 4;

export function ChronoPage() {
  const [selectedTimer, setSelectedTimer] =
    useState<(typeof timers)[number] | null>(null);

  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [endsAt, setEndsAt] = useState<number | null>(null);

  const [finishAudio] = useState(
    () => new Audio("/sounds/success.mp3")
  );
  const [bpmAudio] = useState(() => {
    const audio = new Audio("/sounds/60bpm.mp3");
    audio.loop = true;
    audio.volume = 0.32;
    return audio;
  });

  useEffect(() => {
    if (!selectedTimer) return;

    setRemaining(selectedTimer.duration);
    setRunning(false);
    setFinished(false);
    setEndsAt(null);
  }, [selectedTimer]);

  useEffect(() => {
    if (!running || endsAt === null) return;

    const targetEndsAt = endsAt;

    function syncRemaining() {
      const nextRemaining =
        Math.max(Math.ceil((targetEndsAt - Date.now()) / 1000), 0);

      setRemaining(nextRemaining);
    }

    syncRemaining();

    const interval = window.setInterval(() => {
      syncRemaining();
    }, 250);

    return () => window.clearInterval(interval);
  }, [running, endsAt]);

  useEffect(() => {
    if (!selectedTimer || !running || finished || remaining !== 0) return;

    setRunning(false);
    setEndsAt(null);
    setFinished(true);
    bpmAudio.pause();
    bpmAudio.currentTime = 0;

    finishAudio.currentTime = 0;
    finishAudio.play().catch(() => {});
    navigator.vibrate?.([200, 100, 200]);
  }, [selectedTimer, finished, remaining, finishAudio, bpmAudio]);

  useEffect(() => {
    return () => {
      bpmAudio.pause();
      bpmAudio.currentTime = 0;
    };
  }, [bpmAudio]);

  function unlockAudio() {
    finishAudio.volume = 0.35;

    finishAudio
      .play()
      .then(() => {
        finishAudio.pause();
        finishAudio.currentTime = 0;
      })
      .catch(() => {});
  }

  function startOrPause() {
    if (!selectedTimer) return;

    unlockAudio();

    if (running) {
      if (endsAt !== null) {
        setRemaining(
          Math.max(Math.ceil((endsAt - Date.now()) / 1000), 0)
        );
      }

      setRunning(false);
      setEndsAt(null);
      bpmAudio.pause();
      return;
    }

    const nextRemaining =
      remaining === 0 ? selectedTimer.duration : remaining;

    setRemaining(nextRemaining);
    setFinished(false);
    setEndsAt(Date.now() + nextRemaining * 1000);
    setRunning(true);

    if (selectedTimer.id === "breathing-movement-music") {
      bpmAudio.currentTime = 0;
      bpmAudio.play().catch(() => {});
    }
  }

  function resetTimer() {
    if (!selectedTimer) return;

    setRunning(false);
    setRemaining(selectedTimer.duration);
    setFinished(false);
    setEndsAt(null);
    bpmAudio.pause();
    bpmAudio.currentTime = 0;
  }

  if (selectedTimer) {
    const isBreathing =
      selectedTimer.id === "breathing";

    const progress =
      selectedTimer.duration - remaining;

    const breathStep =
      progress % (BREATH_SECONDS * 2);

    const breathPhase =
      breathStep < BREATH_SECONDS ? "inspire" : "expire";

    const breathCount =
      BREATH_SECONDS - (breathStep % BREATH_SECONDS);

    const orbClass =
      isBreathing && running
        ? breathPhase === "inspire"
          ? "breathing-orb breathing-orb--in"
          : "breathing-orb breathing-orb--out"
        : "breathing-orb breathing-orb--static";

    const currentImage =
      finished
        ? kleoHappy
        : isBreathing && running && breathPhase === "expire"
          ? kleoCalm
          : selectedTimer.image;

    const text =
      isBreathing
        ? running
          ? breathPhase === "inspire"
            ? `Inspire ${breathCount}`
            : `Expire ${breathCount}`
          : selectedTimer.label
        : selectedTimer.label;

    return (
      <div className="chrono-page">
        <button
          type="button"
          className="secondary-button"
          onClick={() => {
            bpmAudio.pause();
            bpmAudio.currentTime = 0;
            setSelectedTimer(null);
          }}
        >
          ← Retour
        </button>

        <h1>{selectedTimer.title}</h1>

        <div className={orbClass}>
          <img
            src={currentImage}
            alt="Kléo"
            className="kleo_breathing"
          />
        </div>

        <p className="breathing-text">
          {text}
        </p>

        <strong className="chrono-time">
          {Math.floor(remaining / 60)}:
          {String(remaining % 60).padStart(2, "0")}
        </strong>

        <progress
          value={progress}
          max={selectedTimer.duration}
        />

        {"stages" in selectedTimer && selectedTimer.stages && (
          <section className="chrono-circuit-card">
            <h2>Déroulé du circuit</h2>

            {selectedTimer.stages.map((stage) => (
              <article key={stage.title} className="chrono-circuit-step">
                <div>
                  <strong>{stage.title}</strong>
                  <span>{stage.duration}</span>
                </div>

                <ul>
                  {stage.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        )}

        <div className="routine-player__actions">
          <button
            type="button"
            className="primary-button"
            onClick={startOrPause}
          >
            {running ? "Pause" : "Démarrer"}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={resetTimer}
          >
            Réinitialiser
          </button>
        </div>

        {finished && (
          <div className="timer-alert-backdrop">
            <div className="timer-alert">
              <h2>🎉 Chrono terminé</h2>

              <p>
                Bravo. Tu as pris ce temps pour toi.
              </p>

              <p>✨ +1 Point Refuge</p>

              <button
                type="button"
                className="primary-button"
                onClick={() => setSelectedTimer(null)}
              >
                Retour aux chronos
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="chrono-page">
      <header className="page-header">
        <h1>Chronos</h1>
        <p>Choisis un temps guidé.</p>
      </header>

      <div className="suivi-grid">
        {timers.map((timer) => (
          <button
            key={timer.id}
            type="button"
            className="suivi-category"
            onClick={() => setSelectedTimer(timer)}
          >
            <span>
              {timer.icon} {timer.title}
            </span>

            <small>
              ⏱ {Math.round(timer.duration / 60)} min
            </small>
          </button>
        ))}
      </div>
    </div>
  );
}
