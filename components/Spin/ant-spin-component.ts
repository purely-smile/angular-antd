import { Component, Input, OnInit, OnChanges } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-spin',
  templateUrl: './ant-spin.html',
  styleUrls: ['./ant-spin.scss']
})
export class AntSpinComponent implements OnInit, OnChanges {
  @Input() prefixCls = 'ant-spin';
  @Input() className: string;
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() spining = true;
  @Input() wrapperClassName = '';
  @Input() tip: string;
  @Input() delay: number;
  public debounceTimeout;
  public delayTimeout;
  public spinClassName: string;
  public containerClassName: string;

  ngOnInit() {}
  ngOnChanges(changes) {
    const { delay } = this;
    this.getClassName();
    if (!changes.spining) {
      return;
    }
    const {
      spining: { currentValue: spinning, previousValue: currentSpinning }
    } = changes;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (currentSpinning && !spinning) {
      this.debounceTimeout = setTimeout(() => {
        this.spining = false;
        this.getClassName();
      }, 300);
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
    } else {
      if (spinning && delay && !isNaN(Number(delay))) {
        if (this.delayTimeout) {
          clearTimeout(this.delayTimeout);
        }
        this.spining = false;
        this.delayTimeout = setTimeout(() => {
          this.spining = true;
          this.getClassName();
        }, delay);
      }
    }
  }
  getClassName() {
    const { prefixCls, size, className, tip, spining } = this;
    this.spinClassName = classNames(prefixCls, className, {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-spinning`]: spining,
      [`${prefixCls}-show-text`]: !!tip
    });
    this.containerClassName = classNames({
      [`${prefixCls}-container`]: true,
      [`${prefixCls}-blur`]: spining
    });
  }
}
