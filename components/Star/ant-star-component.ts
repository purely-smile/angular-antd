import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-star',
  templateUrl: './ant-star.html',
  styleUrls: ['./ant-star.scss']
})
export class AntStarComponent implements OnInit {
  public starClassName: string;
  @Input() value: number;
  @Input() index: number;
  @Input() prefixCls = '';
  @Input() allowHalf: boolean;
  @Input() disabled: boolean;
  @Input() character: string;
  ngOnInit() {
    this.starClassName = this.getClassName();
  }
  getClassName(): string {
    const { prefixCls, index, value, allowHalf } = this;
    const starValue = index + 1;
    return classNames({
      'ant-star-li': true,
      [`${prefixCls} ${prefixCls}-half ${prefixCls}-active`]:
        allowHalf && value + 0.5 === starValue,
      [`${prefixCls} ${prefixCls}-full`]: starValue <= value,
      [`${prefixCls} ${prefixCls}-zero`]: starValue > value
    });
  }
}
