import styled from "styled-components";

const Wrapper = styled.div`
  opacity:0.5;
  background-color:${(props) => props.theme.emptyBg};
  padding:10em 30em;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  border-radius:1em;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  span {
    display:inline-block;
    margin-bottom:0.3em;
    font-size:4rem;
  }

  div {
    font-size:1.8rem;
    line-height:1.2;
    text-align:center;
  }
`;

const EmptyBoard = () => {
  return (
    <Wrapper>
      <span className="material-symbols-rounded">
        add_notes
      </span>
      <div>보드 이름을 작성하고 <br /> 새로운 보드를 추가해보세요!</div>
    </Wrapper>
  );
}

export default EmptyBoard;