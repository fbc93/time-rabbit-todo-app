import styled from "styled-components";

const Wrapper = styled.div`
  font-size:2.5rem;
  text-align:center;
  padding:6em 1em 2em;

  .date {
    font-size:2.3rem;
    margin-bottom:0.5em;
    font-weight:600;
  }

  .time {
    font-size:10rem;
    margin-bottom:0.5em;
    font-weight:bold;
  }

  .greeting {
    font-size:1.8rem;
    line-height:1.5;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <div className="date">2023년 05월 06일 (토)</div>
      <div className="time">
        10:30:12
      </div>
      <div className="greeting">
        <p>안녕하세요.</p>
        <p>오늘의 할일을 체크해보세요.</p>
      </div>
    </Wrapper>
  );
}

export default Header;