import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { BoardState, IBoardState } from "../atoms";
import Todo from "./todo";
import React from "react";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardBg};
  width:300px;
  height:fit-content;
  margin:0em 2em 4em 2em;
  padding:1.5em;
  box-sizing:border-box;
  border-radius:0.8em;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: ${(props) => props.theme.boardHover};

    .title {
      color:#333333;
    }

    span {
      color:#333333;
    }

    .left-box {
      .edit {
        opacity:1;
      }
    }
  }
`;

const BoardTitle = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:2em;
  color: ${(props) => props.theme.onBgText};

  .left-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .title {
      font-size:2rem;
      font-weight:bold;
      letter-spacing:-1px;
      margin-right:0.5em;
    }

    .edit {
      font-size:2.3rem;
      opacity:0;
      cursor:pointer;
    }
  }

  .right-box {
    span {
    cursor:pointer;
    &:first-child {
      margin-right:0.3em;
    }
    &:hover {
      color:rgba(255, 71, 87,1.0);
    }
  }
  }
`;

const TodoList = styled.div`
  display:flex;
  flex-direction:column;
  background-color:${(props) => props.theme.droppable};
  flex-grow:1;
  padding:1.5rem;
  border-radius:1em;
`;

interface PropsData extends IBoardState {
  index: number;
}

const Board = (propsData: PropsData) => {
  const { id, title, toDos, index } = propsData;
  const [boardData, setBoardData] = useRecoilState(BoardState);

  //보드 Delete
  const onClickDeleteBoard = () => {

    setBoardData((prevBoards) => {
      const copyPrevBoards = [...prevBoards];
      const targetBoardIndex = copyPrevBoards.findIndex((board) => board.id === id);

      copyPrevBoards.splice(targetBoardIndex, 1);

      return copyPrevBoards;
    })
  }

  //보드 타이틀 Update
  const onClickUpdateBoardTitle = () => {

    setBoardData((prevBoards) => {
      const copyPrevBoards = [...prevBoards];
      const targetBoardIndex = copyPrevBoards.findIndex((board) => board.id === id);
      const copyTargetBoard = { ...copyPrevBoards[targetBoardIndex] }

      const newTitle = window.prompt(`${title} 📌 보드의 새 타이틀을 입력하세요.`, title);

      if (newTitle) {
        copyTargetBoard.title = newTitle;
        copyPrevBoards.splice(targetBoardIndex, 1, copyTargetBoard);
      }

      return copyPrevBoards;
    });
  }

  //투두 Create
  const onClickAddTodo = () => {

    setBoardData((prevBoards) => {
      const copyPrevBoards = [...prevBoards];
      const targetBoardIndex = copyPrevBoards.findIndex((board) => board.id === id);
      const copyTargetBoard = { ...copyPrevBoards[targetBoardIndex] }

      const newTodoContent = window.prompt(`${title} 📌 보드에 새로운 투두를 추가해보세요.`);

      if (newTodoContent) {

        const newTodo = {
          id: +new Date(),
          content: newTodoContent
        }

        copyTargetBoard.toDos = [newTodo, ...copyTargetBoard.toDos];
        copyPrevBoards.splice(targetBoardIndex, 1, copyTargetBoard)
      }

      return copyPrevBoards;
    });
  }

  return (
    <Draggable draggableId={`board-${id}`} index={index}>

      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <BoardTitle>
            <div className="left-box">
              <div className="title">{title}</div>
              <span className="edit material-symbols-rounded" onClick={onClickUpdateBoardTitle}>
                stylus
              </span>
            </div>
            <div className="right-box">
              <span className="material-symbols-rounded" onClick={onClickAddTodo}>
                post_add
              </span>
            </div>
          </BoardTitle>

          {/* To Do : Droppable */}
          <Droppable droppableId={`board-${id}`} type="board" direction="vertical">
            {(provided) => (
              <TodoList ref={provided.innerRef} {...provided.droppableProps}>

                {toDos?.map((toDo, index) => (
                  <Todo
                    key={toDo.id}
                    draggableId={`board-${id}-todo-${toDo.id}`}
                    id={toDo.id}
                    content={toDo.content}
                    index={index}
                    boardId={id}
                  />
                ))}

                {provided.placeholder}
              </TodoList>
            )}
          </Droppable>
        </Wrapper>
      )}

    </Draggable>
  );
}

export default Board;