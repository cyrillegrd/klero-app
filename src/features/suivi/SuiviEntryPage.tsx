import { useParams } from "react-router-dom";
import jsPDF from "jspdf";

import { Card } from "../../components/ui/Card";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { loadEntries } from "./storage";
import { loadCategoryEntries } from "./categoryStorage";
import { suiviCategories } from "./suiviConfig";

export function SuiviEntryPage() {
  const { entryId } = useParams();

  const entry = loadEntries().find((item) => item.id === entryId);

  if (!entry) {
    return <p>Fiche introuvable.</p>;
  }

  const categoryEntries = loadCategoryEntries().filter(
    (item) =>
      new Date(item.date).toDateString() ===
      new Date(entry.date).toDateString()
  );

  const categoryLabels: Record<string, string> = {
  cognitif: "🧠 Cognitif",
  emotions: "❤️ Émotions",
  sommeil: "🌙 Sommeil",
  autisme: "🧩 Autisme",
  physique: "💪 Physique",
};

  function exportEntryToPdf() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Fiche Klero", 20, 20);

    doc.setFontSize(12);
    doc.text(
      `Date : ${new Date(entry!.date).toLocaleDateString("fr-FR")}`,
      20,
      35
    );

    let y = 50;

    doc.text("Résumé", 20, y);
    y += 12;

    doc.text(`Humeur : ${entry!.humeur}`, 20, y);
    y += 10;

    doc.text(`Énergie : ${entry!.energie}`, 20, y);
    y += 10;

    doc.text(`Concentration : ${entry!.concentration}`, 20, y);
    y += 14;

    if (entry!.note) {
      doc.text("Note :", 20, y);
      y += 10;

      doc.text(entry!.note, 20, y, { maxWidth: 170 });
      y += 20;
    }

    categoryEntries.forEach((section) => {
      const category = suiviCategories.find(
        (item) => item.id === section.categoryId
      );

      doc.text(category?.label ?? section.categoryId, 20, y);
      y += 10;

      Object.entries(section.values).forEach(([label, value]) => {
        doc.text(`${label} : ${String(value)}`, 20, y);
        y += 8;
      });

      y += 8;
    });

    doc.save("fiche-klero-complete.pdf");
  }

  return (
    <div className="suivi-page">
      <header className="page-header">
        <h1>Fiche</h1>

        <p>{new Date(entry.date).toLocaleDateString("fr-FR")}</p>
      </header>

      <Card>
        <SectionTitle>Résumé</SectionTitle>

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
          onClick={exportEntryToPdf}
        >
          📄 Exporter cette fiche en PDF
        </button>
      </Card>

      <Card>
  <SectionTitle>
    Catégories complétées
  </SectionTitle>

  {categoryEntries.length === 0 && (
    <p>Aucune catégorie enregistrée.</p>
  )}

  {categoryEntries.map((entry) => (
    <p key={entry.id}>
      {categoryLabels[entry.categoryId] ??
        entry.categoryId}
    </p>
  ))}
</Card>

      {categoryEntries.map((entry) => (
  <div key={entry.id}>
    <h3>
      {categoryLabels[entry.categoryId] ??
        entry.categoryId}
    </h3>

    {Object.entries(entry.values).map(
      ([label, value]) => (
        <p key={label}>
          <strong>{label} :</strong>{" "}
          {String(value)}
        </p>
      )
    )}
  </div>
))}
    </div>
  );
}