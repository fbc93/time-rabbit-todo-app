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

const Trashcan = styled.div`
  width:120px;
  height:120px;
  background-color:tomato;
  border-radius:0 0 60px 60px;
  position:fixed;
  top:-50px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  span {
    font-size:3.8rem;
    padding-bottom:18px;
    position:absolute;
    bottom:0;
    left:50%;
    color:#c23616;
    transform:translateX(-50%);
  }
`;

const Body = () => {

  const [boardsData, setBoardsData] = useRecoilState(BoardState);
  const [trashcanData, setTrashcanData] = useRecoilState(TrashcanState);

  const onDragEnd = ({ source, destination, draggableId, type }: DropResult) => {
    //Logics
    console.log(source, destination)
  };

  const onBeforeDragStart = (data: DragStart) => {
    const { draggableId, mode, source, type } = data;
    //Logics
  }

  return (
    <Wrapper>
      <CreateBoardForm />
      <DragDropContext onDragEnd={onDragEnd} onBeforeDragStart={onBeforeDragStart}>

        {/* Trashcan : Droppable */}
        <Droppable droppableId="trashcan" type="boards">
          {(provided) => (
            <Trashcan ref={provided.innerRef} {...provided.droppableProps}>
              <span className="material-symbols-rounded">delete</span>
              {provided.placeholder}
            </Trashcan>
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