/*import {OrderList} from '../app/models/order.model';
import {Butler} from '../app/models/product.model';*/

export const ORDERLIST: any[] = [
  {
    id: 'DX000001',
    amount: 36000,
    paid: 12000,
    payState: {
      amount: 36000,
      paid: 12000,
      type: 0,
      periods: [
        {
          paid: 12000,
          amount: 12000,
          meta: {
            createAt: '2018-01-27 16:00:00',
            paidAt: '2018-01-27 16:00:00',
            expireAt: '2018-01-27 16:00:00'
          }
        },
        {
          paid: 12000,
          amount: 12000,
          meta: {
            createAt: '2018-02-27 16:00:00',
            paidAt: '2018-02-27 16:00:00',
            expireAt: '2018-02-27 16:00:00'
          }
        },
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: '2018-03-27 16:00:00',
            paidAt: '2018-03-27 16:00:00',
            expireAt: '2018-03-27 16:00:00'
          }
        }
      ]
    },
    meta: {
      createAt: '2018-01-27 16:00:00',
      updateAt: '2018-01-27 16:00:00',
      expireAt: '2018-01-27 16:00:00'
    },
    employees: [
      {
        id: '001',
        no: '001',
        type: {
          id: 1,
          name: '健身教练'
        },
        name: '黑寡妇',
        age: 40,
        sex: 0,
        height: 167,
        weight: 52,
        experience: 10,
        skill: [],
        avatar: '/assets/images/avatars/1.jpg',
        post: '/assets/images/butlers/1.jpg',
        price: '12000',
        origin: '美国',
        level: 2,
        like: false,
        meta: {
          createAt: '2018-01-27 16:00:00',
          updateAt: '2018-01-27 16:00:00',
          expireAt: '2018-01-27 16:00:00'
        },
      },
      {
        id: '002',
        no: '002',
        type: {
          id: 1,
          name: '安全保障'
        },
        name: '钢铁侠',
        age: 40,
        sex: 1,
        height: 178,
        weight: 72,
        experience: 9,
        skill: [],
        avatar: '/assets/images/avatars/2.jpg',
        post: '/assets/images/butlers/2.jpg',
        price: '12000',
        origin: '美国',
        level: 1,
        like: false,
        meta: {
          createAt: '2018-01-27 16:00:00',
          updateAt: '2018-01-27 16:00:00',
          expireAt: '2018-01-27 16:00:00'
        },
      }
    ]
  },
  {
    id: 'DX000002',
    amount: 36000,
    paid: 12000,
    payState: {
      amount: 36000,
      paid: 12000,
      type: 0,
      periods: [
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: '2018-01-27 16:00:00',
            paidAt: '2018-01-27 16:00:00',
            expireAt: '2018-01-27 16:00:00'
          }
        },
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: '2018-02-27 16:00:00',
            paidAt: '2018-02-27 16:00:00',
            expireAt: '2018-02-27 16:00:00'
          }
        },
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: '2018-03-27 16:00:00',
            paidAt: '2018-03-27 16:00:00',
            expireAt: '2018-03-27 16:00:00'
          }
        }
      ]
    },
    meta: {
      createAt: '2018-01-27 16:00:00',
      updateAt: '2018-01-27 16:00:00',
      expireAt: '2018-01-27 16:00:00'
    },
    employees: [
      {
        id: '002',
        type: {
          id: '3',
          name: '安全保障',
        },
        name: '钢铁侠',
        age: 40,
        sex: 0,
        height: 178,
        weight: 72,
        experience: 9,
        skill: [],
        avatar: '/assets/images/avatars/2.jpg',
        post: '/assets/images/butlers/2.jpg',
        price: '12000',
        origin: '美国',
        level: 2,
        like: false,
        meta: {
          createAt: '2018-01-27 16:00:00',
          updateAt: '2018-01-27 16:00:00',
          expireAt: '2018-01-27 16:00:00'
        },
      }
    ]
  },
  {
    id: 'DX000003',
    amount: 36000,
    paid: 12000,
    payState: {
      amount: 36000,
      paid: 12000,
      type: 0,
      periods: [
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: '2018-01-27 16:00:00',
            paidAt: '2018-01-27 16:00:00',
            expireAt: '2018-01-27 16:00:00'
          }
        },
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: '2018-02-27 16:00:00',
            paidAt: '2018-02-27 16:00:00',
            expireAt: '2018-02-27 16:00:00'
          }
        },
        {
          paid: true,
          amount: 12000,
          meta: {
            createAt: '2018-03-27 16:00:00',
            paidAt: '2018-03-27 16:00:00',
            expireAt: '2018-03-27 16:00:00'
          }
        }
      ]
    },
    meta: {
      createAt: '2018-01-27 16:00:00',
      updateAt: '2018-01-27 16:00:00',
      expireAt: '2018-01-27 16:00:00'
    },
    employees: [
      {
        id: '002',
        type: {
          id: 1,
          name: '安全保障'
        },
        name: '钢铁侠',
        age: 40,
        sex: 0,
        height: 178,
        weight: 72,
        experience: 9,
        skill: [],
        avatar: '/assets/images/avatars/2.jpg',
        post: '/assets/images/butlers/2.jpg',
        price: '12000',
        origin: '美国',
        level: 2,
        like: false,
        meta: {
          createAt: '2018-01-27 16:00:00',
          updateAt: '2018-01-27 16:00:00',
          expireAt: '2018-01-27 16:00:00'
        },
      }
    ]
  }
];
