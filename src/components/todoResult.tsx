import styled from "styled-components";

const Wrapper = styled.div`
  background-image: ${(props) => props.theme.resultBg};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  height:92px;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  overflow:hidden;
  transition: all 0.2s ease-in-out;
`;

const Container = styled.div`
  width:960px;
  height:100%;
  margin:auto;
  display:flex;
  justify-content:center;
  align-items:center;
  color: ${(props) => props.theme.onBgText};
`;
const LeftBox = styled.div`
  margin-right:2em;
  font-size:2rem;
  line-height:1.1;
  font-weight:bold;
`;
const RightBox = styled.div`
  display:flex;
  justify-content:center;
  align-items:baseline;
  font-size:1.8rem;
  font-weight:bold;
 
  .number {
    font-size:5rem;
    font-weight:bold;
    margin-right:0.1em;
  }
`;

const TodoResult = () => {

  return (
    <Wrapper id="todoResult">
      <Container>
        <LeftBox>
          <div>오늘 당신이 처리한 </div>
          <div>To Do는 🏃‍♀️</div>
        </LeftBox>
        <RightBox>
          <div className="number">06</div>
          <div>개</div>
        </RightBox>
      </Container>
    </Wrapper>
  );
}

export default TodoResult;