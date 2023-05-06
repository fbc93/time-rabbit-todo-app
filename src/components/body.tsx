import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, toDoState } from "../atoms";
import { DropResult } from "react-beautiful-dnd";
import Board from "./board";
import CreateBoardForm from "./createBoardForm";
import BoardTrashCan from "./boardTrashcan";

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

const BoardList = styled.div`
  padding:0 2em;
  max-width:100%;
  margin: 0px auto;
  display:flex;
  flex-flow: wrap;
  justify-content:center;
`;

const Body = () => {

  const [boards, setBoards] = useRecoilState(boardState);
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    console.log(source, destination)
  };

  return (
    <Wrapper>
      <CreateBoardForm />
      <DragDropContext onDragEnd={onDragEnd}>

        {/* 보드 삭제 쓰레기통 */}
        <BoardTrashCan />

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
    </Wrapper>
  );
}

export default Body;