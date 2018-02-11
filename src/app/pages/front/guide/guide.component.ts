import {Component, OnInit} from '@angular/core';

import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';

@Component({
  selector: 'app-front-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class FrontGuideComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  constructor(private wxService: WxService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
    this.wxService.config({
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });
  }

}
