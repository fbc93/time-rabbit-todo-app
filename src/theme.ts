import { DefaultTheme } from "styled-components";

export const darkTheme:DefaultTheme = {
  bg:"#121212",
  onBg:"#ffffff",
  onBgText:"#ffffff",
  boardBg:"rgba(60, 99, 130,1.0)",
  droppable:"rgba(30, 39, 46,0.5)",
  todoBg: "rgba(210, 218, 226,1.0)",
  onTodo:"rgba(0,0,0,1)",
  delete: "tomato",
  button:"#333333",
  inputBg:"rgba(241, 242, 246,1.0)",
  boardHover:"rgba(241, 242, 246,1.0)"
  
}

export const lightTheme:DefaultTheme = {
  bg:"#ffffff",
  onBg:"#121212",
  onBgText:"#333333",
  boardBg:"rgba(130, 204, 221, 0.5)",
  droppable:"rgba(130, 204, 221,0.5)",
  todoBg: "rgba(255, 255, 255,1.0)",
  onTodo:"rgba(47, 53, 66,1.0)",
  delete:"tomato",
  button:"#efefef",
  inputBg:"rgba(241, 242, 246,1.0)",
  boardHover:"rgba(223, 228, 234,1.0)"
}