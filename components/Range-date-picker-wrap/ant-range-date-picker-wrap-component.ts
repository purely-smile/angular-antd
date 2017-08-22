import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-range-date-picker-wrap',
  templateUrl: './ant-range-date-picker-wrap.html',
  styleUrls: ['./ant-range-date-picker-wrap.scss']
})
export class AntRangeDatePickerWrapComponent implements OnInit {
  @Input() prefixCls = 'ant-calendar';
  @Input() placeholder = '选择日期';
  public datePickerClassName: string;
  ngOnInit() {
    this.getClassName();
  }
  getClassName() {
    const { prefixCls } = this;
    this.datePickerClassName = classNames(
      `${prefixCls}-picker-container`,
      `${prefixCls}-picker-container-boottomLeft`
    );
  }
}
