import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class AppPayComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  constructor(private userSvc: UserService) {
  }

  ngOnInit() {

    this.user = this.userSvc.isLogin();
    /*if (this.userId) {
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }*/
  }

}
