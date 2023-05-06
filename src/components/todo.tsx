import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div``;

interface ToDoProps {
  toDoId: number;
  toDoContent: string;
  index: number;
}

const Todo = ({ toDoId, toDoContent, index }: ToDoProps) => {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>

      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoContent}
        </Wrapper>
      )}

    </Draggable>
  );
}

export default Todo;