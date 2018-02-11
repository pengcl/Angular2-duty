import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PageConfig} from './../../../page.config';
import {WxService} from '../../../../modules/wx';
import {ActionSheetConfig} from '../../../../components/actionsheet';
import {ACTIONSHEETS} from '../../../../../mockData/actionSheets';
import {ActionSheetService} from '../../../../components/actionsheet';
import {DialogService} from '../../../../modules/dialog';

declare var $: any;
declare var mojs: any;

const OPTS = {
  fill: 'none',
  radius: 25,
  strokeWidth: {50: 0},
  scale: {0: 1},
  duration: 500,
  left: 0, top: 0,
  easing: 'cubic.out'
};

@Component({
  selector: 'app-front-guide-step4',
  templateUrl: './step-4.component.html',
  styleUrls: ['./step-4.component.scss']
})
export class FrontGuideStep4Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  subscribeForm: FormGroup;

  config: ActionSheetConfig = <ActionSheetConfig>{
    backdrop: true
  };

  actionSheets = ACTIONSHEETS;

  menus: any[];
  extraShow: boolean = false;
  isSubmit: boolean = false;

  constructor(private router: Router,
              private wx: WxService,
              private dialog: DialogService,
              private actionSheet: ActionSheetService) {
  }

  ngOnInit() {
    this.subscribeForm = new FormGroup({
      customerName: new FormControl('', [Validators.required]),
      customerMobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      serviceAreaId: new FormControl('', [Validators.required]),
      serviceAreaName: new FormControl('', [Validators.required])
    });
  }

  onShow(target, exTarget?) {
    this.config.title = '请选择' + this.actionSheets[target].title;
    this.menus = this.actionSheets[target].data;
    this.actionSheet.show(this.menus, this.config).subscribe((res: any) => {
      console.log(res);
      this.subscribeForm.get(target).setValue(res.value);
      if (exTarget) {
        this.subscribeForm.get(exTarget).setValue(res.text);
      }
    });
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.subscribeForm.valid) {
      this.dialog.show({
        content: '<p class="text-left">我们已经收到您的管家需求，稍后将有客服人员与您联系</p><p class="text-left">请留意广州(020)的来电</p>',
        confirm: '大牛管家官网'
      }).subscribe(data => {
        if (data === 'confirm') {
          this.router.navigate(['/front/index'], {});
        }
        console.log(data);
      });
    }
  }

}
