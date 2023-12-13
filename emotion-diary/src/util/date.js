// 날짜를 변환하는 함수
export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

// 날짜를 변환하는 함수
// export const getStringDate = (date) => {
//   if (!(date instanceof Date) || isNaN(date.getTime())) {
//     throw new Error('Invalid date');
//   }
//   return date.toISOString().slice(0, 10);
// };
