import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBadges } from "./refugeBadges";
import { getRefugeStats } from "./refugeStats";
import { refugeSteps } from "./refugeChapters";
import { islandMap } from "./islandMap";

export function BeachPage() {
  const navigate = useNavigate();
  const stats = getRefugeStats();
  const [openSheet, setOpenSheet] = useState<"para" | "badges" | "island" | null>(null);

  const beachSteps = refugeSteps.filter((step) => step.id.startsWith("beach-"));
  const currentStep =
    beachSteps.filter((step) => stats.refugePoints >= step.requiredFiches).at(-1) ??
    beachSteps[0];
  const currentStepIndex = beachSteps.findIndex((step) => step.id === currentStep.id);
  const nextStep = beachSteps.find((step) => step.requiredFiches > stats.refugePoints);

  const fallbackImageStep = refugeSteps
    .filter((step) => stats.refugePoints >= step.requiredFiches && step.image)
    .at(-1);
  const currentImage = currentStep.image ?? fallbackImageStep?.image;

  const beachUnlocked = stats.refugePoints >= 750;
  const oceanUnlocked = stats.refugePoints >= 900;
  const beachProgress = Math.min(Math.round((stats.refugePoints / 750) * 100), 100);
  const oceanProgress = Math.min(Math.round((stats.refugePoints / 900) * 100), 100);

  const badges = getBadges();
  const unlockedCount = badges.filter((badge) => badge.unlocked).length;

  return (
    <div className="refuge-page refuge-page--fullscreen">
      <div className="refuge-hero">
        {currentImage && (
          <img src={currentImage} alt="Plage du refuge" className="refuge-hero__image" />
        )}

        <h1 className="refuge-hero__title">Plage</h1>

        {beachUnlocked && (
          <button
            type="button"
            className="grimoire-button"
            onClick={() => navigate("/refuge/grimoire/beach")}
          >
            Livre
          </button>
        )}

        <div className="refuge-story">
          <small>
            Monde Plage · Chapitre {currentStepIndex + 1} / {beachSteps.length}
          </small>

          <strong>{beachUnlocked ? currentStep.title : "La plage est encore fermee"}</strong>

          <span>
            {beachUnlocked
              ? currentStep.description
              : "Atteins 750 points Refuge pour ouvrir ce nouveau monde."}
          </span>

          {nextStep && beachUnlocked && (
            <p className="refuge-next">
              Prochain chapitre dans {nextStep.requiredFiches - stats.refugePoints} point(s).
            </p>
          )}
        </div>

        <div className="refuge-actions">
          <button type="button" onClick={() => setOpenSheet("para")}>
            Para
          </button>

          <button type="button" onClick={() => setOpenSheet("badges")}>
            Badges
          </button>

          <button type="button" onClick={() => setOpenSheet("island")}>
            Ile
          </button>
        </div>
      </div>

      {openSheet && (
        <div className="refuge-sheet">
          <button type="button" className="refuge-sheet__close" onClick={() => setOpenSheet(null)}>
            ×
          </button>

          {openSheet === "para" && (
            <>
              <h2>Para</h2>
              <p>Points Refuge : {stats.refugePoints}</p>
              <p>Forme actuelle : {stats.stade}</p>
              <p>Espece : {stats.species}</p>
              <p>Zone actuelle : Plage</p>
            </>
          )}

          {openSheet === "badges" && (
            <>
              <h2>Badges</h2>
              <p>
                {unlockedCount} / {badges.length} badges debloques
              </p>
              {badges.map((badge) => (
                <p key={badge.id}>
                  {badge.unlocked ? "OK" : "Bloque"} {badge.icon} {badge.label}
                </p>
              ))}
            </>
          )}

          {openSheet === "island" && (
            <>
              <h2>Explorer l'ile</h2>
              <p className="next-goal">
                Prochain objectif : {Math.max(0, 900 - stats.refugePoints)} point(s) avant
                l'Ocean
              </p>

              <p>Prairie, Foret, Marecage et Montagne sont accessibles.</p>

              <img src={islandMap} alt="Carte de l'ile du refuge" className="island-map" />

              <button type="button" className="island-location" onClick={() => navigate("/refuge")}>
                Prairie
              </button>
              <button
                type="button"
                className="island-location"
                onClick={() => navigate("/refuge/forest")}
              >
                Foret
              </button>
              <button
                type="button"
                className="island-location"
                onClick={() => navigate("/refuge/swamp")}
              >
                Marecage
              </button>
              <button
                type="button"
                className="island-location"
                onClick={() => navigate("/refuge/mountain")}
              >
                Montagne
              </button>
              <button type="button" className="island-location">
                Plage — {beachProgress}%
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
                {oceanUnlocked ? "Ocean" : "Bloque"} — {oceanProgress}%
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
