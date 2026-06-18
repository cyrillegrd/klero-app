import { Card } from "../ui/Card";
import brontoCalm from "../../assets/bronto/bronto_calm.png";

export function BrontoCard() {
  return (
    <Card>
      <div className="bronto-card">

        <div className="bronto-card__content">
          <h2>Kléo</h2>

          <p>
            Une seule étape à la fois.
          </p>

          <button className="primary-button">
            Je commence
          </button>
        </div>

        <img
          src={brontoCalm}
          alt="Bronto"
          className="bronto-card__image"
        />

      </div>
    </Card>
  );
}