import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../modules/wx';
import {UserService} from '../../../services/user.service';
import {EmployeeService} from '../../../services/employee.service';
import {Config} from '../../../config';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class AdminEmployeeComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  userInfo;
  employers;
  config = Config;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employee: EmployeeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.employee.getHousekeeper(this.user.housekeeperId).then(res => {
      this.userInfo = res.housekeeper;
      console.log(this.userInfo);
    });
    this.employee.getEmployer(this.user.housekeeperId, 2).then(res => {
      this.employers = res.list;
      console.log(this.employers);
    });
  }
}
