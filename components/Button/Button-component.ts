import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-button',
  templateUrl: './Button.html',
  styleUrls: ['./Button.scss']
})
export class ButtonComponent implements OnInit {
  private readonly prefixCls = 'ant-btn';
  public buttonClassName = '';
  @Input() type: 'primary' | 'ghost' | 'dashed' | 'danger';
  @Input() shape: 'circle' | 'circle-outline';
  @Input() size: 'large' | 'default' | 'small';
  @Input() htmlType: 'submit' | 'button' | 'reset' = 'button';
  @Input() loading: boolean | Object;
  @Input() className: string;
  @Input() icon: string;
  ngOnInit() {
    this.buttonClassName = this.getButtonClassName();
  }
  /**
   * 转换size对应的className
   */
  private getSizeClass(): string {
    const { size } = this;
    let sizeCls = '';
    switch (size) {
      case 'large':
        sizeCls = 'lg';
        break;
      case 'small':
        sizeCls = 'sm';
        break;
      default:
        break;
    }
    return sizeCls;
  }
  /**
   * 获取Button 上需要展示的className
   */
  private getButtonClassName(): string {
    const { prefixCls, className, type, shape, icon, loading } = this;
    const sizeClassName = this.getSizeClass();
    return classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeClassName}`]: sizeClassName,
      [`${prefixCls}-icon-only`]: icon && !loading,
      [`${prefixCls}-loading`]: loading
    });
  }
}