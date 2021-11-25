import moment from 'moment';

export const getUserAge = birthday =>
  moment(Number(birthday)).diff(new Date(), 'years') * -1;
