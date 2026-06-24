import { useState } from "react";

import { Card } from "../../components/ui/Card";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { loadEntries, deleteEntry } from "./storage";
import { useNavigate } from "react-router-dom";
import { loadSobrietyCheckIns } from "../sobriety/storage";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function SuiviHistoryPage() {
  const [entries, setEntries] = useState(loadEntries());
  const sobrietyEntries = loadSobrietyCheckIns();
  const chartData = [...entries]
  .reverse()
  .map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    }),
    humeur: entry.humeur,
    energie: entry.energie,
    concentration: entry.concentration,
  }));
  const navigate = useNavigate();

  return (
    <div className="suivi-page">
      <header className="page-header">
        <h1>Historique</h1>
        <p>Toutes tes fiches enregistrées.</p>
      </header>

      {entries.length > 0 && (
  <Card>
    <SectionTitle>Évolution</SectionTitle>

    <div className="chart-card">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="humeur" />
          <Line type="monotone" dataKey="energie" />
          <Line type="monotone" dataKey="concentration" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Card>
)}

      {entries.length === 0 && (
        <Card>
          <p>Aucune fiche enregistrée.</p>
        </Card>
      )}

      <Card>
        <SectionTitle>Fiches sobriété</SectionTitle>

        {sobrietyEntries.length === 0 ? (
          <p>Aucune fiche de sobriété enregistrée.</p>
        ) : (
          <div className="sobriety-history-list">
            {sobrietyEntries.map((entry) => (
              <article key={entry.date} className="sobriety-history-entry">
                <strong>
                  {new Date(entry.date).toLocaleDateString("fr-FR")}
                </strong>

                <p>Difficulté : {entry.difficulty}/10</p>
                <p>Humeur sobriété : {entry.mood}/10</p>
                <p>{entry.relapsed ? "Craquage indiqué" : "Pas de craquage indiqué"}</p>

                {entry.triggers && (
                  <p>
                    <span>Déclencheurs :</span> {entry.triggers}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </Card>

      {entries.map((entry) => (
        <Card key={entry.id}>
          <SectionTitle>
            {new Date(entry.date).toLocaleDateString("fr-FR")}
          </SectionTitle>

          <p>🙂 Humeur : {entry.humeur}</p>
          <p>⚡ Énergie : {entry.energie}</p>
          <p>🧠 Concentration : {entry.concentration}</p>

          {entry.note && (
            <p>
              <strong>Note :</strong> {entry.note}
            </p>
          )}

          <button
  type="button"
  className="primary-button"
  onClick={() =>
    navigate(`/suivi/entry/${entry.id}`)
  }
>
  👁 Voir
</button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              deleteEntry(entry.id);
              setEntries(loadEntries());
            }}
          >
            🗑 Supprimer
          </button>
        </Card>
      ))}
    </div>
  );
}
