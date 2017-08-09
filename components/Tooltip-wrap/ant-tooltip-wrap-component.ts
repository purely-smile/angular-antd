import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AntTooltipComponent } from '../Tooltip';
import { TooltipService } from '../../services';

@Component({
  selector: 'ant-tooltip-wrap',
  templateUrl: './ant-tooltip-wrap.html',
  styleUrls: ['./ant-tooltip-wrap.scss']
})
export class AntTooltipWrapComponent
  implements OnInit, OnDestroy, AfterViewInit {
  constructor(private tooltipService: TooltipService) {}
  public tooltipSub: Subscription;
  public showTooltip = false;
  public tip: string;
  public tooltipStyleObj: Object;
  public placement:
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
    | 'rightBottom' = 'top';
  ngOnInit() {
    this.registerSubscribe();
  }
  ngOnDestroy() {}
  ngAfterViewInit() {}
  registerSubscribe() {
    this.tooltipService.showToolTip.subscribe(config => {
      const { tip, placement, style } = config;
      this.tip = tip;
      this.placement = placement;
      this.tooltipStyleObj = style;
      this.showTooltip = true;
    });

    this.tooltipService.hideToolTip.subscribe(() => {
      this.showTooltip = false;
    });
  }
}
