import {Component, OnInit} from '@angular/core';

import {PageConfig} from '../../../page.config';
import {WxService} from '../../../../modules/wx';

import {simAnim, slide} from '../../../../utils/animate';

@Component({
  selector: 'app-front-guide-step2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.scss'],
  animations: [simAnim, slide]
})
export class FrontGuideStep2Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  capabilities = [];
  animationName = ['zoomOut', 'zoomOut', 'zoomOut', 'zoomOut', 'zoomOut', 'zoomOut'];

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

  selectedCapability(capability, index) {
    if (this.capabilities.indexOf(capability) !== -1) {
      this.animationName[index] = 'zoomOut';
      this.capabilities = this.capabilities.filter(k => {
        return k !== capability;
      });
    } else {
      this.animationName[index] = 'zoomIn';
      this.capabilities.push(capability);
    }
  }

}
