import { useContext } from "react";
import Card from "../Card/Card";
import "./Note.css";
import { ColorLight, ColorDark} from "./noteType";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ThemeContext } from "../Context/Theme/Theme";

type NoteProps = {
  id: string;
  text: string;
  priority?: "high" | "medium" | "low";
  editNote: (id: string) => void;
  deleteNote: (id: string) => void;
};

export default function Note({
  id,
  text,
  priority,
  editNote,
  deleteNote,
}: NoteProps) {
  const theme = useContext(ThemeContext);
  return (
    <Card padding="2" height="4" bgColor={priority && (theme === 'dark'? ColorDark[priority]: ColorLight[priority])}>
      <>
        <div>{text}</div>
        <div className="right-corner">
          <FaEdit onClick={() => editNote(id)}></FaEdit>
          <FaTrash onClick={() => deleteNote(id)}></FaTrash>
        </div>
      </>
    </Card>
  );
}
