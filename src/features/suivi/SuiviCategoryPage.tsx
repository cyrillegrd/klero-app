import { useState } from "react";
import { useEffect } from "react";


import { Card } from "../../components/ui/Card";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { suiviCategories } from "./suiviConfig";
import { categoryFields } from "./categoryFields";
import { useNavigate, useParams } from "react-router-dom";
import {
  getLatestCategoryEntry,
  upsertCategoryEntry,
} from "./categoryStorage";

export function SuiviCategoryPage() {
  const { categoryId } = useParams();

  const navigate = useNavigate();

  const category = suiviCategories.find(
    (item) => item.id === categoryId
  );

  if (!category) {
    return <p>Catégorie introuvable.</p>;
  }

  const fields =
    categoryFields[
      category.id as keyof typeof categoryFields
    ] ?? [];

  const latestEntry = getLatestCategoryEntry(category.id);

const [values, setValues] = useState<
  Record<string, string | number | boolean>
>(() => {
  if (latestEntry) {
    return latestEntry.values;
  }

  return Object.fromEntries(
    fields.map((field) => [
      field.label,
      field.type === "mood"
        ? 0
        : field.type === "scale"
        ? 5
        : field.type === "number"
        ? 0
        : field.type === "boolean"
        ? false
        : "",
    ])
  );
});

  useEffect(() => {
  const timeout = setTimeout(() => {
    upsertCategoryEntry(
  category.id,
  values
);

    setSavedMessage("✓ Sauvegardé");
  }, 800);

  return () => clearTimeout(timeout);
}, [values, category.id]);

  const [savedMessage, setSavedMessage] = useState("");

  return (
    <div className="suivi-page">
      <header className="page-header">
        <h1>{category.label}</h1>
        <p>{category.description}</p>
      </header>

      <Card>
        <SectionTitle>Suivi du jour</SectionTitle>

        <div className="daily-form">
          {fields.map((field) => (
            <label key={field.label}>
              {field.label}

              {field.type === "scale" && (
                <>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={Number(values[field.label])}
                    onChange={(event) =>
                      setValues((previous) => ({
                        ...previous,
                        [field.label]: Number(event.target.value),
                      }))
                    }
                  />
                  <span>{values[field.label]}</span>
                </>
              )}

              {field.type === "mood" && (
                <>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    value={Number(values[field.label])}
                    onChange={(event) =>
                      setValues((previous) => ({
                        ...previous,
                        [field.label]: Number(event.target.value),
                      }))
                    }
                  />
                  <span>{values[field.label]}</span>
                </>
              )}

              {field.type === "time" && (
                <input
                  type="time"
                  value={String(values[field.label])}
                  onChange={(event) =>
                    setValues((previous) => ({
                      ...previous,
                      [field.label]: event.target.value,
                    }))
                  }
                />
              )}

              {field.type === "number" && (
                <input
                  type="number"
                  value={Number(values[field.label])}
                  onChange={(event) =>
                    setValues((previous) => ({
                      ...previous,
                      [field.label]: Number(event.target.value),
                    }))
                  }
                />
              )}

              {field.type === "text" && (
                <textarea
                  value={String(values[field.label])}
                  onChange={(event) =>
                    setValues((previous) => ({
                      ...previous,
                      [field.label]: event.target.value,
                    }))
                  }
                />
              )}

              {field.type === "boolean" && (
                <input
                  type="checkbox"
                  checked={Boolean(values[field.label])}
                  onChange={(event) =>
                    setValues((previous) => ({
                      ...previous,
                      [field.label]: event.target.checked,
                    }))
                  }
                />
              )}
            </label>
          ))}

          <button
  type="button"
  className="secondary-button"
>
  ✓ Sauvegarde automatique
</button>

          {savedMessage && (
            <p className="success-message">{savedMessage}</p>
          )}

          <button
  type="button"
  className="secondary-button"
  onClick={() => navigate(`/suivi/${category.id}/evolution`)}
>
  📈 Voir l'évolution
</button>
        </div>
      </Card>
    </div>
  );
}