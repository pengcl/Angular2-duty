import {Component, OnInit} from '@angular/core';

import {PageConfig} from '../../../page.config';
import {WxService} from '../../../../modules/wx';

@Component({
  selector: 'app-front-guide-step1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.scss']
})
export class FrontGuideStep1Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  constructor(private wx: WxService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
    /*this.wxService.config({
      title: '新标题'
    }, this.jsApiList).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });*/
  }

}
