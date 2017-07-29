import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-steps',
  templateUrl: './ant-steps.html',
  styleUrls: ['./ant-steps.scss']
})
export class AntStepsComponent implements OnInit {
  @Input() className = '';
  @Input() prefixCls = 'ant-steps';
  @Input() current = 0;
  @Input() status = 'process';
  @Input() size = '';
  @Input() progressDot = false;
  @Input() iconPrefix = 'rc';
  @Input() direction = 'horizontal';
  @Input() labelPlacement = 'horizontal';
  public stepsClassName = this.getStepsClassName();
  ngOnInit() {}
  getStepsClassName(): string {
    const {
      size,
      prefixCls,
      direction,
      className,
      progressDot,
      labelPlacement
    } = this;
    const adjustedlabelPlacement = !!progressDot ? 'vertical' : labelPlacement;
    return classNames(prefixCls, className, `${prefixCls}-${direction}`, {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-label-${adjustedlabelPlacement}`]:
        direction === 'horizontal'
    });
  }
}
