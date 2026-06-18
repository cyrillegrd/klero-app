import { circuits } from "./circuits";
import { getCompletedSessions } from "./sessionStorage";

export function HistoryPage() {
  const sessions = getCompletedSessions();

  return (
    <div className="suivi-page">
      <header className="page-header">
        <h1>📜 Historique</h1>
        <p>Les routines terminées.</p>
      </header>

      {sessions.length === 0 && (
        <div className="card">
          <p>Aucune routine terminée pour le moment.</p>
        </div>
      )}

      {sessions.map((session) => {
        const circuit = circuits.find(
          (item) => item.id === session.circuitId
        );

        return (
          <div key={session.id} className="card">
            <strong>
              {circuit?.title ?? "Routine inconnue"}
            </strong>

            <p>
              {new Date(session.updatedAt).toLocaleString(
                "fr-FR"
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}