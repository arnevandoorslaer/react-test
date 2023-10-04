export const parseDateArray = (dates: Date[]) => {
  return { startDate: dates[0].toISOString().split('T')[0], endDate: dates[0].toISOString().split('T')[0] };
};
