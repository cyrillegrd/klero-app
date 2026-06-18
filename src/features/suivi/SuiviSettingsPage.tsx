import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "../../components/ui/Card";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { suiviCategories } from "./suiviConfig";
import {
  loadSuiviSettings,
  saveSuiviSettings,
} from "./settingsStorage";

export function SuiviSettingsPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState(
    () => loadSuiviSettings() ?? suiviCategories
  );

  return (
    <div className="suivi-page">
      <header className="page-header">
        <h1>Paramètres du suivi</h1>
        <p>Choisis les catégories que tu veux utiliser.</p>
      </header>

      <Card>
        <SectionTitle>Catégories utilisées</SectionTitle>

        <div className="settings-list">
          {categories.map((category) => (
            <label
              key={category.id}
              className={`setting-item setting-item--${category.status}`}
            >
              <input
                type="checkbox"
                checked={category.enabled}
                onChange={() =>
                    setCategories((previous) =>
                    previous.map((item) =>
                        item.id === category.id
                        ? {
                            ...item,
                            enabled: !item.enabled,
                            }
                        : item
                    )
                    )
                }
                />

              <span>
                <strong>{category.label}</strong>
                <small>{category.description}</small>
              </span>
            </label>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle>Échelles</SectionTitle>

        <div className="settings-list">
          <div className="setting-item">
            Standard : 0 → 10
          </div>

          <div className="setting-item">
            Humeur : -5 → +5
          </div>

          <div className="setting-item">
            Intensité crise : 1 → 5
          </div>

          <div className="setting-item">
            Routine / hygiène : 0 → 2
          </div>
        </div>
      </Card>

      <Card>
        <SectionTitle>Enregistrer</SectionTitle>

        <p>
            Tes choix seront utilisés pour personnaliser ton suivi.
        </p>

        <div className="settings-actions">
            <button
            type="button"
            className="primary-button"
            onClick={() => {
                saveSuiviSettings(categories);
                navigate("/suivi");
            }}
            >
            💾 Sauvegarder mes préférences
            </button>

            <button
            type="button"
            className="secondary-button"
            onClick={() => navigate(-1)}
            >
            Retour
            </button>
        </div>
        </Card>
    </div>
  );
}