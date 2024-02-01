import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import { ThemeContext } from "./components/Context/Theme/Theme";
import Switch from "react-switch";
import { FaSun, FaMoon } from "react-icons/fa";

function App() {
  const [theme, setTheme] = useState("light");
  const [checked, setChecked] = useState(false);
  const handleChange = (check: boolean) => {
    setChecked(check);
    if (check) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <ThemeContext.Provider value={theme}>
      <Switch
        onChange={handleChange}
        checked={checked}
        className="react-switch"
        checkedIcon={
          <FaSun
            size={23}
            style={{ verticalAlign: "middle", paddingLeft: '6px'}}
            color="yellow"
          ></FaSun>
        }
        uncheckedIcon={
          <FaMoon
            size={23}
            style={{ verticalAlign: "middle",paddingLeft: '6px' }}
            color="white"
          ></FaMoon>
        }
        onColor="#900"
        offColor="#333"
      />
      <Home></Home>
    </ThemeContext.Provider>
  );
}

export default App;
