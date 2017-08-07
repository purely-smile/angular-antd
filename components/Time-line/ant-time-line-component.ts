import { Component, Input, OnInit, OnChanges } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-time-line',
  templateUrl: './ant-time-line.html',
  styleUrls: ['./ant-time-line.scss']
})
export class AntTimeLineComponent implements OnInit, OnChanges {
  @Input() prefixCls = 'ant-timeline';
  @Input() className: string;
  public antTimeClassName: string;
  ngOnInit() {}
  ngOnChanges() {
    this.getClassName();
  }
  getClassName() {
    const { prefixCls, className } = this;
    this.antTimeClassName = classNames(className, prefixCls);
  }
}
