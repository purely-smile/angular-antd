import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-step',
  templateUrl: './ant-step.html',
  styleUrls: ['./ant-step.scss']
})
export class AntStepComponent implements OnInit {
  @Input() className = '';
  @Input() prefixCls = 'ant-setp';
  @Input() itemWidth: number | string;
  @Input() status: 'wait' | 'process' | 'finish' | 'error' = 'process';
  @Input() stepNumber: number;
  @Input() description: string;
  @Input() title: string;
  @Input() progressDot: boolean | Function;
  public stepClassName = this.getStepClassName();
  ngOnInit() {}
  getStepClassName(): string {
    const { status, className, prefixCls } = this;
    return classNames(
      `${prefixCls}-item`,
      `${prefixCls}-status-${status}`,
      className
    );
  }
}
