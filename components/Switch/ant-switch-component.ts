import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-switch',
  templateUrl: './ant-switch.html',
  styleUrls: ['./ant-switch.scss']
})
export class AntSwitchComponent implements OnInit {
  @Input() className = '';
  @Input() size: 'default' | 'small' | 'large' = 'default';
  @Input() prefixCls = 'ant-switch';
  @Input() disabled = false;
  @Input() defaultChecked = false;
  @Input() tabIndex: number;
  @Input() checked = false;
  public switchClassName = this.getClassNames();
  public switchTabIndex = -1;
  ngOnInit() {
    this.switchTabIndex = this.disabled ? -1 : this.tabIndex || 0;
  }
  getClassNames(): string {
    const { className, checked, disabled, prefixCls, size } = this;
    return classNames(className, prefixCls, {
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-small`]: size === 'small'
    });
  }
}
