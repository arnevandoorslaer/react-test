import dayjs from 'dayjs';

export type Event = {
  id?: string;
  title: string;
  type: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  dataIndex?: string;
  key?: string;
  dates?: dayjs.Dayjs[] | moment.Moment[];
};
