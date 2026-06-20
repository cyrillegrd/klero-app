import kleoBreathing from "../../assets/bronto/kleo_breathing.png";
import kleoHappy from "../../assets/bronto/bronto_happy.png";
import kleoCalm from "../../assets/bronto/bronto_calm.png";

import { useEffect, useState } from "react";


const timers = [
  {
    id: "breathing",
    title: "Respiration guidée",
    icon: "🫁",
    duration: 60,
    label: "Inspire... expire...",
  },
  {
    id: "calm",
    title: "Retour au calme",
    icon: "😌",
    duration: 180,
    label: "On ralentit doucement.",
  },
  {
    id: "energy",
    title: "Reprendre de l'énergie",
    icon: "⚡",
    duration: 120,
    label: "Une petite relance.",
  },
  {
    id: "focus",
    title: "Focus 5 min",
    icon: "🎯",
    duration: 300,
    label: "Une seule tâche.",
  },
];

export function ChronoPage() {
  const [selectedTimer, setSelectedTimer] =
    useState<(typeof timers)[number] | null>(null);

  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  const [breathPhase, setBreathPhase] =
  useState<"inspire" | "expire">("inspire");

const [breathCount, setBreathCount] = useState(4);

  useEffect(() => {
  if (!running || selectedTimer?.id !== "breathing") return;

  const interval = window.setInterval(() => {
    setBreathCount((count) => {
      if (count > 1) return count - 1;

      setBreathPhase((phase) =>
        phase === "inspire" ? "expire" : "inspire"
      );

      return 4;
    });
  }, 1000);

  return () => window.clearInterval(interval);
}, [running, selectedTimer]);

  useEffect(() => {
    if (!selectedTimer) return;

    setRemaining(selectedTimer.duration);
    setRunning(false);
    setFinished(false);
  }, [selectedTimer]);

  useEffect(() => {
    if (!running || remaining <= 0) return;

    const interval = window.setInterval(() => {
      setRemaining((previous) =>
        Math.max(previous - 1, 0)
      );
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running, remaining]);

  useEffect(() => {
    if (running && remaining === 0) {
      setRunning(false);
      setFinished(true);

      const audio = new Audio("/sounds/success.mp3");
      audio.volume = 0.35;
      audio.play().catch(() => {});
    }
  }, [running, remaining]);

  if (selectedTimer) {
    const progress =
      selectedTimer.duration === 0
        ? 0
        : selectedTimer.duration - remaining;

    return (
      <div className="chrono-page">
        <button
          type="button"
          className="secondary-button"
          onClick={() => setSelectedTimer(null)}
        >
          ← Retour
        </button>

        <h1>{selectedTimer.title}</h1>

        <div
  className={
    selectedTimer.id === "breathing" && running
      ? breathPhase === "inspire"
        ? "breathing-orb breathing-orb--in"
        : "breathing-orb breathing-orb--out"
      : running
      ? "breathing-orb breathing-orb--running"
      : "breathing-orb"
  }
>
  <img
  src={
    finished
      ? kleoHappy
      : breathPhase === "inspire"
      ? kleoBreathing
      : kleoCalm
  }
  alt="Kléo"
  className="kleo_breathing"
/>
</div>

        <p className="breathing-text">
  {selectedTimer.id === "breathing"
    ? breathPhase === "inspire"
      ? `Inspire ${breathCount}`
      : `Expire ${breathCount}`
    : selectedTimer.label}
</p>

        <strong className="chrono-time">
          {Math.floor(remaining / 60)}:
          {String(remaining % 60).padStart(2, "0")}
        </strong>

        <progress
          value={progress}
          max={selectedTimer.duration}
        />

        <div className="routine-player__actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              if (remaining === 0) {
                setRemaining(selectedTimer.duration);
                setFinished(false);
              }

              setRunning((value) => !value);
            }}
          >
            {running ? "Pause" : "Démarrer"}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              setRunning(false);
              setRemaining(selectedTimer.duration);
              setFinished(false);
            }}
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
                onClick={() => {
                  setSelectedTimer(null);
                }}
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