import { useParams } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Card } from "../../components/ui/Card";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { loadCategoryEntries } from "./categoryStorage";
import { suiviCategories } from "./suiviConfig";
import { useState } from "react";

export function CategoryChartPage() {
  const { categoryId } = useParams();

  const category = suiviCategories.find(
    (item) => item.id === categoryId
  );

  const entries = loadCategoryEntries()
    .filter((entry) => entry.categoryId === categoryId)
    .reverse();

  const valueKeys =
  entries.length > 0
    ? Object.keys(entries[0].values)
    : [];

const [selectedKey, setSelectedKey] = useState(
  valueKeys[0] ?? ""
);
    
  const firstValueKey =
    entries.length > 0
      ? Object.keys(entries[0].values)[0]
      : null;

  const chartData = entries.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    }),
    value: selectedKey
      ? Number(entry.values[selectedKey])
      : 0,
  }));

  const numericValues = chartData
  .map((item) => item.value)
  .filter((value) => !Number.isNaN(value));

const minValue =
  numericValues.length > 0
    ? Math.min(...numericValues)
    : 0;

const maxValue =
  numericValues.length > 0
    ? Math.max(...numericValues)
    : 0;

const averageValue =
  numericValues.length > 0
    ? (
        numericValues.reduce(
          (sum, value) => sum + value,
          0
        ) / numericValues.length
      ).toFixed(1)
    : "0";

  const firstDate =
  entries.length > 0
    ? entries[entries.length - 1].date
    : null;

const lastDate =
  entries.length > 0
    ? entries[0].date
    : null;

  if (!category) {
    return <p>Catégorie introuvable.</p>;
  }

  return (
    <div className="suivi-page">
      <header className="page-header">
        <h1>Évolution</h1>
        <p>{category.label}</p>
      </header>

      <Card>
        <SectionTitle>
          {firstValueKey ?? "Aucune donnée"}
        </SectionTitle>

        <p>
  📊 {entries.length} mesure(s)
</p>
<p>📈 Max : {maxValue}</p>
<p>📉 Min : {minValue}</p>
<p>📊 Moyenne : {averageValue}</p>

{firstDate && lastDate && (
  <p>
    📅 Du{" "}
    {new Date(firstDate).toLocaleDateString(
      "fr-FR"
    )}{" "}
    au{" "}
    {new Date(lastDate).toLocaleDateString(
      "fr-FR"
    )}
  </p>
)}

        <select
  value={selectedKey}
  onChange={(event) => setSelectedKey(event.target.value)}
>
  {valueKeys.map((key) => (
    <option key={key} value={key}>
      {key}
    </option>
  ))}
</select>

        <div className="chart-card">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}