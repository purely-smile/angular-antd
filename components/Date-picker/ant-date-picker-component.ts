import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatePickerService } from '../../services';

@Component({
  selector: 'ant-date-picker',
  templateUrl: './ant-date-picker.html',
  styleUrls: ['./ant-date-picker.scss']
})
export class AntDatePickerComponent implements OnInit {
  @Input() prefixCls = 'ant-calendar-picker';
  @Input() placeholder = '选择日期';
  public clickEvent;
  public date;
  public sub: Subject<any>;
  constructor(
    private datePickerService: DatePickerService,
    private renderer2: Renderer2
  ) {}
  ngOnInit() {}
  show(el) {
    const sub = (this.sub = new Subject());
    this.datePickerService.show(el, sub);
    this.autoClose();
    this.sub.subscribe(date => {
      this.date = date.format('YYYY-MM-DD');
    });
  }
  hide() {
    this.datePickerService.hide();
    this.clickEvent && this.clickEvent();
    this.sub && this.sub.unsubscribe();
  }
  autoClose() {
    this.clickEvent = this.renderer2.listen('window', 'click', e => {
      this.hide();
    });
  }
}
