import { DragDropContext, DragStart, Droppable } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { boardTrashcanState, toDoState } from "../atoms";
import { DropResult } from "react-beautiful-dnd";
import CreateBoardForm from "./createBoardForm";
import BoardTrashCan from "./boardTrashcan";
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

const TrashCan = styled.div<{ BoardTrashcan: boolean }>`
  background-color: rgb(255, 99, 72);
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out 0s;
  opacity: 1;
  position: fixed;
  top: ${(props) => props.BoardTrashcan ? "-45px" : "-120px"};
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

  const setBoardTrashcan = useSetRecoilState(boardTrashcanState);
  const BoardTrashcan = useRecoilValue(boardTrashcanState);
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ source, destination, draggableId, type }: DropResult) => {

    //보드 삭제
    setBoardTrashcan(false);

    if (!destination) return;

    if (type === "boardList") {
      const [boardName] = Object.keys(toDos);
      console.log(boardName)
    }

    // if (type === "boardList") {
    //   setBoards((currentBoards) => {

    //     const copyBoards = [...currentBoards];
    //     copyBoards.splice(source.index, 1);
    //     copyBoards.splice(destination.index, 0, draggableId)

    //     return copyBoards;
    //   });
    // }

    // //todo in same board
    // if (source.droppableId === destination.droppableId) {

    // }

    // //todo in different board
    // if (source.droppableId !== destination.droppableId) {

    // }


  };

  const onBeforeDragStart = (propsData: DragStart) => {
    const { draggableId, mode, source, type } = propsData;

    if (type === "boardList") {
      setBoardTrashcan(true);
    }
  }

  return (
    <Wrapper>
      <CreateBoardForm />
      <DragDropContext onDragEnd={onDragEnd} onBeforeDragStart={onBeforeDragStart}>

        {/* 보드 삭제 쓰레기통 */}
        <Droppable droppableId="deleteBoard">
          {(provided) => (
            <TrashCanWrapper ref={provided.innerRef} {...provided.droppableProps}>
              <TrashCan BoardTrashcan={BoardTrashcan} >
                <span className="material-symbols-rounded">
                  delete
                </span>
              </TrashCan>
            </TrashCanWrapper>
          )}
        </Droppable>

        {/* Board : Droppable */}
        <Droppable droppableId="boardList" type="boardList" direction="horizontal">
          {(provided) => (
            <BoardList ref={provided.innerRef} {...provided.droppableProps}>

              {Object.keys(toDos).map((boardId, index) => (
                <Board boardId={boardId} index={index} toDos={toDos[boardId]} key={index} />
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