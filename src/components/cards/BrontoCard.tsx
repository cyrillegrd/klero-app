import { useState } from "react";
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

type KleoMessage = {
  role: "kleo" | "user";
  text: string;
};

function getKleoReply(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("suicide") ||
    normalizedMessage.includes("mourir") ||
    normalizedMessage.includes("danger")
  ) {
    return "Je suis vraiment désolé que ce soit si lourd. Je ne suis pas médecin, mais si tu es en danger maintenant, appelle les urgences ou une personne de confiance tout de suite. Dans l'app, tu peux aussi ouvrir Routines puis “J'ai besoin d'aide maintenant”.";
  }

  if (
    normalizedMessage.includes("angoisse") ||
    normalizedMessage.includes("stress") ||
    normalizedMessage.includes("panique")
  ) {
    return "D'accord, on ralentit ensemble. Pose tes pieds au sol et nomme 3 choses que tu vois. Ensuite, tu peux ouvrir Chrono pour une respiration guidée. Je reste avec toi, doucement.";
  }

  if (
    normalizedMessage.includes("fatigue") ||
    normalizedMessage.includes("épuis") ||
    normalizedMessage.includes("fatigu")
  ) {
    return "On vise petit. Pas toute la journée, juste la prochaine action douce : boire un peu, t'asseoir mieux, ou choisir une routine énergie faible.";
  }

  if (
    normalizedMessage.includes("plan") ||
    normalizedMessage.includes("tâche") ||
    normalizedMessage.includes("quoi faire")
  ) {
    return "On peut simplifier. Va dans Plan et choisis une seule chose utile. Si elle paraît trop grande, transforme-la en première micro-action de 2 minutes.";
  }

  return "Je t'écoute. Je ne suis pas médecin, mais je peux t'aider à traverser le quotidien dans l'app : respirer, choisir une routine, poser une note, ou réduire une tâche. Qu'est-ce qui serait le plus doux maintenant ?";
}

export function BrontoCard() {
  const [isKleoChatOpen, setIsKleoChatOpen] =
    useState(false);
  const [kleoInput, setKleoInput] = useState("");
  const [kleoMessages, setKleoMessages] = useState<KleoMessage[]>([
    {
      role: "kleo",
      text: "Coucou, je suis Kléo. Je peux t'aider doucement dans ton quotidien avec l'app. Je ne suis pas médecin, mais je peux t'aider à faire un petit pas maintenant.",
    },
  ]);

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

    const userName =
  localStorage.getItem("klero_name") || "";

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

  function sendKleoMessage() {
    const trimmedInput = kleoInput.trim();

    if (!trimmedInput) return;

    setKleoMessages((messages) => [
      ...messages,
      { role: "user", text: trimmedInput },
      {
        role: "kleo",
        text: getKleoReply(trimmedInput),
      },
    ]);
    setKleoInput("");
  }

  return (
    <Card>
      <div className="bronto-card">
        <div className="bronto-card__content">
          <h2>
  {getGreeting()}
  {userName ? ` ${userName}` : ""} 👋
</h2>
          <p className="bronto-card__intro">
            Kléo est avec toi aujourd'hui.
          </p>

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

        <div className="kleo-chat-anchor">
          <button
            type="button"
            className="kleo-chat-bubble"
            onClick={() => setIsKleoChatOpen(true)}
            aria-label="Parler avec Kléo"
          >
            💬
          </button>

          <img
            src={brontoCalm}
            alt="Kléo"
            className="kleo-card__avatar"
          />
        </div>
      </div>

      {isKleoChatOpen && (
        <div
          className="kleo-chat-backdrop"
          onClick={() => setIsKleoChatOpen(false)}
        >
          <section
            className="kleo-chat-window"
            aria-label="Conversation avec Kléo"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="kleo-chat-header">
              <div>
                <strong>Parler avec Kléo</strong>
                <small>Écoute douce, pas un avis médical.</small>
              </div>

              <button
                type="button"
                onClick={() => setIsKleoChatOpen(false)}
                aria-label="Fermer la conversation"
              >
                ×
              </button>
            </div>

            <div className="kleo-chat-messages">
              {kleoMessages.map((message, index) => (
                <p
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "kleo"
                      ? "kleo-chat-message kleo-chat-message--kleo"
                      : "kleo-chat-message kleo-chat-message--user"
                  }
                >
                  {message.text}
                </p>
              ))}
            </div>

            <form
              className="kleo-chat-form"
              onSubmit={(event) => {
                event.preventDefault();
                sendKleoMessage();
              }}
            >
              <input
                value={kleoInput}
                placeholder="Dis à Kléo ce qui se passe..."
                onChange={(event) =>
                  setKleoInput(event.target.value)
                }
              />

              <button type="submit">
                Envoyer
              </button>
            </form>
          </section>
        </div>
      )}
    </Card>
  );
}
