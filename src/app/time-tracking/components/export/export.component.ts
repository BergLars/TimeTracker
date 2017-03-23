import { Component, ViewChild } from '@angular/core';
 
// todo: change to ng2-bootstrap
// import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
// webpack html imports
let template = require('./export.component.html');
 
@Component({
  selector: 'app-export',
  template: template
})
export class ExportComponent {
  // @ViewChild('childModal') public childModal:ModalDirective;
 
  // public showChildModal():void {
  // 	this.childModal.config.backdrop = false; // workaround 
  //   this.childModal.show();
  // }
 
  // public hideChildModal():void {
  //   this.childModal.hide();
  // }

  // public sendEmail():void {
  //   this.childModal.hide();
  // }
}