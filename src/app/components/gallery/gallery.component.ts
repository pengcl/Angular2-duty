import {Component, OnInit, OnChanges, Input, Output, SimpleChanges, EventEmitter, ViewChild, AfterViewInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {
  SwiperComponent, SwiperDirective
} from 'ngx-swiper-wrapper';

import {Config} from '../../config';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges, AfterViewInit {
  item: any;
  config = Config;
  @Input() slides;
  @Input() current;
  @Input() canDelete: boolean = true;

  /**
   * 删除回调
   */
  @Output() delete = new EventEmitter<any>();

  /**
   * 隐藏回调
   */
  @Output() hide = new EventEmitter<any>();

  /**
   * 标记是否显示
   *
   * @type {boolean}
   */
  @Input() show: boolean = false;
  @Output() showChange = new EventEmitter<boolean>();

  @ViewChild(SwiperDirective) directiveRef: SwiperDirective; // ngAfterViewInit
  @ViewChild(SwiperComponent) componentRef: SwiperComponent; // ngAfterViewInit

  _onDel(current: any) {
    console.log(current);
    if (this.canDelete) {
      this.delete.emit(current);
      this._onHide();
    }
    return false;
  }

  _onHide() {
    this.show = false;
    this.showChange.emit(this.show);
    this.hide.emit();
  }

  onIndexChange(index: number) {
    this.current = index;
    // this.titleService.setTitle(1 + '/' + String(this.slides.length));
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('slides' in changes) {
      if (changes.slides && changes.slides.currentValue) {
        this.onIndexChange(this.current);
      }
      // this.componentRef.directiveRef.startAutoplay();
    }
  }

  constructor(private titleService: Title) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.componentRef.directiveRef.startAutoplay();
  }

}
