import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {WxService} from '../../../modules/wx';
import {Router, ActivatedRoute} from '@angular/router';

import {DialogService} from '../../../modules/dialog';
import {StorageService} from '../../../services/storage.service';
import {PageConfig} from './page.config';

declare var $: any;

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  loginForm: FormGroup;
  // user: any;

  activeText = '获取验证码';
  activeClass = true;
  second = 59;
  timePromise = undefined;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private storage: StorageService,
              private dialog: DialogService) {
  }

  ngOnInit() {

    this.loginForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      code: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
    });
  }

  getCode(e, mobile) {
    if ($(e.currentTarget).hasClass('disabled')) {
      return false;
    }
    this.userSvc.getCode(mobile).then(res => {
      if (res.code === 0) {
        this.activeClass = false;
        // $scope.loadingToast.open(false);
        this.timePromise = setInterval(function () {
          if (this.second <= 0) {
            clearInterval(this.timePromise);
            this.timePromise = undefined;

            this.second = 59;
            this.activeText = '重发验证码';
            this.activeClass = true;
          } else {
            this.activeText = this.second + '秒后可重发';
            this.activeClass = false;
            this.second--;

          }
        }, 1000, 100);
      } else {
        this.dialog.show({
          title: '系统提示',
          content: res.msg
        }).subscribe(data => {
          console.log(data);
        });
      }
      console.log(res);
    });
  }

  // 18620803688
  onSubmit() {
    if (this.loginForm.valid) {
      this.userSvc.login(this.loginForm.get('mobile').value, this.loginForm.get('code').value).then(res => {
        if (res.code === 0) {
          const user = {id: res.custId, housekeeperId: ''};
          let callbackUrl = '/admin/employer';
          if (res.housekeeperId) {
            user.housekeeperId = res.housekeeperId;
            callbackUrl = '/admin/employee';
          }
          this.storage.set('user', JSON.stringify(user));
          if (this.activatedRoute.snapshot.queryParams['callbackUrl']) {
            callbackUrl = this.activatedRoute.snapshot.queryParams['callbackUrl'];
          }
          this.router.navigate([callbackUrl], {});
        } else {
          this.dialog.show({title: '系统提示', content: res.msg}).subscribe(data => {
            console.log(data);
          });
        }
      });
    }
  }
}
