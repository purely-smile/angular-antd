import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';
@Component({
  selector: 'base-menu-item',
  templateUrl: './base-menu-item.html',
  styleUrls: ['./base-menu-item.scss']
})
export class BaseMenuItemComponent implements OnInit {
  @Input() prefixCls: string;
  @Input() eventKey: string;
  @Input() selectedKeys: any[];
  @Input() disabled = false;
  @Input() title: string;
  @Input() active = false;
  @Input() className: string;
  public menuItemClassName: string;
  ngOnInit() {
    this.getMenuItemClassName();
  }
  getMenuItemClassName() {
    const {
      prefixCls,
      disabled,
      active,
      selectedKeys,
      eventKey,
      className
    } = this;
    this.menuItemClassName = classNames(className, prefixCls, {
      [`${prefixCls}-active`]: !disabled && active,
      [`${prefixCls}-selected`]: selectedKeys.indexOf(eventKey) !== -1,
      [`${prefixCls}-disabled`]: disabled
    });
  }
}
