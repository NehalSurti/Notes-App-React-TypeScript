import "./App.css";
import { useReducer, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Switch from "react-switch";
import { ThemeContext } from "./Context/Theme/Theme";
import { NotesStateContext } from "./Context/NotesState/NotesState";
import { FaSun, FaMoon } from "react-icons/fa";
import { noteReducer } from "./Reducers/NoteReducer";
import { getNotes } from "./Services/NotesService";
import Home from "./Pages/Home/Home";
import DetailedNote from "./Pages/DetailedNote/DetailedNote";
import { initialState } from "./Context/NotesState/NotesState";

function App() {
  const [theme, setTheme] = useState("light");
  const [checked, setChecked] = useState(false);
  const [state, dispatch] = useReducer(noteReducer, initialState);

  const handleChange = (check: boolean) => {
    setChecked(check);
    if (check) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    async function initializeNotes() {
      const notes = await getNotes();
      dispatch({ type: "INIT_NOTES", payload: notes });
    }
    initializeNotes();
  }, []);

  return (
    <NotesStateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <div className={`App ${theme}`}>
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
          <BrowserRouter>
            <Routes>
              <Route path="/:id" element={<DetailedNote />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    </NotesStateContext.Provider>
  );
}

export default App;
