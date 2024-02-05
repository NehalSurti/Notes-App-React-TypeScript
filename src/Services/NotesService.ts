import { NoteType } from "../Types/Types";

export async function getNotes() {
  try {
    const response = await fetch("/notes?_sort=updatedAt&_order=desc");
    const notes = await response.json();
    return notes.map((note: NoteType) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
    }));
  } catch (err) {
    console.error("Error fetching notes:", err);
    throw err;
  }
}

export async function addNote(note: NoteType) {
  try {
    const response = await fetch("/notes", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    const noteFromDB = await response.json();
    return {
      ...noteFromDB,
      createdAt: new Date(noteFromDB.createdAt),
      updatedAt: new Date(noteFromDB.updatedAt),
    };
  } catch (err) {
    console.error("Error fetching notes:", err);
    throw err;
  }
}

export async function deleteNote(id: string) {
  try {
    const response = await fetch(`/notes/${id}`, {
      method: "delete",
    });
    return await response.json();
  } catch (err) {
    console.error("Error fetching notes:", err);
    throw err;
  }
}

export async function updateNote(id: string, note: NoteType) {
  try {
    const response = await fetch(`/notes/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    const noteFromDB = await response.json();
    return {
      ...noteFromDB,
      createdAt: new Date(noteFromDB.createdAt),
      updatedAt: new Date(noteFromDB.updatedAt),
    };
  } catch (err) {
    console.error("Error fetching notes:", err);
    throw err;
  }
}
