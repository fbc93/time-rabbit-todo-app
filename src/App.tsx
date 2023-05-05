import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./components/board";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
}
a {
  text-decoration:none;
}
`;

const Wrapper = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  max-width:600px;
  width:100%;
  height:100vh;
  margin:0 auto;
  border:1px solid black;
`;

const Boards = styled.div`
  display:grid;
  width:100%;
  grid-template-columns:repeat(3, 1fr);
  gap:10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { source, draggableId, destination } = info;

    if (!destination) return;

    if (destination.droppableId === source.droppableId) {

      setToDos((currentBoards) => {

        const boardCopy = [...currentBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];

        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        //console.log(boardCopy)

        return {
          ...currentBoards,
          [source.droppableId]: boardCopy
        };
      })
    }

    if (destination.droppableId !== source.droppableId) {
      setToDos((currentBoards) => {

        const sourceBoard = [...currentBoards[source.droppableId]];
        const destinationBoard = [...currentBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj)
        //console.log(sourceBoard, destinationBoard);

        return {
          ...currentBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard
        };
      });
    }
  }


  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />


        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <Boards>
              {Object.keys(toDos).map((boardId) => (
                <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
              ))}
            </Boards>
          </Wrapper>
        </DragDropContext>


      </ThemeProvider>
    </>
  );
}

export default App;
