import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ThemeState } from "../atoms";

const Button = styled.button`
  background-color:${(props) => props.theme.button};
  border:none;
  color:${(props) => props.theme.onBg};
  cursor:pointer;
  padding:0.8em;
  position:absolute;
  top:0;
  right:0;
  margin:1.5em;
  transition: background-color 0.2s ease-in-out;
  border-radius:50%;

  span {
    font-size:2.5rem;
  }
`;

const ThemeModeBtn = () => {

  const [themeData, setThemeData] = useRecoilState(ThemeState);

  const onClickChangeThemeMode = () => {
    setThemeData((prevTheme) => {
      if (prevTheme === "darkTheme") {
        return "lightTheme"

      } else {
        return "darkTheme"
      }
    });
  }

  return (
    <Button onClick={onClickChangeThemeMode}>
      <span className="material-symbols-rounded">
        {themeData === "darkTheme" ? "sleep" : "clear_day"}
      </span>
    </Button>
  );
}

export default ThemeModeBtn;