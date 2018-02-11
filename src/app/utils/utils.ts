import {genImageUrl} from './browser';

export interface GalleryItem {
  /**
   * 远程网址
   *
   * @type {string}
   */
  url?: string;
  /**
   * JavaScript File 对象
   *
   * @type {File}
   */
  file?: File;
  /**
   * 文件标题
   *
   * @type {string}
   */
  title?: string;
  /**
   * 是否允许删除
   *
   * @type {boolean}
   * @default true
   */
  canDelete?: boolean;
}

const isCn = function (str) {
  if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
    return false;
  }
  return true;
};

export function formDataToUrl(body: object): string {
  let str = '';
  for (const keyName in body) {
    if (!str) {
      str = '?' + keyName + '=' + encodeURI(encodeURI(body[keyName]));
    } else {
      str = str + '&' + keyName + '=' + encodeURI(encodeURI(body[keyName]));
    }
  }
  return str;
}

export function getIndex(jsonArray, keyName, value) {
  console.log(jsonArray, keyName, value);
  for (let i = 0; i < jsonArray.length; i++) {
    if (jsonArray[i][keyName] === value) {
      return i;
    }
  }
}

export function parseImgs(images) {
  let imgs = images;
  if (Array.isArray(imgs)) {
    if (imgs.length > 0) {
      if (typeof imgs[0] === 'string') {
        imgs = (<string[]>imgs).map((url: string) => {
          return {url: url};
        });
      } else {
        imgs = (<GalleryItem[]>imgs).map((item: GalleryItem) => {
          if (item.file) {
            item.url = genImageUrl(item.file);
          }
          return item;
        });
      }
    }
  } else {
    if (typeof imgs === 'string') {
      imgs = [{url: imgs}];
    } else {
      const imgUrl = genImageUrl(imgs);
      if (imgUrl) {
        imgs = [{url: imgUrl}];
      }
    }
  }

  // todo: 永远只返回一个
  // 针对未来可能直接上下个
  return Object.assign([], imgs && (<any[]>imgs).length > 0 ? imgs : []);
}

export function removeByIndex(arr, index) {
  for (let i = 0; i < arr.length; i++) {
    if (i === index) {
      arr.splice(i, 1);
      break;
    }
  }
}

export function getAddress(array) {
  let city = '';
  for (let i = 0; i < array.length; i++) {
    city = city + array[i].name;
  }
  return city;
}

export function leaveDate(leave: string[], business?: string[]) {
  let _business;
  if (!business) {
    _business = ['08:30:00', '18:30:00'];
  } else {
    _business = business;
  }

  /* 把开始时间转成数组 */
  const _start = leave[0].split(/[- :]/);

  /* 把结束时间转成数组 */
  const _end = leave[1].split(/[- :]/);

  const startDay = _start[0] + '/' + _start[1] + '/' + (parseInt(_start[2], 10) + 1);
  const endDay = _end[0] + '/' + _end[1] + '/' + (parseInt(_end[2], 10) - 1);

  let diffDays = (Date.parse(endDay) - Date.parse(startDay)) / (24 * 60 * 60 * 1000);

  let diffHours = ((Date.parse(leave[0].split(' ')[0] + ' ' + _business[1]) - Date.parse(leave[0].split(' ')[0] + ' ' + leave[0].split(' ')[1])) / (60 * 60 * 1000)) + ((Date.parse(leave[1].split(' ')[0] + ' ' + leave[1].split(' ')[1]) - Date.parse(leave[1].split(' ')[0] + ' ' + _business[0])) / (60 * 60 * 1000));

  if (diffHours >= 20) {
    diffDays = diffDays + 2;
    diffHours = diffHours - 20;
  } else if (diffHours >= 10) {
    diffDays = diffDays + 1;
    diffHours = diffHours - 10;
  }

  return {
    days: diffDays,
    hours: diffHours
  };

}

export function getLastMonthDays(date) {
  let year = date.getFullYear();
  let month = date.getMonth();

  if (month === 0) {
    month = 12;
    year = year - 1;
  }
  if (month < 10) {
    month = '0' + month;
  }

  const DATE = new Date(year, month, 0);
  return {
    now: DATE,
    day: DATE.getDate(),
    month: DATE.getMonth() + 1,
    year: DATE.getFullYear(),
    week: DATE.getDay(),
    count: (new Date(DATE.getFullYear(), DATE.getMonth() + 1, 0)).getDate()
  };
}

export function getNextMonthDays(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;

  if (month === 0) {
    month = 12;
    year = year - 1;
  }
  if (month < 10) {
    month = '0' + month;
  }

  const DATE = new Date(year, month, 1);
  return {
    now: DATE,
    day: DATE.getDate(),
    month: DATE.getMonth() + 1,
    year: DATE.getFullYear(),
    week: DATE.getDay(),
    count: (new Date(DATE.getFullYear(), DATE.getMonth() + 1, 0)).getDate()
  };
}

export function getDays(date) {
  let year = date.getFullYear();
  let month = date.getMonth();

  if (month === 0) {
    month = 12;
    year = year - 1;
  }

  const PREV_DATE = new Date(year, month - 1, 1);
  const CURR_DATE = new Date(year, month, 1);
  const NEXT_DATE = new Date(year, month + 1, 1);

  const NOW = new Date();

  const PREV_ITEM = {
    now: PREV_DATE,
    day: PREV_DATE.getDate(),
    month: PREV_DATE.getMonth() + 1,
    year: PREV_DATE.getFullYear(),
    week: PREV_DATE.getDay() === 0 ? 7 : PREV_DATE.getDay(),
    count: (new Date(PREV_DATE.getFullYear(), PREV_DATE.getMonth() + 1, 0)).getDate()
  };
  const CURR_ITEM = {
    now: CURR_DATE,
    day: CURR_DATE.getDate(),
    month: CURR_DATE.getMonth() + 1,
    year: CURR_DATE.getFullYear(),
    week: CURR_DATE.getDay() === 0 ? 7 : CURR_DATE.getDay(),
    count: (new Date(CURR_DATE.getFullYear(), CURR_DATE.getMonth() + 1, 0)).getDate()
  };
  const NEXT_ITEM = {
    now: NEXT_DATE,
    day: NEXT_DATE.getDate(),
    month: NEXT_DATE.getMonth() + 1,
    year: NEXT_DATE.getFullYear(),
    week: NEXT_DATE.getDay() === 0 ? 7 : NEXT_DATE.getDay(),
    count: (new Date(NEXT_DATE.getFullYear(), NEXT_DATE.getMonth() + 1, 0)).getDate()
  };

  return {
    now: {
      now: NOW,
      day: NOW.getDate(),
      month: NOW.getMonth() + 1,
      year: NOW.getFullYear(),
      week: NOW.getDay() === 0 ? 7 : date.getDay(),
      count: (new Date(NOW.getFullYear(), NOW.getMonth() + 1, 0)).getDate()
    },
    prev: (function (dateItem) {
      const items = [];
      for (let i = 1; i <= dateItem.count; i++) {
        const _dateNow = new Date(dateItem.year + '/' + dateItem.month + '/' + i);
        // const currDateItems = [];
        const item = {
          now: new Date(dateItem.year + '/' + dateItem.month + '/' + i),
          day: _dateNow.getDate(),
          month: _dateNow.getMonth() + 1,
          year: _dateNow.getFullYear(),
          week: _dateNow.getDay() === 0 ? 7 : _dateNow.getDay(),
          count: dateItem.count
        };
        items.push(item);
      }
      return items;
    })(PREV_ITEM),
    curr: (function (dateItem) {
      const items = [];
      for (let i = 1; i <= dateItem.count; i++) {
        const _dateNow = new Date(dateItem.year + '/' + dateItem.month + '/' + i);
        const item = {
          now: new Date(dateItem.year + '/' + dateItem.month + '/' + i),
          day: _dateNow.getDate(),
          month: _dateNow.getMonth() + 1,
          year: _dateNow.getFullYear(),
          week: _dateNow.getDay() === 0 ? 7 : _dateNow.getDay(),
          count: dateItem.count
        };
        items.push(item);
      }
      return items;
    })(CURR_ITEM),
    next: (function (dateItem) {
      const items = [];
      for (let i = 1; i <= dateItem.count; i++) {
        const _dateNow = new Date(dateItem.year + '/' + dateItem.month + '/' + i);
        const item = {
          now: new Date(dateItem.year + '/' + dateItem.month + '/' + i),
          day: _dateNow.getDate(),
          month: _dateNow.getMonth() + 1,
          year: _dateNow.getFullYear(),
          week: _dateNow.getDay() === 0 ? 7 : _dateNow.getDay(),
          count: dateItem.count
        };
        items.push(item);
      }
      return items;
    })(NEXT_ITEM)
  };
}
