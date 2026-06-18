import { Header } from "../../components/layout/Header";

import { BrontoCard } from "../../components/cards/BrontoCard";
import { ProchaineActionCard } from "../../components/cards/ProchaineActionCard";
import { QuickActionsCard } from "../../components/cards/QuickActionsCard";
import { TodayCard } from "../../components/cards/TodayCard";
import { loadShoppingList } from "../routines/shoppingListStorage";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  const shoppingItems = loadShoppingList().filter(
  (item) => !item.checked
);


  return (
    <div className="home-page">
      <Header />

      <BrontoCard />

      <ProchaineActionCard />

      <QuickActionsCard />

      <TodayCard />

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