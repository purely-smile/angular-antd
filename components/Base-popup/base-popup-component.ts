import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'base-popup',
  templateUrl: './base-popup.html',
  styleUrls: ['./base-popup.scss']
})
export class BasePopupComponent implements OnInit {
  @Input() visible: boolean;
  @Input() align;
  @Input() destroyPopupOnHide = false;
  @Input() className: string;
  @Input() prefixCls = '';
  @Input() mask: boolean;
  @Input() zIndex = 0;
  @Input() currentAlignClassName: string;
  @Input() action;
  @Input() maskAnimation;
  @Input() maskTransitionName;
  public innerClassName: string;
  ngOnInit() {
    this.getInnerClassName();
  }
  getInnerClassName() {
    const { prefixCls, className, visible } = this;
    this.innerClassName = classNames(prefixCls, className, {
      [`${prefixCls}-hidden`]: visible
    });
  }
  onAlign() {}
}
