import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EmployerService} from '../../../../../services/employer.service';

declare var $: any;

@Component({
  selector: 'app-admin-employer-order-protocols',
  templateUrl: './protocols.component.html',
  styleUrls: ['./protocols.component.scss']
})
export class AdminEmployerOrderProtocolsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  protocol;

  constructor(private activatedRoute: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private employer: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.activatedRoute.paramMap.switchMap((params: ParamMap) => this.employer.getProtocol(params.get('id'))).subscribe(res => {
      if (res.code === 0) {
        this.protocol = res.protocolContent;
        console.log(this.protocol);
      }
    });
  }
}
