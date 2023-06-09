import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BoardState, saveBoards, ThemeState } from "./atoms";
import BoardList from "./components/boardList";
import { darkTheme, lightTheme } from "./theme";

const GlobalStyle = createGlobalStyle<{ themeMode: "darkTheme" | "lightTheme" }>`
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

html {
  font-size:10px;
  background-color: ${(props) => props.themeMode === "darkTheme" ? "#121212" : "#ffffff"};
  transition: background-color 0.2s ease-in-out;
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
  font-family: 'Noto Sans KR', sans-serif;
  display: flex;
  justify-content: center;
  overflow-x:hidden;
  background-image: ${(props) => props.themeMode === "lightTheme" ? `url(${process.env.PUBLIC_URL}/images/time_rabbit_01.png)` : `url(${process.env.PUBLIC_URL}/images/time_rabbit_02.png)`};
  background-position: ${(props) => props.themeMode === "lightTheme" ? "20vw 15vh" : "62vw 13vh"};
  background-size: ${(props) => props.themeMode === "lightTheme" ? "20vw" : "22vw"};
  background-repeat: no-repeat;
}

a {
  text-decoration:none;
}

#root {
  align-self: center;
}

&:has(.board-isDragging) #trashcan {
  transform:translateY(0em) scale(1);
}

&:has(.board-isDragging) #todoResult {
  height:0;
}
`;

function App() {

  const themeData = useRecoilValue(ThemeState);
  const boardsData = useRecoilValue(BoardState);

  //디폴트 투두보드 로컬스토리지 저장
  useEffect(() => {
    saveBoards(boardsData);
  }, [boardsData]);

  //로컬 스토리지 디버깅
  //console.log("✅ Local Storage : ", boardsData);

  return (
    <>
      <ThemeProvider theme={themeData === "darkTheme" ? darkTheme : lightTheme}>
        <GlobalStyle themeMode={themeData} />
        <BoardList />
      </ThemeProvider>
    </>
  );
}

export default App;
