import { useNavigate } from "react-router-dom";

import { loadPlanItems } from "../plan/planStorage";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getIcon(type: string) {
  if (type === "routine") return "🔵";
  if (type === "appointment") return "🔺";
  return "🟠";
}

export function TodayAgendaCard() {
  const navigate = useNavigate();
  const today = getToday();

  const todayItems = loadPlanItems()
    .filter((item) => item.date === today && !item.completed)
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 5);

  return (
    <section className="home-agenda-card">
      <div className="home-agenda-card__header">
        <h2>📅 Aujourd’hui</h2>

        <button
          type="button"
          onClick={() => navigate("/plan")}
        >
          Voir →
        </button>
      </div>

      {todayItems.length === 0 ? (
        <p className="home-agenda-empty">
          Rien de prévu pour l’instant.
        </p>
      ) : (
        <div className="home-agenda-list">
          {todayItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="home-agenda-item"
              onClick={() => navigate("/plan")}
            >
              <strong>{item.time}</strong>
              <span>{getIcon(item.type)}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}