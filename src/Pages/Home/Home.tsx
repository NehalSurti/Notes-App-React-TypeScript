import { useContext } from "react";
import "./Home.css";
import AddNote from "../../components/AddNote/AddNote";
import Note from "../../components/Note/Note";
import { ThemeContext } from "../../components/Context/Theme/Theme";
import { NotesStateContext } from "../../components/Context/NotesState/NotesState";

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
          ></Note>
        );
      })}
    </div>
  );
}

export default Home;
