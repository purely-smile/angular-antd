import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import classNames from 'classnames';

@Component({
  selector: 'ant-rate',
  templateUrl: './ant-rate.html',
  styleUrls: ['./ant-rate.scss']
})
export class AntRateComponent implements OnInit {
  public rateClassName = this.getRateClassName();
  public items: any[] = [];
  @Input() disabled = false;
  @Input() value: number;
  @Input() defaultValue = 0;
  @Input() count = 5;
  @Input() allowHalf = false;
  @Input() prefixCls = 'ant-rate';
  @Input() className: string;
  @Input() character = '★';
  ngOnInit() {
    this.rateClassName = this.getRateClassName();
    this.items = _.range(this.count);
  }
  getRateClassName(): string {
    const { disabled, prefixCls, className } = this;
    return classNames(prefixCls, className, {
      [`${prefixCls}-disabled`]: disabled
    });
  }
}