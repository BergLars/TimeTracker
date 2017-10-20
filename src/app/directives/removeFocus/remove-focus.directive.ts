import { Directive, HostListener, Renderer, ElementRef } from '@angular/core';
import { RegistryService } from '../../data';

@Directive({
  selector: '[appRemoveFocus]'
})
export class RemoveFocusDirective {

  constructor(private renderer: Renderer,
    private el: ElementRef, public registryService: RegistryService) { }

  @HostListener('click') onMouseEnter() {
    this.leaveFocus(false);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.leaveFocus(true);
  }

  leaveFocus(focused: boolean) {
    this.registryService.entriesComponent.loadEntries();
    if (focused) {
      console.log(this.registryService.entriesComponent.editing);
      this.registryService.entriesComponent.editing = true;
      this.registryService.entriesComponent.selectedRow = [];
      this.registryService.entriesComponent.selected = [];
    }
    else {
    }
  }
}