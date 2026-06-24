import { useState } from "react";

import { loadPlanItems, savePlanItems } from "../plan/planStorage";
import type { PlanItem } from "../plan/planTypes";
import {
  deleteNoteEverywhere,
  loadNotes,
  saveNotes,
  type Note,
} from "./notesStorage";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function createTask(title: string, index = 0): PlanItem {
  return {
    id: createId(),
    title,
    type: "task",
    date: getToday(),
    time: `${String(10 + index).padStart(2, "0")}:00`,
    completed: false,
    postponedCount: 0,
    recurrence: "none",
  };
}

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(loadNotes());
  const [text, setText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [taskNote, setTaskNote] = useState<Note | null>(null);
  const [guidedNote, setGuidedNote] = useState<Note | null>(null);
  const [guideSteps, setGuideSteps] = useState(["", "", ""]);
  const [message, setMessage] = useState("");

  function updateNotes(nextNotes: Note[]) {
    setNotes(nextNotes);
    saveNotes(nextNotes);
  }

  function addNote() {
    if (!text.trim()) return;

    updateNotes([
      {
        id: createId(),
        text: text.trim(),
        createdAt: new Date().toISOString(),
      },
      ...notes,
    ]);

    setText("");
    setMessage("Note ajoutee.");
  }

  function startEdit(note: Note) {
    setEditingNoteId(note.id);
    setEditingText(note.text);
  }

  function saveEdit(noteId: string) {
    if (!editingText.trim()) return;

    updateNotes(
      notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              text: editingText.trim(),
            }
          : note
      )
    );

    setEditingNoteId(null);
    setEditingText("");
    setMessage("Note modifiee.");
  }

  function deleteNote(noteId: string) {
    const nextNotes = notes.filter((note) => note.id !== noteId);
    setNotes(nextNotes);
    deleteNoteEverywhere(noteId);
    setMessage("Note supprimee.");
  }

  function addDirectTask(note: Note) {
    const nextItems = [createTask(note.text), ...loadPlanItems()];
    savePlanItems(nextItems);
    setTaskNote(null);
    setMessage("Note ajoutee comme tache dans Plan.");
  }

  function startGuidedTask(note: Note) {
    setTaskNote(null);
    setGuidedNote(note);
    setGuideSteps(["", "", ""]);
  }

  function saveGuidedTasks() {
    if (!guidedNote) return;

    const cleanSteps = guideSteps
      .map((step) => step.trim())
      .filter(Boolean);

    const taskTitles =
      cleanSteps.length > 0
        ? cleanSteps.map((step) => `${guidedNote.text} - ${step}`)
        : [guidedNote.text];

    const nextItems = [
      ...taskTitles.map((title, index) => createTask(title, index)),
      ...loadPlanItems(),
    ];

    savePlanItems(nextItems);
    setGuidedNote(null);
    setGuideSteps(["", "", ""]);
    setMessage("Tache decomposée ajoutee dans Plan.");
  }

  return (
    <div className="page notes-page">
      <header className="page-header">
        <h1>Notes</h1>
        <p>Pose une idee, puis transforme-la en action quand tu veux.</p>
      </header>

      <section className="card notes-compose-card">
        <textarea
          value={text}
          placeholder="Ecrire une note..."
          onChange={(event) => setText(event.target.value)}
        />

        <button type="button" className="primary-button" onClick={addNote}>
          Ajouter la note
        </button>
      </section>

      {message && <p className="success-message">{message}</p>}

      <section className="notes-list">
        {notes.map((note) => (
          <article key={note.id} className="card note-card">
            {editingNoteId === note.id ? (
              <>
                <textarea
                  value={editingText}
                  onChange={(event) => setEditingText(event.target.value)}
                />

                <div className="note-actions">
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => saveEdit(note.id)}
                  >
                    Enregistrer
                  </button>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setEditingNoteId(null)}
                  >
                    Annuler
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{note.text}</p>
                <small>
                  {new Date(note.createdAt).toLocaleDateString("fr-FR")}
                </small>

                <div className="note-actions">
                  <button type="button" onClick={() => startEdit(note)}>
                    Modifier
                  </button>

                  <button type="button" onClick={() => setTaskNote(note)}>
                    Ajouter en tache
                  </button>

                  <button
                    type="button"
                    className="note-danger-button"
                    onClick={() => deleteNote(note.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </article>
        ))}
      </section>

      {taskNote && (
        <div className="note-choice-sheet">
          <section className="note-choice-panel">
            <h2>Ajouter cette note en tache ?</h2>
            <p>{taskNote.text}</p>

            <button
              type="button"
              className="primary-button"
              onClick={() => addDirectTask(taskNote)}
            >
              Ajouter directement
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => startGuidedTask(taskNote)}
            >
              Me guider pour decomposer
            </button>

            <button
              type="button"
              className="note-sheet-close"
              onClick={() => setTaskNote(null)}
            >
              Annuler
            </button>
          </section>
        </div>
      )}

      {guidedNote && (
        <div className="note-choice-sheet">
          <section className="note-choice-panel">
            <h2>Decomposer la tache</h2>
            <p>{guidedNote.text}</p>

            {guideSteps.map((step, index) => (
              <label key={index}>
                Etape {index + 1}
                <input
                  value={step}
                  placeholder={
                    index === 0
                      ? "Premiere petite action..."
                      : "Action suivante..."
                  }
                  onChange={(event) => {
                    const nextSteps = [...guideSteps];
                    nextSteps[index] = event.target.value;
                    setGuideSteps(nextSteps);
                  }}
                />
              </label>
            ))}

            <button
              type="button"
              className="primary-button"
              onClick={saveGuidedTasks}
            >
              Ajouter les etapes dans Plan
            </button>

            <button
              type="button"
              className="note-sheet-close"
              onClick={() => setGuidedNote(null)}
            >
              Annuler
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
