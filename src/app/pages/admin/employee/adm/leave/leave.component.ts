import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EventService} from '../../../../../services/event.service';
import {PickerService} from '../../../../../modules/picker';
import {DatePipe} from '@angular/common';
import {DialogService} from '../../../../../modules/dialog';
import {getIndex, leaveDate} from '../../../../../utils/utils';

@Component({
  selector: 'app-admin-employee-adm-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
  providers: [DatePipe]
})
export class AdminEmployeeADMLeaveComponent implements OnInit {
  eventForm: FormGroup;
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  userId: string;
  user: any;
  eventTypeId;
  isSubmit;

  leaveType;
  leaveTypeList;

  leave;

  constructor(private route: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private picker: PickerService,
              private datePipe: DatePipe,
              private eventSvc: EventService,
              private dialog: DialogService) {
    this.eventTypeId = route.snapshot.params.eventTypeId;
    console.log(this.eventTypeId);
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.eventForm = new FormGroup({
      housekeeperId: new FormControl('', [Validators.required]),
      eventTypeId: new FormControl('', [Validators.required]),
      leaveTypeName: new FormControl('', [Validators.required]),
      leaveType: new FormControl('', [Validators.required]),
      isNeedHousekeeper: new FormControl('', []),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      eventTitle: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)])
    });
    this.eventForm.get('custId').setValue(this.user.housekeeperId);
    this.eventForm.get('eventTypeId').setValue(this.eventTypeId);
    this.eventForm.get('isNeedHousekeeper').setValue(1);

    this.eventSvc.getEventTypeList().then(res => {
      const _leaveTypeList = [];
      const _leaveTypes = [];
      res.leaveTypeList.forEach(function (k) {
        _leaveTypes.push({
          label: k.itemName,
          value: k.itemValue
        });
        _leaveTypeList.push(k.itemName);
      });
      this.leaveType = _leaveTypes;
      this.leaveTypeList = _leaveTypeList;
    });
  }

  onPickerShow(type: string, formControlName) {
    switch (type) {
      case 'datetime':
        this.picker.showDateTime(type).subscribe((res: any) => {
          this.eventForm.get(formControlName).setValue(res.formatValue);
        });
        break;
      case 'data':
        this.picker.show(this.leaveTypeList, '').subscribe((res: any) => {
          this.eventForm.get(formControlName).setValue(res.value);
          this.eventForm.get('leaveType').setValue(this.leaveType[getIndex(this.leaveType, 'label', res.value)]);
        });
        break;
    }
  }

  needHousekeeper() {
    if (this.eventForm.get('isNeedHousekeeper').value === 1) {
      this.eventForm.get('isNeedHousekeeper').setValue(2);
    } else {
      this.eventForm.get('isNeedHousekeeper').setValue(1);
    }
  }

  makeSure() {
    this.leave = leaveDate([this.eventForm.get('startDate').value, this.eventForm.get('endDate').value], ['08:30:00', '18:30:00']);
    this.dialog.show({
      title: '确认请假信息',
      content: '您将于' + this.eventForm.get('startDate').value + '至' + this.eventForm.get('endDate').value + '请假，请假时长合共' + this.leave.days + '天' + this.leave.hours + '小时',
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
          });
        } else {
          this.dialog.show({
            title: '请假申请提交成功',
            content: '<p>请注意与客户做好请假的沟通工作，并提醒客户确认您的请假申请。</p><p>如有问题，可与客服人员联系。</p>',
          }).subscribe((data: any) => {
            console.log(data);
          });
        }
      });
    }
  }

}
