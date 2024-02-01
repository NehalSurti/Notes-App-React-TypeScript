import { useContext, useState } from "react";
import "./Home.css";
import AddNote from '../../components/AddNote/AddNote'
import Note from "../../components/Note/Note";
import { Notes } from "../../components/Note/data";
import { NoteType } from "../../components/Note/noteType";
import { ThemeContext } from "../../components/Context/Theme/Theme";

function Home() {
  const [notes, setNotes] = useState(Notes);
  const [editMode, setEditMode] = useState(false);
  const [noteToBeEditted, setNoteToBeEditted] = useState<NoteType | null>(null);
  const theme = useContext(ThemeContext);
  const addNote = (note: NoteType) => {
    setNotes([note, ...notes]);
  };

  const updateNote = (updateNote: NoteType) => {
    const index = notes.findIndex((note) => note.id === updateNote.id);
    let updateNotes = [...notes];
    updateNotes.splice(index, 1, updateNote);
    setNotes(updateNotes);
    setEditMode(false);
  };

  const editNote = (id: string) => {
    const note = notes.find((note) => note.id === id);
    setEditMode(true);
    note && setNoteToBeEditted(note);
  };

  const deleteNote = (id: string) => {
    const index = notes.findIndex((note) => note.id === id);
    let editNotes = [...notes];
    editNotes.splice(index, 1);
    setNotes(editNotes);
  };

  return (
    <div className={`Home ${theme}`}>
      <h2>Notes App [{notes.length}]</h2>
      <AddNote
        updateNote={updateNote}
        addNote={addNote}
        editMode={editMode}
        noteToBeEditted={noteToBeEditted}
      ></AddNote>
      {notes.map((note) => {
        return (
          <Note
            id={note.id}
            editNote={editNote}
            deleteNote={deleteNote}
            key={note.id}
            text={note.text}
            priority={note.priority}
          ></Note>
        )
      })}
    </div>
  )
}

export default Home;
