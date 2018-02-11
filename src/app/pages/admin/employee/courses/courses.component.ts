import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {Config} from '../../../../config';

declare var $: any;

@Component({
  selector: 'app-admin-employee-course',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class AdminEmployeeCoursesComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  config = Config;
  user: any;

  constructor(private wx: WxService,
              private userSvc: UserService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
  }

}
