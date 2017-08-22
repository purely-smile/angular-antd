import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import classNames from 'classnames';
import * as moment from 'moment';
import { DatePickerService } from '../../services';

class DateNameObj {
  constructor(public name: string, public shortName: string) {}
}
const keyMap = {
  PageDown: 34,
  PageUp: 33,
  ArrowRight: 39,
  ArrowLeft: 37,
  Escape: 27
};
@Component({
  selector: 'ant-date-picker-wrap',
  templateUrl: './ant-date-picker-wrap.html',
  styleUrls: ['./ant-date-picker-wrap.scss']
})
export class AntDatePickerWrapComponent implements OnInit {
  @Input() prefixCls = 'ant-calendar';
  @Input() placeholder = '选择日期';
  public keyupEvent;
  public showPicker = false;
  public style;
  public datePickerClassName: string;
  constructor(
    private datePickerService: DatePickerService,
    private renderer2: Renderer2
  ) {}
  ngOnInit() {
    this.getClassName();
    this.registerObservables();
  }
  closeDatePicker() {
    this.showPicker = false;
    this.keyupEvent && this.keyupEvent();
  }
  registerObservables() {
    this.datePickerService.showPicker.subscribe(style => {
      this.style = style;
      this.showPicker = true;
    });
    this.datePickerService.hidePicker.subscribe(() => {
      this.closeDatePicker();
    });
  }

  getClassName() {
    const { prefixCls } = this;
    this.datePickerClassName = classNames(
      `${prefixCls}-picker-container`,
      `${prefixCls}-picker-container-boottomLeft`
    );
  }
}
