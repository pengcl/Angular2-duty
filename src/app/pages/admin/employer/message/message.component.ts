import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {MessagesService} from '../../../../services/messages.service';

@Component({
  selector: 'app-admin-employer-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class AdminEmployerMessageComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  sysMessages;
  userMessages;

  tab: string = 'system';

  constructor(private wx: WxService, private userSvc: UserService, private messages: MessagesService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.messages.getMessages(this.user.id, 0).then(res => {
      this.sysMessages = res.list;
      console.log(res.list);
    });
    /*this.messages.getMessages(this.user.id, 1).then(res => {
      this.userMessages = res.list;
      console.log(res.list);
    });*/
  }

  setTab(tab) {
    this.tab = tab;
  }

}
