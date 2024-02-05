import { useContext } from "react";
import "./Card.css";
import { ThemeContext } from "../../Context/Theme/Theme";

type CardProp = {
  children: JSX.Element;
  bgColor?: string;
  height?: string;
  padding?: string;
};

export default function Card({ children, bgColor, height, padding }: CardProp) {
  const theme = useContext(ThemeContext);
  return (
    <div
      className={`card ${theme}`}
      style={{
        backgroundColor: bgColor,
        height: height,
        padding: `${padding}rem`,
      }}
    >
      {children}
    </div>
  );
}
