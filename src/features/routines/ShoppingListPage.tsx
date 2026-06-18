import { useState } from "react";

import {
  loadShoppingList,
  saveShoppingList,
} from "./shoppingListStorage";

export function ShoppingListPage() {
  const [items, setItems] = useState(loadShoppingList());
  const [input, setInput] = useState("");

  const remainingItems = items.filter((item) => !item.checked);
  const checkedItems = items.filter((item) => item.checked);

  function updateItems(nextItems: typeof items) {
    setItems(nextItems);
    saveShoppingList(nextItems);
  }

  function addItem() {
    if (!input.trim()) return;

    updateItems([
      ...items,
      {
        id: crypto.randomUUID(),
        label: input.trim(),
        checked: false,
      },
    ]);

    setInput("");
  }

  function toggleItem(itemId: string, checked: boolean) {
    updateItems(
      items.map((item) =>
        item.id === itemId
          ? { ...item, checked }
          : item
      )
    );
  }

  function deleteItem(itemId: string) {
    updateItems(items.filter((item) => item.id !== itemId));
  }

  function clearShoppingList() {
    updateItems([]);
  }

  return (
    <div className="suivi-page">
      <header className="page-header">
        <h1>🛒 Liste de courses</h1>
        {items.length > 0 && (
            <button
                type="button"
                className="primary-button"
                onClick={clearShoppingList}
            >
                ✅ J'ai terminé les courses
            </button>
            )}
        <p>
          {remainingItems.length} élément(s) à acheter
        </p>
      </header>

      <div className="card shopping-list-form">
        <input
          value={input}
          placeholder="Ajouter un produit..."
          onChange={(event) => setInput(event.target.value)}
        />

        <button
          type="button"
          className="secondary-button"
          onClick={addItem}
        >
          Ajouter
        </button>
      </div>

      <div className="card">
        <h2>À acheter</h2>

        {remainingItems.length === 0 && (
          <p>Tout est coché.</p>
        )}

        {remainingItems.map((item) => (
          <div key={item.id} className="shopping-item">
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(event) =>
                  toggleItem(item.id, event.target.checked)
                }
              />
              {item.label}
            </label>

            <button
              type="button"
              onClick={() => deleteItem(item.id)}
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      {checkedItems.length > 0 && (
        <div className="card">
          <h2>Acheté</h2>

          {checkedItems.map((item) => (
            <div key={item.id} className="shopping-item shopping-item--checked">
              <label>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(event) =>
                    toggleItem(item.id, event.target.checked)
                  }
                />
                {item.label}
              </label>

              <button
                type="button"
                onClick={() => deleteItem(item.id)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}