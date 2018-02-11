import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {Config} from '../../../../../config';

declare var $: any;

@Component({
  selector: 'app-admin-employee-course-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss']
})
export class AdminEmployeeCoursesMineComponent implements OnInit {
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
