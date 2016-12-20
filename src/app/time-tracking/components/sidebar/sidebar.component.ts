import { Component, Input } from '@angular/core';
import { Statistics } from '../../../data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() statistics: Statistics[] = [];
}
