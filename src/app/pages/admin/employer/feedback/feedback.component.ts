import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {EventService} from '../../../../services/event.service';
import {DialogService} from '../../../../modules/dialog';

@Component({
  selector: 'app-admin-employer-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class AdminEmployerFeedbackComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  eventForm: FormGroup;
  user: any;
  eventTypeId;
  isSubmit;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private eventSvc: EventService,
              private dialog: DialogService) {
    this.eventTypeId = 4;
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.eventForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      eventTypeId: new FormControl('', [Validators.required]),
      eventTitle: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      images: new FormControl('', [])
    });
    this.eventForm.get('custId').setValue(this.user.id);
    this.eventForm.get('eventTypeId').setValue(this.eventTypeId);

    this.eventSvc.getEventTypeList().then(res => {
      console.log(res);
    });
  }

  makeSure() {
    this.dialog.show({
      title: '确认离职信息',
      content: '您提出将在 ' + ' 离职，是否确定？',
    }).subscribe((res: any) => {
      console.log(res);
      if (res === 'confirm') {
        this.onSubmit();
      }
    });
    return false;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.eventForm.valid) {
      this.eventSvc.addEvent(this.eventForm.value).then(res => {
        console.log(res);
        if (res.code === 1) {
          this.dialog.show({
            title: '系统提示',
            content: res.msg,
          }).subscribe((data: any) => {
            console.log(data);
          });
        } else {
          this.dialog.show({
            title: '申请已提交',
            content: '<p>请留意后续沟通，做好交接工作，感谢您的付出！</p><p>如为误操作，请撤销或联系客服。</p>',
          }).subscribe((data: any) => {
            console.log(data);
          });
        }
      });
    }
  }

}
