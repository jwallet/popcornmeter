export const newDateInNextDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const newDateInNextHours = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date;
};
