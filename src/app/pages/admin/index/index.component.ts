import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../modules/wx';
import {UserService} from '../../../services/user.service';
import {EmployeeService} from '../../../services/employee.service';

@Component({
  selector: 'app-admin-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class AdminIndexComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  butlers: any[];

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employeeSvc: EmployeeService) {
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.user = this.userSvc.isLogin();
      /*this.userSvc.getUserInfo(this.user.id).then(res => {
        console.log(res.cust);
        this.custom = custom;
      });*/
    }
    this.employeeSvc.getHousekeepers().then(res => {
      if (res.code === 0) {
        this.butlers = res.list;
      }
      console.log(res);
      /*this.butlers = res.msg;
      console.log(res);*/
    });
  }

}
