import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean, }>`
  border-radius:5px;
  background-color:${(props) => props.isDragging ? "tomato" : props.theme.onSurface};
  margin-bottom:10px;
  padding:20px 20px;
  color:black;
  box-shadow: ${props => props.isDragging ? "0px 2px 5px rgba(0,0,0,0.1)" : "none"};
`;

interface DraggableCardProps {
  toDoText: string;
  index: number;
  toDoId: number;
}

const DraggableCard = ({ toDoText, toDoId, index }: DraggableCardProps) => {

  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);