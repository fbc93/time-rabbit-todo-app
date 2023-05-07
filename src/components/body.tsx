import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
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

const Body = () => {

  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ source, destination, draggableId, type }: DropResult) => {

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

  return (
    <Wrapper>
      <CreateBoardForm />
      <DragDropContext onDragEnd={onDragEnd}>

        {/* 보드 삭제 쓰레기통 */}
        <BoardTrashCan />

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