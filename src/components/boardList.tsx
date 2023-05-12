import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { BoardState, defaultBoards, deleteBoards, ResultPopup } from "../atoms";
import Body from "./body";
import Header from "./header";
import ThemeModeBtn from "./themeModeBtn";
import TodoResult from "./todoResult";

const Wrapper = styled.div`
  color:${(props) => props.theme.onBg};
  width:100%;
  position:relative;
  transition: background-color 0.2s ease-in-out;
  overflow-x:hidden;
`;

const Layer = styled.div<{ resultPopup: boolean }>`
  width:100%;
  height:100%;
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  background-color: rgba(0,0,0,0.8);
  opacity: ${(props) => props.resultPopup ? "1" : "0"};
  z-index: ${(props) => props.resultPopup ? 1 : -1};
  transition: opacity 0.2s ease-in-out;
`;

const Popup = styled.div`
  width:40%;
  aspect-ratio:1/1;
  position:fixed;
  left:50%;
  top:50%;
  transform:translate(-50%, -50%);
  background-color:white;
  border-radius:15px;
  padding:5em;
`;

const BoardList = () => {

  const [boardData, setBoardData] = useRecoilState(BoardState);
  const [resultPopup, setResultPopup] = useRecoilState(ResultPopup);

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

  //완료된 투두 배열 내용
  const isCompleteTodoArray = Object.keys(existTodosArray)
    .map((index) => [...existTodosArray[+index]]
      .map((toDo) => toDo.content));

  useEffect(() => {
    //popup show
    if (isCompleteLength === allTodosLength && allTodosLength > 0) {
      setResultPopup(true);
    }

    //popup hide
    if (isCompleteLength !== allTodosLength) {
      setResultPopup(false);
    }

  }, [isCompleteLength, allTodosLength, setResultPopup]);


  //popup hide
  const onClickClosePopup = () => {

    setResultPopup(false);

    //이어가기 위한 신규 투두 1개 추가
    setBoardData((prevBoards) => {
      const copyPrevBoards = [...prevBoards];
      const firstBoard = { ...copyPrevBoards[0] };
      const copyFirstTodos = [...firstBoard.toDos];

      copyFirstTodos.splice(0, 0, {
        id: +new Date(),
        isComplete: false,
        content: "내용을 채워주세요",
        createAt: new Date(),
      })

      firstBoard.toDos = copyFirstTodos;
      copyPrevBoards.splice(0, 1, firstBoard);

      return copyPrevBoards;
    });
  }

  //todo reset
  const onClickTodoReset = () => {

    setResultPopup(false);

    //기존 투두보드 삭제
    deleteBoards();

    //디폴트 투두보드로 갱신
    setBoardData((prevBoards) => {
      let copyPrevBoards = [...prevBoards];
      copyPrevBoards = defaultBoards;

      return copyPrevBoards;
    });
  }

  return (
    <Wrapper>
      <ThemeModeBtn />
      <TodoResult />
      <Header />
      <Body />

      <Layer id="resultPopup" resultPopup={resultPopup}>
        <Popup>
          <div>짝짝짝 👏👏👏  고생하셨어요! <br /> 계획한 투두를 모두 처리하셨어요!</div>
          <div>
            <div>처리한 투두 목록</div>
            <ul>
              <li>공부하기</li>
              <li>청소하기</li>
              <li>놀기</li>
            </ul>
            <div>
              <button onClick={onClickClosePopup}>이어서 하기</button>
              <button onClick={onClickTodoReset}>투두 리셋하기</button>
            </div>
          </div>
        </Popup>
      </Layer>

    </Wrapper>
  );
}

export default BoardList;