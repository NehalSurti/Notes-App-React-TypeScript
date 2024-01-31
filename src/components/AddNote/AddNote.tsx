import { useState } from "react";
import "./AddNote.css";
import { NoteType } from "../Note/noteType";
import { v4 as uuidv4 } from "uuid";
import {Priority} from '../Note/noteType';

type AddNoteProps = {
  addNote: (note: NoteType) => void;
};

export default function AddNote({ addNote }: AddNoteProps) {

  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>('low');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addNote({
      text,
      priority,
      id: uuidv4(),
    });
    setText("");
    setPriority('low');
  };

  const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>
    ) => {
      setPriority(e.target.value as Priority);
  }
  return (
    <div>
      <form className="add-note">
        <input type="text" onChange={handleChange} value={text}/>
        <select onChange={handleSelect} value={priority}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleClick}>Add</button>
      </form>
    </div>
  );
}