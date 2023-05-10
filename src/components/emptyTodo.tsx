import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.emptyBg};
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;
  padding:3em 2em;
  border-radius:1em;

  span {
    font-size:3rem;
    display:inline-block;
    margin-bottom:0.3em;
    color:${(props) => props.theme.onBgText}!important;
  }

  div {
    font-size:1.5rem;
    line-height:1.2;
    color:${(props) => props.theme.onBgText};
  }
`;

const EmptyTodo = () => {

  return (
    <Wrapper>
      <span className="material-symbols-rounded">
        add_notes
      </span>
      <div>새로운 투두를 <br /> 추가해보세요!</div>
    </Wrapper>
  );
}

export default EmptyTodo;