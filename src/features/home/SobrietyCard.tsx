import { useState } from "react";

const SOBRIETY_KEY = "klero_sobriety_start_date";

function getDaysSince(date: string) {
  const start = new Date(date);
  const today = new Date();

  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = today.getTime() - start.getTime();

  return Math.max(0, Math.floor(diff / 86400000));
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export function SobrietyCard() {
  const [startDate, setStartDate] = useState<string | null>(() =>
    localStorage.getItem(SOBRIETY_KEY)
  );

  const days = startDate ? getDaysSince(startDate) : 0;

  return (
    <section className="card sobriety-card">
      <h2>🌱 Jours sans</h2>

      {startDate ? (
        <>
          <p className="sobriety-days">
            {days}
            <span> jour(s)</span>
          </p>

          <p>
            Depuis le{" "}
            {new Date(startDate).toLocaleDateString("fr-FR")}
          </p>

          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              localStorage.setItem(SOBRIETY_KEY, getToday());
              setStartDate(getToday());
            }}
          >
            Recommencer le compteur
          </button>
        </>
      ) : (
        <>
          <p>
            Un compteur personnel pour suivre une période sans comportement que tu veux éviter.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={() => {
              localStorage.setItem(SOBRIETY_KEY, getToday());
              setStartDate(getToday());
            }}
          >
            Démarrer aujourd’hui
          </button>
        </>
      )}
    </section>
  );
}