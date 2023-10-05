import dayjs from 'dayjs';
import moment from 'moment';

export const parseMomentArray = (dates: moment.Moment[] | undefined | dayjs.Dayjs[]) => {
  return dates ? dates.map((moment) => formatToIso(moment)) : [];
};

export const parseToMoment = (dates: string[]) => {
  return dates ? dates.map((date) => formatToMoment(date)) : [];
};

const formatToIso = (moment: moment.Moment) => {
  return moment ? moment.format('YYYY-MM-DD') : undefined;
};

const formatToMoment = (date: string) => {
  return date ? dayjs(date) : undefined;
};
