import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBadges } from "./refugeBadges";
import { getRefugeStats } from "./refugeStats";
import { refugeSteps } from "./refugeChapters";
import { islandMap } from "./islandMap";

export function SwampPage() {
  const navigate = useNavigate();
  const stats = getRefugeStats();
  const [openSheet, setOpenSheet] = useState<
    "para" | "badges" | "island" | null
  >(null);

  const swampSteps = refugeSteps.filter((step) =>
    step.id.startsWith("swamp-")
  );

  const currentStep =
    swampSteps
      .filter((step) => stats.refugePoints >= step.requiredFiches)
      .at(-1) ?? swampSteps[0];

  const currentStepIndex = swampSteps.findIndex(
    (step) => step.id === currentStep.id
  );

  const nextStep = swampSteps.find(
    (step) => step.requiredFiches > stats.refugePoints
  );

  const fallbackImageStep = refugeSteps
    .filter(
      (step) =>
        stats.refugePoints >= step.requiredFiches &&
        step.image
    )
    .at(-1);

  const currentImage = currentStep.image ?? fallbackImageStep?.image;

  const swampUnlocked = stats.refugePoints >= 440;
  const mountainUnlocked = stats.refugePoints >= 600;
  const beachUnlocked = stats.refugePoints >= 750;
  const oceanUnlocked = stats.refugePoints >= 900;

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

  const badges = getBadges();
  const unlockedCount = badges.filter((badge) => badge.unlocked).length;

  return (
    <div className="refuge-page refuge-page--fullscreen">
      <div className="refuge-hero">
        {currentImage && (
          <img
            src={currentImage}
            alt="Marécage du refuge"
            className="refuge-hero__image"
          />
        )}

        <h1 className="refuge-hero__title">Marécage</h1>

        {swampUnlocked && (
          <button
            type="button"
            className="grimoire-button"
            onClick={() => navigate("/refuge/grimoire/swamp")}
          >
            📖
          </button>
        )}

        <div className="refuge-story">
          <small>
            Monde Marécage · Chapitre {currentStepIndex + 1}
            {" / "}
            {swampSteps.length}
          </small>

          <strong>
            {swampUnlocked
              ? currentStep.title
              : "Le marécage est encore fermé"}
          </strong>

          <span>
            {swampUnlocked
              ? currentStep.description
              : "Atteins 440 points Refuge pour ouvrir ce nouveau monde."}
          </span>

          {nextStep && swampUnlocked && (
            <p className="refuge-next">
              Prochain chapitre dans{" "}
              {nextStep.requiredFiches - stats.refugePoints} point(s).
            </p>
          )}
        </div>

        <div className="refuge-actions">
          <button
            type="button"
            onClick={() => setOpenSheet("para")}
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

          {openSheet === "para" && (
            <>
              <h2>Para</h2>

              <p>✨ Points Refuge : {stats.refugePoints}</p>
              <p>🦕 Forme actuelle : {stats.stade}</p>
              <p>🧬 Espèce : {stats.species}</p>
              <p>🏝 Zone actuelle : Marécage</p>

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
                {Math.max(0, 600 - stats.refugePoints)} point(s) avant la
                Montagne ⛰
              </p>

              <p>✅ 🌱 Prairie</p>
              <p>✅ 🌲 Forêt</p>
              <p>✅ 🐸 Marécage</p>

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
                onClick={() => navigate("/refuge/forest")}
              >
                🌲 Forêt
              </button>

              <button
                type="button"
                className="island-location"
              >
                🐸 Marécage — {swampProgress}%
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
