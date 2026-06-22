import { Header } from "../../components/layout/Header";

import { BrontoCard } from "../../components/cards/BrontoCard";
import { loadShoppingList } from "../routines/shoppingListStorage";
import { useNavigate } from "react-router-dom";
import { TodayAgendaCard } from "./TodayAgendaCard";
import { DailyGoalCard } from "./DailyGoalCard";
import { SobrietyCard } from "./SobrietyCard";

export function HomePage() {
  const navigate = useNavigate();

  const shoppingItems = loadShoppingList().filter(
  (item) => !item.checked
);


  return (
    <div className="home-page">
      <Header />

<BrontoCard />


      <TodayAgendaCard />

      <DailyGoalCard />

      <SobrietyCard />

      <button
  type="button"
  className="card home-communication-card"
  onClick={() => navigate("/communication")}
>
  <span>💬</span>

  <div>
    <h2>Communication rapide</h2>
    <p>Construire une phrase ou parler en un clic.</p>
  </div>
</button>

      {shoppingItems.length > 0 && (
  <div className="card">
    <h2>🛒 Liste de courses</h2>

    <p>
      {shoppingItems.length} élément(s) à acheter
    </p>

    {shoppingItems.slice(0, 5).map((item) => (
      <p key={item.id}>• {item.label}</p>
    ))}

    <button
  type="button"
  className="secondary-button"
  onClick={() => navigate("/shopping-list")}
>
  Modifier la liste
</button>
  </div>
)}
    </div>
  );
}