import {Injectable} from '@angular/core';

@Injectable()
export class DateService {

  constructor() {
  }

  getMonth(date) {
    return date.getMonth();
  }

  getCountDays(date) {

    /* 返回当月的天数 */
    return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
  }

  getWeekDay(date) {
    return date.getDay();
  }

  getThisWeedDays(day, week) {
    if (week === 0) {
      week = 7;
    }
    const first = day - (week - 1);
    return [first, first + 1, first + 2, first + 3, first + 4, first + 5, first + 6];
  }

}
