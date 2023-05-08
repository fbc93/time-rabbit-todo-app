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
  width:200px;
  height:100px;
  background-color:tomato;
  border-radius:0 0 100px 100px;
  position:fixed;
  top: 0px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transition: top 0.2s ease-in-out;

  span {
    font-size:5rem;
    padding-bottom:30px;
    position:absolute;
    bottom:0;
    left:50%;
    color:#c23616;
    transform:translateX(-50%);
  }
`;

const Body = () => {
  const [boardsData, setBoardsData] = useRecoilState(BoardState);

  const onDragEnd = (onDragEndInfo: DropResult) => {

    const { source, destination, draggableId, type } = onDragEndInfo;

    //투두보드 순서 변경
    if (!destination) return;
    if (source.droppableId === "boards") {

      if (source.index !== destination.index) {
        setBoardsData((prevBoards) => {
          const copyPrevBoards = [...prevBoards];
          const startBoard = copyPrevBoards[source.index];

          copyPrevBoards.splice(source.index, 1);
          copyPrevBoards.splice(destination.index, 0, startBoard);

          return copyPrevBoards;
        })
      }
    }

    if (destination.droppableId === "trashcan") {

      //휴지통에 드롭하면 투두보드 삭제
      setBoardsData((prevBoards) => {
        const copyPrevBoards = [...prevBoards];
        copyPrevBoards.splice(source.index, 1);

        return copyPrevBoards;
      });
    }

    if (type === "board") {
      if (source.droppableId === destination.droppableId) {

        //투두 같은 보드 내에서 움직이기
        setBoardsData((prevBoards) => {
          const copyPrevBoards = [...prevBoards];

          const targetBoardIndex = copyPrevBoards.findIndex(
            (board) => board.id + "" === source.droppableId.split("-")[1]
          );

          const copyTargetBoard = { ...copyPrevBoards[targetBoardIndex] };
          const copyTargetTodos = [...copyTargetBoard.toDos];
          const targetTodo = copyTargetTodos[source.index];

          copyTargetTodos.splice(source.index, 1);
          copyTargetTodos.splice(destination.index, 0, targetTodo);

          copyTargetBoard.toDos = copyTargetTodos;
          copyPrevBoards.splice(targetBoardIndex, 1, copyTargetBoard);

          return copyPrevBoards;
        });
      }
    }
  }

  const onBeforeDragStart = (onBeforeDragStartInfo: DragStart) => {
    const { draggableId, mode, source, type } = onBeforeDragStartInfo;
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
                  key={board.id}
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