import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {PageConfig} from './page.config';
import {DateService} from '../../../../../services/date.service';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {MoService} from '../../../../../services/mo.service';
import {GeoService} from '../../../../../services/geo.service';

import {EmployeeService} from '../../../../../services/employee.service';
import {getDays} from '../../../../../utils/utils';

declare var mojs: any;
declare var $: any;
declare var qq: any;

interface DateItem {
  now: any; // 当前时间
  day: number; // 当前日期
  month: number; // 当前月份
  year: number;
  week: number; // 当前星期几
  count?: number; // 当前月份有几天
}

@Component({
  selector: 'app-admin-employee-clockIn-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
  providers: [DatePipe]
})
export class AdminEmployeeClockInRecordsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  dateNow: any = new Date(); // 当前时间

  currDateItem: DateItem = {
    now: this.dateNow,
    day: this.dateNow.getDate(),
    month: this.dateNow.getMonth() + 1,
    year: this.dateNow.getFullYear(),
    week: this.dateNow.getDay(),
    count: this.date.getCountDays(this.dateNow)
  };

  items;

  user: any;

  location: any = {};

  signInfo;
  monthSignInfo;

  constructor(private datePipe: DatePipe,
              private date: DateService,
              private geo: GeoService,
              private wx: WxService,
              private userSvc: UserService,
              private moSvc: MoService,
              private employeeSvc: EmployeeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.items = getDays(new Date());

    this.employeeSvc.getSignInfo(this.user.housekeeperId).then(res => {
      if (res.code === 0) {
        this.signInfo = res.housekeeperSign;
      }
    });
  }

  getSignInfo(item) {
    this.currDateItem = item;
    const signDate = item.year + '-' + (item.month <= 9 ? '0' + item.month : item.month) + '-' + (item.day <= 9 ? '0' + item.day : item.day);
    this.employeeSvc.getSomedaySignInfo(this.user.housekeeperId, signDate).then(res => {
      if (res.code === 0) {
        this.signInfo = res.housekeeperSign;
      }
    });
  }

  getPrevMonth() {
    this.items = getDays(this.items.prev[0].now);
  }

  getNextMonth() {
    this.items = getDays(this.items.next[0].now);
  }

}
