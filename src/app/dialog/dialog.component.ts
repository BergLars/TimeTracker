import { Component, ViewChild } from '@angular/core';
 
// todo: change to ng2-bootstrap
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
// webpack html imports
let template = require('./dialog.component.html');
 
@Component({
  selector: 'modal-demo',
  template: template
})
export class DialogComponent {
  @ViewChild('childModal') public childModal:ModalDirective;
 
  public showChildModal():void {
  	this.childModal.config.backdrop = false; // workaround 
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }
}

