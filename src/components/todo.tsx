import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { BoardState, IToDo } from "../atoms";

const Wrapper = styled.div<{ isDragging: boolean }>`
  background-color:${(props) => props.isDragging ? props.theme.dragged : props.theme.todoBg};
  padding:10px 15px;
  margin:0.5em 0;
  border-radius:0.5em;
  display:flex;
  justify-content:space-between;
  align-items:center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

  &:hover {
    button {
      opacity:1;
    }
  }
`;

const ToDoContent = styled.div`
  color:${(props) => props.theme.onTodo};
  font-weight:normal;
  font-size:1.4rem;
  letter-spacing:-1px;
  width:calc(100% - 65px);
  line-height:1.5;
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

interface propsData extends IToDo {
  draggableId: string;
  index: number;
  boardId: number;
}

const Todo = (propsData: propsData) => {

  const { draggableId, id, content, index, boardId } = propsData;
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
          id: +new Date(),
          content: newContent
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

  return (
    <Draggable draggableId={`todo-${id}`} index={index}>

      {(provided, snapshot) => (
        <Wrapper
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ToDoContent>{content}</ToDoContent>

          <ButtonList>
            <Button>
              <span className="material-symbols-rounded" onClick={onClickUpdateTodo}>stylus</span>
            </Button>
            <Button>
              <span className="material-symbols-rounded" onClick={onClickDeleteTodo}>delete</span>
            </Button>
          </ButtonList>

        </Wrapper>
      )}

    </Draggable>
  );
}

export default React.memo(Todo);