import { loadNotes } from "../notes/notesStorage";

export function NotesCard() {
  const notes = loadNotes()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3);

  if (notes.length === 0) return null;

  return (
    <section className="card">
      <h2>📝 Notes</h2>

      {notes.map((note) => (
        <p key={note.id}>• {note.text}</p>
      ))}
    </section>
  );
}