import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRefugeStats } from "./refugeStats";
import { getBadges } from "./refugeBadges";
import { prairieStages } from "./prairieStages";
import { islandMap } from "./islandMap";
import { refugeSteps } from "./refugeChapters";

import { saveCloudRefuge } from "./refugeCloud";


export function RefugePage() {
  const navigate = useNavigate();

 

  const [openSheet, setOpenSheet] = useState<
    "bronto" | "badges" | "island" | null
  >(null);

  const stats = getRefugeStats();

  const currentStep = refugeSteps
    .filter(
      (step) =>
        stats.refugePoints >= step.requiredFiches
    )
    .at(-1);

  const currentStepIndex = refugeSteps.findIndex(
    (step) => step.id === currentStep?.id
  );

  

  const nextStep = refugeSteps.find(
    (step) =>
      step.requiredFiches > stats.refugePoints
  );

  const badges = getBadges();

  const unlockedCount = badges.filter(
    (badge) => badge.unlocked
  ).length;

  const stage = Math.min(
    stats.refugePoints,
    prairieStages.length - 1
  );

  const currentImageStep = refugeSteps
    .filter(
      (step) =>
        stats.refugePoints >= step.requiredFiches &&
        step.image
    )
    .at(-1);

  const currentImage =
    currentImageStep?.image ?? prairieStages[stage];

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

  const forestUnlocked = stats.refugePoints >= 250;
  const swampUnlocked = stats.refugePoints >= 440;
  const mountainUnlocked = stats.refugePoints >= 600;
  const beachUnlocked = stats.refugePoints >= 750;
  const oceanUnlocked = stats.refugePoints >= 900;

  const currentZone =
    stats.refugePoints >= 900
      ? "Océan"
    : stats.refugePoints >= 750
      ? "Plage"
    : stats.refugePoints >= 600
      ? "Montagne"
    : stats.refugePoints >= 440
      ? "Marécage"
    : stats.refugePoints >= 250
      ? "Forêt"
      : "Prairie";

const grimoireUnlocked = stats.refugePoints >= 440;

  return (
    <div className="refuge-page refuge-page--fullscreen">
      <div className="refuge-hero">
        <img
          src={currentImage}
          alt="Prairie du refuge"
          className="refuge-hero__image"
        />

        <h1 className="refuge-hero__title">
          Refuge
        </h1>

        {grimoireUnlocked && (
  <button
    type="button"
    className="grimoire-button"
    onClick={() => navigate("/refuge/grimoire/prairie")}
  >
    📖
  </button>
)}

        {currentStep && (
          <div className="refuge-story">
            <small>
              Chapitre {currentStepIndex + 1}
              {" / "}
              {refugeSteps.length}
            </small>

            <strong>{currentStep.title}</strong>

            {currentStep.description && (
              <span>{currentStep.description}</span>
            )}

            {nextStep && (
              <p className="refuge-next">
                Prochain chapitre dans{" "}
                {nextStep.requiredFiches -
                  stats.refugePoints}{" "}
                point(s).
              </p>
            )}
          </div>
        )}

        <div className="refuge-actions">
          <button
            type="button"
            onClick={() => setOpenSheet("bronto")}
          >
            🦕 Bronto
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

          <button
  type="button"
  className="primary-button"
  onClick={saveCloudRefuge}
>
  Sauvegarder mon refuge
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

              <p>
                ✨ Points Refuge : {stats.refugePoints}
              </p>

              <div className="refuge-points-breakdown">
                <p>📝 Suivi : {stats.suiviPoints}</p>

                <p>🔄 Routines : {stats.routinePoints}</p>

                <p>
                  ✅ Routines terminées :{" "}
                  {stats.completedRoutines}
                </p>

                <p>⏱ Chronos : {stats.chronoPoints}</p>

                <p>
                  🔥 Bonus série :{" "}
                  {stats.refugePoints -
                    stats.suiviPoints -
                    stats.routinePoints -
                    stats.chronoPoints}
                </p>
              </div>

              <p>🦕 Forme actuelle : {stats.stade}</p>

              <p>🧬 Espèce : {stats.species}</p>

              {stats.refugePoints >= 150 && (
                <button
                  type="button"
                  className="secondary-button"
                >
                  🥚 Voir l'œuf
                </button>
              )}

              <p>🏝 Zone actuelle : {currentZone}</p>
            </>
          )}

          {openSheet === "badges" && (
            <>
              <h2>Badges</h2>

              <p>
                🏅 {unlockedCount} / {badges.length} badges
                débloqués
              </p>

              {badges.map((badge) => (
                <p key={badge.id}>
                  {badge.unlocked ? "✅" : "🔒"}{" "}
                  {badge.icon} {badge.label}
                </p>
              ))}
            </>
          )}

          {openSheet === "island" && (
            <>
              <h2>Explorer l’île</h2>

              {forestUnlocked && (
                <div className="unlock-message">
                  🎉 Nouvelle zone découverte !
                  <br />
                  🌲 La Forêt est maintenant accessible.
                </div>
              )}

              <p className="next-goal">
                Prochain objectif :{" "}
                {Math.max(
                  0,
                  440 - stats.refugePoints
                )}{" "}
                point(s) avant le Marécage 🐸
              </p>

              <p>✅ 🌱 Prairie</p>

              <img
                src={islandMap}
                alt="Carte de l’île du refuge"
                className="island-map"
              />

              <button
                type="button"
                className="island-location"
                disabled={!forestUnlocked}
                onClick={() => {
                  if (forestUnlocked) {
                    navigate("/refuge/forest");
                  }
                }}
              >
                {forestUnlocked ? "🌲" : "🔒"} Forêt —{" "}
                {forestProgress}%
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
                {swampUnlocked ? "🐸" : "🔒"} Marécage —{" "}
                {swampProgress}%
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
                {mountainUnlocked ? "⛰" : "🔒"} Montagne —{" "}
                {mountainProgress}%
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
                {beachUnlocked ? "🏖" : "🔒"} Plage —{" "}
                {beachProgress}%
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
                {oceanUnlocked ? "🌊" : "🔒"} Océan —{" "}
                {oceanProgress}%
              </button>

              
            </>
          )}
        </div>
      )}
    </div>
  );
}
