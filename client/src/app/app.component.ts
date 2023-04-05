import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mapui-exercice';
  navLinks: Route[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = this.router.config.map((route, index) => ({ ...route, index })).filter((i) => i.data);
  }
}
