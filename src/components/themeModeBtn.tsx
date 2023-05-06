import { useRecoilState } from "recoil";
import styled from "styled-components";
import { darkMode } from "../atoms";

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

  const [data, setData] = useRecoilState(darkMode);
  const onClickChangeMode = () => setData((currentMode) => !currentMode);

  return (
    <Button onClick={onClickChangeMode}>
      <span className="material-symbols-rounded">
        {data ? "sleep" : "clear_day"}
      </span>
    </Button>
  );
}

export default ThemeModeBtn;