import {Component, Input, OnInit} from '@angular/core';
import {Config} from '../../config';
import {RatingConfig} from '../../modules/rating';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  @Input() rate;
  ratingConfig: RatingConfig = {
    cls: 'rating',
    stateOff: 'off',
    stateOn: 'on'
  };

  config: any = Config;

  constructor() {
  }

  ngOnInit() {
  }

}
