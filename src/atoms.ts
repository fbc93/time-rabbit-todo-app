import { atom } from "recoil";
export interface ToDo {
  id: number;
  content: string;
}
export interface ToDoState {
  [key:string] : ToDo[]
}

//다크모드, 라이트모드
export const darkMode = atom<boolean>({
  key:"darkMode",
  default: true
});

//디폴트 투두리스트
const defaultToDos:ToDoState = {
  Todo: [],
  Doing: [],
  Done: [],
  Later: []
}

//투두 정보 로컬 스토리지 저장
export const LOCAL_TODO = "todo_data";

export const loadToDos = () => {
  const localToDos = localStorage.getItem(LOCAL_TODO);

  if(localToDos){
    return JSON.parse(localToDos);
  }

  return null;
}

export const saveToDos = (toDos:ToDoState) => {
  localStorage.setItem(LOCAL_TODO, JSON.stringify(toDos));
}


//투두 보드
export const boardState = atom<string[]>({
  key:"board",
  default: [
   'Todo',
   'Doing',
   'Done',
   'Later'
  ]
});


//투두
export const toDoState = atom<ToDoState>({
  key:"toDo",
  default: loadToDos() ?? defaultToDos,
});





