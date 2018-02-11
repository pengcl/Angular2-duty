import {Injectable, ComponentFactoryResolver, ApplicationRef, Injector, OnDestroy} from '@angular/core';

import {BaseService} from './base.service';
import {ToastComponent} from '../components/toast/toast.component';

@Injectable()
export class ToastService extends BaseService implements OnDestroy {

  constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector) {
    super(resolver, applicationRef, injector);
  }

  private timer: any;

  /**
   * 构建toast并显示
   *
   * @param {number} [time] 显示时长后自动关闭（单位：ms），0 表示永久（可选）
   * @param {('success' | 'loading')} [type] 类型（可选）
   */
  show(type?: 'success' | 'loading', time?: number) {
    const componentRef = this.build(ToastComponent);
    if (type) {
      componentRef.instance.type = type;
    }
    if (time > 0) {
      this.timer = setTimeout(() => {
        this.destroy();
      }, time);
    }
  }

  /**
   * 关闭最新toast
   */
  hide() {
    this.destroy();
  }

  /**
   * 构建成功toast并显示
   *
   * @param {number} [time] 显示时长后自动关闭（单位：ms），0 表示永久（可选）
   */
  success(time?: number) {
    this.show('success', time);
  }

  /**
   * 构建加载中toast并显示
   *
   * @param {number} [time] 显示时长后自动关闭（单位：ms），0 表示永久（可选）
   */
  loading(time?: number) {
    this.show('loading', time);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
