import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBadges } from "./refugeBadges";
import { getRefugeStats } from "./refugeStats";
import { refugeSteps } from "./refugeChapters";
import { islandMap } from "./islandMap";

export function ForestPage() {
  const navigate = useNavigate();
  const stats = getRefugeStats();
  const [openSheet, setOpenSheet] = useState<
    "bronto" | "badges" | "island" | null
  >(null);

  const forestSteps = refugeSteps.filter((step) =>
    step.id.startsWith("forest-")
  );

  const currentStep =
    forestSteps
      .filter((step) => stats.refugePoints >= step.requiredFiches)
      .at(-1) ?? forestSteps[0];

  const currentStepIndex = forestSteps.findIndex(
    (step) => step.id === currentStep.id
  );

  const nextStep = forestSteps.find(
    (step) => step.requiredFiches > stats.refugePoints
  );

  const forestUnlocked = stats.refugePoints >= 250;
  const grimoireUnlocked = stats.refugePoints >= 440;
  const badges = getBadges();
  const unlockedCount = badges.filter((badge) => badge.unlocked).length;

  const swampUnlocked = stats.refugePoints >= 440;
  const mountainUnlocked = stats.refugePoints >= 600;
  const beachUnlocked = stats.refugePoints >= 750;
  const oceanUnlocked = stats.refugePoints >= 900;

  const forestProgress = Math.min(
    Math.round((stats.refugePoints / 250) * 100),
    100
  );
  const swampProgress = Math.min(
    Math.round((stats.refugePoints / 440) * 100),
    100
  );
  const mountainProgress = Math.min(
    Math.round((stats.refugePoints / 600) * 100),
    100
  );
  const beachProgress = Math.min(
    Math.round((stats.refugePoints / 750) * 100),
    100
  );
  const oceanProgress = Math.min(
    Math.round((stats.refugePoints / 900) * 100),
    100
  );

  return (
    <div className="refuge-page refuge-page--fullscreen">
      <div className="refuge-hero">
        {currentStep.image && (
          <img
            src={currentStep.image}
            alt="Forêt du refuge"
            className="refuge-hero__image"
          />
        )}

        <h1 className="refuge-hero__title">Forêt</h1>

        {grimoireUnlocked && (
          <button
            type="button"
            className="grimoire-button"
            onClick={() => navigate("/refuge/grimoire/forest")}
          >
            📖
          </button>
        )}

        <div className="refuge-story">
          <small>
            Monde Forêt · Chapitre {currentStepIndex + 1}
            {" / "}
            {forestSteps.length}
          </small>

          <strong>
            {forestUnlocked
              ? currentStep.title
              : "La forêt est encore lointaine"}
          </strong>

          <span>
            {forestUnlocked
              ? currentStep.description
              : "Termine la Prairie pour ouvrir ce nouveau monde."}
          </span>

          {nextStep && forestUnlocked && (
            <p className="refuge-next">
              Prochain chapitre dans{" "}
              {nextStep.requiredFiches - stats.refugePoints} point(s).
            </p>
          )}
        </div>

        <div className="refuge-actions">
          <button
            type="button"
            onClick={() => setOpenSheet("bronto")}
          >
            🦖 Para
          </button>

          <button
            type="button"
            onClick={() => setOpenSheet("badges")}
          >
            🏅 Badges
          </button>

          <button
            type="button"
            onClick={() => setOpenSheet("island")}
          >
            🗺 Île
          </button>
        </div>
      </div>

      {openSheet && (
        <div className="refuge-sheet">
          <button
            type="button"
            className="refuge-sheet__close"
            onClick={() => setOpenSheet(null)}
          >
            ×
          </button>

          {openSheet === "bronto" && (
            <>
              <h2>Bronto</h2>

              <p>✨ Points Refuge : {stats.refugePoints}</p>
              <p>🦕 Forme actuelle : {stats.stade}</p>
              <p>🧬 Espèce : {stats.species}</p>
              <p>🏝 Zone actuelle : Forêt</p>

              <div className="refuge-points-breakdown">
                <p>📝 Suivi : {stats.suiviPoints}</p>
                <p>🔄 Routines : {stats.routinePoints}</p>
                <p>✅ Routines terminées : {stats.completedRoutines}</p>
                <p>⏱ Chronos : {stats.chronoPoints}</p>
              </div>
            </>
          )}

          {openSheet === "badges" && (
            <>
              <h2>Badges</h2>

              <p>
                🏅 {unlockedCount} / {badges.length} badges débloqués
              </p>

              {badges.map((badge) => (
                <p key={badge.id}>
                  {badge.unlocked ? "✅" : "🔒"} {badge.icon} {badge.label}
                </p>
              ))}
            </>
          )}

          {openSheet === "island" && (
            <>
              <h2>Explorer l'île</h2>

              <p className="next-goal">
                Prochain objectif :{" "}
                {Math.max(0, 440 - stats.refugePoints)} point(s) avant le
                Marécage 🐸
              </p>

              <p>✅ 🌱 Prairie</p>
              <p>✅ 🌲 Forêt</p>

              <img
                src={islandMap}
                alt="Carte de l'île du refuge"
                className="island-map"
              />

              <button
                type="button"
                className="island-location"
                onClick={() => navigate("/refuge")}
              >
                🌱 Prairie
              </button>

              <button
                type="button"
                className="island-location"
              >
                🌲 Forêt — {forestProgress}%
              </button>

              <button
                type="button"
                className="island-location"
                disabled={!swampUnlocked}
                onClick={() => {
                  if (swampUnlocked) {
                    navigate("/refuge/swamp");
                  }
                }}
              >
                {swampUnlocked ? "🐸" : "🔒"} Marécage — {swampProgress}%
              </button>

              <button
                type="button"
                className="island-location"
                disabled={!mountainUnlocked}
                onClick={() => {
                  if (mountainUnlocked) {
                    navigate("/refuge/mountain");
                  }
                }}
              >
                {mountainUnlocked ? "⛰" : "🔒"} Montagne — {mountainProgress}%
              </button>

              <button
                type="button"
                className="island-location"
                disabled={!beachUnlocked}
                onClick={() => {
                  if (beachUnlocked) {
                    navigate("/refuge/beach");
                  }
                }}
              >
                {beachUnlocked ? "🏖" : "🔒"} Plage — {beachProgress}%
              </button>

              <button
                type="button"
                className="island-location"
                disabled={!oceanUnlocked}
                onClick={() => {
                  if (oceanUnlocked) {
                    navigate("/refuge/ocean");
                  }
                }}
              >
                {oceanUnlocked ? "🌊" : "🔒"} Océan — {oceanProgress}%
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
