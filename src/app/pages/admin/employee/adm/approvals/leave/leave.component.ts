import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../../modules/wx';
import {UserService} from '../../../../../../services/user.service';
import {EmployerService} from '../../../../../../services/employer.service';

@Component({
  selector: 'app-admin-employee-adm-approvals-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class AdminEmployeeADMApprovalsLeaveComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employerSvc: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
  }
}
