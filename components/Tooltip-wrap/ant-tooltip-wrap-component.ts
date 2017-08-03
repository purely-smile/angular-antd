import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy
} from '@angular/core';
import { AntTooltipComponent } from '../Tooltip';
import { TooltipDirective } from '../../directives/tooltip';

@Component({
  selector: 'ant-tooltip-wrap',
  templateUrl: './ant-tooltip-wrap.html',
  styleUrls: ['./ant-tooltip-wrap.scss']
})
export class AntTooltipWrapComponent
  implements OnInit, OnDestroy, AfterViewInit {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  @ViewChild(TooltipDirective) tooltipHost: TooltipDirective;
  ngOnInit() {}
  ngOnDestroy() {}
  ngAfterViewInit() {
    this.loadComponent();
  }
  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AntTooltipComponent
    );
    const viewContainerRef = this.tooltipHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    Object.assign(componentRef, {
      overlay: 'test'
    });
  }
}
