import moment from 'moment';

export const parseMomentArray = (dates: moment[]) => {
  return dates.map((moment) => formatToIso(moment));
};

export const parseToMoment = (dates: string[]) => {
  return dates.map((date) => formatToMoment(date));
};

const formatToIso = (moment: moment) => {
  return moment.format('YYYY-MM-DD');
};

const formatToMoment = (date: string) => {
  return moment(date, 'YYYY-MM-DD');
};
