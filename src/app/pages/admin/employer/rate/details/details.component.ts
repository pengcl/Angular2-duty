import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {RatingConfig} from '../../../../../modules/rating';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-admin-employer-rate-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AdminEmployerRateDetailsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  ratingConfig: RatingConfig = {
    cls: 'rating',
    stateOff: 'off',
    stateOn: 'on'
  };

  rate: number = 3;

  constructor(private wx: WxService,
              private userSvc: UserService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
  }

}
