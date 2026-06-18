import { Card } from "../../components/ui/Card";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { loadEntries } from "./storage";
import { getSleepCorrelation } from "./correlations";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function SuiviStatsPage() {
    const correlation = getSleepCorrelation();
  const entries = loadEntries();

  const chartData = [...entries]
    .reverse()
    .map((entry) => ({
      date: new Date(entry.date).toLocaleDateString(
        "fr-FR",
        {
          day: "2-digit",
          month: "2-digit",
        }
      ),
      humeur: entry.humeur,
      energie: entry.energie,
      concentration: entry.concentration,
    }));

  const humeurMoyenne =
    entries.length > 0
      ? (
          entries.reduce(
            (sum, entry) => sum + entry.humeur,
            0
          ) / entries.length
        ).toFixed(1)
      : "0";

  const energieMoyenne =
    entries.length > 0
      ? (
          entries.reduce(
            (sum, entry) => sum + entry.energie,
            0
          ) / entries.length
        ).toFixed(1)
      : "0";

  const concentrationMoyenne =
    entries.length > 0
      ? (
          entries.reduce(
            (sum, entry) =>
              sum + entry.concentration,
            0
          ) / entries.length
        ).toFixed(1)
      : "0";

  return (
    <div className="suivi-page">
      <header className="page-header">
        <h1>Statistiques</h1>
        <p>Tendances de ton suivi.</p>
      </header>

      <Card>
        <SectionTitle>Moyennes</SectionTitle>

        <p>🙂 Humeur : {humeurMoyenne}</p>
        <p>⚡ Énergie : {energieMoyenne}</p>
        <p>🧠 Concentration : {concentrationMoyenne}</p>
      </Card>

      <Card>
        <SectionTitle>Évolution</SectionTitle>

        <div className="chart-card">
          <ResponsiveContainer
            width="100%"
            height={280}
          >
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="humeur"
              />

              <Line
                type="monotone"
                dataKey="energie"
              />

              <Line
                type="monotone"
                dataKey="concentration"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {correlation && (
  <Card>
    <SectionTitle>
      Corrélation énergie élevée
    </SectionTitle>

    <p>
      Analyse sur {correlation.jours} jour(s)
    </p>

    <p>
      🙂 Humeur moyenne :
      {" "}
      {correlation.humeur}
    </p>

    <p>
      ⚡ Énergie moyenne :
      {" "}
      {correlation.energie}
    </p>

    <p>
      🧠 Concentration moyenne :
      {" "}
      {correlation.concentration}
    </p>
  </Card>
)}
    </div>
  );
}