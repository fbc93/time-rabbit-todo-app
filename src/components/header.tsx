import styled from "styled-components";

const Wrapper = styled.div`
  font-size:2.5rem;
  text-align:center;
  
  .date {
    font-size:2rem;
    margin-bottom:0.5em;
    font-weight:600;
  }

  .time {
    font-size:5rem;
    margin-bottom:0.5em;
    font-weight:bold;
  }

  .greeting {
    font-size:1.8rem;
    line-height:1.5;
  }
`;

const Container = styled.div`
  width:960px;
  margin:auto;
  padding:18vh 0px 5vh;
`;

const HeaderImage = styled.div`
  width:100px;
  height:100px;
  border:1px solid red;
  margin:auto auto 0.5em auto;
`;

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <div className="date">2023년 05월 06일 (토)</div>
        <div className="time">
          10:30:12
        </div>
        {/* <HeaderImage></HeaderImage> */}
        <div className="greeting">
          <div>⏰ 오늘 하루가 다 가기전에 <br /> 하나씩 당신의 Todo를 완료해보세요!</div>
        </div>
      </Container>
    </Wrapper>
  );
}

export default Header;