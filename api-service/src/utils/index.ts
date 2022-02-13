import { Moment } from 'moment';

export enum MEALS {
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner',
  snack = 'snack',
}

export enum HTTPStatuses {
  'SUCCESS' = 200,
  'CREATED_ONCE_SUCCESS' = 201,
  'UNAUTHENTICATED' = 401,
  'UNAUTHORIZED' = 403,
  'NOT_FOUND' = 404,
  'BAD_REQUEST' = 500,
}

export function createResponseMessage(msg: string, data: object = {}) {
  const response: Record<string, unknown> = {
    message: msg,
  };
  if (data) {
    response.data = data;
  }
  return response;
}

export function createLast7DaysDateRange(endDate) {
  const startDate = endDate.clone().subtract(6, 'days');
  return [startDate, endDate];
}

export function createRangeDates(startDate: Moment, numOfDays = 7) {
  const rangeDates = [
    {
      date: startDate.clone().format('MMM DD YYYY'),
    },
  ];
  let currentDate = startDate.clone();
  for (let idx = 0; idx < numOfDays - 1; idx++) {
    currentDate = currentDate.add(1, 'days');
    rangeDates.push({
      date: currentDate.clone().format('MMM DD YYYY'),
    });
  }
  return rangeDates;
}

export function roundOff2DecimalPlaces(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
