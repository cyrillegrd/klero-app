import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  type GrimoireEntry,
  type GrimoireWorldId,
  grimoireWorlds,
} from "./grimoireEntries";

function isGrimoireWorldId(value: string | undefined): value is GrimoireWorldId {
  return Boolean(value && value in grimoireWorlds);
}

export function GrimoirePage() {
  const { worldId } = useParams();
  const world = grimoireWorlds[isGrimoireWorldId(worldId) ? worldId : "prairie"];
  const [selectedEntry, setSelectedEntry] = useState<GrimoireEntry | null>(null);

  return (
    <div className={`suivi-page grimoire-page grimoire-page--${world.id}`}>
      <header className="page-header grimoire-hero">
        <span className="grimoire-world">{world.badge}</span>
        <h1>{world.title}</h1>
        <p>{world.description}</p>
      </header>

      <div className="grimoire-grid">
        {world.entries.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className="grimoire-card"
            disabled={!entry.discovered}
            onClick={() => {
              if (entry.discovered) {
                setSelectedEntry(entry);
              }
            }}
          >
            {entry.discovered ? (
              <>
                <div className="grimoire-card__icon">{entry.icon}</div>
                <span className="grimoire-card__zone">{world.label}</span>
                <strong>{entry.name}</strong>
              </>
            ) : (
              <>
                <div className="grimoire-card__icon">?</div>
                <span className="grimoire-card__zone">{world.label}</span>
                <strong>Inconnu</strong>
              </>
            )}
          </button>
        ))}
      </div>

      {selectedEntry && (
        <div className="grimoire-sheet">
          <section className="grimoire-sheet__panel">
            <button
              type="button"
              className="grimoire-sheet__close"
              onClick={() => setSelectedEntry(null)}
            >
              x
            </button>

            <span className="grimoire-world">{world.label}</span>

            <div className="grimoire-sheet__creature">
              <div className="grimoire-sheet__icon">{selectedEntry.icon}</div>

              <div>
                <h2>{selectedEntry.name}</h2>
                <p>Decouverte du monde {world.label}</p>
              </div>
            </div>

            <div className="grimoire-facts">
              <p>
                <strong>Taille</strong>
                <span>{selectedEntry.size}</span>
              </p>

              <p>
                <strong>Alimentation</strong>
                <span>{selectedEntry.food}</span>
              </p>

              <p>
                <strong>Epoque</strong>
                <span>{selectedEntry.period}</span>
              </p>
            </div>

            <div className="grimoire-fact-box">
              <strong>Le savais-tu ?</strong>
              <p>{selectedEntry.fact}</p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
