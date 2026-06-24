import { Card } from "../../components/ui/Card";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { loadEntries } from "./storage";
import { getSleepCorrelation } from "./correlations";
import { loadSobrietyCheckIns } from "../sobriety/storage";

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
  const sobrietyEntries = loadSobrietyCheckIns();
  const sobrietyByDate = new Map(
    sobrietyEntries.map((entry) => [entry.date, entry])
  );

  const chartData = [...entries]
    .reverse()
    .map((entry) => {
      const dateKey = entry.date.slice(0, 10);
      const sobrietyEntry = sobrietyByDate.get(dateKey);

      return {
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
        difficulteSobriete: sobrietyEntry?.difficulty,
        humeurSobriete: sobrietyEntry?.mood,
        craquage: sobrietyEntry?.relapsed ? 10 : 0,
      };
    });

  const matchedSobrietyDays = entries
    .map((entry) => ({
      daily: entry,
      sobriety: sobrietyByDate.get(entry.date.slice(0, 10)),
    }))
    .filter(
      (item): item is {
        daily: (typeof entries)[number];
        sobriety: NonNullable<ReturnType<typeof sobrietyByDate.get>>;
      } => Boolean(item.sobriety)
    );

  const highDifficultyDays = matchedSobrietyDays.filter(
    (item) => item.sobriety.difficulty >= 7
  );

  const relapseDays = matchedSobrietyDays.filter(
    (item) => item.sobriety.relapsed
  );

  const averageDailyMoodOnHighDifficulty =
    highDifficultyDays.length > 0
      ? (
          highDifficultyDays.reduce(
            (sum, item) => sum + item.daily.humeur,
            0
          ) / highDifficultyDays.length
        ).toFixed(1)
      : null;

  const averageEnergyOnHighDifficulty =
    highDifficultyDays.length > 0
      ? (
          highDifficultyDays.reduce(
            (sum, item) => sum + item.daily.energie,
            0
          ) / highDifficultyDays.length
        ).toFixed(1)
      : null;

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

              <Line
                type="monotone"
                dataKey="difficulteSobriete"
              />

              <Line
                type="monotone"
                dataKey="humeurSobriete"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <SectionTitle>Corrélations sobriété</SectionTitle>

        {matchedSobrietyDays.length === 0 ? (
          <p>
            Remplis une fiche Suivi et une fiche Sobriété le même jour pour voir
            des liens apparaître ici.
          </p>
        ) : (
          <>
            <p>
              Analyse sur {matchedSobrietyDays.length} jour(s) avec données
              croisées.
            </p>

            <p>
              Jours avec forte difficulté : {highDifficultyDays.length}
            </p>

            {averageDailyMoodOnHighDifficulty && (
              <p>
                Humeur moyenne ces jours-là :{" "}
                {averageDailyMoodOnHighDifficulty}
              </p>
            )}

            {averageEnergyOnHighDifficulty && (
              <p>
                Énergie moyenne ces jours-là :{" "}
                {averageEnergyOnHighDifficulty}
              </p>
            )}

            <p>Jours avec craquage indiqué : {relapseDays.length}</p>
          </>
        )}
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
