import { atom } from "recoil";
export interface ToDo {
  id: number;
  content: string;
}
export interface ToDoState {
  [key:string] : ToDo[]
}

//투두
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

//투두 보드
export const boardState = atom<string[]>({
  key:"board",
  default: [
   'Todo',
   'Doing',
   'Done',
  ]
});

//다크모드, 라이트모드
export const darkMode = atom<boolean>({
  key:"darkMode",
  default: true
});

//투두 정보 로컬 스토리지 저장

