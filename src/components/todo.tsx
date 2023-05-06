import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color:${(props) => props.theme.todoBg};
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
          <ToDoContent>{toDoContent}</ToDoContent>

          <ButtonList>
            <Button>
              <span className="material-symbols-rounded">stylus</span>
            </Button>
            <Button>
              <span className="material-symbols-rounded">delete</span>
            </Button>
          </ButtonList>

        </Wrapper>
      )}

    </Draggable>
  );
}

export default React.memo(Todo);