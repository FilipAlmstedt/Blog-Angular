import { Component } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // USed to remove the "sides/space" of the page wherw no color is 
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Blogs';
}
