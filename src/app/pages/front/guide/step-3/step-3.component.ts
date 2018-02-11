import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './../../../page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {MoService} from '../../../../services/mo.service';
import {EmployeeService} from '../../../../services/employee.service';

import {EmployeesPipe} from '../../../../pipes/employees.pipe';

import {simAnim, slide} from '../../../../utils/animate';

import {InfiniteLoaderComponent} from '../../../../components/infinite-loader/infinite-loader.component';
import {Observable} from 'rxjs/Observable';

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
  selector: 'app-front-guide-step3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.scss'],
  animations: [simAnim, slide]
})
export class FrontGuideStep3Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  employees;

  pageSize: number = 6;
  currPage: number = 1;
  totalPage: number = 1;
  currLists: any[];
  lists: any[];
  isLast = false;

  @ViewChild(InfiniteLoaderComponent) il;

  mainCircle: any;
  smallCircles: any[] = [];
  timeline: any;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private moSvc: MoService,
              private employeeSvc: EmployeeService,
              private employeesPipe: EmployeesPipe) {
  }

  ngOnInit() {

    this.employeeSvc.getHousekeepers().then(res => {
      this.employees = res.list;
      this.lists = res.list;
      this.currLists = res.list.slice(0, this.pageSize);
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

      this.timeline = new mojs.Timeline({
        onStart() {
          const $moEle = $('body > div:last');
          $moEle.removeClass('hide');
          $moEle.addClass('show');
        },
        onComplete() {
          const $moEle = $('body > div:last');
          $moEle.removeClass('show');
          $moEle.addClass('hide');
        }
      });
    });

  }

  /*like(e, index) {
    e.stopPropagation();
    if (!this.filterOfEmployees[index].like) {
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
    this.filterOfEmployees[index].like = !this.filterOfEmployees[index].like;
  }*/

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      this.currPage = this.currPage + 1;
      this.currLists = this.lists.slice(0, this.pageSize * this.currPage); // 获取当前页数据

      if (this.currLists.length >= this.lists.length) {
        comp.setFinished();
        this.isLast = true;
        return;
      }

      comp.resolveLoading();
    });
  }

}
