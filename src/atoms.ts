import { atom } from "recoil";
export interface ToDo {
  id: number;
  content: string;
}
export interface ToDoState {
  [key:string] : ToDo[]
}

export const toDoState = atom<ToDoState>({
  key:"toDo",
  default: {
    Done: [
      {
        id:1,
        content:"마트 장보러 가기"
      },
      {
        id:2,
        content:"설거지 하기"
      },
    ],
  }
});

export const boardState = atom<string[]>({
  key:"board",
  default: [
   'Todo',
   'Doing',
   'Done',
   'Later'
  ]
});

//다크모드, 라이트모드
export const darkMode = atom({
  key:"darkMode",
  default: true
});