import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'base-trigger',
  templateUrl: './base-trigger.html',
  styleUrls: ['./base-trigger.scss']
})
export class BaseTriggerComponent implements OnInit {
  @Input() action: string | string[] = [];
  @Input() showAction = [];
  @Input() hideAction = [];
  @Input() prefixCls = 'ant-trigger-popup';
  @Input() popupClassName = '';
  @Input() popupPlacement: string;
  @Input() popupTransitionName: string;
  @Input() popupAnimation;
  @Input() mouseEnterDelay = 0;
  @Input() mouseLeaveDelay = 0.1;
  @Input() zIndex = 0;
  @Input() focusDelay = 0;
  @Input() blurDelay = 0.15;
  @Input() destroyPopupOnHide = false;
  @Input() mask = false;
  @Input() maskClosable = true;
  @Input() popupVisible: boolean;
  @Input() maskTransitionName: string;
  @Input() maskAnimation: string;
  @Input() getPopupClassNameFromAlign = '';
  @Input() getDocument = window.document;
  @Input() popupStyle = {};
  @Input() popupAlign = {};
  @Input() defaultPopupVisible = false;
  @Input() builtinPlacements;
  @Input() overlay;
  @ViewChild('triggerEl') triggerEl: ElementRef;
  public focusTime: number;
  public preClickTime: number;
  public preTouchTime: number;
  public delayTimer;
  public readonly ALL_HANDLERS = [
    'onClick',
    'onMouseDown',
    'onTouchStart',
    'onMouseEnter',
    'onMouseLeave',
    'onFocus',
    'onBlur'
  ];
  ngOnInit() {}
  onMouseEnter(e) {
    this.fireEvents('onMouseEnter', e);
    this.delaySetPopupVisible(true, this.mouseEnterDelay);
  }

  onMouseLeave(e) {
    this.fireEvents('onMouseLeave', e);
    this.delaySetPopupVisible(false, this.mouseLeaveDelay);
  }

  onPopupMouseEnter() {
    this.clearDelayTimer();
  }

  onPopupMouseLeave(e) {
    // https://github.com/react-component/trigger/pull/13
    // react bug?
    this.delaySetPopupVisible(false, this.mouseLeaveDelay);
  }

  onFocus(e) {
    this.fireEvents('onFocus', e);
    // incase focusin and focusout
    this.clearDelayTimer();
    if (this.isFocusToShow()) {
      this.focusTime = Date.now();
      this.delaySetPopupVisible(true, this.focusDelay);
    }
  }

  onMouseDown(e) {
    this.fireEvents('onMouseDown', e);
    this.preClickTime = Date.now();
  }

  onTouchStart(e) {
    this.fireEvents('onTouchStart', e);
    this.preTouchTime = Date.now();
  }

  onBlur(e) {
    this.fireEvents('onBlur', e);
    this.clearDelayTimer();
    if (this.isBlurToHide()) {
      this.delaySetPopupVisible(false, this.blurDelay);
    }
  }

  onClick(event) {
    this.fireEvents('onClick', event);
    // focus will trigger click
    if (this.focusTime) {
      let preTime;
      if (this.preClickTime && this.preTouchTime) {
        preTime = Math.min(this.preClickTime, this.preTouchTime);
      } else if (this.preClickTime) {
        preTime = this.preClickTime;
      } else if (this.preTouchTime) {
        preTime = this.preTouchTime;
      }
      if (Math.abs(preTime - this.focusTime) < 20) {
        return;
      }
      this.focusTime = 0;
    }
    this.preClickTime = 0;
    this.preTouchTime = 0;
    event.preventDefault();
    const nextVisible = !this.popupVisible;
    if (
      (this.isClickToHide() && !nextVisible) ||
      (nextVisible && this.isClickToShow())
    ) {
      this.setPopupVisible(!this.popupVisible);
    }
  }

  onDocumentClick(event) {
    if (this.mask && !this.maskClosable) {
      return;
    }
    const target = event.target;
    const root = this.triggerEl.nativeElement;
    const popupNode = this.getPopupDomNode();
    if (!contains(root, target) && !contains(popupNode, target)) {
      this.setPopupVisible(false);
    }
  }

  getPopupDomNode() {
    return null;
  }
  fireEvents(type, e) {
    // const childCallback = this.children[type];
    // if (childCallback) {
    //   childCallback(e);
    // }
    const callback = this[type];
    if (callback) {
      callback(e);
    }
  }
  setPopupVisible(popupVisible) {
    this.clearDelayTimer();
    if (this.popupVisible !== popupVisible) {
      if (!('popupVisible' in this)) {
        this.popupVisible = popupVisible;
      }
    }
  }

  delaySetPopupVisible(visible, delayS) {
    const delay = delayS * 1000;
    this.clearDelayTimer();
    if (delay) {
      this.delayTimer = setTimeout(() => {
        this.setPopupVisible(visible);
        this.clearDelayTimer();
      }, delay);
    } else {
      this.setPopupVisible(visible);
    }
  }

  clearDelayTimer() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  }

  clearOutsideHandler() {}

  createTwoChains(event) {}

  isClickToShow() {
    const { action, showAction } = this;
    return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
  }

  isClickToHide() {
    const { action, hideAction } = this;
    return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
  }

  isMouseEnterToShow() {
    const { action, showAction } = this;
    return (
      action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1
    );
  }

  isMouseLeaveToHide() {
    const { action, hideAction } = this;
    return (
      action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1
    );
  }

  isFocusToShow() {
    const { action, showAction } = this;
    return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
  }

  isBlurToHide() {
    const { action, hideAction } = this;
    return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
  }
  forcePopupAlign() {}
}

function contains(root, n) {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}
