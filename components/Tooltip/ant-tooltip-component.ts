import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-tooltip',
  templateUrl: './ant-tooltip.html',
  styleUrls: ['./ant-tooltip.scss']
})
export class AntTooltipComponent
  implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  @Input() visible: boolean;
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
    | 'rightBottom' = 'top';
  @Input() transitionName: string;
  @Input() tip: string;
  @Input() animation: any;
  @Input() overlayClassName: string;
  @Input() prefixCls = 'ant-tooltip';
  @Input() mouseEnterDelay = 0.1;
  @Input() mouseLeaveDelay = 0.1;
  @Input() destroyTooltipOnHide = false;
  @Input() align = {};
  @Input() tooltipStyleObj;
  @Input() trigger: ['hover' | 'focus' | 'click'] = ['hover'];
  @Input() arrowContent = null;
  @Input() overlay;
  @Input() arrowPointAtCenter = false;
  @Input() autoAdjustOverflow = true;
  @ViewChild('el') el: ElementRef;
  public tooltipStyle: Object;
  public tooltipClassName: string;
  ngOnInit() {}
  ngOnChanges() {
    this.getClassName();
    this.getStyle();
  }
  ngAfterViewInit() {}
  ngAfterViewChecked() {}
  getStyle() {
    setTimeout(() => {
      const { tooltipStyleObj, placement } = this;
      let { top, left, width, height } = tooltipStyleObj;
      const { offsetHeight, offsetWidth } = this.el.nativeElement;
      let tooltipStyle: any = {};
      let middleLeft = left + (width - offsetWidth) / 2 + 'px';
      let middleTop = top + (height - offsetHeight) / 2 + 'px';
      switch (placement) {
        case 'top':
          tooltipStyle = {
            top: top - offsetHeight + 'px',
            left: middleLeft
          };
          break;
        case 'topLeft':
          tooltipStyle = {
            top: top - offsetHeight + 'px',
            left: left + 'px'
          };
          break;
        case 'topRight':
          tooltipStyle = {
            top: top - offsetHeight + 'px',
            left: left + (width - offsetWidth) + 'px'
          };
          break;
        case 'left':
          tooltipStyle = {
            top: middleTop,
            left: left - offsetWidth + 'px'
          };
          break;
        case 'leftTop':
          tooltipStyle = {
            top: top + 'px',
            left: left - offsetWidth + 'px'
          };
          break;
        case 'leftBottom':
          tooltipStyle = {
            top: top + (height - offsetHeight) + 'px',
            left: left - offsetWidth + 'px'
          };
          break;
        case 'bottom':
          tooltipStyle = {
            top: top + height + 'px',
            left: middleLeft
          };
          break;
        case 'bottomLeft':
          tooltipStyle = {
            top: top + height + 'px',
            left: left + 'px'
          };
          break;
        case 'bottomRight':
          tooltipStyle = {
            top: top + height + 'px',
            left: left + (width - offsetWidth) + 'px'
          };
          break;
        case 'right':
          tooltipStyle = {
            top: middleTop,
            left: left + width + 'px'
          };
          break;
        case 'rightTop':
          tooltipStyle = {
            top: top + 'px',
            left: left + width + 'px'
          };
          break;
        case 'rightBottom':
          tooltipStyle = {
            top: top + (height - offsetHeight) + 'px',
            left: left + width + 'px'
          };
          break;
        default:
          throw Error('请设置tooltip的placement');
      }
      this.tooltipStyle = tooltipStyle;
    });
  }
  getClassName() {
    const { prefixCls, placement } = this;
    this.tooltipClassName = classNames(
      prefixCls,
      `${prefixCls}-placement-${placement}`
    );
  }
}
