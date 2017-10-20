import { Directive, HostListener, Renderer, ElementRef } from '@angular/core';
import { RemoveFocusDirective } from './remove-focus.directive';
import { RegistryService } from '../../data';

describe('RemoveFocusDirective', () => {
  let renderer: Renderer;
  let el: ElementRef;
  let registryService: RegistryService;
  it('should create an instance', () => {
    const directive = new RemoveFocusDirective(renderer, el, registryService);
    expect(directive).toBeTruthy();
  });
});
