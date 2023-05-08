import { DragDropContext, DragStart, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { BoardState, TrashcanState } from "../atoms";
import { DropResult } from "react-beautiful-dnd";
import CreateBoardForm from "./createBoardForm";
import styled from "styled-components";
import Board from "./board";

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

const BoardList = styled.div`
  display:flex; 
`;

const TrashCanWrapper = styled.div``;

const TrashCan = styled.div<{ isTrashcanOpen: boolean }>`
  background-color: rgb(255, 99, 72);
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out 0s;
  opacity: 1;
  position: fixed;
  top: ${(props) => props.isTrashcanOpen ? "-45px" : "-120px"};
  z-index: 100;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 2em;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  transition: top 0.3s ease-in-out;

  span {
    font-size:3rem;
  }
`;

const Body = () => {

  const [boardsData, setBoardsData] = useRecoilState(BoardState);
  const [trashcanData, setTrashcanData] = useRecoilState(TrashcanState);

  const onDragEnd = ({ source, destination, draggableId, type }: DropResult) => {
    //Logics
  };

  const onBeforeDragStart = (data: DragStart) => {
    const { draggableId, mode, source, type } = data;
    //Logics
  }

  return (
    <Wrapper>
      <CreateBoardForm />
      <DragDropContext onDragEnd={onDragEnd} onBeforeDragStart={onBeforeDragStart}>

        {/* Board Trashcan */}
        <Droppable droppableId="trashcan">
          {(provided) => (
            <TrashCanWrapper ref={provided.innerRef} {...provided.droppableProps}>
              <TrashCan isTrashcanOpen={trashcanData}>
                <span className="material-symbols-rounded">delete</span>
              </TrashCan>
            </TrashCanWrapper>
          )}
        </Droppable>

        {/* Boards : Droppable */}
        <Droppable droppableId="boards" type="boards" direction="horizontal">
          {(provided) => (
            <BoardList ref={provided.innerRef} {...provided.droppableProps}>

              {boardsData.map((board, index) => (
                <Board
                  key={board.title}
                  id={board.id}
                  title={board.title}
                  toDos={board.toDos}
                  index={index}
                />
              ))}

              {provided.placeholder}
            </BoardList>
          )}
        </Droppable>

      </DragDropContext>
    </Wrapper>
  );
}

export default Body;