import {Injectable} from '@angular/core';
import {LoaderService} from './loader.service';

@Injectable()
export class MoService {

  constructor(private load: LoaderService) {
  }

  /**
   * 懒加载jweixin.js
   *
   * @param {string} [jweixinUrl] 默认：//res.wx.qq.com/open/js/jweixin-1.2.0.js
   */
  get(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.load.loadScript('https://cdn.bootcss.com/mo-js/0.288.2/mo.min.js').then((res) => {
        resolve(res.loaded === true);
      }).catch(() => {
        resolve(false);
      });
    });
  }

  getAni(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.load.loadScript('/assets/js/ani.js').then((res) => {
        resolve(res.loaded === true);
      }).catch(() => {
        resolve(false);
      });
    });
  }

}
