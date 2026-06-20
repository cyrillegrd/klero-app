import { useState } from "react";

import { circuits } from "../routines/circuits";

import type { PlanItem, PlanItemType } from "./planTypes";
import {
  loadPlanItems,
  savePlanItems,
} from "./planStorage";

type Recurrence =
  | "none"
  | "daily"
  | "weekly"
  | "biweekly"
  | "monthly";

const hours = [
  "6h", "7h", "8h", "9h", "10h", "11h", "12h", "13h",
  "14h", "15h", "16h", "17h", "18h", "19h", "20h",
];

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function PlanIcon({ type }: { type: PlanItemType }) {
  if (type === "task") return <span className="plan-dot" />;
  if (type === "routine") return <span className="plan-square" />;
  return <span className="plan-triangle" />;
}

function getTravelIcon(
  mode?: "walk" | "car" | "public_transport"
) {
  if (mode === "car") return "🚗";
  if (mode === "public_transport") return "🚇";
  return "🚶";
}

function subtractMinutes(
  time: string,
  minutesToRemove: number
) {
  const [hour, minute] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute - minutesToRemove);

  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

function getDepartureTime(
  time: string,
  travelTimeMinutes?: number
) {
  if (!travelTimeMinutes) return null;

  return subtractMinutes(time, travelTimeMinutes);
}

function getNextDate(date: string, recurrence: Recurrence, index: number) {
  const next = new Date(date);

  if (recurrence === "daily") {
    next.setDate(next.getDate() + index);
  }

  if (recurrence === "weekly") {
    next.setDate(next.getDate() + index * 7);
  }

  if (recurrence === "biweekly") {
    next.setDate(next.getDate() + index * 14);
  }

  if (recurrence === "monthly") {
    next.setMonth(next.getMonth() + index);
  }

  return next.toISOString().slice(0, 10);
}

export function PlanPage() {
  const today = getToday();

  const [items, setItems] = useState<PlanItem[]>(
    loadPlanItems()
  );

  const [view, setView] =
    useState<"day" | "week" | "month">("day");

  const [currentDate, setCurrentDate] =
    useState(today);

  const [selectedDate, setSelectedDate] =
    useState<string | null>(null);

  const [showForm, setShowForm] =
    useState(false);

  const [title, setTitle] = useState("");
  const [type, setType] =
    useState<PlanItemType>("task");

  const [date, setDate] = useState(today);
  const [time, setTime] = useState("10:00");

  const [recurrence, setRecurrence] =
    useState<Recurrence>("none");

  const [location, setLocation] = useState("");
  const [travelTimeMinutes, setTravelTimeMinutes] =
    useState(0);

  const [travelMode, setTravelMode] = useState<
    "walk" | "car" | "public_transport"
  >("walk");

  const [editingItemId, setEditingItemId] =
    useState<string | null>(null);

  const [newDate, setNewDate] = useState(today);
  const [newTime, setNewTime] = useState("10:00");

  const [movingItemId, setMovingItemId] =
    useState<string | null>(null);

    const [draggedItemId, setDraggedItemId] =
  useState<string | null>(null);

  const [moveHour, setMoveHour] = useState("10");
  const [moveMinute, setMoveMinute] = useState("00");
  const [movePriority, setMovePriority] =
    useState("none");

  const currentDayItems = items.filter(
    (item) => item.date === currentDate
  );

  const displayedItems = [
    ...currentDayItems,
    ...currentDayItems
      .filter(
        (item) =>
          item.type === "appointment" &&
          item.travelTimeMinutes
      )
      .map((item) => {
        const departure = subtractMinutes(
          item.time,
          item.travelTimeMinutes ?? 0
        );

        const [h, m] = departure
          .split(":")
          .map(Number);

        const roundedMinute =
          m < 15
            ? "00"
            : m < 30
            ? "15"
            : m < 45
            ? "30"
            : "45";

        return {
          ...item,
          id: `${item.id}-travel`,
          title: "Trajet",
          time: `${String(h).padStart(
            2,
            "0"
          )}:${roundedMinute}`,
          isTravel: true,
        };
      }),
  ];

  function updateItems(nextItems: PlanItem[]) {
    setItems(nextItems);
    savePlanItems(nextItems);
  }

  function resetForm() {
    setTitle("");
    setType("task");
    setDate(currentDate);
    setTime("10:00");
    setRecurrence("none");
    setLocation("");
    setTravelTimeMinutes(0);
    setTravelMode("walk");
  }

  function addItem() {
    if (!title.trim()) return;

    const baseItem = {
      id: crypto.randomUUID(),
      title: title.trim(),
      type,
      date,
      time,
      completed: false,
      postponedCount: 0,
      recurrence,
      location:
        type === "appointment"
          ? location.trim()
          : undefined,
      travelTimeMinutes:
        type === "appointment"
          ? travelTimeMinutes
          : undefined,
      travelMode:
        type === "appointment"
          ? travelMode
          : undefined,
    };

    const generatedItems =
      recurrence === "none"
        ? [baseItem]
        : Array.from({ length: 12 }, (_, index) => ({
            ...baseItem,
            id:
              index === 0
                ? baseItem.id
                : crypto.randomUUID(),
            date: getNextDate(date, recurrence, index),
          }));

    updateItems([...items, ...generatedItems]);

    resetForm();
    setShowForm(false);
  }

  function toggleItem(itemId: string) {
    if (itemId.endsWith("-travel")) return;

    updateItems(
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  }

  function deleteItem(itemId: string) {
    const item = items.find(
      (currentItem) => currentItem.id === itemId
    );

    if (!item || item.postponedCount >= 3) return;

    updateItems(
      items.filter(
        (currentItem) => currentItem.id !== itemId
      )
    );
  }

  function postponeItem(itemId: string) {
    updateItems(
      items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              date: newDate,
              time: newTime,
              postponedCount:
                item.postponedCount + 1,
            }
          : item
      )
    );

    setEditingItemId(null);
  }

  function moveItem(itemId: string) {
    updateItems(
      items.map((item) => {
        if (item.id !== itemId) return item;

        return {
          ...item,
          date: currentDate,
          time: `${moveHour}:${moveMinute}`,
          priorityRank:
            movePriority === "none"
              ? undefined
              : Number(movePriority),
        };
      })
    );

    setMovingItemId(null);
  }

  function openSlot(hour: string, minute: number) {
    setShowForm(true);
    setDate(currentDate);
    setTime(
      `${hour
        .replace("h", "")
        .padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`
    );
  }

  function getWeekDays() {
    const current = new Date(currentDate);
    const day = current.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;

    const monday = new Date(current);
    monday.setDate(
      current.getDate() + mondayOffset
    );

    return Array.from({ length: 7 }, (_, index) => {
      const weekDate = new Date(monday);
      weekDate.setDate(monday.getDate() + index);

      return {
        label: weekDate.toLocaleDateString("fr-FR", {
          weekday: "short",
        }),
        date: weekDate.toISOString().slice(0, 10),
      };
    });
  }

  const weekDays = getWeekDays();

  function moveDraggedItemToTime(
  hour: string,
  minute: number
) {
  if (!draggedItemId) return;

  updateItems(
    items.map((item) =>
      item.id === draggedItemId
        ? {
            ...item,
            date: currentDate,
            time: `${hour
              .replace("h", "")
              .padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
          }
        : item
    )
  );

  setDraggedItemId(null);
}

function moveDraggedItemToPriority(rank: number) {
  if (!draggedItemId) return;

  updateItems(
    items.map((item) =>
      item.id === draggedItemId
        ? {
            ...item,
            date: currentDate,
            priorityRank: rank,
          }
        : item
    )
  );

  setDraggedItemId(null);
}

  return (
    <div className="plan-page">
      <header className="page-header">
        <h1>Aujourd'hui</h1>
        <p>Une vue douce de ta journée.</p>
      </header>

      <div className="plan-date-nav">
        <button
          type="button"
          onClick={() => {
            const previous = new Date(currentDate);
            previous.setDate(
              previous.getDate() - 1
            );
            setCurrentDate(
              previous.toISOString().slice(0, 10)
            );
          }}
        >
          ←
        </button>

        <strong>
          {new Date(currentDate).toLocaleDateString(
            "fr-FR",
            {
              weekday: "long",
              day: "2-digit",
              month: "long",
            }
          )}
        </strong>

        <button
          type="button"
          onClick={() => {
            const next = new Date(currentDate);
            next.setDate(next.getDate() + 1);
            setCurrentDate(
              next.toISOString().slice(0, 10)
            );
          }}
        >
          →
        </button>
      </div>

      <div className="plan-tabs">
        <button
          type="button"
          className={
            view === "day"
              ? "tab tab--active"
              : "tab"
          }
          onClick={() => setView("day")}
        >
          Jour
        </button>

        <button
          type="button"
          className={
            view === "week"
              ? "tab tab--active"
              : "tab"
          }
          onClick={() => setView("week")}
        >
          Semaine
        </button>

        <button
          type="button"
          className={
            view === "month"
              ? "tab tab--active"
              : "tab"
          }
          onClick={() => setView("month")}
        >
          Mois
        </button>
      </div>

      <button
        type="button"
        className="primary-button"
        onClick={() => {
          setDate(currentDate);
          setShowForm((value) => !value);
        }}
      >
        {showForm ? "Fermer" : "+ Ajouter"}
      </button>

      {showForm && (
        <div className="card plan-add-card">
          {type === "routine" ? (
            <select
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
            >
              <option value="">
                Choisir une routine
              </option>

              {circuits.map((circuit) => (
                <option
                  key={circuit.id}
                  value={circuit.title}
                >
                  {circuit.title}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={title}
              placeholder={
                type === "appointment"
                  ? "Nom du rendez-vous..."
                  : "Ajouter une tâche..."
              }
              onChange={(event) =>
                setTitle(event.target.value)
              }
            />
          )}

          <select
            value={type}
            onChange={(event) => {
              setType(
                event.target.value as PlanItemType
              );
              setTitle("");
            }}
          >
            <option value="task">Tâche</option>
            <option value="routine">Routine</option>
            <option value="appointment">
              Rendez-vous
            </option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(event) =>
              setDate(event.target.value)
            }
          />

          <input
            type="time"
            value={time}
            onChange={(event) =>
              setTime(event.target.value)
            }
          />

          <select
            value={recurrence}
            onChange={(event) =>
              setRecurrence(
                event.target.value as Recurrence
              )
            }
          >
            <option value="none">
              Pas de répétition
            </option>
            <option value="daily">
              Tous les jours
            </option>
            <option value="weekly">
              Chaque semaine
            </option>
            <option value="biweekly">
              Toutes les 2 semaines
            </option>
            <option value="monthly">
              Chaque mois
            </option>
          </select>

          {type === "appointment" && (
            <>
              <input
                value={location}
                placeholder="Lieu du rendez-vous"
                onChange={(event) =>
                  setLocation(event.target.value)
                }
              />

              <select
                value={travelMode}
                onChange={(event) =>
                  setTravelMode(
                    event.target.value as
                      | "walk"
                      | "car"
                      | "public_transport"
                  )
                }
              >
                <option value="walk">🚶 À pied</option>
                <option value="car">🚗 Voiture</option>
                <option value="public_transport">
                  🚇 Transport
                </option>
              </select>

              <input
                type="number"
                min="0"
                value={travelTimeMinutes}
                placeholder="Temps de trajet en minutes"
                onChange={(event) =>
                  setTravelTimeMinutes(
                    Number(event.target.value)
                  )
                }
              />
            </>
          )}

          <button
            type="button"
            className="primary-button"
            onClick={addItem}
          >
            Ajouter
          </button>
        </div>
      )}

      {view === "day" && (
        <section className="plan-day-layout">
          <aside className="plan-sidebar">
            <h2>Top priorités</h2>

            {[1, 2, 3].map((rank) => {
              const priorityItem = currentDayItems.find(
                (item) =>
                  item.priorityRank === rank
              );

              return (
                <div
  key={rank}
  className="plan-priority-dropzone"
  onDragOver={(event) => event.preventDefault()}
  onDrop={() => moveDraggedItemToPriority(rank)}
>
                  {priorityItem ? (
                    <button
                      type="button"
                      className="plan-priority"
                      onClick={() =>
                        toggleItem(priorityItem.id)
                      }
                    >
                      <strong>{rank}</strong>
                      <PlanIcon
                        type={priorityItem.type}
                      />
                      <span>{priorityItem.title}</span>
                    </button>
                  ) : (
                    <div className="plan-priority plan-priority--empty">
                      <strong>{rank}</strong>
                      <span>Disponible</span>
                    </div>
                  )}
                </div>
              );
            })}

            <h2>Tâches</h2>

            {currentDayItems.map((item) => {
              const departureTime =
                getDepartureTime(
                  item.time,
                  item.travelTimeMinutes
                );

              return (
                <div
  key={item.id}
  className={
    item.completed
      ? "plan-task plan-task--done"
      : "plan-task"
  }
  draggable
  onDragStart={() =>
    setDraggedItemId(item.id)
  }
  onDragEnd={() =>
    setDraggedItemId(null)
  }
>
                  {editingItemId === item.id && (
                    <div className="plan-postpone-box">
                      <input
                        type="date"
                        value={newDate}
                        onChange={(event) =>
                          setNewDate(
                            event.target.value
                          )
                        }
                      />

                      <input
                        type="time"
                        value={newTime}
                        onChange={(event) =>
                          setNewTime(
                            event.target.value
                          )
                        }
                      />

                      <button
                        type="button"
                        className="primary-button"
                        onClick={() =>
                          postponeItem(item.id)
                        }
                      >
                        Reporter
                      </button>
                    </div>
                  )}

                  {movingItemId === item.id && (
                    <div className="plan-postpone-box">
                      <label>Heure</label>

                      <select
                        value={moveHour}
                        onChange={(event) =>
                          setMoveHour(
                            event.target.value
                          )
                        }
                      >
                        {hours.map((hour) => (
                          <option
                            key={hour}
                            value={hour
                              .replace("h", "")
                              .padStart(2, "0")}
                          >
                            {hour}
                          </option>
                        ))}
                      </select>

                      <select
                        value={moveMinute}
                        onChange={(event) =>
                          setMoveMinute(
                            event.target.value
                          )
                        }
                      >
                        <option value="00">00</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="45">45</option>
                      </select>

                      <label>Top priorité</label>

                      <select
                        value={movePriority}
                        onChange={(event) =>
                          setMovePriority(
                            event.target.value
                          )
                        }
                      >
                        <option value="none">
                          Aucune
                        </option>
                        <option value="1">
                          Priorité 1
                        </option>
                        <option value="2">
                          Priorité 2
                        </option>
                        <option value="3">
                          Priorité 3
                        </option>
                      </select>

                      <button
                        type="button"
                        className="primary-button"
                        onClick={() =>
                          moveItem(item.id)
                        }
                      >
                        Déplacer
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                  >
                    <PlanIcon type={item.type} />

                    <div className="plan-slot-content">
                      <strong>{item.time}</strong>
                      <span>{item.title}</span>
                    </div>
                  </button>

                  {item.type === "appointment" && (
                    <div className="plan-appointment-details">
                      {item.location && (
                        <p>📍 {item.location}</p>
                      )}

                      {item.travelTimeMinutes ? (
                        <p>
                          {getTravelIcon(item.travelMode)}{" "}
                          Trajet :{" "}
                          {item.travelTimeMinutes} min
                        </p>
                      ) : null}

                      {departureTime && (
                        <p>
                          🕒 Départ conseillé :{" "}
                          {departureTime}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="plan-task-actions">
                    <button
                      type="button"
                      className="plan-action-button"
                      onClick={() => {
                        setEditingItemId(item.id);
                        setNewDate(item.date);
                        setNewTime(item.time);
                      }}
                    >
                      ↪
                    </button>

                    <button
                      type="button"
                      className="plan-action-button"
                      onClick={() => {
                        setMovingItemId(item.id);
                        setMoveHour(
                          item.time.slice(0, 2)
                        );
                        setMoveMinute(
                          item.time.slice(3, 5)
                        );
                        setMovePriority(
                          item.priorityRank
                            ? String(item.priorityRank)
                            : "none"
                        );
                      }}
                    >
                      📍
                    </button>

                    <button
                      type="button"
                      className="plan-action-button plan-action-button--danger"
                      disabled={
                        item.postponedCount >= 3
                      }
                      onClick={() =>
                        deleteItem(item.id)
                      }
                    >
                      🗑
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="plan-legend">
              <p>
                <span className="plan-dot" /> Tâche
              </p>
              <p>
                <span className="plan-square" /> Routine
              </p>
              <p>
                <span className="plan-triangle" /> Rendez-vous
              </p>
            </div>
          </aside>

          <div className="plan-grid-day">
            <div className="plan-grid-header">00</div>
            <div className="plan-grid-header">15</div>
            <div className="plan-grid-header">30</div>
            <div className="plan-grid-header">45</div>

            {hours.map((hour) => (
              <div
                key={hour}
                className="plan-hour-row"
              >
                <span>{hour}</span>

                <div className="plan-hour-cells">
                  {[0, 15, 30, 45].map((minute) => {
                    const slotItems =
                      displayedItems.filter(
                        (item) =>
                          item.time.startsWith(
                            hour
                              .replace("h", "")
                              .padStart(2, "0")
                          ) &&
                          item.time.endsWith(
                            String(minute).padStart(
                              2,
                              "0"
                            )
                          )
                      );

                    return (
                      <div
  key={minute}
  className="plan-slot"
  onDragOver={(event) => event.preventDefault()}
  onDrop={() => moveDraggedItemToTime(hour, minute)}
  onClick={() => openSlot(hour, minute)}
>
                        {slotItems.map((item) => (
                         <button
  key={item.id}
  type="button"
  className={
    (item as any).isTravel
      ? "plan-slot-item plan-slot-item--travel"
      : item.type === "task"
      ? "plan-slot-item plan-slot-item--task"
      : item.type === "routine"
      ? "plan-slot-item plan-slot-item--routine"
      : "plan-slot-item plan-slot-item--appointment"
  }
  draggable={!(item as any).isTravel}
  onDragStart={() => {
    if (!(item as any).isTravel) {
      setDraggedItemId(item.id);
    }
  }}
  onDragEnd={() => {
    setDraggedItemId(null);
  }}
  onClick={(event) => {
    event.stopPropagation();
    toggleItem(item.id);
  }}
  title={item.title}
>
                            {(item as any).isTravel ? (
                              <>
                                <span>
                                  {getTravelIcon(
                                    item.travelMode
                                  )}
                                </span>

                                <div className="plan-slot-content">
                                  <strong>
                                    {item.time}
                                  </strong>
                                  <span>Trajet</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <PlanIcon
                                  type={item.type}
                                />

                                <div className="plan-slot-content">
                                  <strong>
                                    {item.time}
                                  </strong>
                                  <span>
                                    {item.title}
                                  </span>
                                </div>
                              </>
                            )}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {view === "week" && (
        <div className="week-view">
          {weekDays.map((day) => {
            const dayItems = items.filter(
              (item) => item.date === day.date
            );

            return (
              <div
                key={day.date}
                className="week-day-card"
              >
                <strong>{day.label}</strong>

                <small>
                  {new Date(
                    day.date
                  ).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </small>

                {dayItems.length === 0 && (
                  <p className="week-empty">
                    Rien prévu
                  </p>
                )}

                {dayItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={
                      item.completed
                        ? "week-item week-item--done"
                        : "week-item"
                    }
                    onClick={() =>
                      toggleItem(item.id)
                    }
                  >
                    <PlanIcon type={item.type} />

                    <div>
                      <div className="week-item-time">
                        {item.time}
                      </div>
                      <div className="week-item-title">
                        {item.title}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {view === "month" && (
        <>
          <div className="month-view">
            {Array.from({ length: 31 }, (_, index) => {
              const dayNumber = index + 1;

              const monthDate = `${currentDate.slice(
                0,
                8
              )}${String(dayNumber).padStart(2, "0")}`;

              const dayItems = items.filter(
                (item) => item.date === monthDate
              );

              return (
                <div
                  key={monthDate}
                  className="month-day"
                  onClick={() =>
                    setSelectedDate(monthDate)
                  }
                >
                  <div className="month-day-number">
                    {dayNumber}
                  </div>

                  <div className="month-icons">
                    {dayItems
                      .slice(0, 6)
                      .map((item) => (
                        <PlanIcon
                          key={item.id}
                          type={item.type}
                        />
                      ))}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedDate && (
            <div className="card">
              <h3>
                📅{" "}
                {new Date(
                  selectedDate
                ).toLocaleDateString("fr-FR")}
              </h3>

              {items
                .filter(
                  (item) => item.date === selectedDate
                )
                .map((item) => (
                  <p key={item.id}>
                    {item.time} • {item.title}
                  </p>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}