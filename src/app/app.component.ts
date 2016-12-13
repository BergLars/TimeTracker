import { Component, ViewContainerRef } from '@angular/core';
import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	 private viewContainerRef: ViewContainerRef;
  title = 'Timetracker';
   public constructor(viewContainerRef:ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
  }
}

// it should fix the issue for NG2 v2.2.1 until an official patch is released by NG2-bootstrap team
ComponentsHelper.prototype.getRootViewContainerRef = function () {
    // https://github.com/angular/angular/issues/9293
    if (this.root) {
        return this.root;
    }
    var comps = this.applicationRef.components;
    if (!comps.length) {
        throw new Error("ApplicationRef instance not found");
    }
    try {
        /* one more ugly hack, read issue above for details */
        var rootComponent = this.applicationRef._rootComponents[0];
        //this.root = rootComponent._hostElement.vcRef;
        this.root = rootComponent._component.viewContainerRef;
        return this.root;
    }
    catch (e) {
        throw new Error("ApplicationRef instance not found");
    }
};