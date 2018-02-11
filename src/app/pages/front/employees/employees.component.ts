import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../modules/wx';
import {UserService} from '../../../services/user.service';
import {MoService} from '../../../services/mo.service';
import {EmployeeService} from '../../../services/employee.service';
import {InfiniteLoaderComponent} from '../../../components/infinite-loader/infinite-loader.component';

import {EmployeesPipe} from '../../../pipes/employees.pipe';

import {simAnim, slide} from '../../../utils/animate';
import {Observable} from 'rxjs/Observable';

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
  selector: 'app-front-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  animations: [simAnim, slide]
})
export class FrontEmployeesComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  filter: string [] = ['sex:', 'levelname:'];
  products: any[];
  filterOfProducts: any[];
  currProducts: any[];

  listType = 'grid';

  animationName = 'zoomOut';

  pageSize: number = 6;
  currPage: number = 1;

  @ViewChild(InfiniteLoaderComponent) il;

  /*butlers: Butler[] = [
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

  moJsReady;

  filterShow: boolean = false;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private moSvc: MoService,
              private employeeSvc: EmployeeService,
              private employeesPipe: EmployeesPipe) {
  }

  ngOnInit() {

    this.moSvc.get().then((res) => {
      this.moJsReady = true;
    });

    this.employeeSvc.getProducts().then(res => {
      console.log(res);
      this.products = res;
      this.filterOfProducts = this.employeesPipe.transform(this.products, this.filter);
      this.currProducts = this.filterOfProducts.slice(0, this.pageSize);
    });

  }

  setListType(type) {// 选择排版样式
    this.listType = type;
  }

  setFilter(filter) {// 选择过滤
    this.filter = filter;
  }

  showFilter() {
    this.filterShow = true;
    this.animationName = 'zoomIn';
  }

  selectedFilter(filter) {
    this.filterShow = false;
    this.animationName = 'zoomOut';
    this.filterOfProducts = this.employeesPipe.transform(this.products, this.filter); // 筛选数据
    this.currProducts = this.filterOfProducts.slice(0, this.pageSize); // 充值首屏数据
    this.currPage = 1; // 重置当前页码
    this.il.restart(); // 重置loadMore
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      this.currPage = this.currPage + 1;
      this.currProducts = this.filterOfProducts.slice(0, this.pageSize * this.currPage); // 获取当前页数据

      if (this.currProducts.length >= this.filterOfProducts.length) {
        comp.setFinished();
        return;
      }

      comp.resolveLoading();
    });
  }
}
