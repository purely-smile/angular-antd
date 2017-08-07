import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-textarea',
  templateUrl: './ant-textarea.html',
  styleUrls: ['./ant-textarea.scss']
})
export class AntTextareaComponent implements OnInit {
  @Input() prefixCls = 'ant-input';
  @Input() disabled = false;
  @Input() className: string;
  @Input() rows = 5;
  @Input() cols = 30;
  @Input() placeholder = '';
  @Input()
  set value(val) {
    this.valueChange.emit(val);
    this.tmpValue = val;
  }
  get value() {
    return this.tmpValue;
  }
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  public textareaClassName: string;
  public tmpValue;
  ngOnInit() {
    this.getClassName();
  }
  getClassName() {
    const { prefixCls, className, disabled } = this;
    this.textareaClassName = classNames(className, prefixCls, {
      [`${prefixCls}-disabled`]: disabled
    });
  }
}
