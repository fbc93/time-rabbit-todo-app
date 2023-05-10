import styled from "styled-components";
import Body from "./body";
import Header from "./header";
import ThemeModeBtn from "./themeModeBtn";
import TodoResult from "./todoResult";

const Wrapper = styled.div`
  background-color:${(props) => props.theme.bg};
  color:${(props) => props.theme.onBg};
  width:100%;
  position:relative;
  transition: background-color 0.2s ease-in-out;
  overflow-x:hidden;
`;

const BoardList = () => {
  return (
    <Wrapper>
      <ThemeModeBtn />
      <TodoResult />
      <Header />
      <Body />
    </Wrapper>
  );
}

export default BoardList;