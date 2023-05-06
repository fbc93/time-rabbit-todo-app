import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ToDo } from "../atoms";
import Todo from "./todo";
interface BoardProps {
  index: number;
  boardId: string;
  toDos: ToDo[];
}

const Wrapper = styled.div``;
const BoardTitle = styled.div``;
const TodoList = styled.div``;

const Board = ({ index, boardId, toDos }: BoardProps) => {

  return (
    <Draggable draggableId={boardId} index={index}>

      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <BoardTitle>{boardId}</BoardTitle>

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