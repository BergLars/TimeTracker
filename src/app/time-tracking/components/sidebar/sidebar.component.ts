import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public totalHousWorkedWeek: number = 12;
  public totalHousWorkedMonth: number = 56;
  public totalAvailableVacationDays: number = 18;

  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };
  public items: Array<string> = ['The first choice!',
    'And another choice for you.', 'but wait! A third!'];

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
}
