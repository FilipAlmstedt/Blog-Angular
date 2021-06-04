import { Component } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './models/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // USed to remove the "sides/space" of the page wherw no color is 
  encapsulation: ViewEncapsulation.None,
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'Blogs';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
