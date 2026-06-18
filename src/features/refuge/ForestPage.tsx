import { useNavigate } from "react-router-dom";

export function ForestPage() {
  const navigate = useNavigate();

  return (
    <div className="suivi-page">
      <header className="page-header">
        <h1>🌲 Forêt</h1>

        <p>
          Bronto découvre une nouvelle région de l’île.
        </p>
      </header>

      <div className="card">
        <h2>🌲 Sentier forestier</h2>

        <p>
          Bronto observe les premiers arbres de la forêt.
        </p>

        <p>
          Une légère brise traverse les feuillages.
        </p>

        <p>
          Quelque chose semble caché plus loin...
        </p>

        <button
          type="button"
          className="secondary-button"
          onClick={() => navigate("/refuge")}
        >
          ← Retour au Refuge
        </button>
      </div>
    </div>
  );
}