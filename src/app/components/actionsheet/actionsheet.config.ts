import {Injectable} from '@angular/core';
import {SkinType} from '../../utils/types';

@Injectable()
export class ActionSheetConfig {
  /**
   * 标题
   *
   * @type {string}
   */
  title?: string;
  type?: string = 'menu';

  /**
   * 取消
   *
   * @type {string}
   */
  cancel?: string = '取消';
  confirm?: string = '确定';

  /**
   * 允许点击背景关闭
   *
   * @type {boolean}
   * @default true
   */
  backdrop?: boolean = true;
}
