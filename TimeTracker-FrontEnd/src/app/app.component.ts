import { Component, ViewContainerRef, Input } from '@angular/core';
import { environment } from '../environments/environment';
import { MatDialogRef, MatDatepickerModule, DateAdapter, NativeDateModule, MatDateFormats } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private viewContainerRef: ViewContainerRef;
    title = environment.title;
    root: any;
    applicationRef: any;

    public constructor(
        viewContainerRef: ViewContainerRef) {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }


    getRootViewContainerRef() {
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
            this.root = rootComponent._component.viewContainerRef;
            return this.root;
        }
        catch (e) {
            throw new Error("ApplicationRef instance not found");
        }
    };
}