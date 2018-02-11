import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {EmployeeService} from '../../../../services/employee.service';
import {Config} from '../../../../config';
import {ChartF2Service} from '../../../../modules/chart-f2';
import {RatingConfig} from '../../../../modules/rating';

declare var F2: any;

@Component({
  selector: 'app-admin-employee-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class AdminEmployeeServiceComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  ratingConfig: RatingConfig = {
    cls: 'rating',
    stateOff: 'off',
    stateOn: 'on'
  };

  rate = 5;
  user: any;

  employers;
  housekeeper;
  config = Config;

  score = {
    scores: [],
    count: 0
  };

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employee: EmployeeService,
              private chartSvc: ChartF2Service) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.employee.getHousekeeper(this.user.housekeeperId).then(res => {
      this.housekeeper = res.housekeeper;
      console.log(this.housekeeper);

      this.employee.getEmployeeScores(this.user.housekeeperId).then(scores => {
        // this.score.scores = scores;
        this.score.count = 0;
        scores.forEach(k => {
          const item = {name: this.housekeeper.name, props: k.props, value: k.value};
          this.score.scores.push(item);
          this.score.count = this.score.count + k.value;
        });

        if (this.score.count === 0) {
          return false;
        }
        this.chartSvc.get().then(result => {
          F2.Global.pixelRatio = window.devicePixelRatio;
          const data = this.score.scores;

          const chart = new F2.Chart({
            id: 'mountNode'
          });

          chart.coord('polar');
          chart.source(data, {
            value: {
              min: 0,
              tickInterval: 20
            }
          });


          // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
          chart.axis('props', {
            label: {
              fontSize: 12
            },
            line: null
          });
          chart.axis('value', {
            label: null,
            line: null
          });

          chart.area().position('props*value').color('name').style({
            opacity: 0.6,
            background: '#FBA703'
          });
          // x和y轴同时缩放的动画
          chart.animate({
            type: 'scalexy'
          });
          chart.render();
        });
      });
    });
    this.employee.getEmployer(this.user.housekeeperId, 2).then(res => {
      this.employers = res.list;
      console.log(this.employers);
    });
  }
}
