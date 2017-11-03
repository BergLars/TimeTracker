import { Directive, HostListener, Renderer, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSetFocus]'
})
export class SetFocusDirective {
  constructor(
    private renderer: Renderer,
    private el: ElementRef) {
  }
  @HostListener('click') onClick() {
    this.setFocus(true);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setFocus(true);
  }

  setFocus(focused: boolean) {
    if (focused) {
      this.el.nativeElement.focus();
    }
  }
}