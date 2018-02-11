import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {MoService} from '../../../../services/mo.service';
import {EmployeeService} from '../../../../services/employee.service';

import {Config} from '../../../../config';

declare var $: any;
declare var mojs: any;

const OPTS = {
  fill: 'none',
  radius: 25,
  strokeWidth: {50: 0},
  scale: {0: 1},
  duration: 500,
  left: 0, top: 0,
  easing: 'cubic.out'
};

@Component({
  selector: 'app-admin-employer-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class AdminEmployerEmployeesComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  user: any;
  timer: any;

  filter: number | string [] = ['', '', ''];
  orderBy: boolean[] = [false, false];
  butlers;
  /*butlers = [
    {
      userId: '001',
      type: 1,
      name: '黑寡妇',
      age: 40,
      sex: 0,
      experience: 10,
      skill: [],
      avatar: '/assets/images/avatar/1.jpg',
      post: '/assets/images/butlers/1.jpg',
      price: 10000,
      origin: '美国',
      level: 2,
      like: false
    },
    {
      userId: '002',
      type: 1,
      name: '钢铁侠',
      age: 40,
      sex: 1,
      experience: 9,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/2.jpg',
      price: 10000,
      origin: '美国',
      level: 1,
      like: false
    },
    {
      userId: '003',
      type: 1,
      name: '美国队长',
      age: 40,
      sex: 1,
      experience: 8,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/3.jpg',
      price: 10000,
      origin: '美国',
      level: 1,
      like: false
    },
    {
      userId: '004',
      type: 1,
      name: '绿巨人',
      age: 40,
      sex: 1,
      experience: 7,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/4.jpg',
      price: 10000,
      origin: '美国',
      level: 1,
      like: false
    },
    {
      userId: '005',
      type: 1,
      name: '雷神',
      age: 40,
      sex: 1,
      experience: 6,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/5.jpg',
      price: 10000,
      origin: '美国',
      level: 1,
      like: false
    },
    {
      userId: '006',
      type: 1,
      name: '鹰眼',
      age: 40,
      sex: 1,
      experience: 5,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/6.jpg',
      price: 10000,
      origin: '美国',
      level: 1,
      like: false
    },
    {
      userId: '007',
      type: 1,
      name: '红女巫',
      age: 40,
      sex: 0,
      experience: 10,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/7.jpg',
      price: 10000,
      origin: '美国',
      level: 2,
      like: false
    },
    {
      userId: '008',
      type: 1,
      name: '快银',
      age: 40,
      sex: 1,
      experience: 4,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/8.jpg',
      price: 10000,
      origin: '美国',
      level: 2,
      like: false
    },
  ];*/

  mainCircle: any;
  smallCircles: any[] = [];
  timeline: any;

  filterShow: boolean = false;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private moSvc: MoService,
              private employeeSvc: EmployeeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.employeeSvc.getHousekeepers().then(res => {
      this.butlers = res.list;
      console.log(res.list);
    });

    this.moSvc.get().then((res) => {

      const colors = ['deeppink', 'magenta', 'yellow', '#00F87F'];

      this.mainCircle = new mojs.Shape({
        ...OPTS,
        stroke: 'cyan'
      });

      for (let i = 0; i < 4; i++) {
        this.smallCircles.push(new mojs.Shape({
            ...OPTS,
            parent: this.mainCircle.el,
            strokeWidth: {30: 0},
            left: '50%', top: '50%',
            stroke: colors[i % colors.length],
            delay: 'rand(0, 350)',
            x: 'rand(-50, 50)',
            y: 'rand(-50, 50)',
            radius: 'rand(5, 10)'
          })
        );
      }
      const $moEle = $('[data-name="mojs-shape"]');
      this.timeline = new mojs.Timeline({
        onStart() {
          $moEle.removeClass('hide');
          $moEle.addClass('show');
        },
        onComplete() {
          $moEle.removeClass('show');
          $moEle.addClass('hide');
          console.log();
        }
      });
    });

  }

  selectedFilter(filter) {
    this.filter = filter;
    console.log(this.filter);
  }

  toggleOrderBy(orderBy) {
    this.orderBy = orderBy;
    console.log(this.orderBy);
  }

  toggleFilter() {
    this.filterShow = !this.filterShow;
  }

  selectedButler(butler) {
    console.log(butler);
  }

  like(e, index) {
    e.stopPropagation();
    if (!this.butlers[index].like) {
      this.mainCircle
        .tune({x: e.pageX, y: e.pageY});

      for (let i = 0; i < this.smallCircles.length; i++) {
        this.smallCircles[i]
          .generate();
      }

      this.timeline.add(this.mainCircle, this.smallCircles);
      this.timeline.replay();
      this.timer = setTimeout(() => {
        this.timeline.reset(500);
      }, 1000);
    }
    this.butlers[index].like = !this.butlers[index].like;
  }

}
