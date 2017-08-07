import { Component, Input, OnInit, OnChanges } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-time-line-item',
  templateUrl: './ant-time-line-item.html',
  styleUrls: ['./ant-time-line-item.scss']
})
export class AntTimeLineItemComponent implements OnInit, OnChanges {
  @Input() prefixCls = 'ant-timeline';
  @Input() color: 'blue' | 'red' | 'green' = 'blue';
  @Input() last = false;
  @Input() pending = false;
  @Input() className: string;
  @Input() dot;
  public itemClassName: string;
  public dotClassName: string;
  ngOnInit() {
    this.getClassName();
  }
  ngOnChanges() {
    this.getClassName();
  }
  getClassName() {
    const { last, prefixCls, pending, className, color, dot } = this;
    this.itemClassName = classNames(className, `${prefixCls}-item`, {
      [`${prefixCls}-item-last`]: last,
      [`${prefixCls}-item-pending`]: pending
    });
    this.dotClassName = classNames(
      `${prefixCls}-item-head`,
      `${prefixCls}-item-head-${color}`,
      {
        [`${prefixCls}-item-head-custom`]: dot
      }
    );
  }
}
