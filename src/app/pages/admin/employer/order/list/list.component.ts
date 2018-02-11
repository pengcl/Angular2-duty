import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {OrderService} from '../../../../../services/order.service';

import {Config} from '../../../../../config';

import {ORDERLIST} from '../../../../../../mockData/orderList';
import {EmployerService} from '../../../../../services/employer.service';

declare var $: any;

const formatOrder = function (item) {
  const order = {
    id: item.conid,
    no: item.conno,
    amount: item.conamount,
    paid: item.paidamount,
    payState: {
      amount: item.conamount,
      paid: item.paidamount,
      type: 0,
      periods: (function (lists) {
        const _list = [];
        lists.forEach(period => {
          const _period = {
            paid: period.paidamount,
            amount: period.amount,
            meta: {
              createAt: period.createtime,
              paidAt: period.paidtime,
              expireAt: 1515400329000
            }
          };
          _list.push(_period);
        });
        return _list;
      })(item.periodList)
    },
    meta: {
      createAt: item.createtime,
      updateAt: item.updatetime,
      expireAt: 1515400329000
    },
    employees: (function (lists) {
      const _list = [];
      lists.forEach(employee => {
        const _employee = {
          id: employee.housekeeperid,
          no: employee.housekeeperno,
          type: {
            id: employee.typeid,
            name: employee.typename
          },
          name: employee.name,
          age: employee.age,
          sex: employee.sex,
          height: employee.height,
          weight: employee.weight,
          experience: employee.servicetime,
          skill: employee.skillnames.split(','),
          avatar: Config.prefix.wApi + employee.headimageurl,
          price: employee.commissionamount,
          origin: '',
          level: employee.levelname,
          like: false
        };
        _list.push(_employee);
      });
      return _list;
    })(item.housekeeperList)
  };

  return order;
};

@Component({
  selector: 'app-admin-employer-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminEmployerOrderListComponent implements OnInit {
  agreementForm: FormGroup;
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  orderList: any[];

  selectedIndex: number = 0;

  onSelected(index) {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = index;
    }
  }

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employer: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    // this.orderList = ORDERLIST;
    this.employer.getOrders(this.user.id).then(res => {
      const list = [];
      console.log(res.list);
      if (res.code === 0) {
        res.list.forEach(k => {
          list.push(formatOrder(k));
        });
        // this.orderList = ORDERLIST;
        this.orderList = list;
        console.log(this.orderList);
      } else {
        console.log(res.msg);
      }
    });
    /*this.orderSvc.getOrders('employer', this.user.id).then(res => {
      const list = [];
      if (res.code === 0) {
        res.list.forEach(k => {
          list.push(formatOrder(k));
        });
        this.orderList = ORDERLIST;
        console.log(this.orderList);
      } else {
        console.log(res.msg);
      }
    });*/
  }
}
