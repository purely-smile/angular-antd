import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[tooltip-host]'
})
export class TooltipDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
