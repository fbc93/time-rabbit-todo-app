import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { BoardState, IToDo } from "../atoms";
import { makeDateFormat } from "../utils";

const Wrapper = styled.div<{ isDragging: boolean, isComplete: boolean }>`
  border: ${(props) => props.isComplete ? "0.3em solid red" : "0.3em solid rgba(51, 51, 51, 0.1)"};
  background-color:${(props) => props.isDragging ? props.theme.dragged : props.theme.todoBg};
  padding:10px 15px;
  margin:0.5em 0;
  border-radius:0.5em;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  transition: border 0.2s ease-in-out;

  &:hover {
    button {
      opacity:1;
    }
  }
`;

const TopArea = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
`;

const ToDoContent = styled.div<{ isComplete: boolean }>`
  color:${(props) => props.theme.onTodo};
  
  width:calc(100% - 65px);
  line-height:1.5;
  display:flex;
  justify-contents:center;
  align-items:center;

  span {
    margin-right:0.5em;
    font-size:2.2rem;
    cursor:pointer;
    color: ${(props) => props.isComplete ? "red" : "#cccccc"}!important;
  }

  div {
    font-weight:normal;
    font-size:1.4rem;
    letter-spacing:-1px;
    line-height:1;
  }
`;

const ButtonList = styled.div`
  margin-left:1em;
`;

const Button = styled.button`
  background-color:transparent;
  border:none;
  color:${(props) => props.theme.onTodo};
  transition: opacity 0.2s ease-in-out;
  opacity:0.2;
  cursor:pointer;
  padding:0;
  margin-right:0.5em;
  &:last-child {
    margin-right:0;
  }

  &:hover {
    span {
      color: ${(props) => props.theme.delete};
    }
  }

  span {
    font-size:2.2rem;
  }
`;

const BottomArea = styled.div`
  color: #333333;
  opacity:0.5;
  text-align:right;
  font-size:1.2rem;
  letter-spacing:-0.5px;
  font-weight:normal;
  margin-top:1em;
`;
interface propsData extends IToDo {
  draggableId: string;
  index: number;
  boardId: number;
}

const Todo = (propsData: propsData) => {

  const { draggableId, id, content, index, createAt, isComplete } = propsData;
  const [boardData, setBoardData] = useRecoilState(BoardState);

  //투두 Update
  const onClickUpdateTodo = () => {

    setBoardData((prevBoards) => {
      const copyPrevBoards = [...prevBoards];
      const boardIndex = draggableId.split('-')[1];
      const targetBoardIndex = copyPrevBoards.findIndex((board) => board.id === +boardIndex);
      const copyTargetBoard = { ...copyPrevBoards[targetBoardIndex] }
      const copyTargetTodos = [...copyTargetBoard.toDos]
      const targetTodosIndex = copyTargetBoard.toDos.findIndex((todo) => todo.id === id);

      const newContent = window.prompt(`" ${content} " 📌 일정을 수정해보세요.`, content);

      if (newContent) {

        copyTargetTodos.splice(targetTodosIndex, 1, {
          id: id,
          isComplete: isComplete,
          content: newContent,
          createAt: createAt,
        });

        copyTargetBoard.toDos = copyTargetTodos;
        copyPrevBoards.splice(targetBoardIndex, 1, copyTargetBoard);
      }

      return copyPrevBoards;
    });
  }

  //투두 Delete
  const onClickDeleteTodo = () => {

    setBoardData((prevBoards) => {
      const copyPrevBoards = [...prevBoards];
      const boardIndex = draggableId.split('-')[1];
      const targetBoardIndex = copyPrevBoards.findIndex((board) => board.id === +boardIndex);
      const copyTargetBoard = { ...copyPrevBoards[targetBoardIndex] }
      const copyTargetTodos = [...copyTargetBoard.toDos]
      const targetTodosIndex = copyTargetBoard.toDos.findIndex((todo) => todo.id === id);

      copyTargetTodos.splice(targetTodosIndex, 1);
      copyTargetBoard.toDos = copyTargetTodos;
      copyPrevBoards.splice(targetBoardIndex, 1, copyTargetBoard);

      return copyPrevBoards;
    })
  }

  //투두 isComplete Update
  const toggleTodoStatus = () => {

    setBoardData((prevBoards) => {
      const copyPrevBoards = [...prevBoards];
      const boardIndex = draggableId.split('-')[1];
      const targetBoardIndex = copyPrevBoards.findIndex((board) => board.id === +boardIndex);
      const copyTargetBoard = { ...copyPrevBoards[targetBoardIndex] };
      const copyTargetTodos = [...copyTargetBoard.toDos];
      const targetTodoIndex = copyTargetTodos.findIndex((todo) => todo.id === id);

      copyTargetTodos.splice(targetTodoIndex, 1, {
        id: id,
        isComplete: !isComplete,
        content: content,
        createAt: createAt,
      });

      copyTargetBoard.toDos = copyTargetTodos;
      copyPrevBoards.splice(targetBoardIndex, 1, copyTargetBoard);

      return copyPrevBoards;
    })
  }

  return (
    <Draggable draggableId={`todo-${id}`} index={index}>

      {(provided, snapshot) => (

        <Wrapper
          isComplete={isComplete}
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TopArea>
            <ToDoContent isComplete={isComplete}>
              {isComplete ? (
                <span className="material-symbols-rounded" onClick={toggleTodoStatus}>
                  check_box
                </span>
              ) : (
                <span className="material-symbols-rounded" onClick={toggleTodoStatus}>
                  check_box_outline_blank
                </span>
              )}

              <div>{content}</div>
            </ToDoContent>

            <ButtonList>
              <Button>
                <span className="material-symbols-rounded" onClick={onClickUpdateTodo}>stylus</span>
              </Button>
              <Button>
                <span className="material-symbols-rounded" onClick={onClickDeleteTodo}>delete</span>
              </Button>
            </ButtonList>
          </TopArea>
          <BottomArea>{makeDateFormat(createAt) + ""}</BottomArea>
        </Wrapper>

      )}

    </Draggable>
  );
}

export default React.memo(Todo);