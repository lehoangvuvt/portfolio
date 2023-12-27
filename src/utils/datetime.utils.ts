export const getDateByTS = (
  ms: number
): {
  date: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
} => {
  const datetime = new Date(ms);
  return {
    date: datetime.getDate(),
    month: datetime.getMonth() + 1,
    year: datetime.getFullYear(),
    hour: datetime.getHours(),
    minute: datetime.getMinutes(),
    second: datetime.getSeconds(),
  };
};
