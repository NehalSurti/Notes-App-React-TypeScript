import "./Home.css";
import AddNote from "../../components/AddNote/AddNote";
import Note from "../../components/Note/Note";
import { useContext } from "react";
import { ThemeContext } from "../../Context/Theme/Theme";
import { NotesStateContext } from "../../Context/NotesState/NotesState";

function Home() {
  const theme = useContext(ThemeContext);
  const { state } = useContext(NotesStateContext);
  const notes = state.notes;

  return (
    <div className={`Home ${theme}`}>
      <h2>Notes App [{notes.length}]</h2>
      <AddNote></AddNote>
      {notes.map((note) => {
        return (
          <Note
            id={note.id}
            key={note.id}
            text={note.text}
            priority={note.priority}
            createdAt={note.createdAt}
            updatedAt={note.updatedAt}
            note={note}
            height="3"
          ></Note>
        );
      })}
    </div>
  );
}

export default Home;
