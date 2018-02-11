import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/toPromise';

import {Config} from '../config';
import {WxService} from '../modules/wx';
import {StorageService} from './storage.service';

@Injectable()
export class UserService {
  private user;

  constructor(private storageService: StorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location,
              private http: HttpClient,
              private wxService: WxService) {
  }

  getUser() {
    console.log(this.user);
    if (this.user) {// 如果user存在;
      return this.user;
    } else {// 如果userId不存在,查找localStorage;
      if (this.storageService.get('user')) {// 如果localStorage中存在user;
        this.user = JSON.parse(this.storageService.get('user'));
        return this.user;
      } else {// 如果localStorage中不存在userId;
        if (this.wxService.isWx()) {// 微信环境,查找地址栏参数中是否存在userId;
          if (this.activatedRoute.snapshot.queryParams['userId']) {// 如果地址栏参数存在userId;
            const user = {
              id: this.activatedRoute.snapshot.queryParams['userId']
            };
            this.user = user; // 把userId存入user.id内存中;
            console.log(this.user);
            this.storageService.set('user', JSON.stringify(this.user)); // 把userId存入localStorage
            return this.user;
          } else {// 如果地址栏参数不存在userId
            window.location.href = Config.prefix.api + '/wx/auth?callbackUrl=' + encodeURI(window.location.href);
          }
        } else {// 非微信环境,跳转至登录页;
          window.location.href = Config.prefix.admin + '/login';
        }
      }
    }
  }

  getUsers(): Promise<any[]> {
    return this.http.get(Config.prefix.api + '/users/find')
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  isLogin() {
    return this.getUser();
  }

  getCode(mobile) {
    return this.http.get(Config.prefix.wApi + '/interface/user/getSystemMobileCode.ht?custMoblie=' + mobile)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  checkCode(mobile, code) {
    return this.http.get(Config.prefix.wApi + '/interface/user/checkMobileCode.ht?custMoblie=' + mobile + '&code=' + code)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  login(mobile, code) {
    return this.http.get(Config.prefix.wApi + '/interface/user/login.ht?custMoblie=' + mobile + '&code=' + code)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
