import { loadPlanItems } from "../plan/planStorage";

export function DailyGoalCard() {
  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const todayItems = loadPlanItems().filter(
    (item) => item.date === today
  );

  const completedItems = todayItems.filter(
    (item) => item.completed
  );

  const total = todayItems.length;
  const completed = completedItems.length;

  const percentage =
    total === 0
      ? 0
      : (completed / total) * 100;

  return (
    <div className="card">
      <h2>🎯 Objectif du jour</h2>

      <p>
        {completed} / {total} élément(s)
        réalisés
      </p>

      <div className="goal-progress">
        <div
          className="goal-progress__fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {percentage === 100 &&
        total > 0 && (
          <p>
            🦕 Bravo ! Tu as terminé
            tout ce qui était prévu.
          </p>
        )}
    </div>
  );
}