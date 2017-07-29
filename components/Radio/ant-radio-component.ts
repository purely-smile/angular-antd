import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-radio',
  templateUrl: './ant-radio.html',
  styleUrls: ['./ant-radio.scss']
})
export class AntRadioComponent implements OnInit {
  @Input() checked = false;
  @Input() disabled = false;
  public readonly prefixCls = 'ant-radio';
  public radioClassName = this.getRadioClassName();
  ngOnInit() {}
  getRadioClassName(): string {
    const { checked, disabled, prefixCls } = this;
    return classNames(prefixCls, `${prefixCls}-wrapper`, {
      [`${prefixCls}-wrapper-checked`]: checked,
      [`${prefixCls}-wrapper-disabled`]: disabled
    });
  }
}
