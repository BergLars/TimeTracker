import { Directive, HostListener, Renderer, ElementRef } from '@angular/core';
import { SetFocusDirective } from './set-focus.directive';

describe('SetFocusDirective', () => {
  let renderer: Renderer;
  let el: ElementRef;
  it('should create an instance', () => {
    const directive = new SetFocusDirective(renderer, el);
    expect(directive).toBeTruthy();
  });
});
