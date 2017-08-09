import { Directive, Input, HostListener } from '@angular/core';
import { TooltipService } from '../services';

@Directive({
  selector: '[tooltip-host]'
})
export class TooltipDirective {
  @Input() tip: string;
  @Input()
  placement:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
  @HostListener('mouseenter', ['$event'])
  onEnter(event) {
    const { tip, placement } = this;
    const el: HTMLElement = event.target;
    this.tooltipService.show({ tip, placement, el });
  }
  @HostListener('mouseleave', ['$event'])
  onLeave(event: MouseEvent) {
    // this.tooltipService.hide();
  }
  constructor(private tooltipService: TooltipService) {}
}
