import {Component, Input, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() navBar;

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.navBar.navigationBarTitleText);
  }

}
