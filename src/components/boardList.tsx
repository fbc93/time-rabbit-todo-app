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

  .title {
    text-align:center;
    font-size:2rem;
    line-height:1.5;
    font-weight:bold;
    margin-bottom:2em;
  }

  .todo-list {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .list-title {
    font-size:1.5rem;
    letter-spacing:-0.5px;
    font-weight:bold;
    margin-bottom:1em;
  }

  ul {
    background-color:${(props) => props.theme.listBg};
    border-radius:10px;
    max-height: 218px;
    overflow-y: auto;

    li {
      font-size:1.4rem;
      padding: 1.5em;
      border-bottom: 0.2em solid ${(props) => props.theme.line};
      display:flex;
      justify-content:space-between;
      align-items:center;

      span:last-child {
        color:red;
      }

      &:last-child {
        margin-bottom:0;
      }
    }
  }

  .button-wrap {
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-top:2em;

    button {
      width:100%;
      cursor:pointer;
      padding:1em 0;
      font-size:1.4rem;
      letter-spacing:-0.5px;
      border-radius:5px;
      border:none;
      font-weight:bold;
      background-image:${(props) => props.theme.resultBg};
      color:${(props) => props.theme.onBgText};
    }

    button:first-child {
      margin-bottom:0.5em;
    }
  }
`;

const Popup = styled.div`
  width:40%;
  aspect-ratio:1/1;
  position:fixed;
  left:50%;
  top:50%;
  transform:translate(-50%, -50%);
  background-color:${(props) => props.theme.bg};
  border-radius:15px;
  padding:5em;
  display: flex;
  flex-direction: column;
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

  //달성한 모든 투두 배열
  let allTodoContents: string[] = [];
  existTodosArray.map((array) => array.map((value) => value.content).map((content) => allTodoContents.push(content)));

  //popup show/hide
  useEffect(() => {

    if (isCompleteLength === allTodosLength && allTodosLength > 0) {
      setResultPopup(true);
    }

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
          <div className="title">짝짝짝 👏👏👏<br /> 계획한 Todo를 모두 처리하셨어요!</div>
          <div className="todo-list">
            <div>
              <div className="list-title">📌 처리한 Todo 목록</div>
              <ul>
                {allTodoContents.map((item, index) =>
                  <li key={index}>
                    <span>{item}</span>
                    <span className="material-symbols-rounded">
                      done
                    </span>
                  </li>
                )}
              </ul>
            </div>
            <div className="button-wrap">
              <button onClick={onClickClosePopup}>이어서 하기</button>
              <button onClick={onClickTodoReset}>모든 Todo 리셋</button>
            </div>
          </div>
        </Popup>
      </Layer>

    </Wrapper>
  );
}

export default BoardList;