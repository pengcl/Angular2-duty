import {Directive, Input, ElementRef, Renderer, HostListener} from '@angular/core';

@Directive({
  selector: '[userTrack]'
})
export class UserTrackDirective {

  @Input() userTrack: string; // 输入属性，用于设置元素的背景颜色

  constructor() {
  }

  @HostListener('click')
  onClick() { // 监听宿主元素的点击事件，设置元素背景色
    console.log('userTrack:' + this.userTrack);
  }
}
