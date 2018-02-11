import {Component, Directive, EventEmitter, Input, OnInit, Output, HostBinding, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  /**
   * 操作场景：primary、default、warn
   *
   * @type {ButtonType}
   * @default primary
   */
  @Input() type: string = 'primary';
}
