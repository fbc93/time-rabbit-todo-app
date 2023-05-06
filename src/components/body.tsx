import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, toDoState } from "../atoms";
import { DropResult } from "react-beautiful-dnd";
import Board from "./board";

const BoardList = styled.div`
  padding:0 2.5em;
  width:100%;
  margin:0 auto;
  display:flex;
  flex-direction:row;
  justify-content:center;
`;

const Body = () => {

  const [boards, setBoards] = useRecoilState(boardState);
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    console.log(source, destination)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      {/* Board : Droppable */}
      <Droppable droppableId="boardList" direction="horizontal" type="board">
        {(provided) => (
          <BoardList ref={provided.innerRef} {...provided.droppableProps}>

            {boards.map((boardId, index) => (
              <Board
                key={index}
                index={index}
                boardId={boardId}
                toDos={toDos[boardId]}
              />
            ))}

            {provided.placeholder}
          </BoardList>
        )}
      </Droppable>

    </DragDropContext>
  );
}

export default Body;