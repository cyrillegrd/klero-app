import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { auth } from "../../lib/auth";
import { db } from "../../lib/db";
import type { Note } from "./notesStorage";

function getNotesCollection() {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) {
    return null;
  }

  return collection(db, "users", user.uid, "notes");
}

export async function loadCloudNotes(): Promise<Note[]> {
  const notesCollection = getNotesCollection();

  if (!notesCollection) return [];

  const snapshot = await getDocs(notesCollection);

  return snapshot.docs
    .map((docSnap) => docSnap.data() as Note)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveCloudNote(note: Note) {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) return;

  await setDoc(
    doc(db, "users", user.uid, "notes", note.id),
    note
  );
}

export async function deleteCloudNote(noteId: string) {
  const user = auth.currentUser;

  if (!user || !user.emailVerified) return;

  await deleteDoc(
    doc(db, "users", user.uid, "notes", noteId)
  );
}