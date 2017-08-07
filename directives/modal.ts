import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[modal-host]'
})
export class ModalHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
