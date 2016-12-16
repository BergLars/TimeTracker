import { Component, ViewChild } from '@angular/core';
 
// todo: change to ng2-bootstrap
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';


// webpack html imports
let template = require('./search.component.html');
 
@Component({
  selector: 'app-search',
  template: template
})
export class SearchComponent {

  @ViewChild('childModal') public childModal:ModalDirective;
 
  public showChildModal():void {
  	this.childModal.config.backdrop = false; // workaround 
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }

  public submitSearch():void {
    this.childModal.hide();
  }
}