import { Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};
  public items:Array<string> = ['The first choice!',
    'And another choice for you.', 'but wait! A third!'];
    // @ViewChild('childModal') public childModal:ModalDirective;
 
  public showChildModal():void {
    // this.childModal.show();
  }
 
  public hideChildModal():void {
    // this.childModal.hide();
  }
 
  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }
  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
}
