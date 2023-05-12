import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { BoardState, QuoteState } from "../atoms";
import { calcTodoProgress, getRandomQuotes, makeNumValueFormat } from "../utils";

const Wrapper = styled.div`
  //background-image: ${(props) => props.theme.resultBg};
  background-color:${(props) => props.theme.progressbar};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  height:80px;
  position:fixed;
  top:0;
  left:0;
  width:100%;
  overflow:hidden;
  transition: all 0.2s ease-in-out;
`;

const Container = styled.div`
  position:relative;
  padding:0 20px;
  width:960px;
  height:100%;
  margin:auto;
  color: ${(props) => props.theme.onBgText};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoArea = styled.div`
  height:100%;
  display:flex;
  align-items:center;
`;

const LeftBox = styled.div`
  margin-right:2em;
  font-size:1.5rem;
  line-height:1.3;
  font-weight:bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,.1);
`;
const RightBox = styled.div`
  display:flex;
  justify-content:center;
  align-items:baseline;
  font-size:2.5rem;
  font-weight:700;
  text-shadow: 2px 2px 4px rgba(0,0,0,.1);
  
  .number {
    font-size:4rem;
    font-weight:600;
    margin-right:0.1em;
    line-height:3rem;
  }

  div:last-child {
    opacity:0.5;
  }
`;

const ProgressBar = styled.div<{ percentage: number }>`
  position:absolute;
  width: ${(props) => props.percentage}%;
  height:100%;
  background-image:${(props) => props.theme.resultBg};
  transition: width 0.3s ease-in-out;
`;

const Quotes = styled.div`
  width:60%;
  overflow:hidden;
  height: 100%;
  line-height: 80px;
  
  span:first-child {
    display:inline-block;
    margin-right:1rem;
  }

  span {
    font-size:1.5rem;
    text-align:left;
    font-weight:400;
    text-shadow: 2px 2px 4px rgba(0,0,0,.1);
    line-height:2;
    letter-spacing: -0.3px;
  }
`;

const EmptyToDo = styled.div`
  font-size:1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight:bold;

  span {
    display:inline-block;
    margin-right:0.3em;
  }
`;

const TodoResult = () => {

  //Random Quotes
  const quoteValue = useRecoilValue(QuoteState);
  const randomQuotes = getRandomQuotes(quoteValue);

  //isComplete 개수, 모든 투두 개수 체크
  const boardsArray = useRecoilValue(BoardState);
  const boardsTodosArray = Object.keys(boardsArray).map(
    (index) => boardsArray[+index].toDos
  );

  const existTodosArray = boardsTodosArray.filter(
    (array) => array.length > 0
  );

  const isCompleteArray = Object.keys(existTodosArray)
    .map((index) => [...existTodosArray[+index]]
      .map((toDo) => toDo.isComplete));

  const isCompleteTrueArray = isCompleteArray
    .map((array) => array
      .filter((value) => value === true).length);

  const sumArrayValues = (sum: number, currentValue: number) => sum + currentValue;
  const isCompleteLength = isCompleteTrueArray.reduce(sumArrayValues, 0);

  const allTodosLengthArray = existTodosArray.map((array) => array.map((value) => value).length);
  const allTodosLength = allTodosLengthArray.reduce(sumArrayValues, 0);

  return (
    <Wrapper id="todoResult">
      <ProgressBar percentage={calcTodoProgress(isCompleteLength, allTodosLength)}></ProgressBar>
      <Container>
        <Quotes>
          <span>{randomQuotes.text}</span>
          <span>{` - ${randomQuotes.from}`}</span>
        </Quotes>
        <InfoArea>
          {isCompleteLength > 0 ? (
            <>
              <LeftBox>
                <div>당신이 처리한 </div>
                <div>TO DO는...?</div>
              </LeftBox>
              <RightBox>
                <div className="number">{makeNumValueFormat(isCompleteLength)}</div>
                <div> / {makeNumValueFormat(allTodosLength)}</div>
              </RightBox>
            </>
          ) : (
            <EmptyToDo>
              <span className="material-symbols-rounded">rocket_launch</span>
              <div>첫번째 Todo를 달성해보세요</div>
            </EmptyToDo>
          )}
        </InfoArea>
      </Container>
    </Wrapper>
  );
}

export default TodoResult;