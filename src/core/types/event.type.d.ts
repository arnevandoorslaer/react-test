export type Event = {
  id?: string;
  title: string;
  type: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  dataIndex?: string;
  key?: string;
  dates?: moment.Moment[];
};
