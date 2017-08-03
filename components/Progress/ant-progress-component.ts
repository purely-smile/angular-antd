import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-progress',
  templateUrl: './ant-progress.html',
  styleUrls: ['./ant-progress.scss']
})
export class AntProgressComponent implements OnInit {
  @Input() prefixCls = 'ant-progress';
  @Input() className = '';
  @Input() type: 'line' | 'circle' | 'dashboard' = 'line';
  @Input() percent = 0;
  @Input() status: 'success' | 'active' | 'exception' | 'normal';
  @Input() showInfo = true;
  @Input() strokeWidth: number;
  @Input() trailColor = 'f3f3f3';
  @Input() width: number;
  @Input() gapDegree = 0;
  @Input() gapPosition: 'top' | 'bottom' | 'left' | 'right';
  @Input() format: Function;
  public progressClassName = '';
  public progressStatus = 'normal';
  public iconType: string;
  public circleSize = 0;
  public circleWidth = 6;
  public gapPos;
  public gapDeg;
  public statusColorMap = {
    normal: '#108ee9',
    exception: '#ff5500',
    success: '#87d068'
  };
  ngOnInit() {
    this.getProgressClassName();
  }
  getProgressClassName() {
    const {
      prefixCls,
      type,
      showInfo,
      percent,
      status,
      format,
      className,
      width,
      strokeWidth,
      gapPosition,
      gapDegree
    } = this;
    const progressStatus = (this.progressStatus =
      percent >= 100 && !status ? 'success' : status || 'normal');
    const textFormatter = format || (percentNumber => `${percentNumber}%`);
    if (showInfo) {
      this.iconType =
        type === 'circle' || type === 'dashboard' ? '' : '-circle';
    }
    this.circleSize = width || 132;
    this.circleWidth = strokeWidth || 6;
    this.gapPos = gapPosition || (type === 'dashboard' && 'bottom') || 'top';
    this.gapDeg = gapDegree || (type === 'dashboard' && 75);
    this.progressClassName = classNames(prefixCls, className, {
      [`${prefixCls}-${(type === 'dashboard' && 'circle') || type}`]: true,
      [`${prefixCls}-status-${progressStatus}`]: true,
      [`${prefixCls}-show-info`]: showInfo
    });
  }
}
