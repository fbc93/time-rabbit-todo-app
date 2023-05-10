import { atom } from "recoil";
export interface IToDo {
  id: number;
  isComplete: boolean;
  content: string;
  createAt: Date;
}
export interface IBoardState {
  id: number;
  title: string;
  toDos: IToDo[];
}

//디폴트 투두보드 Data
const defaultBoards:IBoardState[] = [
  {
    id: 0,
    title:"오늘 할일",
    toDos:[
      {
        id:0,
        isComplete: false,
        content:"화분에 물주기",
        createAt: new Date(),
      },
      {
        id:1,
        isComplete: false,
        content:"청소기 돌리기",
        createAt: new Date(),
      }
    ]
  },
  {
    id: 1,
    title:"내일 할일",
    toDos:[
      {
        id:2,
        isComplete: false,
        content:"빨래하기",
        createAt: new Date(),
      },
      {
        id:3,
        isComplete: false,
        content:"인강 듣기",
        createAt: new Date(),
      }
    ]
  },
  {
    id: 2,
    title:"나중에 할일",
    toDos:[]
  }
];

//투두보드 Data 로컬 스토리지 저장
export const LOCAL_BOARDS = "TODO_BOARDS";

export const loadBoards = () => {
  const localToDos = localStorage.getItem(LOCAL_BOARDS);

  if(localToDos){
    return JSON.parse(localToDos);
  }

  return null;
}

export const saveBoards = (Boards:IBoardState[]) => {
  localStorage.setItem(LOCAL_BOARDS, JSON.stringify(Boards));
}

//투두보드 atom Data 
export const BoardState = atom<IBoardState[]>({
  key:"boards",
  default: loadBoards() ?? defaultBoards,
});

//투두보드 휴지통 atom Data
export const TrashcanState = atom<boolean>({
  key:"trashcan",
  default: false,
});

//배경 테마 atom Data
export const ThemeState = atom<"darkTheme"|"lightTheme">({
  key:"theme",
  default: "lightTheme"
});




