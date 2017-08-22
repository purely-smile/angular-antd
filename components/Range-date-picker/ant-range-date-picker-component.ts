import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'ant-range-date-picker',
  templateUrl: './ant-range-date-picker.html',
  styleUrls: ['./ant-range-date-picker.scss']
})
export class AntRangeDatePickerComponent implements OnInit {
  @Input() startPlaceholder = '开始日期';
  @Input() endPlaceholder = '结束日期';
  public startValue = '';
  public endValue = '';
  ngOnInit() {}
}
