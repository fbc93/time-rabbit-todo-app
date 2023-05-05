import { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ToDo, toDoState } from "../atoms";
import DragabbleCard from "./dragabbleCard";

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top:30px;
  border-radius:5px;
  background-color: ${(props) => props.theme.surface};
  min-height:200px;
  width:100%;
  display:flex;
  flex-direction:column;
`;

const Title = styled.div`
  margin-bottom: 15px;
  text-align: center;
  color: white;
`;

interface AreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<AreaProps>`
  background-color:${props => props.isDraggingOver ? "#333333" : props.draggingFromThisWith ? "tomato" : "#333333"};
  flex-grow:1;
  transition: background-color 0.3s ease-in-out;
`;

interface BoardProps {
  toDos: ToDo[];
  boardId: string;
}

interface ValidForm {
  toDo: string;
}

const Form = styled.form`
  width:100%;
  display:flex;
  justify-content:center;
  margin-bottom:10px;
`;

const Board = ({ toDos, boardId }: BoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<ValidForm>();
  const onValid = ({ toDo }: ValidForm) => {

    const newToDo = {
      id: Date.now(),
      text: toDo,
    }

    setToDos((currentBoards) => {
      return {
        ...currentBoards,
        [boardId]: [...currentBoards[boardId], newToDo],
      }
    });

    setValue("toDo", "");
  }

  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (

        <Wrapper>
          <Title>{boardId.toUpperCase()}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("toDo", { required: "required" })} placeholder={`Add Task from ${boardId}`} />
            <button>add</button>
          </Form>
          <Area
            ref={provided.innerRef}
            {...provided.droppableProps}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            isDraggingOver={snapshot.isDraggingOver}>

            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}

            {provided.placeholder}
          </Area>
        </Wrapper>

      )}
    </Droppable>
  );
}

export default Board;