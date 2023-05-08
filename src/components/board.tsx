import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { BoardState, IBoardState } from "../atoms";
import Todo from "./todo";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardBg};
  width:300px;
  min-height:300px;
  margin:0em 2em 4em 2em;
  padding:1.5em;
  box-sizing:border-box;
  border-radius:0.8em;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
  display: flex;
  flex-direction: column;

  &:hover {
    background-color: ${(props) => props.theme.boardHover};

    .title {
      color:#333333;
    }

    span {
      color:#333333;
    }

    .left-box {
      .edit {
        opacity:1;
      }
    }
  }
`;

const BoardTitle = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:2em;
  color: ${(props) => props.theme.onBgText};

  .left-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .title {
      font-size:2rem;
      font-weight:bold;
      letter-spacing:-1px;
      margin-right:0.5em;
    }

    .edit {
      font-size:2.3rem;
      opacity:0;
      cursor:pointer;
    }
  }

  .right-box {
    span {
    cursor:pointer;
    &:first-child {
      margin-right:0.3em;
    }
    &:hover {
      color:rgba(255, 71, 87,1.0);
    }
  }
  }
`;

const TodoList = styled.div`
  display:flex;
  flex-direction:column;
  background-color:${(props) => props.theme.droppable};
  flex-grow:1;
  padding:1.5rem;
  border-radius:1em;
`;

interface PropsData extends IBoardState {
  index: number;
}

const Board = (propsData: PropsData) => {
  const { id, title, toDos, index } = propsData;
  const [boardData, setBoardData] = useRecoilState(BoardState);

  //보드 삭제
  // const onClickDeleteBoard = () => {
  //   setBoardData((currentData) => {

  //     const copyCurrentData = { ...currentData };
  //     delete copyCurrentData[id];

  //     return { ...copyCurrentData };
  //   });
  // }

  //보드 안에 투두 추가
  // const onClickAddTodo = (event: any) => {
  //   const boardName = event.currentTarget.parentNode.previousSibling.firstChild.innerText;
  //   const addBoardAlert = window.prompt(` 📌 보드에 추가할 투두 내용을 입력하세요.`);

  //   if (addBoardAlert === "") {
  //     alert("빈값 입니다, \n 투두 내용을 입력하세요.")
  //   }

  //   if (addBoardAlert) {
  //     setTodoData((currentToDos) => {

  //       const [targetBoard] = Object.keys(currentToDos).filter((item) => item === boardName);
  //       const copyTodos = [...currentToDos[targetBoard]];
  //       const data = { id: +new Date(), content: addBoardAlert }

  //       copyTodos.push({ ...data });

  //       return {
  //         ...currentToDos,
  //         [boardName]: copyTodos
  //       };

  //     });
  //   }
  // }

  //보드 이름 수정
  // const onClickEditBoardName = (event: any) => {
  //   const boardName = event.currentTarget.previousSibling.innerText;
  //   const editBoardAlert = window.prompt(`${boardName} 📌 보드 제목을 수정하세요.`);

  //   if (editBoardAlert === "") {
  //     alert("빈값 입니다, \n 보드 제목을 입력하세요.")
  //   }

  //   if (editBoardAlert) {
  //     setTodoData((currentToDos) => {

  //       const copyTodos = { ...currentToDos };



  //       console.log(copyTodos)
  //       return copyTodos;
  //     });
  //   }
  // }


  return (
    <Draggable draggableId={title} index={index}>

      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <BoardTitle>
            <div className="left-box">
              <div className="title">{title}</div>
              <span className="edit material-symbols-rounded">
                stylus
              </span>
            </div>
            <div className="right-box">
              <span className="material-symbols-rounded">
                post_add
              </span>
              <span className="material-symbols-rounded">
                disabled_by_default
              </span>
            </div>
          </BoardTitle>

          {/* To Do : Droppable */}
          <Droppable droppableId={title} type="todos" direction="vertical">
            {(provided) => (
              <TodoList ref={provided.innerRef} {...provided.droppableProps}>

                {toDos?.map((toDo, index) => (
                  <Todo
                    key={toDo.content}
                    draggableId={toDo.content}
                    toDoContent={toDo.content}
                    index={index} />
                ))}

                {provided.placeholder}
              </TodoList>
            )}
          </Droppable>
        </Wrapper>
      )}

    </Draggable>
  );
}

export default Board;