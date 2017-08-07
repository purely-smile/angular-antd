import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-tabs',
  templateUrl: './ant-tabs.html',
  styleUrls: ['./ant-tabs.scss']
})
export class AntTabsComponent implements OnInit, OnChanges {
  @Input() prefixCls = 'ant-tabs';
  @Input() className: string;
  @Input() size: 'default' | 'small' | 'mini' = 'default';
  @Input() tabPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';
  @Input() type: 'line' | 'card' | 'editable-card' = 'line';
  @Input() navs: string[] = [];
  @Input()
  set value(val) {
    this.tmpValue = val;
    this.valueChange.emit(val);
  }
  get value() {
    return this.tmpValue;
  }
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  public tabClassName: string;
  public tmpValue;
  ngOnInit() {}
  ngOnChanges() {
    this.getClassName();
  }
  getClassName() {
    const { prefixCls, className, size, tabPosition, type } = this;
    this.tabClassName = classNames(
      className,
      prefixCls,
      `${prefixCls}-${tabPosition}`,
      `${prefixCls}-${type}`,
      {
        [`${prefixCls}-mini`]: ['small', 'mini'].indexOf(size) !== -1,
        [`${prefixCls}-vertical`]:
          ['left', 'right'].indexOf(tabPosition) !== -1,
        [`${prefixCls}-card`]: type === 'card'
      }
    );
  }
}
