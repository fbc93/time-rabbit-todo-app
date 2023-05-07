import styled from "styled-components";
import Body from "./body";
import Header from "./header";
import ThemeModeBtn from "./themeModeBtn";

const Wrapper = styled.div`
  background-color:${(props) => props.theme.bg};
  color:${(props) => props.theme.onBg};
  width:100%;
  height:100vh;
  position:relative;
  transition: background-color 0.2s ease-in-out;
  overflow-x:hidden;
`;

const BoardList = () => {
  return (
    <Wrapper>
      <ThemeModeBtn />
      <Header />
      <Body />
    </Wrapper>
  );
}

export default BoardList;