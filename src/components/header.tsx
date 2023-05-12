import styled from "styled-components";

const Wrapper = styled.div`
  font-size:2.5rem;
  text-align:center;
  
  .date {
    font-size:1.8rem;
    margin-bottom:1em;
    font-weight:600;
  }

  #timer {
    font-size:3.5rem;
    font-weight:bold;
    letter-spacing:-1px;
  }

  #timer > div {
    display:inline-block;
  }

  #timer .unit {
    margin-right:0.3em;
  }

  .greeting {
    font-size:1.5rem;
    line-height:1.5;
  }
`;

const Container = styled.div`
  width:960px;
  margin:auto;
  padding:20vh 0px 5vh;
`;

const Header = () => {

  const LeftTime = () => {

    let now = String(new Date());
    now = now.replace(/-/g, "/");
    const current = new Date(now);

    const year = current.getFullYear();
    const month = current.getMonth();
    const date = current.getDate();

    const msSeconds = 1;
    const msMinutes = msSeconds * 60;
    const msHours = msMinutes * 60;

    const endTime = new Date(year, month, date, 24, 0, 0);
    const elapsedTime = Math.trunc((endTime.getTime() - current.getTime()) / 1000);

    const leftHours = Math.trunc(elapsedTime / msHours);
    const leftMinutes = Math.ceil((elapsedTime / msMinutes) % 60);
    const leftSeconds = ((elapsedTime / msSeconds) % 60) % 60

    const hours = String(leftHours).padStart(2, '0');
    const hoursArray = Array.from(hours);

    const minutes = String(leftMinutes).padStart(2, '0');
    const minutesArray = Array.from(minutes);

    const seconds = String(leftSeconds).padStart(2, '0');
    const secondsArray = Array.from(seconds);

    const hoursArray1 = document.querySelector(".hours > span:first-child");
    const hoursArray2 = document.querySelector(".hours > span:last-child");

    const minutesArray1 = document.querySelector(".minutes > span:first-child");
    const minutesArray2 = document.querySelector(".minutes > span:last-child");

    const secondsArray1 = document.querySelector(".seconds > span:first-child");
    const secondsArray2 = document.querySelector(".seconds > span:last-child");

    if (hoursArray1 && hoursArray2) {
      hoursArray1.innerHTML = hoursArray[0];
      hoursArray2.innerHTML = hoursArray[1];
    }

    if (secondsArray1 && secondsArray2) {
      secondsArray1.innerHTML = secondsArray[0];
      secondsArray2.innerHTML = secondsArray[1];
    }

    if (minutesArray1 && minutesArray2) {
      minutesArray1.innerHTML = minutesArray[0];
      minutesArray2.innerHTML = minutesArray[1];
    }
  }

  setInterval(LeftTime, 1000);

  return (
    <Wrapper>
      <Container>
        <div className="date">2023년 05월 12일 금요일은</div>

        <div id="timer" className="time">
          <div className="hours">
            <span>0</span>
            <span>0</span>
          </div>
          <div className="unit">시간 </div>
          <div className="minutes">
            <span>0</span>
            <span>0</span>
          </div>
          <div className="unit">분 </div>
          <div className="seconds">
            <span>0</span>
            <span>0</span>
          </div>
          <div className="unit">초</div>
          <div style={{ fontSize: "1.8rem", marginBottom: "1.5em", fontWeight: "600" }}>남았습니다.</div>
        </div>

        <div className="greeting">
          <div>⏰ 오늘 하루가 다 가기전에 <br />당신의 Todo를 하나씩 완료해보세요!</div>
        </div>
      </Container>
    </Wrapper>
  );
}

export default Header;