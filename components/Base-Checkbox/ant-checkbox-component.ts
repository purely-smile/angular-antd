import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'base-checkbox',
  templateUrl: './ant-checkbox.html',
  styleUrls: ['./ant-checkbox.scss']
})
export class BaseCheckboxComponent implements OnInit {
  @Input() prefixCls = 'ant-checkbox';
  @Input() className = '';
  @Input() name: string;
  @Input() type: 'checkbox' | 'radio' = 'checkbox';
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() tabIndex: string;
  @Input() readOnly = false;
  public checkboxClassName = '';
  ngOnInit() {
    this.checkboxClassName = this.getCheckboxClassName();
  }
  getCheckboxClassName(): string {
    const { prefixCls, className, checked, disabled } = this;
    return classNames(prefixCls, className, {
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-disabled`]: disabled
    });
  }
}
