import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-admin-employee-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.scss']
})
export class AdminEmployeeADMComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  constructor(private wx: WxService,
              private userSvc: UserService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
  }
}
