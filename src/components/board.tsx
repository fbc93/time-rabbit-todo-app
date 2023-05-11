import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { BoardState, IBoardState } from "../atoms";
import Todo from "./todo";
import React from "react";
import EmptyTodo from "./emptyTodo";

const RotateHandle = styled.div`
  height:fit-content;

  &.board-dragging-over-trashcan {
    div {
      background-color:${(props) => props.theme.trashcanOver};
      border-radius:1em;
      transition: none;
    }
  }
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardBg};
  width:300px;
  height:fit-content;
  margin:0em 2em 11em;
  box-sizing:border-box;
  border-radius:1em;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 16px 24px -15px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;

  &.board-isDragging {
    transform: rotate(10deg);
  }

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

  &.board-isDragging {
    background-color:${(props) => props.theme.isDragging};
  }
`;

const BoardTitle = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:1.5em;
  padding: 2em 2em 0 2em;
  color: ${(props) => props.theme.onBgText};

  .left-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .title {
      font-size:1.8rem;
      line-height:1.5;
      font-weight:bold;
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

    &:hover {
      color:rgba(255, 71, 87,1.0);
    }
  }
  }
`;

interface TodoListProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const TodoList = styled.div<TodoListProps>`
  display:flex;
  flex-direction:column;
  background-color:${(props) => props.isDraggingOver ? "#333333" : props.isDraggingFromThis ? props.theme.droppable : "transparent"};
  flex-grow:1;
  padding:1.5rem;
  border-radius:0em 0em 1em 1em;
`;

interface PropsData extends IBoardState {
  index: number;
}

const Board = (propsData: PropsData) => {
  const { id, title, toDos, index } = propsData;
  const [boardData, setBoardData] = useRecoilState(BoardState);

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
          isComplete: false,
          content: newTodoContent,
          createAt: new Date(),
        }

        copyTargetBoard.toDos = [newTodo, ...copyTargetBoard.toDos];
        copyPrevBoards.splice(targetBoardIndex, 1, copyTargetBoard)
      }

      return copyPrevBoards;
    });
  }

  return (
    <Draggable draggableId={`board-${id}`} index={index}>

      {(provided, snapshot) => (
        <RotateHandle
          className={snapshot.draggingOver === "trashcan" ? "board-dragging-over-trashcan" : ""}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >

          <Wrapper className={snapshot.isDragging ? "board-isDragging" : ""}>
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
              {(provided, snapshot) => (
                <TodoList
                  isDraggingOver={snapshot.isDraggingOver}
                  isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >

                  {/* 투두 생성 후 */}
                  {toDos?.map((toDo, index) => (
                    <Todo
                      key={toDo.id}
                      draggableId={`board-${id}-todo-${toDo.id}`}
                      id={toDo.id}
                      content={toDo.content}
                      index={index}
                      boardId={id}
                      createAt={toDo.createAt}
                      isComplete={toDo.isComplete}
                    />
                  ))}

                  {/* 투두 생성 전 */}
                  {toDos.length === 0 && (
                    snapshot.isDraggingOver ? null : <EmptyTodo />
                  )}

                  {provided.placeholder}
                </TodoList>
              )}
            </Droppable>
          </Wrapper>
        </RotateHandle>
      )}

    </Draggable>
  );
}

export default React.memo(Board);