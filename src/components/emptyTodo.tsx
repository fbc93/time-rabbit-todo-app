import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.emptyBg};
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;
  padding:3em 2em;
  border-radius:1em;
  text-align:center;
  

  span {
    font-size:3rem;
    display:inline-block;
    margin-bottom:0.3em;
    color:${(props) => props.theme.onBgText}!important;
    opacity:0.8;
  }

  div {
    font-size:1.3rem;
    line-height:1.5;
    color:${(props) => props.theme.onBgText};
    opacity:0.8;
  }
`;

const EmptyTodo = () => {

  return (
    <Wrapper>
      <span className="material-symbols-rounded">
        post_add
      </span>
      <div>새로운 투두를 추가해보세요!</div>
    </Wrapper>
  );
}

export default EmptyTodo;