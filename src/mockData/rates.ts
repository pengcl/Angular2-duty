/*import {OrderList} from '../app/models/order.model';
import {Butler} from '../app/models/product.model';*/

const tagList = ['出色完成任务', '爱干净', '体格强壮', '安全意识强', '守时间', '运动专业', '有礼貌', '有责任心', '熟知法律', '心理稳健', '驾驶技术好'];
const nameList = ['彭', '吴', '王', '赵', '邹', '钱', '黄', '将', '毛', '卢'];

const createRate = function () {
  const item = {
    id: '01',
    name: (function (list) {
      return list[Math.round(Math.random() * 9)];
    })(nameList),
    sex: Math.round(Math.random()),
    avatar: (function () {
      return '/assets/images/avatars/' + Math.round(Math.random() * 2 + 1) + '.jpg';
    })(),
    content: '为人特别耿直、公正、淳朴、对工作一丝不苟、踏踏实实、认真负责，令人敬佩！为人乐观，幽默，开车一点也不枯燥。',
    rate: (function () {
      return Math.round(Math.random() * 5);
    })(),
    tags: (function (tags) {
      const I = Math.round(Math.random() * 2 + 1);
      const list = [];
      for (let i = 0; i < I; i++) {
        list.push(tags[Math.round(Math.random() * 10)]);
      }
      return list;
    })(tagList),
    meta: {
      createAt: '2018-01-27 16:00:00',
      updateAt: '2018-01-27 16:00:00',
      expireAt: '2018-01-27 16:00:00'
    }
  };
  return item;
};
export const RATES: any[] = (function () {
  const list = [];
  for (let i = 0; i <= 100; i++) {
    const item = createRate();
    list.push(item);
  }
  return list;
})();
