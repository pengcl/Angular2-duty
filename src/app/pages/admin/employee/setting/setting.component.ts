import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {EmployeeService} from '../../../../services/employee.service';
import {Config} from '../../../../config';

declare var $: any;

@Component({
  selector: 'app-admin-employee-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class AdminEmployeeSettingComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  config = Config;
  user: any;

  show: boolean = false;

  images;
  galleryCurrent = 0;

  housekeeper: any;

  constructor(private route: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private employeeSvc: EmployeeService) {
  }

  showGallery(current) {
    this.show = true;
    this.galleryCurrent = current;
  }

  onDelete(current: any) {
    this.employeeSvc.delImage({imageid: this.housekeeper.imageList[current].imageid}).then(res => {
      this.images.splice(current, 1);
      this.housekeeper.imageList.splice(current, 1);
    });
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.employeeSvc.getHousekeeper(this.user.housekeeperId).then(res => {
      this.housekeeper = res.housekeeper;
      const images = [];
      $.each(this.housekeeper.imageList, function (i, k) {
        images.push(k.imageurl);
      });
      this.images = images;
    });
  }

}
