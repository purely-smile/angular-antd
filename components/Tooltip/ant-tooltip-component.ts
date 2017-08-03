import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'ant-tooltip',
  templateUrl: './ant-tooltip.html',
  styleUrls: ['./ant-tooltip.scss']
})
export class AntTooltipComponent implements OnInit {
  @Input() visible: boolean;
  @Input() placement = 'top';
  @Input() transitionName: string;
  @Input() animation: any;
  @Input() overlayClassName: string;
  @Input() prefixCls = 'ant-tooltip';
  @Input() mouseEnterDelay = 0.1;
  @Input() mouseLeaveDelay = 0.1;
  @Input() destroyTooltipOnHide = false;
  @Input() align = {};
  @Input() trigger: ['hover' | 'focus' | 'click'] = ['hover'];
  @Input() arrowContent = null;
  @Input() overlay;
  ngOnInit() {}
}
