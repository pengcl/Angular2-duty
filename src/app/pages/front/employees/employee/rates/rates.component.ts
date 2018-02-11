import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {InfiniteLoaderComponent} from '../../../../../components/infinite-loader/infinite-loader.component';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {EmployeeService} from '../../../../../services/employee.service';

import {RATES} from '../../../../../../mockData/rates';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-front-employees-employee-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class FrontEmployeesEmployeeRatesComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  housekeeper;

  rates;

  pageSize: number = 10;
  currPage: number = 1;
  currList: any[];

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private route: ActivatedRoute,
              private wx: WxService,
              private employeeSvc: EmployeeService) {
  }

  ngOnInit() {

    this.route.paramMap.switchMap((params: ParamMap) => {
      return this.employeeSvc.getHousekeeper(params.get('id'));
    }).subscribe(res => {
      this.housekeeper = res.housekeeper;
      this.rates = RATES.slice(0, this.pageSize * this.currPage); // 初始化当前页数据
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      this.currPage = this.currPage + 1;
      this.currList = RATES.slice(0, this.pageSize * this.currPage); // 获取当前页数据

      if (this.currList.length >= RATES.length) {
        comp.setFinished();
        return;
      }

      comp.resolveLoading();
    });
  }

}
