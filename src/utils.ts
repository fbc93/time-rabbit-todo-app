import { IQuotes } from "./atoms";

//date format
export const makeDateFormat = (value:Date) => {
  
  const valueDate = new Date(value);
  const month = valueDate.getMonth();
  const date = valueDate.getDate();
  const hour = valueDate.getHours();
  const minute = valueDate.getMinutes();
  const second = valueDate.getSeconds();
  const day = valueDate.getDay();

  const dayArr = ["일","월","화","수","목","금","토"];
  
  return `${month + 1}월 ${date}일 (${dayArr[day]}) ${hour}:${minute}:${second}`;
}

//number format
export const makeNumValueFormat = (value: number) => {
  return value.toString().length < 2 ? '0' + value : value;
}

//todo progress-bar percentage
export const calcTodoProgress = (completedTodo:number, allTodos:number ) => {
  
  return ( completedTodo / allTodos ) * 100
}

//todoResult component quotes
export const getRandomQuotes = (array: IQuotes[]) => {
  const randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
}