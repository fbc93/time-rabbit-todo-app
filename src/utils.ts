export const makeDateFormat = (value:Date) => {
  
  const valueDate = new Date(value);
  const month = valueDate.getMonth();
  const date = valueDate.getDate();
  const hour = valueDate.getHours();
  const minute = valueDate.getMinutes();
  const second = valueDate.getSeconds();
  const day = valueDate.getDay();

  const dayArr = ["일","월","화","수","목","금","토"];
  
  return `${month}월 ${date}일 (${dayArr[day]}) ${hour}:${minute}:${second}`;
}