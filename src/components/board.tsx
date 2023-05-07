import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ToDo, toDoState } from "../atoms";
import Todo from "./todo";
interface BoardProps {
  index: number;
  boardId: string;
  toDos: ToDo[];
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardBg};
  width:300px;
  min-height:300px;
  margin:0em 2em 4em 2em;
  padding:1.5em;
  box-sizing:border-box;
  border-radius:0.8em;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  display: flex;
  flex-direction: column;
  //transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.boardHover};
    .title {
      color:#333333;
    }
    span {
      color:#333333;
    }
  }
`;

const BoardTitle = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:2em;
  color: ${(props) => props.theme.onBgText};

  .title {
    font-size:2rem;
    font-weight:bold;
    letter-spacing:-1px;
  }

  span {
    cursor:pointer;
    &:first-child {
      margin-right:0.3em;
    }
    &:hover {
      color:rgba(255, 71, 87,1.0);
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

const Board = (propsData: BoardProps) => {
  const { index, boardId, toDos } = propsData;
  const [todoData, setTodoData] = useRecoilState(toDoState);

  //보드 삭제
  const onClickDeleteBoard = () => {
    setTodoData((currentData) => {

      const copyCurrentData = { ...currentData };
      delete copyCurrentData[boardId];

      return { ...copyCurrentData };
    });
  }



  //보드 안에 투두 추가
  const onClickAddTodo = (event: any) => {
    const boardName = event.currentTarget.parentNode.previousSibling.innerText;
    const addBoardAlert = window.prompt(`${boardName} 📌 보드에 추가할 투두 내용을 입력하세요.`);

    if (addBoardAlert === "") {
      alert("빈값 입니다, \n 투두 내용을 입력하세요.")
    }

    if (addBoardAlert) {
      setTodoData((currentToDos) => {

        const [targetBoard] = Object.keys(currentToDos).filter((item) => item === boardName);
        const copyTodos = [...currentToDos[targetBoard]];
        const data = { id: +new Date(), content: addBoardAlert }

        copyTodos.push({ ...data });

        return {
          ...currentToDos,
          [boardName]: copyTodos
        };

      })
    }
  }


  return (
    <Draggable draggableId={boardId} index={index}>

      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <BoardTitle>
            <div className="title">{boardId}</div>
            <div>
              <span className="material-symbols-rounded" onClick={onClickAddTodo}>
                post_add
              </span>
              <span className="material-symbols-rounded" onClick={onClickDeleteBoard}>
                disabled_by_default
              </span>
            </div>
          </BoardTitle>

          {/* To Do : Droppable */}
          <Droppable droppableId={`droppable_area_${boardId}`} type="todoList" direction="vertical">
            {(provided) => (
              <TodoList ref={provided.innerRef} {...provided.droppableProps}>

                {toDos?.map((toDo, index) => (
                  <Todo
                    key={`draggable_item_${boardId}_${toDo?.id}`}
                    draggableId={`draggable_item_${boardId}_${toDo?.id}`}
                    toDoContent={toDo?.content}
                    index={index} />
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