import { Component, Input, OnInit, Inject, Renderer2 } from '@angular/core';
import * as moment from 'moment';
import classNames from 'classnames';
import { chunk } from 'lodash';

import { DatePickerService } from '../../services';
import { AntDatePickerComponent } from '../Date-picker';

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
  selector: 'base-date-picker',
  templateUrl: './base-date-table.html',
  styleUrls: ['./base-date-table.scss']
})
export class BaseDateTableComponent implements OnInit {
  @Input() prefixCls = 'ant-calendar';
  @Input() placeholder = '选择日期';
  @Input() type: 'single' | 'range' = 'single';
  @Input() position: 'left' | 'right';
  @Input()
  weekNames: DateNameObj[] = [
    new DateNameObj('周日', '日'),
    new DateNameObj('周一', '一'),
    new DateNameObj('周二', '二'),
    new DateNameObj('周三', '三'),
    new DateNameObj('周四', '四'),
    new DateNameObj('周五', '五'),
    new DateNameObj('周六', '六')
  ];
  public monthNames = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
  ];
  public datePickerClassName: string;
  public dates: any[];
  public years: any[];
  public months: any[];
  public value = moment();
  public today = moment();
  public currentDate: moment.Moment;
  public keyupEvent;
  public datePanel = false;
  public yearPanel = false;
  public monthPanel = false;
  public yearPanelStart = 0;
  public yearPanelEnd = 0;
  public showPicker = false;
  public style;
  constructor(
    private renderer2: Renderer2,
    public datePickerService: DatePickerService
  ) {}
  ngOnInit() {
    this.getClassName();
    this.currentDate = this.value.clone();
    this.datePickerService.init(this.currentDate);
    this.showDatePanel();
    this.registerObservables();
    this.getYears();
    this.getMonths();
    this.keyboardListen();
  }
  closeDatePicker() {
    this.showPicker = false;
    this.keyupEvent && this.keyupEvent();
  }
  registerObservables() {
    this.datePickerService.hidePicker.subscribe(() => {
      this.closeDatePicker();
    });
  }
  keyboardListen() {
    this.keyupEvent = this.renderer2.listen('window', 'keydown', e => {
      const { datePanel, yearPanel } = this;
      const { keyCode, ctrlKey } = e;
      if (!ctrlKey) {
        if (keyCode === keyMap.PageDown) {
          datePanel && this.nextMonth();
          yearPanel && this.nextRangeYear();
          e.preventDefault();
        } else if (keyCode === keyMap.PageUp) {
          datePanel && this.preMonth();
          yearPanel && this.preRangeYear();
          e.preventDefault();
        } else if (keyCode === keyMap.Escape) {
          this.closeDatePicker();
          e.preventDefault();
        }
      } else {
        if (keyCode === keyMap.ArrowLeft) {
          this.preYear();
          e.preventDefault();
        } else if (keyCode === keyMap.ArrowRight) {
          this.nextYear();
          e.preventDefault();
        }
      }
    });
  }
  getClassName() {
    const { prefixCls } = this;
    this.datePickerClassName = classNames(
      `${prefixCls}-picker-container`,
      `${prefixCls}-picker-container-boottomLeft`
    );
  }
  preYear() {
    this.currentDate.subtract(1, 'year');
    this.getDates();
  }
  nextYear() {
    this.currentDate.add(1, 'year');
    this.getDates();
  }
  preMonth() {
    this.currentDate.subtract(1, 'month');
    this.getDates();
  }
  nextMonth() {
    this.currentDate.add(1, 'month');
    this.getDates();
  }
  getDates() {
    this.datePickerService.getDates();
  }
  getYears(startYear?: number) {
    this.years = this.datePickerService.getYears();
  }
  preRangeYear() {
    this.getYears(this.yearPanelStart - 9);
  }
  nextRangeYear() {
    this.getYears(this.yearPanelEnd);
  }
  getMonths() {
    this.months = chunk(
      this.monthNames.map((monthName, index) => ({ monthName, index })),
      3
    );
  }
  closeAllPanel() {
    this.yearPanel = this.monthPanel = this.datePanel = false;
  }
  showDatePanel() {
    this.closeAllPanel();
    this.getDates();
    this.datePanel = true;
  }
  showMonthPanel() {
    this.closeAllPanel();
    this.monthPanel = true;
  }
  showYearPanel() {
    this.closeAllPanel();
    this.yearPanel = true;
  }
  setMonth(index) {
    this.currentDate.month(index);
    this.showDatePanel();
  }
  setYear(year: number) {
    this.currentDate.year(year);
    this.showDatePanel();
  }
  setDate(date) {
    this.datePickerService.set(date);
  }
}
