import { Card } from "../ui/Card";
import brontoCalm from "../../assets/bronto/bronto_calm.png";

import { loadPlanItems } from "../../features/plan/planStorage";

import { useNavigate } from "react-router-dom";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Bonjour";
  if (hour < 18) return "Bon après-midi";

  return "Bonsoir";
}

export function BrontoCard() {
  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const items = loadPlanItems().filter(
    (item) =>
      item.date === today &&
      !item.completed
  );

  const nextItem = [...items]
    .sort((a, b) =>
      a.time.localeCompare(b.time)
    )
    .at(0);

    const navigate = useNavigate();

function getTimeUntilNextItem() {
  if (!nextItem) return null;

  const now = new Date();

  const target = new Date(
    `${today}T${nextItem.time}`
  );

  const diffMs =
    target.getTime() - now.getTime();

  const diffMinutes = Math.floor(
    diffMs / 60000
  );

  if (diffMinutes <= 0) {
    return "maintenant";
  }

  if (diffMinutes < 60) {
    return `dans ${diffMinutes} min`;
  }

  const hours = Math.floor(
    diffMinutes / 60
  );

  const minutes = diffMinutes % 60;

  if (minutes === 0) {
    return `dans ${hours} h`;
  }

  return `dans ${hours} h ${minutes}`;
}

  return (
    <Card>
      <div className="bronto-card">
        <div className="bronto-card__content">
          <h2>{getGreeting()} 👋</h2>

          {nextItem ? (
            <>
              <p>
                Aujourd'hui tu as{" "}
                <strong>
                  {items.length}
                </strong>{" "}
                élément(s) prévu(s).
              </p>

              <p>
  Tu en as terminé{" "}
  <strong>
    {
      loadPlanItems().filter(
        (item) =>
          item.date === today &&
          item.completed
      ).length
    }
  </strong>
  .
</p>

              <p>
                Prochaine étape :
              </p>

              <div className="bronto-next-item">
  <strong>
    {nextItem.title}
  </strong>

  <small>
    ⏰ {getTimeUntilNextItem()}
  </small>
</div>
            </>
          ) : (
            <>
              <p>
                Ton planning est libre.
              </p>

              <p>
                C'est peut-être le moment
                d'une pause 🌴
              </p>
            </>
          )}
<p>
          <button
  type="button"
  className="primary-button"
  onClick={() => {
    if (!nextItem) {
      navigate("/plan");
      return;
    }

    if (nextItem.type === "routine") {
      navigate("/routines");
      return;
    }

    navigate("/plan");
  }}
>
  Je commence
</button>
          </p>
        </div>

        <img
          src={brontoCalm}
          alt="Kléo"
          className="kleo-card__avatar"
        />
      </div>
    </Card>
  );
}