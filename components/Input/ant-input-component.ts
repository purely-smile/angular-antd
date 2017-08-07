import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-input',
  templateUrl: './ant-input.html',
  styleUrls: ['./ant-input.scss']
})
export class AntInputComponent implements OnInit {
  @Input() type = 'text';
  @Input()
  set value(val) {
    this.valueChange.emit(val);
    this.tmpValue = val;
  }
  get value() {
    return this.tmpValue;
  }
  @Input() size: 'large' | 'default' | 'small' = 'default';
  @Input() disabled = false;
  @Input() addonBefore: string;
  @Input() addonAfter: string;
  @Input() prefix: string;
  @Input() suffix: string;
  @Input() prefixCls = 'ant-input';
  @Input() placeholder = '';
  @Input() wrapStyle;
  @Input() className: string;
  @Output() onPressEnter: EventEmitter<any> = new EventEmitter();
  @Output() valueChange: EventEmitter<string> = new EventEmitter();
  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  public tmpValue;
  public prefixClassName: string;
  public addOnClassName: string;
  public inputClassName: string;
  public suffixIconClassName: string;
  ngOnInit() {
    this.getClassName();
  }
  handleEnter(e) {
    this.onPressEnter.emit(e);
  }
  handleSearch(e) {
    const { suffix } = this;
    if (suffix !== 'search') {
      return;
    }
    this.onSearch.emit(e);
  }
  getClassName() {
    const {
      prefixCls,
      addonAfter,
      addonBefore,
      size,
      disabled,
      className,
      suffix
    } = this;
    this.prefixClassName = classNames(`${prefixCls}-wrapper`, {
      [`${prefixCls}-group`]: addonBefore || addonAfter
    });
    this.addOnClassName = `${prefixCls}-group-addon`;
    this.inputClassName = classNames(prefixCls, className, {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-disabled`]: disabled
    });
    this.suffixIconClassName = classNames({
      [`${prefixCls}-search-icon`]: suffix === 'search'
    });
  }
}
