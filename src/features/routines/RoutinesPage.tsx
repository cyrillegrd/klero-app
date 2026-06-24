import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { circuits } from "./circuits";
import { CircuitPlayer } from "./CircuitPlayer";
import {
  getPausedSession,
  saveRoutineSession,
} from "./sessionStorage";
import { loadFavorites } from "./favoritesStorage";

import type { Circuit } from "./types";

export function RoutinesPage() {
  const navigate = useNavigate();

  const [selectedCircuit, setSelectedCircuit] =
    useState<Circuit | null>(null);

    const [emergencyMode, setEmergencyMode] =
  useState(false);

  const [selectedEnergy, setSelectedEnergy] =
    useState<"low" | "medium" | "high" | null>(null);

  const pausedSession = selectedCircuit
    ? getPausedSession(selectedCircuit.id)
    : undefined;

  const emotionalFirstAidCircuit = circuits.find(
    (circuit) => circuit.id === "emotional-first-aid"
  );

  const pausedCircuits = circuits.filter((circuit) =>
    getPausedSession(circuit.id)
  );

  const favoriteCircuitIds = loadFavorites();
  const essentialCircuitIds = new Set([
    "wake-up",
    "before-sleep",
    ...favoriteCircuitIds,
  ]);

  const essentialCircuits = circuits.filter((circuit) =>
    essentialCircuitIds.has(circuit.id)
  );

    const visibleCircuits = selectedEnergy
  ? circuits.filter(
      (circuit) =>
        circuit.energy === selectedEnergy &&
        !essentialCircuitIds.has(circuit.id) &&
        ![
          "wake-up",
          "before-sleep",
          "muscle-release",
          "red-marker",
          "object-observation",
          "cold-object",
          "cold-water",
        ].includes(circuit.id)
    )
  : [];

  const tndCircuits = visibleCircuits.filter(
    (circuit) => circuit.category === "tnd"
  );

  

  const dailyCircuits = visibleCircuits.filter(
    (circuit) => circuit.category === "daily"
  );

  

  const emergencyCircuits = circuits.filter((circuit) =>
  [
    "muscle-release",
    "red-marker",
    "object-observation",
    "cold-object",
    "cold-water",
    "delay-checking",
    "tolerate-uncertainty",
    "thanks-brain",
    "urge-wave",
    "stop-rumination",
  ].includes(circuit.id)
);

  function startCircuit(circuit: Circuit) {
    const paused = getPausedSession(circuit.id);

    function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

    if (!paused) {
      saveRoutineSession({
        id: createId(),
        circuitId: circuit.id,
        startedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        currentStepIndex: 0,
        completedSteps: [],
        responses: {},
        status: "active",
      });
    }

    setSelectedCircuit(circuit);
  }

  function getEnergyLabel(circuit: Circuit) {
    if (circuit.energy === "low") {
      return "🟥 Faible énergie";
    }

    if (circuit.energy === "medium") {
      return "🟨 Énergie moyenne";
    }

    return "🟩 Bonne énergie";
  }

  function getCircuitSubtitle(circuit: Circuit) {
    const paused = getPausedSession(circuit.id);

    if (paused) {
      return `Reprendre à l'étape ${
        paused.currentStepIndex + 1
      }`;
    }

    return `⏱ ${circuit.duration} min • ${getEnergyLabel(
      circuit
    )}`;
  }

  if (selectedCircuit) {
    return (
      <CircuitPlayer
        circuit={selectedCircuit}
        initialSession={pausedSession}
        onExit={() => setSelectedCircuit(null)}
        onComplete={() => setSelectedCircuit(null)}
      />
    );
  }

if (emergencyMode) {
  return (
    <div className="suivi-page">
      <header className="page-header">
        <button
          type="button"
          className="secondary-button"
          onClick={() => setEmergencyMode(false)}
        >
          ← Retour
        </button>

        <h1>
          🛡️ Premiers secours émotionnels
        </h1>

        <p>
          Choisis l'aide qui te semble la plus
          accessible maintenant.
        </p>
      </header>

      {emergencyCircuits.map((circuit) => (
        <button
          key={circuit.id}
          type="button"
          className="suivi-category"
          onClick={() => startCircuit(circuit)}
        >
          <span>{circuit.title}</span>

          <small>
            {circuit.description}
          </small>
        </button>
      ))}
    </div>
  );
}

  return (
    <div className="suivi-page">
      <header className="page-header">
        <div className="routine-header-row">
          <h1>Routines</h1>

          <button
            type="button"
            className="history-button"
            onClick={() => navigate("/routines/history")}
          >
            📜 Historique
          </button>
        </div>

        <p>Choisis un circuit guidé.</p>
      </header>

      {emotionalFirstAidCircuit && (
        <button
  type="button"
  className="emergency-button"
  onClick={() => setEmergencyMode(true)}
>
  🛡️ J'ai besoin d'aide maintenant
</button>


      )}

      {essentialCircuits.length > 0 && (
  <>
    <h2 className="routine-section-title">
      ⭐ Routines essentielles
    </h2>

    {essentialCircuits.map((circuit) => (
      <button
        key={circuit.id}
        type="button"
        className="suivi-category suivi-category--active"
        onClick={() => startCircuit(circuit)}
      >
        <span>{circuit.title}</span>
        <small>{getCircuitSubtitle(circuit)}</small>
      </button>
    ))}
  </>
)}

      {pausedCircuits.length > 0 && (
        <>
          <h2 className="routine-section-title">
            ▶ À reprendre
          </h2>

          {pausedCircuits.map((circuit) => (
            <button
              key={circuit.id}
              type="button"
              className="suivi-category suivi-category--active"
              onClick={() => startCircuit(circuit)}
            >
              <span>{circuit.title}</span>
              <small>{getCircuitSubtitle(circuit)}</small>
            </button>
          ))}
        </>
      )}

{!selectedEnergy && (
        <div className="card routine-energy-question">
          <p>Comment te sens-tu aujourd'hui ?</p>
        </div>
      )}

      <div className="energy-selector">
        
        <button
          type="button"
          className={
            selectedEnergy === "low"
              ? "energy-button energy-button--active"
              : "energy-button"
          }
          onClick={() => setSelectedEnergy("low")}
        >
          <span>🟥</span>
          <span>Faible</span>
        </button>

        <button
          type="button"
          className={
            selectedEnergy === "medium"
              ? "energy-button energy-button--active"
              : "energy-button"
          }
          onClick={() => setSelectedEnergy("medium")}
        >
          <span>🟨</span>
          <span>Moyen</span>
        </button>

        <button
          type="button"
          className={
            selectedEnergy === "high"
              ? "energy-button energy-button--active"
              : "energy-button"
          }
          onClick={() => setSelectedEnergy("high")}
        >
          <span>🟩</span>
          <span>Bien</span>
        </button>
      </div>

      

      {tndCircuits.length > 0 && (
        <>
          <h2 className="routine-section-title">
            🧠 Soutien TND
          </h2>

          {tndCircuits.map((circuit) => (
            <button
              key={circuit.id}
              type="button"
              className="suivi-category"
              onClick={() => startCircuit(circuit)}
            >
              <span>{circuit.title}</span>
              <small>{getCircuitSubtitle(circuit)}</small>
            </button>
          ))}
        </>
      )}

      {dailyCircuits.length > 0 && (
        <>
          <h2 className="routine-section-title">
            🏠 Vie quotidienne
          </h2>

          {dailyCircuits.map((circuit) => (
            <button
              key={circuit.id}
              type="button"
              className="suivi-category"
              onClick={() => startCircuit(circuit)}
            >
              <span>{circuit.title}</span>
              <small>{getCircuitSubtitle(circuit)}</small>
            </button>
          ))}
        </>
      )}
    </div>
  );
}
