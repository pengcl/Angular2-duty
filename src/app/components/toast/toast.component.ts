import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() type: 'success' | 'loading';
  @Input() time: number;

  constructor() {
    this.type = 'success';
    this.time = 0;
  }

  ngOnInit() {
  }
}
