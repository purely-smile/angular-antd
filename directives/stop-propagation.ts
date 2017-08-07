import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stop-propagation]'
})
export class StopPropagationDirective {
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
