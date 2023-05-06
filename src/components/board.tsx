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
  padding:2em;
  box-sizing:border-box;
  border-radius:0.8em;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  display: flex;
  flex-direction: column;
`;

const BoardTitle = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:2em;

  .title {
    font-size:2.5rem;
    font-weight:bold;
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

export default Board;