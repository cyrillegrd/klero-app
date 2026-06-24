import { saveCloudSobriety } from "./sobrietyCloud";

import { jsPDF } from "jspdf";
import { useEffect, useMemo, useState } from "react";
import {
  SOBRIETY_KEY,
  SOBRIETY_PROFILE_KEY,
  SOBRIETY_WORKBOOK_KEY,
  defaultSobrietyProfile,
  defaultSobrietyWorkbook,
  loadSobrietyCheckIns,
  readJson,
  saveSobrietyCheckIns,
  type SobrietyCheckIn,
  type SobrietyProfile,
  type SobrietyWorkbook,
} from "./storage";

const advice = [
  "Une envie monte souvent comme une vague : donne-toi 10 minutes avant d'agir.",
  "Réduis le moment à une seule action douce : boire, respirer, marcher, appeler quelqu'un.",
  "Un déclencheur n'est pas un échec. C'est une information pour mieux te protéger demain.",
  "Si tu as craqué, reprends soin de toi maintenant. Le compteur aide, il ne juge pas.",
];

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getElapsedParts(startDate: string, now: Date) {
  const start = new Date(`${startDate}T00:00:00`);
  const diffMs = Math.max(0, now.getTime() - start.getTime());
  const totalMinutes = Math.floor(diffMs / 60000);
  const totalHours = Math.floor(diffMs / 3600000);
  const totalDays = Math.floor(diffMs / 86400000);
  const years = Math.floor(totalDays / 365);
  const weeks = Math.floor((totalDays % 365) / 7);
  const days = totalDays % 7;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  return {
    years,
    weeks,
    days,
    hours,
    minutes,
    totalDays,
  };
}

export function SobrietyPage() {
  const [now, setNow] = useState(new Date());
  const [startDate, setStartDate] = useState<string | null>(() =>
    localStorage.getItem(SOBRIETY_KEY)
  );
  const [profile, setProfile] = useState<SobrietyProfile>(() =>
    readJson(SOBRIETY_PROFILE_KEY, defaultSobrietyProfile)
  );
  const [checkIns, setCheckIns] = useState<SobrietyCheckIn[]>(() =>
    loadSobrietyCheckIns()
  );
  const [workbook, setWorkbook] = useState<SobrietyWorkbook>(() =>
    readJson(SOBRIETY_WORKBOOK_KEY, defaultSobrietyWorkbook)
  );
  const [historyOpen, setHistoryOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<SobrietyCheckIn>({
    date: getToday(),
    difficulty: 5,
    relapsed: false,
    mood: 5,
    triggers: "",
    note: "",
  });
  const [savedMessage, setSavedMessage] = useState("");

  function syncSobrietyCloud(
  nextStartDate = startDate,
  nextProfile = profile,
  nextCheckIns = checkIns,
  nextWorkbook = workbook
) {
  saveCloudSobriety({
    startDate: nextStartDate,
    profile: nextProfile,
    checkIns: nextCheckIns,
    workbook: nextWorkbook,
  });
}

  const elapsed = startDate
    ? getElapsedParts(startDate, now)
    : null;

  const todayCheckIn = useMemo(
    () => checkIns.find((entry) => entry.date === getToday()),
    [checkIns]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => window.clearInterval(interval);
  }, []);

  function startCommitment() {
    const today = getToday();

    localStorage.setItem(SOBRIETY_KEY, today);
    localStorage.setItem(SOBRIETY_PROFILE_KEY, JSON.stringify(profile));
    setStartDate(today);
    setSavedMessage("Engagement enregistré pour aujourd'hui.");

syncSobrietyCloud(
  today,
  profile,
  checkIns,
  workbook
);
  }

  function saveProfile(nextProfile: SobrietyProfile) {
  setProfile(nextProfile);

  localStorage.setItem(
    SOBRIETY_PROFILE_KEY,
    JSON.stringify(nextProfile)
  );

  syncSobrietyCloud(
    startDate,
    nextProfile,
    checkIns,
    workbook
  );
}

  function saveCheckIn() {
    const nextCheckIns = [
      checkIn,
      ...checkIns.filter((entry) => entry.date !== checkIn.date),
    ];

    setCheckIns(nextCheckIns);
    saveSobrietyCheckIns(nextCheckIns);
    syncSobrietyCloud(
  startDate,
  profile,
  nextCheckIns,
  workbook
);
    setSavedMessage("Fiche quotidienne enregistrée.");
  }

  function saveWorkbook(nextWorkbook: SobrietyWorkbook) {
  setWorkbook(nextWorkbook);

  localStorage.setItem(
    SOBRIETY_WORKBOOK_KEY,
    JSON.stringify(nextWorkbook)
  );

  syncSobrietyCloud(
    startDate,
    profile,
    checkIns,
    nextWorkbook
  );
}

  function exportCheckInsPdf() {
    const pdf = new jsPDF();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 14;
    let y = 18;

    function addLine(text: string, size = 11) {
      pdf.setFontSize(size);
      const lines = pdf.splitTextToSize(text || "-", 180);

      lines.forEach((line: string) => {
        if (y > pageHeight - 16) {
          pdf.addPage();
          y = 18;
        }

        pdf.text(line, margin, y);
        y += size === 14 ? 8 : 6;
      });
    }

    addLine("Historique de sobriete", 14);
    addLine(
      profile.addiction
        ? `Objectif : sans ${profile.addiction}`
        : "Objectif : compteur personnel"
    );
    addLine(`Export du ${new Date().toLocaleDateString("fr-FR")}`);
    y += 4;

    if (checkIns.length === 0) {
      addLine("Aucune fiche enregistree pour le moment.");
    } else {
      checkIns.forEach((entry) => {
        addLine(new Date(entry.date).toLocaleDateString("fr-FR"), 14);
        addLine(`Difficulte : ${entry.difficulty}/10`);
        addLine(`Humeur : ${entry.mood}/10`);
        addLine(entry.relapsed ? "Craquage indique : oui" : "Craquage indique : non");
        addLine(`Declencheurs : ${entry.triggers || "-"}`);
        addLine(`Note : ${entry.note || "-"}`);
        y += 4;
      });
    }

    pdf.save("historique-sobriete.pdf");
  }

  return (
    <div className="page sobriety-page">
      <header className="page-header">
        <h1>Jours sans</h1>
        <p>Engagement, compteur vivant et soutien quotidien.</p>
      </header>

      <section className="card sobriety-pledge-card">
        <h2>Mon engagement</h2>

        <label>
          Ce que j'essaie de battre
          <input
            value={profile.addiction}
            placeholder="Ex. alcool, tabac, réseaux, achats..."
            onChange={(event) =>
              saveProfile({
                ...profile,
                addiction: event.target.value,
              })
            }
          />
        </label>

        <label>
          Ma phrase d'engagement
          <textarea
            value={profile.commitment}
            placeholder="Aujourd'hui, je choisis..."
            onChange={(event) =>
              saveProfile({
                ...profile,
                commitment: event.target.value,
              })
            }
          />
        </label>

        <button
          type="button"
          className="primary-button sobriety-green-button"
          onClick={startCommitment}
        >
          {startDate ? "Recommencer l'engagement aujourd'hui" : "Prendre mon engagement"}
        </button>
      </section>

      <section className="card sobriety-detail-card">
        <span>🌱</span>

        <p className="sobriety-focus">
          {profile.addiction
            ? `Sans ${profile.addiction}`
            : "Ton compteur personnel"}
        </p>

        {elapsed ? (
          <div className="sobriety-live-grid">
            <div>
              <strong>{elapsed.years}</strong>
              <span>année(s)</span>
            </div>
            <div>
              <strong>{elapsed.weeks}</strong>
              <span>semaine(s)</span>
            </div>
            <div>
              <strong>{elapsed.days}</strong>
              <span>jour(s)</span>
            </div>
            <div>
              <strong>{elapsed.hours}</strong>
              <span>heure(s)</span>
            </div>
            <div>
              <strong>{elapsed.minutes}</strong>
              <span>minute(s)</span>
            </div>
          </div>
        ) : (
          <p>
            Prends ton engagement pour démarrer le compteur.
          </p>
        )}

        {startDate && (
          <p>
            Démarré le{" "}
            {new Date(startDate).toLocaleDateString("fr-FR")}.
          </p>
        )}
      </section>

      <section className="card sobriety-advice-card">
        <h2>Conseils doux</h2>
        {advice.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </section>

      <section className="card sobriety-checkin-card">
        <h2>Petite fiche quotidienne</h2>

        {todayCheckIn && (
          <p className="success-message">
            Tu as déjà rempli une fiche aujourd'hui.
          </p>
        )}

        <label>
          Difficulté à se retenir : {checkIn.difficulty}/10
          <input
            type="range"
            min="0"
            max="10"
            value={checkIn.difficulty}
            onChange={(event) =>
              setCheckIn({
                ...checkIn,
                difficulty: Number(event.target.value),
              })
            }
          />
        </label>

        <label>
          Humeur : {checkIn.mood}/10
          <input
            type="range"
            min="0"
            max="10"
            value={checkIn.mood}
            onChange={(event) =>
              setCheckIn({
                ...checkIn,
                mood: Number(event.target.value),
              })
            }
          />
        </label>

        <label className="sobriety-toggle">
          <input
            type="checkbox"
            checked={checkIn.relapsed}
            onChange={(event) =>
              setCheckIn({
                ...checkIn,
                relapsed: event.target.checked,
              })
            }
          />
          Est-ce que j'ai craqué aujourd'hui ?
        </label>

        <label>
          Déclencheurs
          <input
            value={checkIn.triggers}
            placeholder="Stress, solitude, fatigue..."
            onChange={(event) =>
              setCheckIn({
                ...checkIn,
                triggers: event.target.value,
              })
            }
          />
        </label>

        <label>
          Note du jour
          <textarea
            value={checkIn.note}
            placeholder="Ce que j'ai appris aujourd'hui..."
            onChange={(event) =>
              setCheckIn({
                ...checkIn,
                note: event.target.value,
              })
            }
          />
        </label>

        <button
          type="button"
          className="primary-button sobriety-green-button"
          onClick={saveCheckIn}
        >
          Enregistrer ma fiche
        </button>
      </section>

      <section className="card sobriety-workbook-card">
        <h2>Cahier de travail</h2>

        <label>
          Définir mes intentions
          <textarea
            value={workbook.intentions}
            onChange={(event) =>
              saveWorkbook({
                ...workbook,
                intentions: event.target.value,
              })
            }
          />
        </label>

        <label>
          Me sentir chanceux
          <textarea
            value={workbook.gratitude}
            onChange={(event) =>
              saveWorkbook({
                ...workbook,
                gratitude: event.target.value,
              })
            }
          />
        </label>

        <label>
          Honnêteté
          <textarea
            value={workbook.honesty}
            onChange={(event) =>
              saveWorkbook({
                ...workbook,
                honesty: event.target.value,
              })
            }
          />
        </label>

        <label>
          Mon équipe de soutien
          <textarea
            value={workbook.supportTeam}
            onChange={(event) =>
              saveWorkbook({
                ...workbook,
                supportTeam: event.target.value,
              })
            }
          />
        </label>

        <label>
          Faire face au stress
          <textarea
            value={workbook.stressPlan}
            onChange={(event) =>
              saveWorkbook({
                ...workbook,
                stressPlan: event.target.value,
              })
            }
          />
        </label>
      </section>

      <section className="card sobriety-history-card">
        <h2>Historique des fiches</h2>

        <div className="sobriety-history-actions">
          <button
            type="button"
            className="secondary-button sobriety-history-button"
            onClick={() => setHistoryOpen((value) => !value)}
          >
            {historyOpen ? "Masquer l'historique" : "Consulter l'historique"}
          </button>

          <button
            type="button"
            className="secondary-button sobriety-export-button"
            onClick={exportCheckInsPdf}
            disabled={checkIns.length === 0}
          >
            Exporter en PDF
          </button>
        </div>

        {historyOpen && checkIns.length === 0 ? (
          <p>Aucune fiche de sobriété enregistrée pour le moment.</p>
        ) : null}

        {historyOpen && checkIns.length > 0 ? (
          <div className="sobriety-history-list">
            {checkIns.map((entry) => (
              <article key={entry.date} className="sobriety-history-entry">
                <strong>
                  {new Date(entry.date).toLocaleDateString("fr-FR")}
                </strong>

                <p>Difficulté : {entry.difficulty}/10</p>
                <p>Humeur : {entry.mood}/10</p>
                <p>{entry.relapsed ? "Craquage indiqué" : "Pas de craquage indiqué"}</p>

                {entry.triggers && (
                  <p>
                    <span>Déclencheurs :</span> {entry.triggers}
                  </p>
                )}

                {entry.note && (
                  <p>
                    <span>Note :</span> {entry.note}
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : null}
      </section>

      {savedMessage && (
        <p className="success-message">{savedMessage}</p>
      )}
    </div>
  );
}
