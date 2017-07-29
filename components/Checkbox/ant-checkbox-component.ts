import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-checkbox',
  templateUrl: './ant-checkbox.html',
  styleUrls: ['./ant-checkbox.scss']
})
export class AntCheckboxComponent implements OnInit {
  @Input() checked = false;
  @Input() indeterminate = false;
  @Input() disabled = false;
  @Input() className = '';
  public prefixCls = 'ant-checkbox';
  public labelClassName = '';
  public checkboxClassName = '';
  ngOnInit() {
    this.getLabelClassName();
    this.getCheckboxClassName();
  }
  getLabelClassName() {
    const { prefixCls, indeterminate } = this;
    this.labelClassName = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate
    });
  }
  getCheckboxClassName() {
    const { prefixCls, className } = this;
    this.getCheckboxClassName = classNames(className, `${prefixCls}-wrapper`);
  }
}
