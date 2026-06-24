import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/auth";
import { saveCloudProfile } from "../profile/profileCloud";

const goalOptions = [
  { id: "mental_load", label: "Gerer ma surcharge mentale" },
  { id: "start_task", label: "Commencer une tache" },
  { id: "organize", label: "M'organiser" },
  { id: "prioritize", label: "Prioriser" },
  { id: "routine", label: "Garder une routine" },
  { id: "needs", label: "Penser a mes besoins" },
  { id: "energy", label: "Gerer mon energie" },
  { id: "guilt", label: "Gerer ma culpabilite" },
  { id: "flows", label: "Reguler mes flux" },
  { id: "transitions", label: "Gerer les transitions" },
  { id: "frustration", label: "Gerer la frustration" },
  { id: "peers", label: "Echanger avec mes pairs" },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const existingName =
    localStorage.getItem("klero_name") ??
    auth.currentUser?.displayName?.split(" ")[0] ??
    "";

  const [step, setStep] = useState<"intro" | "name" | "needs">("intro");
  const [name, setName] = useState(existingName);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("klero_goals") ?? "[]")
  );
  const [hasTnd, setHasTnd] = useState(
    localStorage.getItem("klero_has_tnd") ?? ""
  );

  function goAfterIntro() {
    if (name.trim()) {
      setStep("needs");
      return;
    }

    setStep("name");
  }

  function toggleGoal(goalId: string) {
    setSelectedGoals((currentGoals) =>
      currentGoals.includes(goalId)
        ? currentGoals.filter((id) => id !== goalId)
        : [...currentGoals, goalId]
    );
  }

  async function finishOnboarding() {
    const cleanName = name.trim();

    if (!cleanName) {
      setStep("name");
      return;
    }

    localStorage.setItem("klero_name", cleanName);
    localStorage.setItem("klero_goals", JSON.stringify(selectedGoals));
    localStorage.setItem("klero_has_tnd", hasTnd);
    localStorage.setItem("klero_onboarding_done", "true");

    await saveCloudProfile({
      firstName: cleanName,
      goals: selectedGoals,
      hasTnd,
      onboardingDone: true,
    });

    navigate("/");
  }

  if (step === "intro") {
    return (
      <div className="onboarding-page onboarding-page--intro">
        <div className="onboarding-hero" />

        <button
          type="button"
          className="primary-button onboarding-button"
          onClick={goAfterIntro}
        >
          Commencer
        </button>
      </div>
    );
  }

  if (step === "name") {
    return (
      <div className="onboarding-page">
        <section className="onboarding-card">
          <h1>Bienvenue dans Klero</h1>

          <p>Comment souhaites-tu etre appele ?</p>

          <input
            value={name}
            placeholder="Ton prenom"
            onChange={(event) => setName(event.target.value)}
          />

          <button
            type="button"
            className="primary-button"
            onClick={() => {
              if (name.trim()) {
                setStep("needs");
              }
            }}
          >
            Continuer
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="onboarding-page">
      <section className="onboarding-card onboarding-card--wide">
        <h1>Qu'est-ce que tu viens chercher ici ?</h1>

        <p>
          Tu peux choisir plusieurs reponses. Klero s'en servira pour mieux
          t'accompagner.
        </p>

        <div className="onboarding-choice-grid">
          {goalOptions.map((goal) => (
            <button
              key={goal.id}
              type="button"
              className={
                selectedGoals.includes(goal.id)
                  ? "onboarding-choice onboarding-choice--selected"
                  : "onboarding-choice"
              }
              onClick={() => toggleGoal(goal.id)}
            >
              {goal.label}
            </button>
          ))}
        </div>

        <label className="onboarding-field">
          Est-ce qu'il y a un TND ?
          <select
            value={hasTnd}
            onChange={(event) => setHasTnd(event.target.value)}
          >
            <option value="">Je ne sais pas / je prefere ne pas dire</option>
            <option value="yes">Oui</option>
            <option value="no">Non</option>
            <option value="suspected">Peut-etre / en cours de questionnement</option>
          </select>
        </label>

        <button
          type="button"
          className="primary-button"
          onClick={finishOnboarding}
        >
          Entrer dans Klero
        </button>
      </section>
    </div>
  );
}
