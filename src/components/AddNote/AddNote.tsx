import { useContext, useEffect, useState } from "react";
import "./AddNote.css";
import { v4 as uuidv4 } from "uuid";
import { NoteType, Priority } from "../../Types/Types";
import Card from "../Card/Card";
import { ThemeContext } from "../../Context/Theme/Theme";
import { NotesStateContext } from "../../Context/NotesState/NotesState";
import { addNote, updateNote } from "../../Services/NotesService";

export default function AddNote() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const theme = useContext(ThemeContext);

  const { state, dispatch } = useContext(NotesStateContext);
  const editMode = state.editMode;
  const noteToBeEditted = state.noteToBeEditted;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (editMode && noteToBeEditted) {
      const updatedNoteData = {
        text,
        priority,
        id: noteToBeEditted.id,
        createdAt: noteToBeEditted.createdAt,
        updatedAt: new Date(),
      };
      const updatedNote = await updateNote(noteToBeEditted.id, updatedNoteData);
      dispatch({
        type: "UPDATE_NOTE",
        payload: updatedNote,
      });
    } else {
      const noteData = {
        text,
        priority,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const note = await addNote(noteData);
      dispatch({
        type: "ADD_NOTE",
        payload: note,
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
        <textarea onChange={handleChange} value={text} />
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
