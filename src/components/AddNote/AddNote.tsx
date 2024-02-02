import { useContext, useEffect, useState } from "react";
import "./AddNote.css";
import { NoteType } from "../Note/noteType";
import { v4 as uuidv4 } from "uuid";
import { Priority } from "../Note/noteType";
import Card from "../Card/Card";
import { ThemeContext } from "../Context/Theme/Theme";
import { NotesStateContext } from "../Context/NotesState/NotesState";

// type AddNoteProps = {
//   addNote: (note: NoteType) => void;
//   updateNote: (note: NoteType) => void;
//   editMode: boolean;
//   noteToBeEditted: NoteType | null;
// };

export default function AddNote() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const theme = useContext(ThemeContext);

  const { state, dispatch } = useContext(NotesStateContext);
  const editMode = state.editMode;
  const noteToBeEditted = state.noteToBeEditted;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (editMode) {
      noteToBeEditted &&
        dispatch({
          type: "UPDATE_NOTE",
          payload: {
            text,
            priority,
            id: noteToBeEditted.id,
          },
        });
    } else {
      dispatch({
        type: "ADD_NOTE",
        payload: {
          text,
          priority,
          id: uuidv4(),
        },
      });
    }
    setText("");
    setPriority("low");
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as Priority);
  };

  const setNoteContent = (note: NoteType) => {
    setText(note.text);
    setPriority(note.priority);
  };

  useEffect(() => {
    noteToBeEditted && editMode && setNoteContent(noteToBeEditted);
  }, [editMode, noteToBeEditted]);

  return (
    <Card padding="2" height="5" bgColor={theme === "dark" ? "#333" : "#ddd"}>
      <form className="add-note">
        <input type="text" onChange={handleChange} value={text} />
        <select onChange={handleSelect} value={priority}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleClick}>{editMode ? "Update" : "Add"}</button>
      </form>
    </Card>
  );
}
