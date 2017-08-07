import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  ApplicationRef
} from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-input-number',
  templateUrl: './ant-input-number.html',
  styleUrls: ['./ant-input-number.scss']
})
export class AntInputNumberComponent implements OnInit, OnChanges {
  @Input() prefixCls = 'ant-input-number';
  @Input() min: number = -Number.MAX_SAFE_INTEGER;
  @Input() max: number = Number.MAX_SAFE_INTEGER;
  @Input() disabled = false;
  @Input() size: 'large' | 'small' | 'default' = 'default';
  @Input() placeholder = '';
  @Input() precision = 0;
  @Input() step = 4;
  @Input() className: string;
  @Input()
  set value(val) {
    const { max, min } = this;
    this.valueChange.emit(val);
    this.tmpValue = val;
    this.getClassName();
  }
  get value() {
    return this.tmpValue;
  }
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  private tmpValue;
  public inputNumberClassName: string;
  public upClassName: string;
  public downClassName: string;
  public inputFocused = false;
  constructor(private applicationRef: ApplicationRef) {}
  ngOnInit() {
    this.getClassName();
  }
  ngOnChanges() {
    this.getClassName();
  }
  handleChange() {
    let { min, max, value } = this;
    this.value = value <= min ? min : value >= max ? max : value;
  }
  handleUp() {
    let { min, value, step, precision } = this;
    if (value <= min) {
      return;
    }
    value =
      (this.parseValue() - step * Math.pow(10, precision)) /
      Math.pow(10, precision);
    this.value = value <= min ? min : value;
  }
  handleDown() {
    let { max, value, step, precision } = this;
    if (value >= max) {
      return;
    }
    value =
      (this.parseValue() + step * Math.pow(10, precision)) /
      Math.pow(10, precision);
    this.value = value >= max ? max : value;
  }
  parseValue() {
    const { value, precision } = this;
    return parseFloat(this.value) * Math.pow(10, precision);
  }
  handleFocus() {
    this.inputFocused = true;
    this.getClassName();
  }
  handleBlur() {
    this.inputFocused = false;
    this.getClassName();
  }
  getClassName() {
    const { prefixCls, size, value, min, max, disabled, inputFocused } = this;
    const handlerClassName = `${prefixCls}-handler`;
    this.inputNumberClassName = classNames(prefixCls, {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-focused`]: inputFocused
    });

    this.upClassName = classNames(handlerClassName, `${handlerClassName}-up`, {
      [`${handlerClassName}-up-disabled`]: value <= min
    });
    this.downClassName = classNames(
      handlerClassName,
      `${handlerClassName}-down`,
      {
        [`${handlerClassName}-down-disabled`]: value >= max
      }
    );
  }
}
