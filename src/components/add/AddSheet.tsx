import { useNavigate } from "react-router-dom";

type AddSheetProps = {
  onClose: () => void;
};

const addOptions = [
  {
    icon: "❤️",
    title: "Suivi",
    description: "Remplir une fiche du jour",
    path: "/suivi",
  },
  {
    icon: "✅",
    title: "Tâche",
    description: "Ajouter une action au plan",
    path: "/plan",
  },
  {
    icon: "📅",
    title: "Rendez-vous",
    description: "Prévoir un moment important",
    path: "/plan",
  },
  {
    icon: "🔄",
    title: "Routine",
    description: "Créer une suite guidée",
    path: "/routines",
  },
  {
    icon: "📝",
    title: "Note",
    description: "Garder une idée ou un contexte",
    path: "/plan",
  },
];

export function AddSheet({ onClose }: AddSheetProps) {
  const navigate = useNavigate();

  function handleSelect(path: string) {
    navigate(path);
    onClose();
  }

  return (
    <div className="add-sheet-backdrop" onClick={onClose}>
      <section
        className="add-sheet"
        aria-label="Ajouter un élément"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="add-sheet__header">
          <div>
            <h2>Que veux-tu faire ?</h2>
            <p>Bronto t’aide à avancer pas à pas.</p>
          </div>

          <button
            type="button"
            className="add-sheet__close"
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        <div className="add-sheet__grid">
          {addOptions.map((option) => (
            <button
              type="button"
              key={option.title}
              className="add-option"
              onClick={() => handleSelect(option.path)}
            >
              <span className="add-option__icon">{option.icon}</span>

              <span>
                <strong>{option.title}</strong>
                <small>{option.description}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}