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
export const defaultBoards:IBoardState[] = [
  {
    id: 0,
    title:"우선순위 1",
    toDos:[]
  },
  {
    id: 1,
    title:"우선순위 2",
    toDos:[]
  },
  {
    id: 2,
    title:"우선순위 3",
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

//투두보드 Data 로컬 스토리지 삭제
export const deleteBoards = () => {
  localStorage.clear();
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

export interface IQuotes {
  text:string,
  from:string,
}

//Quotes Array
const quotes:IQuotes[] = [
  {
    text:"The hurrier I go, the behinder I get.",
    from: "Alice in Wonderland (1865)"
  },
  {
    text:"We must use time as a tool, not as a couch.",
    from : "John F. Kennedy"
  },
  {
    text:"What's happened, happened.",
    from : "Tennet (2020)"
  },
  {
    text:"The most precious resource we all have is time.",
    from : "Steve Jobs"
  },
  {
    text:"You may delay, but time will not.",
    from: "Benjamin Franklin"
  },
  {
    text:"I don’t have time is just saying it’s not a priority.",
    from:"Naval Ravikant"
  },
  {
    text:"Begin with the end in mind.",
    from: "Stephen Covey"
  }
];

//Quotes atom Data
export const QuoteState = atom({
  key:"quotes",
  default: quotes,
});

//Result Popup
export const ResultPopup = atom<boolean>({
  key:"resultPopup",
  default: false,
});

