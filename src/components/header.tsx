import styled from "styled-components";

const Wrapper = styled.div`
  font-size:2.5rem;
  text-align:center;
  padding:3em 1em 2em;
`;

const Header = () => {
  return (
    <Wrapper>
      <div>2023년 05월 06일 (토)</div>
      <div style={{ margin: "10px 0" }}>10:30:12</div>
      <div>오늘의 할일을 체크해보세요.</div>
    </Wrapper>
  );
}

export default Header;