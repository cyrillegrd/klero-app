import {
  saveCloudNote,
  deleteCloudNote,
} from "./notesCloud";

export type Note = {
  id: string;
  text: string;
  createdAt: string;
};

const NOTES_KEY = "klero_notes";

export function loadNotes(): Note[] {
  const data = localStorage.getItem(NOTES_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveNotes(notes: Note[]) {
  localStorage.setItem(
    NOTES_KEY,
    JSON.stringify(notes)
  );

  notes.forEach((note) => {
    saveCloudNote(note);
  });
}

export function deleteNoteEverywhere(noteId: string) {
  const notes = loadNotes().filter(
    (note) => note.id !== noteId
  );

  saveNotes(notes);
  deleteCloudNote(noteId);
}