import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ToDo } from "../atoms";
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
    //transition: all 0.2s ease-in-out;

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

const Board = ({ index, boardId, toDos }: BoardProps) => {

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
            <span className="material-symbols-rounded">
              add_box
            </span>
          </BoardTitle>

          {/* To Do : Droppable */}
          <Droppable droppableId={boardId}>
            {(provided) => (
              <TodoList ref={provided.innerRef} {...provided.droppableProps}>

                {toDos?.map((toDo, index) => (
                  <Todo key={toDo.id} toDoId={toDo.id} toDoContent={toDo.content} index={index} />
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

export default React.memo(Board);