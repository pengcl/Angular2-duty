import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EmployeeService} from '../../../../../services/employee.service';
import {RatingConfig} from '../../../../../modules/rating';

import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {Config} from '../../../../../config';
import {DialogService} from '../../../../../modules/dialog';

@Component({
  selector: 'app-admin-employer-rate-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminEmployerRateAddComponent implements OnInit {
  rateForm: FormGroup;
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  impress;

  user: any;
  housekeeper;

  config = Config;

  ratingConfig: RatingConfig = {
    cls: 'rating',
    stateOff: 'off',
    stateOn: 'on'
  };

  rate: number = 3;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private route: ActivatedRoute,
              private employeeSvc: EmployeeService,
              private dialog: DialogService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.rateForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      housekeeperId: new FormControl('', [Validators.required]),
      level: new FormControl('', []),
      impress: new FormControl('', []),
      evaluateContent: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)])
    });

    this.route.paramMap.switchMap((params: ParamMap) => {
      this.rateForm.get('custId').setValue(this.user.id);
      this.rateForm.get('housekeeperId').setValue(params.get('housekeeperId'));
      return this.employeeSvc.getHousekeeper(params.get('housekeeperId'));
    }).subscribe(res => {
      this.housekeeper = res.housekeeper;
    });

    this.employeeSvc.getImpressList().then(res => {
      this.impress = res.list;
    });
  }

  setImpressions(id) {
    let impressions = this.rateForm.get('impress').value;
    if (impressions) {
      impressions = impressions.split(',');
    } else {
      impressions = [];
    }
    if (impressions.indexOf('' + id) === -1) {
      impressions.push(id);
    } else {
      impressions = impressions.filter((ele) => {
        return ele !== '' + id;
      });
    }
    this.rateForm.get('impress').setValue(impressions.toString());
  }

  onSubmit() {
    this.rateForm.get('level').setValue(this.rate);
    if (this.rateForm.valid) {
      this.employeeSvc.addEvaluate(this.rateForm.value).then(res => {
        if (res.code === 0) {

        } else {

        }
        this.dialog.show({
          title: '系统提示',
          content: res.msg
        }).subscribe(data => {
        });
      });
    }
  }

}
