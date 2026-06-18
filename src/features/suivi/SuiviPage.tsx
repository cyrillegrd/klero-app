import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

import { Card } from "../../components/ui/Card";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { suiviCategories } from "./suiviConfig";
import { loadSuiviSettings } from "./settingsStorage";
import { saveEntry } from "./storage";

export function SuiviPage() {
  const navigate = useNavigate();

  const categories = loadSuiviSettings() ?? suiviCategories;
  const visibleCategories = categories.filter((category) => category.enabled);

  const [humeur, setHumeur] = useState(0);
  const [energie, setEnergie] = useState(5);
  const [concentration, setConcentration] = useState(5);
  const [note, setNote] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  function exportDailyEntryToPdf() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Fiche du jour - Klero", 20, 20);

    doc.setFontSize(12);
    doc.text(`Date : ${new Date().toLocaleDateString("fr-FR")}`, 20, 35);

    let y = 50;

    doc.text("Fiche rapide", 20, y);
    y += 12;

    doc.text(`Humeur : ${humeur}`, 20, y);
    y += 10;

    doc.text(`Énergie : ${energie}`, 20, y);
    y += 10;

    doc.text(`Concentration : ${concentration}`, 20, y);
    y += 16;

    doc.text("Sections activées", 20, y);
    y += 12;

    visibleCategories.forEach((category) => {
      doc.text(`• ${category.label}`, 20, y);
      y += 8;
    });

    y += 10;

    doc.text("Note libre", 20, y);
    y += 10;

    doc.text(note || "Aucune note", 20, y, {
      maxWidth: 170,
    });

    doc.save("fiche-klero-du-jour.pdf");
  }

  return (
    <div className="suivi-page">
      <header className="page-header">
        <h1>Suivi</h1>
        <p>Remplis seulement ce qui est utile aujourd'hui.</p>

        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/suivi/parametres")}
        >
          ⚙️ Paramètres du suivi
        </button>

        <button
  type="button"
  className="secondary-button"
  onClick={() => navigate("/suivi/historique")}
>
  📚 Historique
</button>

<button
  type="button"
  className="secondary-button"
  onClick={() =>
    navigate("/suivi/statistiques")
  }
>
  📈 Statistiques
</button>
      </header>

      <Card>
        <SectionTitle>Fiche rapide du jour</SectionTitle>

        <div className="daily-form">
          <label>
            Humeur : {humeur}
            <input
              type="range"
              min="-5"
              max="5"
              value={humeur}
              onChange={(e) => setHumeur(Number(e.target.value))}
            />
          </label>

          <label>
            Énergie : {energie}
            <input
              type="range"
              min="0"
              max="10"
              value={energie}
              onChange={(e) => setEnergie(Number(e.target.value))}
            />
          </label>

          <label>
            Concentration : {concentration}
            <input
              type="range"
              min="0"
              max="10"
              value={concentration}
              onChange={(e) => setConcentration(Number(e.target.value))}
            />
          </label>

          <label>
            Note libre
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ce que tu veux garder en mémoire..."
            />
          </label>

          <button
            type="button"
            className="primary-button"
            onClick={() => {
              saveEntry({
                id: crypto.randomUUID(),
                date: new Date().toISOString(),
                humeur,
                energie,
                concentration,
                note,
              });

              exportDailyEntryToPdf();
              setNote("");
              setSavedMessage("Fiche enregistrée et exportée 🌱");
            }}
          >
            Enregistrer ma fiche
          </button>

          {savedMessage && (
            <p className="success-message">{savedMessage}</p>
          )}
        </div>
      </Card>

      <Card>
        <SectionTitle>Échelle standard</SectionTitle>
        <p>
          0 = absent · 1-2 très faible · 3-4 faible · 5 moyen ·
          6-7 important · 8-9 très important · 10 extrême
        </p>
      </Card>

      <div className="suivi-grid">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`suivi-category suivi-category--${category.status}`}
            onClick={() => navigate(`/suivi/${category.id}`)}
          >
            <span>{category.label}</span>
            <small>{category.description}</small>
          </button>
        ))}
      </div>
    </div>
  );
}