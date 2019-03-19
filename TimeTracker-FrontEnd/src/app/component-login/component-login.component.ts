import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-login',
  templateUrl: './component-login.component.html',
  styleUrls: ['./component-login.component.scss']
})

export class ComponentLoginComponent {
  submitted = false;
  onSubmit() { this.submitted = true; }
}