import { useReducer, useState } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import { ThemeContext } from "./components/Context/Theme/Theme";
import Switch from "react-switch";
import { FaSun, FaMoon } from "react-icons/fa";
import { NoteType } from "./components/Note/noteType";
import { Notes } from "./components/Note/data";
import { NotesStateContext } from "./components/Context/NotesState/NotesState";

interface NoteState {
  notes: NoteType[];
  editMode: boolean;
  noteToBeEditted: NoteType | null;
}

type NoteAction =
  | { type: "ADD_NOTE"; payload: NoteType }
  | { type: "EDIT_NOTE"; payload: string }
  | { type: "DELETE_NOTE"; payload: string }
  | { type: "UPDATE_NOTE"; payload: NoteType };

const noteReducer = (state: NoteState, action: NoteAction): NoteState => {
  switch (action.type) {
    case "ADD_NOTE":
      return { ...state, notes: [action.payload, ...state.notes] };
    case "EDIT_NOTE":
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        return { ...state, editMode: true, noteToBeEditted: note };
      } else {
        return state;
      }
    case "DELETE_NOTE":
      const index = state.notes.findIndex((note) => note.id === action.payload);
      let editNotes = [...state.notes];
      editNotes.splice(index, 1);
      return { ...state, notes: editNotes };
    case "UPDATE_NOTE":
      const idx = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      let updatedNotes = [...state.notes];
      updatedNotes.splice(idx, 1, action.payload);
      return { ...state, notes: updatedNotes, editMode: false };
    default:
      return state;
  }
};

function App() {
  const [theme, setTheme] = useState("light");
  const [checked, setChecked] = useState(false);
  const initialState: NoteState = {
    notes: Notes,
    editMode: false,
    noteToBeEditted: null,
  };
  const [state, dispatch] = useReducer(noteReducer, initialState);

  const handleChange = (check: boolean) => {
    setChecked(check);
    if (check) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <NotesStateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
          checkedIcon={
            <FaSun
              size={23}
              style={{ verticalAlign: "middle", paddingLeft: "6px" }}
              color="yellow"
            ></FaSun>
          }
          uncheckedIcon={
            <FaMoon
              size={23}
              style={{ verticalAlign: "middle", paddingLeft: "6px" }}
              color="white"
            ></FaMoon>
          }
          onColor="#900"
          offColor="#333"
        />
        <Home></Home>
      </ThemeContext.Provider>
    </NotesStateContext.Provider>
  );
}

export default App;
