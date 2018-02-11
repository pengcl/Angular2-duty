import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../../../services/toast.service';
import {WxService} from '../../../../modules/wx';

import 'rxjs/add/observable/timer';
import {PageConfig} from '../../../page.config';

@Component({
  selector: 'app-front-red-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class FrontRedGetComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  constructor(private toast: ToastService, private wx: WxService) {
  }


  ngOnInit() {
  }

}
