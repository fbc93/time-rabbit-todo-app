import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkMode, saveToDos, toDoState } from "./atoms";
import BoardList from "./components/boardList";
import { darkTheme, lightTheme } from "./theme";

const GlobalStyle = createGlobalStyle<{ isDarkMode: boolean }>`
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
  background-color: ${(props) => props.isDarkMode ? "#121212" : "#ffffff"};
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

function App() {

  const isDarkMode = useRecoilValue(darkMode);
  const toDos = useRecoilValue(toDoState);

  //save default todos in localStorage
  useEffect(() => {
    saveToDos(toDos);
  }, [toDos]);

  console.log("✅ Local Storage : ", toDos);

  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle isDarkMode={isDarkMode} />
        <BoardList />
      </ThemeProvider>
    </>
  );
}

export default App;
