import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {PageConfig} from './page.config';
import {DateService} from '../../../../services/date.service';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {MoService} from '../../../../services/mo.service';
import {GeoService} from '../../../../services/geo.service';

import {EmployeeService} from '../../../../services/employee.service';
import {DialogService} from '../../../../modules/dialog';

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
  selector: 'app-admin-employee-clockIn',
  templateUrl: './clockIn.component.html',
  styleUrls: ['./clockIn.component.scss'],
  providers: [DatePipe]
})
export class AdminEmployeeClockInComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  clocked: boolean = false;
  clocking: boolean = false;
  clockInType: number; // 0:无打卡,1:正常,2:迟到,3:请假,4:旷工

  dateNow: any = new Date(); // 当前时间

  currDateItem: DateItem = {
    now: this.dateNow,
    day: this.dateNow.getDate(),
    month: this.dateNow.getMonth() + 1,
    year: this.dateNow.getFullYear(),
    week: this.dateNow.getDay(),
    count: this.date.getCountDays(this.dateNow)
  };

  user: any;

  location: any = {};

  signInfo;

  constructor(private datePipe: DatePipe,
              private date: DateService,
              private geo: GeoService,
              private wx: WxService,
              private userSvc: UserService,
              private moSvc: MoService,
              private employeeSvc: EmployeeService,
              private dialog: DialogService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.employeeSvc.getSignInfo(this.user.housekeeperId).then(res => {
      if (res.code === 0) {
        console.log(res);
        this.signInfo = res.housekeeperSign;
      }
    });

    this.geo.get().then((res) => {
      const geolocation = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
      geolocation.getLocation((position) => {
        /*const markUrl = 'https://apis.map.qq.com/tools/poimarker' +
          '?marker=coord:' + position.lat + ',' + position.lng +
          ';title:我的位置;addr:' + (position.addr || position.city) +
          '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp';
        document.getElementById('markPage').src = markUrl;*/

        this.location.location = position.lat + ',' + position.lng;

        this.geo.getPosition(this.location.location).then((result) => {
          this.location.address = result.result.address;
        });
      });
    });

    /*this.moSvc.get().then((res) => {

      const location = document.getElementById('location');

      const cx = location.offsetWidth / 2;
      const cy = location.offsetHeight / 2;

      const circleBig = new mojs.Shape({
        left: cx, top: cy,
        radius: 100,
        stroke: '#ccc',
        fill: 'none',
        strokeWidth: {10: 0, easing: 'cubic.out'},
        strokeLinecap: 'round',
        scale: {0: 3},
        duration: 600,
        easing: 'quad.out'
      });

      const timeline = new mojs.Timeline;

      timeline.add(circleBig);

      location.addEventListener('click', function (e) {
        timeline.play();
      });

    });*/
  }

  clockIn(e): void {
    this.clocking = true;
    this.clocked = true;
    this.employeeSvc.clockIn({
      housekeeperId: this.user.housekeeperId,
      location: this.location.location,
      address: this.location.address,
      signRemark: ''
    }).then(result => {
      if (result.code === 0) {
        this.employeeSvc.getSignInfo(this.user.housekeeperId).then(res => {
          if (res.code === 0) {
            this.signInfo = res.housekeeperSign;
          }
        });

        this.employeeSvc.getMonthSignInfo({
          housekeeperId: this.user.housekeeperId,
          year: this.currDateItem.year,
          month: this.currDateItem.month
        }).then(res => {
          console.log(res);
        });

        this.dialog.show({
          title: '打卡成功',
          content: '<p>开始上班 ' + this.datePipe.transform(this.dateNow, 'HH:mm:ss') + '</p><p>新的一天开始了，加油哦！</p>'
        }).subscribe(res => {
          if (res === 'confirm') {
            // this.onSubmit();
          }
        });
      } else {
        this.dialog.show({
          title: '系统提示',
          content: result.msg,
        }).subscribe(res => {
          if (res === 'confirm') {
            // this.onSubmit();
          }
        });
      }
    });
  }

}
