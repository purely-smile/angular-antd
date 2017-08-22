import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { chunk } from 'lodash';

@Injectable()
export class DatePickerService {
  public showPicker: Observable<any>;
  private _showPicker: Observer<any>;
  public hidePicker: Observable<any>;
  private _hidePicker: Observer<any>;
  private setSub: Subject<any>;
  public currentDate: moment.Moment;
  public yearPanelStart;
  public yearPanelEnd;
  public dates;
  public years;
  public months;
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
  constructor() {
    this.showPicker = new Observable<any>(
      (observer: any) => (this._showPicker = observer)
    ).share();
    this.hidePicker = new Observable<any>(
      (observer: any) => (this._hidePicker = observer)
    ).share();
  }
  show(el: HTMLElement, sub: Subject<any>) {
    let rect = el.getBoundingClientRect();
    let style = {
      top: rect.top + 'px',
      left: rect.left + 'px'
    };
    this._showPicker.next(style);
    this.setSub = sub;
  }
  hide() {
    this._hidePicker.next(true);
  }
  set(date) {
    this.setSub.next(date);
    this.hide();
  }
  init(currentDate) {
    this.currentDate = currentDate;
  }
  getDates() {
    let value = this.currentDate;
    const DATE_ROW = 6;
    const DATE_COL = 7;
    const dateTable = [];
    let current;
    const month1 = value.clone();
    month1.date(1);
    const day = month1.day();
    const lastMonthDiffDay = day + 7 - value.localeData().firstDayOfWeek() % 7;
    const lastMonth1 = month1.clone();
    lastMonth1.add(0 - lastMonthDiffDay, 'days');
    let passed = 0;
    for (let i = 0; i < DATE_ROW; i++) {
      dateTable[i] = [];
      for (let j = 0; j < DATE_COL; j++) {
        current = lastMonth1;
        if (passed) {
          current = current.clone();
          current.add(passed, 'days');
        }
        dateTable[i].push(current);
        passed++;
      }
    }
    this.dates = dateTable;
  }
  getYears(startYear?: number) {
    const YEAR_ROW = 4;
    const YEAR_COL = 3;
    if (!startYear) {
      const currentYear = this.currentDate.year();
      startYear = Math.floor(currentYear / 10) * 10;
    }
    const years = [];
    let index = 0;
    for (let i = 0; i < YEAR_ROW; i++) {
      years[i] = [];
      for (let j = 0; j < YEAR_COL; j++) {
        let yearName = startYear + index - 1;
        // 设置起至年份
        if (index === 0) {
          this.yearPanelStart = yearName;
        } else if (index === 11) {
          this.yearPanelEnd = yearName;
        }
        years[i][j] = {
          yearName
        };
        index++;
      }
    }
    return (this.years = years);
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
  preRangeYear() {
    this.getYears(this.yearPanelStart - 9);
  }
  nextRangeYear() {
    this.getYears(this.yearPanelEnd);
  }
  getMonths() {
    return (this.months = chunk(
      this.monthNames.map((monthName, index) => ({ monthName, index })),
      3
    ));
  }
}
