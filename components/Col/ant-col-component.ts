import { Component, Input, OnInit, OnChanges } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-col',
  templateUrl: './ant-col.html',
  styleUrls: ['./ant-col.scss']
})
export class AntColComponent implements OnInit, OnChanges {
  @Input() prefixCls = 'ant-col';
  @Input() span: number;
  @Input() order: number;
  @Input() offset: number;
  @Input() push: number;
  @Input() pull: number;
  @Input() className: string;
  @Input() xs: number | ColSize;
  @Input() sm: number | ColSize;
  @Input() md: number | ColSize;
  @Input() lg: number | ColSize;
  @Input() xl: number | ColSize;
  public colClassName: string;
  ngOnInit() {}
  ngOnChanges() {
    this.getClassName();
  }
  getSizeClassName(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    if (!this[size]) {
      return {};
    }
    const { prefixCls } = this;
    let sizeObj = this[size];
    sizeObj = typeof sizeObj === 'number' ? { span: sizeObj } : sizeObj;
    return {
      [`${prefixCls}-${size}-${sizeObj.span}`]: sizeObj.span !== undefined,
      [`${prefixCls}-${size}-order-${sizeObj.order}`]:
        sizeObj.order || sizeObj.order === 0,
      [`${prefixCls}-${size}-offset-${sizeObj.offset}`]:
        sizeObj.offset || sizeObj.offset === 0,
      [`${prefixCls}-${size}-push-${sizeObj.push}`]:
        sizeObj.push || sizeObj.push === 0,
      [`${prefixCls}-${size}-pull-${sizeObj.pull}`]:
        sizeObj.pull || sizeObj.pull === 0
    };
  }
  getClassName() {
    const { span, order, offset, push, pull, className, prefixCls } = this;
    this.colClassName = classNames(
      className,
      this.getSizeClassName('xs'),
      this.getSizeClassName('sm'),
      this.getSizeClassName('md'),
      this.getSizeClassName('lg'),
      this.getSizeClassName('xl'),
      {
        [`${prefixCls}-${span}`]: span !== undefined,
        [`${prefixCls}-order-${order}`]: order,
        [`${prefixCls}-offset-${offset}`]: offset,
        [`${prefixCls}-push-${push}`]: push,
        [`${prefixCls}-pull-${pull}`]: pull
      }
    );
  }
}

export interface ColSize {
  span?: number;
  order?: number;
  offset?: number;
  push?: number;
  pull?: number;
}
