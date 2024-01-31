import "./Note.css";
import {NoteProps} from'./noteType'

// type NoteProps = {
//     text : string;
//     priority : 'high' | 'medium' | 'low';
// }

export default function Note({text,priority}:NoteProps) {
  return (
    <div className={`note ${priority}`}>{text}</div>
  )
}
