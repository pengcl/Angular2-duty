import {Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/switchMap';

import {PageConfig} from './page.config';
import {Config} from '../../../../config';

import {UploaderOptions, Uploader} from '../../../../modules/uploader';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {EmployeeService} from '../../../../services/employee.service';

declare var F2: any;

@Component({
  selector: 'app-admin-uploader-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class AdminUploaderGalleryComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  housekeeper;

  img: any;
  imgShow: boolean = false;

  uploader: Uploader = new Uploader(<UploaderOptions>{
    url: Config.prefix.wApi + '/interface/housekeeper/uploadImage.ht',
    headers: [],
    params: {
      housekeeperId: ''
    },
    // 自定义transport
    // uploadTransport: function(item: FileItem) {
    //     return Observable.create(observer => {
    //         setTimeout(() => {
    //             observer.next(true);
    //             observer.complete();
    //         }, 1000 * 3);
    //     });
    // },
    onFileQueued: function () {
      console.log('onFileQueued', arguments);
    },
    onFileDequeued: function () {
      console.log('onFileDequeued', arguments);
    },
    onStart: function () {
      console.log('onStart', arguments);
    },
    onCancel: function () {
      console.log('onCancel', arguments);
    },
    onFinished: function () {
      console.log('onFinished', arguments);
      window.history.back();
    },
    onUploadStart: function () {
      console.log('onUploadStart', arguments);
    },
    onUploadProgress: function () {
      console.log('onUploadProgress', arguments);
    },
    onUploadSuccess: function () {
      console.log('onUploadSuccess', arguments);
    },
    onUploadError: function () {
      console.log('onUploadError', arguments);
    },
    onUploadComplete: function () {
      console.log('onUploadComplete', arguments);
    },
    onUploadCancel: function () {
      console.log('onUploadCancel', arguments);
    },
    onError: function () {
      console.log('onError', arguments);
    }
  });

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employeeSvc: EmployeeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.uploader.options.params.housekeeperId = this.user.housekeeperId;
    this.employeeSvc.getHousekeeper(this.user.housekeeperId).then(res => {
      this.housekeeper = res.housekeeper;
      console.log(this.housekeeper);
    });
  }

  onGallery(item: any) {
    this.img = [{file: item._file, item: item}];
    this.imgShow = true;
  }

  onDel(item: any) {
    this.uploader.removeFromQueue(item.item);
  }

}
