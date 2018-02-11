import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';

@Component({
  selector: 'app-admin-employer-order-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AdminEmployerOrderDetailsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  public count: number = 0;

  constructor(private wx: WxService, private userSvc: UserService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
  }

  /*toggleAgree() {
    this.agreementForm.value.agree = !this.agreementForm.value.agree;
  }

  onSubmit() {
    if (this.agreementForm.valid) {
      console.log(this.agreementForm.value);
    }
  }*/

}
