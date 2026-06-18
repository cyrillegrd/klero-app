import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { circuits } from "./circuits";
import { CircuitPlayer } from "./CircuitPlayer";
import {
  getPausedSession,
  saveRoutineSession,
} from "./sessionStorage";

import type { Circuit } from "./types";

export function RoutinesPage() {
  const [selectedCircuit, setSelectedCircuit] =
    useState<Circuit | null>(null);

    const [selectedEnergy, setSelectedEnergy] =
  useState<"low" | "medium" | "high" | null>(
    null
  );

  const pausedSession = selectedCircuit
    ? getPausedSession(selectedCircuit.id)
    : undefined;

    const visibleCircuits = selectedEnergy
  ? circuits.filter(
      (circuit) =>
        circuit.energy === selectedEnergy
    )
  : [];

  const pausedCircuits = circuits.filter(
  (circuit) => getPausedSession(circuit.id)
);

  const tndCircuits = visibleCircuits.filter(
  (circuit) => circuit.category === "tnd"
);

const dailyCircuits = visibleCircuits.filter(
  (circuit) => circuit.category === "daily"
);

const navigate = useNavigate();

  if (selectedCircuit) {
    return (
      <CircuitPlayer
        circuit={selectedCircuit}
        initialSession={pausedSession}
        onExit={() => setSelectedCircuit(null)}
        onComplete={() => {
          setSelectedCircuit(null);
        }}
      />
    );
  }

  

  return (
    <div className="suivi-page">
      <header className="page-header">
        <h1>Routines</h1>

        {pausedCircuits.length > 0 && (
  <>
    <h2 className="routine-section-title">
      ▶ À reprendre
    </h2>

    {pausedCircuits.map((circuit) => {
      const paused = getPausedSession(circuit.id);

      return (
        <button
          key={circuit.id}
          type="button"
          className="suivi-category suivi-category--active"
          onClick={() => setSelectedCircuit(circuit)}
        >
          <span>{circuit.title}</span>
          <small>
  {paused
    ? `Reprendre à l'étape ${
        paused.currentStepIndex + 1
      }`
    : `⏱ ${circuit.duration} min • ${
        circuit.energy === "low"
          ? "🟥 Faible énergie"
          : circuit.energy === "medium"
          ? "🟨 Énergie moyenne"
          : "🟩 Bonne énergie"
      }`}
</small>
        </button>
      );
    })}
  </>
)}

<button
  type="button"
  className="history-button"
  onClick={() => navigate("/routines/history")}
>
  📜 Historique
</button>
        <p>Choisis un circuit guidé.</p>
      </header>

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
  <span>Moyenne</span>
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
  <span>Bonne</span>
</button>

  {!selectedEnergy && (
  <div className="card">
    <p>
      Comment te sens-tu aujourd'hui ?
    </p>
  </div>
)}
</div>

      {tndCircuits.length > 0 && (
  <>
    <h2 className="routine-section-title">
      🧠 Soutien TND
    </h2>

    {tndCircuits.map((circuit) => {
      const paused = getPausedSession(circuit.id);

      return (
        <button
          key={circuit.id}
          type="button"
          className="suivi-category"
          onClick={() => {
            if (!paused) {
              saveRoutineSession({
                id: crypto.randomUUID(),
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
          }}
        >
          <span>{circuit.title}</span>
          <small>
  {paused
    ? `Reprendre à l'étape ${
        paused.currentStepIndex + 1
      }`
    : `⏱ ${circuit.duration} min • ${
        circuit.energy === "low"
          ? "🟥 Faible énergie"
          : circuit.energy === "medium"
          ? "🟨 Énergie moyenne"
          : "🟩 Bonne énergie"
      }`}
</small>
        </button>
      );
    })}
  </>
)}

{dailyCircuits.length > 0 && (
  <>
    <h2 className="routine-section-title">
      🏠 Vie quotidienne
    </h2>

    {dailyCircuits.map((circuit) => {
      const paused = getPausedSession(circuit.id);

      return (
        <button
          key={circuit.id}
          type="button"
          className="suivi-category"
          onClick={() => {
            if (!paused) {
              saveRoutineSession({
                id: crypto.randomUUID(),
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
          }}
        >
          <span>{circuit.title}</span>
          <small>
  {paused
    ? `Reprendre à l'étape ${
        paused.currentStepIndex + 1
      }`
    : `⏱ ${circuit.duration} min • ${
        circuit.energy === "low"
          ? "🟥 Faible énergie"
          : circuit.energy === "medium"
          ? "🟨 Énergie moyenne"
          : "🟩 Bonne énergie"
      }`}
</small>
        </button>
      );
    })}
  </>
)}
    </div>
    
  );
}