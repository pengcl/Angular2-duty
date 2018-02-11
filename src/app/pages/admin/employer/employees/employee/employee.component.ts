import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {RatingConfig} from '../../../../../modules/rating';
import {EmployeeService} from '../../../../../services/employee.service';
import {ChartF2Service} from '../../../../../modules/chart-f2';
import {Config} from '../../../../../config';

declare var $: any;
declare var F2: any;

@Component({
  selector: 'app-admin-employer-employees-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class AdminEmployerEmployeesEmployeeComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  userId: string;
  user: any;

  show: boolean = false;

  ratingConfig: RatingConfig = {
    cls: 'rating',
    stateOff: 'off',
    stateOn: 'on'
  };

  rate: number = 3;

  images;
  galleryCurrent = 0;

  profile: any = {
    id: '001',
    type: 1,
    serviceType: '健身教练',
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
      createAt: 1515400329000,
      updateAt: 1515400329000,
      expireAt: 1515400329000
    },
  };

  housekeeper: any;

  constructor(private route: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private employeeSvc: EmployeeService,
              private chartSvc: ChartF2Service) {
  }

  showGallery(current) {
    this.show = true;
    this.galleryCurrent = current;
  }

  onDelete(item: any) {
    console.log(item);
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.route.paramMap.switchMap((params: ParamMap) => this.employeeSvc.getHousekeeper(params.get('id'))).subscribe(res => {
      this.housekeeper = res.housekeeper;
      const images = [];
      $.each(this.housekeeper.imageList, function (i, k) {
        images.push(k.imageurl);
      });
      this.images = images;
    });

    this.chartSvc.get().then(res => {
      F2.Global.pixelRatio = window.devicePixelRatio;
      const data = [
        {name: '关羽', props: '驾驶出行', value: 80},
        {name: '关羽', props: '科学运动', value: 94},
        {name: '关羽', props: '管家礼仪', value: 70},
        {name: '关羽', props: '法律知识', value: 95},
        {name: '关羽', props: '心理素质', value: 99},
        {name: '关羽', props: '安全预防', value: 99}
      ];

      const chart = new F2.Chart({
        id: 'mountNode'
      });

      chart.coord('polar');
      chart.source(data, {
        value: {
          min: 0,
          tickInterval: 20
        }
      });


      // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
      chart.axis('props', {
        label: {
          fontSize: 1
        },
        line: null
      });
      chart.axis('value', {
        label: null,
        line: null
      });

      chart.area().position('props*value').color('name').style({
        opacity: 0.6,
        background: '#FBA703'
      });
      // x和y轴同时缩放的动画
      chart.animate({
        type: 'scalexy'
      });
      chart.render();
    });
  }

}
