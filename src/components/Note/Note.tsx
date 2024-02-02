import { useContext } from "react";
import Card from "../Card/Card";
import "./Note.css";
import { ColorLight, ColorDark } from "./noteType";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ThemeContext } from "../Context/Theme/Theme";
import { NotesStateContext } from "../Context/NotesState/NotesState";

type NoteProps = {
  id: string;
  text: string;
  priority?: "high" | "medium" | "low";
};

export default function Note({ id, text, priority }: NoteProps) {
  const theme = useContext(ThemeContext);
  const { dispatch } = useContext(NotesStateContext);

  return (
    <Card
      padding="2"
      height="4"
      bgColor={
        priority &&
        (theme === "dark" ? ColorDark[priority] : ColorLight[priority])
      }
    >
      <>
        <div>{text}</div>
        <div className="right-corner">
          <FaEdit
            onClick={() => dispatch({ type: "EDIT_NOTE", payload: id })}
          ></FaEdit>
          <FaTrash
            onClick={() => dispatch({ type: "DELETE_NOTE", payload: id })}
          ></FaTrash>
        </div>
      </>
    </Card>
  );
}
