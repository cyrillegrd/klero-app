import { useEffect, useRef, useState } from "react";

import type { Circuit } from "./types";
import {
  saveRoutineSession,
  type RoutineSession,
} from "./sessionStorage";
import { toggleFavorite, isFavorite } from "./favoritesStorage";
import {
  loadShoppingList,
  saveShoppingList,
} from "./shoppingListStorage";
import { saveRoutineEntry } from "./storage";

function createId() {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

type CircuitPlayerProps = {
  circuit: Circuit;
  initialSession?: RoutineSession;
  onExit: () => void;
  onComplete: () => void;
};



export function CircuitPlayer({
  circuit,
  initialSession,
  onExit,
  onComplete,
}: CircuitPlayerProps) {
  const [session, setSession] = useState<RoutineSession>(
    initialSession ?? {
      id: createId(),
      circuitId: circuit.id,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentStepIndex: 0,
      completedSteps: [],
      responses: {},
      status: "active",
    }
  );

  const [favorite, setFavorite] = useState(
    isFavorite(circuit.id)
  );

  const [response, setResponse] = useState<unknown>(
    session.responses[session.currentStepIndex] ?? null
  );

  const [textInput, setTextInput] = useState("");
  const [shoppingInput, setShoppingInput] = useState("");
  const [shoppingItems, setShoppingItems] = useState(
    loadShoppingList()
  );

  const [timerRemaining, setTimerRemaining] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const step =
    circuit.steps[session.currentStepIndex] ??
    circuit.steps[circuit.steps.length - 1];

    const [routineCompleted, setRoutineCompleted] =
  useState(false);

  const isLastStep =
    session.currentStepIndex >= circuit.steps.length - 1;

  const meals = Array.isArray(session.responses[0])
    ? session.responses[0]
    : [];

  const isShoppingCreate =
    step.type === "shopping-list" &&
    step.mode === "create";

  const isShoppingCheck =
    step.type === "shopping-list" &&
    step.mode === "check";

  function stopTimerSound() {
    audioRef.current?.pause();

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }

    audioRef.current = null;
  }

  function playTimerSound() {
    stopTimerSound();

    const audio = new Audio("/sounds/soft-bell.mp3");
    audio.volume = 0.35;
    audio.loop = true;

    audioRef.current = audio;
    audio.play().catch(() => {});
  }

  function updateSession(nextSession: RoutineSession) {
    setSession(nextSession);
    saveRoutineSession(nextSession);
  }

  function saveCurrentResponse() {
    return {
      ...session.responses,
      [session.currentStepIndex]: response,
    };
  }

  function playSuccessSound() {
  const audio = new Audio("/sounds/success.mp3");

  audio.volume = 0.35;
  audio.play().catch(() => {});
}

  function completeStep() {
    stopTimerSound();

    let nextResponses = saveCurrentResponse();

    if (isShoppingCheck) {
      const finalShoppingList = shoppingItems.filter(
        (item) => !item.checked
      );

      saveShoppingList(finalShoppingList);
      setShoppingItems(finalShoppingList);
    }

    const nextCompletedSteps = [
      ...new Set([
        ...session.completedSteps,
        session.currentStepIndex,
      ]),
    ];

    if (isLastStep) {
      updateSession({
        ...session,
        completedSteps: nextCompletedSteps,
        responses: nextResponses,
        status: "completed",
        updatedAt: new Date().toISOString(),
      });

saveRoutineEntry({
  id: createId(),
  date: new Date().toISOString(),
  routineId: circuit.id,
});

playSuccessSound();

setRoutineCompleted(true);
return;
    }

    updateSession({
      ...session,
      completedSteps: nextCompletedSteps,
      responses: nextResponses,
      currentStepIndex: session.currentStepIndex + 1,
      updatedAt: new Date().toISOString(),
    });
  }

  function pauseRoutine() {
    stopTimerSound();

    updateSession({
      ...session,
      responses: saveCurrentResponse(),
      status: "paused",
      updatedAt: new Date().toISOString(),
    });

    onExit();
  }

  function addTextItem() {
    if (!textInput.trim()) return;

    const currentList = Array.isArray(response)
      ? response
      : [];

    setResponse([...currentList, textInput.trim()]);
    setTextInput("");
  }

  function addShoppingItem() {
    if (!shoppingInput.trim()) return;

    const nextItems = [
      ...shoppingItems,
        {
  id: createId(),
  label: shoppingInput.trim(),
  checked: false,
}
    ];

    setShoppingItems(nextItems);
    saveShoppingList(nextItems);
    setShoppingInput("");
  }

  function toggleShoppingItem(
    itemId: string,
    checked: boolean
  ) {
    const nextItems = shoppingItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            checked,
          }
        : item
    );

    setShoppingItems(nextItems);
    saveShoppingList(nextItems);
  }

  useEffect(() => {
    setResponse(
      session.responses[session.currentStepIndex] ?? null
    );
  }, [session.currentStepIndex, session.responses]);

  useEffect(() => {
    if (step.type === "timer") {
      setTimerRemaining(step.duration);
    } else {
      setTimerRemaining(0);
    }

    setTimerRunning(false);
    setTimerFinished(false);
    stopTimerSound();
  }, [step]);

  useEffect(() => {
    if (
      step.type !== "timer" ||
      !timerRunning ||
      timerRemaining <= 0
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setTimerRemaining((previous) =>
        Math.max(previous - 1, 0)
      );
    }, 1000);

    return () => window.clearInterval(interval);
  }, [step, timerRunning, timerRemaining]);

  useEffect(() => {
    if (
      step.type === "timer" &&
      timerRunning &&
      timerRemaining === 0
    ) {
      setTimerRunning(false);
      setTimerFinished(true);
      playTimerSound();
    }
  }, [step, timerRunning, timerRemaining]);

  useEffect(() => {
    return () => {
      stopTimerSound();
    };
  }, []);

  return (
    <div className="routine-player">
      <header className="routine-player__header">
        <button type="button" onClick={pauseRoutine}>
          ←
        </button>

        <h1>{circuit.title}</h1>

        <strong>
          {Math.min(
            session.currentStepIndex + 1,
            circuit.steps.length
          )}{" "}
          / {circuit.steps.length}
        </strong>
      </header>

      <progress
        value={Math.min(
          session.currentStepIndex + 1,
          circuit.steps.length
        )}
        max={circuit.steps.length}
      />

      <div className="card">
        <h2>{step.title}</h2>

        <button
          type="button"
          className="favorite-button"
          onClick={() => {
            toggleFavorite(circuit.id);
            setFavorite(!favorite);
          }}
        >
          {favorite
            ? "⭐ Retirer des favoris"
            : "☆ Ajouter aux favoris"}
        </button>

        {step.description && <p>{step.description}</p>}

        {step.type === "single-choice" && (
          <div className="routine-options">
            {step.options.map((option) => (
              <button
                key={option}
                type="button"
                className={
                  response === option
                    ? "routine-option routine-option--selected"
                    : "routine-option"
                }
                onClick={() => setResponse(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {step.type === "checkbox" && (
          <label>
            <input
              type="checkbox"
              checked={Boolean(response)}
              onChange={(event) =>
                setResponse(event.target.checked)
              }
            />{" "}
            Fait
          </label>
        )}

        {step.type === "todo-list" && (
          <div>
            {step.items.map((item) => {
              const checkedItems = Array.isArray(response)
                ? response
                : [];

              const isChecked =
                checkedItems.includes(item);

              return (
                <label key={item}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setResponse([
                          ...checkedItems,
                          item,
                        ]);
                      } else {
                        setResponse(
                          checkedItems.filter(
                            (value) => value !== item
                          )
                        );
                      }
                    }}
                  />{" "}
                  {item}
                </label>
              );
            })}
          </div>
        )}

        {step.type === "text-list" && (
          <div className="routine-text-list">
            <input
              value={textInput}
              placeholder="Écris ici..."
              onChange={(event) =>
                setTextInput(event.target.value)
              }
            />

            <button
              type="button"
              className="secondary-button"
              onClick={addTextItem}
            >
              Ajouter
            </button>

            {Array.isArray(response) &&
              response.map((item) => (
                <p key={String(item)}>• {String(item)}</p>
              ))}
          </div>
        )}

        {step.type === "shopping-list" && (
          <div className="routine-text-list">
            {meals.length > 0 && (
              <div className="routine-context-box">
                <strong>Repas notés :</strong>

                {meals.map((meal) => (
                  <p key={String(meal)}>
                    • {String(meal)}
                  </p>
                ))}
              </div>
            )}

            {isShoppingCreate && (
              <>
                <input
                  value={shoppingInput}
                  placeholder="Ingrédient..."
                  onChange={(event) =>
                    setShoppingInput(event.target.value)
                  }
                />

                <button
                  type="button"
                  className="secondary-button"
                  onClick={addShoppingItem}
                >
                  Ajouter
                </button>
              </>
            )}

            {isShoppingCheck && (
              <p>
                Coche ce que tu as déjà chez toi.
                Ce qui reste décoché sera ta liste de courses.
              </p>
            )}

            {shoppingItems.map((item) => (
              <label key={item.id}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  disabled={isShoppingCreate}
                  onChange={(event) =>
                    toggleShoppingItem(
                      item.id,
                      event.target.checked
                    )
                  }
                />{" "}
                {item.label}
              </label>
            ))}
          </div>
        )}

        {step.type === "timer" && (
          <div className="routine-timer">
            <strong>
              ⏱ {timerRemaining} seconde(s)
            </strong>

            <progress
              value={step.duration - timerRemaining}
              max={step.duration}
            />

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                setTimerRunning((running) => !running)
              }
            >
              {timerRunning ? "Pause" : "Démarrer"}
            </button>
          </div>
        )}

        <div className="routine-player__actions">
          <button
            type="button"
            className="primary-button"
            onClick={completeStep}
          >
            {isLastStep ? "Terminer" : "Continuer"}
          </button>

<button
  type="button"
  className="secondary-button"
  onClick={completeStep}
>
  C’est trop difficile, passer cette étape
</button>

          <button
            type="button"
            className="secondary-button"
            onClick={pauseRoutine}
          >
            Mettre en pause
          </button>
        </div>
      </div>

      {timerFinished && step.type === "timer" && (
        <div className="timer-alert-backdrop">
          <div className="timer-alert">
            <h2>⏱ Temps écoulé</h2>

            <p>
              Tu peux recommencer ou arrêter la sonnerie.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={() => {
                stopTimerSound();
                setTimerRemaining(step.duration);
                setTimerFinished(false);
                setTimerRunning(false);
              }}
            >
              Recommencer
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                stopTimerSound();
                setTimerFinished(false);
                completeStep();
              }}
            >
              Arrêter
            </button>
          </div>
        </div>
      )}

      {routineCompleted && (
  <div className="timer-alert-backdrop">
    <div className="timer-alert">
      <h2>🎉 Routine terminée</h2>

      <p>
        Bravo. Tu as avancé à ton rythme.
      </p>

      <p>
        ✨ +3 Points Refuge
      </p>

      <button
        type="button"
        className="primary-button"
        onClick={onComplete}
      >
        Retour aux routines
      </button>
    </div>
  </div>
)}

    </div>
  );
}