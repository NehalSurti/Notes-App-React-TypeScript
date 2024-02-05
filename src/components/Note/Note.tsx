import "./Note.css";
import { useContext } from "react";
import { ColorLight, ColorDark, NoteProps } from "../../Types/Types";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ThemeContext } from "../../Context/Theme/Theme";
import { NotesStateContext } from "../../Context/NotesState/NotesState";
import { deleteNote } from "../../Services/NotesService";
import { Link } from "react-router-dom";
import Card from "../Card/Card";

export default function Note({
  id,
  text,
  priority,
  createdAt,
  updatedAt,
  note,
  isDetailed,
  height,
}: NoteProps) {
  const theme = useContext(ThemeContext);
  const { dispatch } = useContext(NotesStateContext);
  const optionalProps = height ? { height: height } : {};

  const handleDelete = async () => {
    await deleteNote(id);
    dispatch({ type: "DELETE_NOTE", payload: id });
  };

  return (
    <Card
      padding="2"
      bgColor={
        priority &&
        (theme === "dark" ? ColorDark[priority] : ColorLight[priority])
      }
      {...optionalProps}
    >
      <>
        {isDetailed ? (
          <div className={isDetailed ? "text" : "text text-hide"}>{text}</div>
        ) : (
          <Link
            to={id}
            style={{
              textDecoration: "none",
              color: `${theme === "dark" ? "white" : "black"}`,
              width: "100%",
            }}
          >
            <div className={isDetailed ? "text" : "text text-hide"}>{text}</div>
          </Link>
        )}

        <div className="left-corner date">{updatedAt.toLocaleString()}</div>
        {isDetailed ? null : (
          <div className="right-corner">
            <FaEdit
              onClick={() => dispatch({ type: "EDIT_NOTE", payload: id })}
              style={{ marginRight: "5px", cursor:"pointer" }}
            ></FaEdit>
            <FaTrash onClick={handleDelete} style={{cursor:"pointer" }}></FaTrash>
          </div>
        )}
      </>
    </Card>
  );
}
