import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../modules/wx';
import {UserService} from '../../../services/user.service';
import {EmployerService} from '../../../services/employer.service';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-admin-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class AdminEmployerComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  employer;
  employees;
  contractList;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employerSvc: EmployerService,
              private orderSvc: OrderService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.employerSvc.getEmployer(this.user.id).then(res => {
      if (res.code === 0) {
        this.employer = res.cust;
      }
    });
    this.employerSvc.getMyEmployees(this.user.id).then(res => {
      if (res.code === 0) {
        this.employees = res.list;
      } else {
        console.log(res.msg);
      }
    });

    this.orderSvc.getOrders('employer', this.user.id).then(res => {
      if (res.code === 0) {
        this.contractList = res.list;
        console.log(this.contractList);
      }
    });
  }
}
