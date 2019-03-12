import { Component, OnInit } from '@angular/core';
import { Hero }    from '../hero';

@Component({
  selector: 'app-component-login',
  templateUrl: './component-login.component.html',
  styleUrls: ['./component-login.component.scss']
})
export class ComponentLoginComponent {

  powers = ['Really Smart', 'Super Flexible',
  'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet', 'ree');

  submitted = false;

  onSubmit() { this.submitted = true; }

  newHero() {
  this.model = new Hero(42, '', '');
  }

}
