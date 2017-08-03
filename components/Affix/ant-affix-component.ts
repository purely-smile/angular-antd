import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  OnChanges
} from '@angular/core';
import classNames from 'classnames';
import shallowequal from 'shallowequal';

@Component({
  selector: 'ant-affix',
  templateUrl: './ant-affix.html',
  styleUrls: ['./ant-affix.scss']
})
export class AntAffixComponent implements OnInit, OnDestroy, OnChanges {
  @Input() offsetTop: number;
  @Input() offset: number;
  @Input() offsetBottom: number;
  @Input() target: Window | HTMLElement = window;
  @Input() prefixCls = 'ant-affix';
  @ViewChild('affixEl') affixEl: ElementRef;
  public placeholderStyle: Object;
  public affixClassName: string;
  public affixStyle: {
    position: string;
  };
  public scrollEvent;
  public resizeEvent;
  public timeout;
  ngOnInit() {
    this.timeout = setTimeout(() => {
      this.setTargetEventListeners(this.target);
    });
  }
  ngOnDestroy() {
    this.clearScrollEventListeners();
    clearTimeout(this.timeout);
  }
  ngOnChanges() {
    this.updatePosition({});
  }
  getClassName() {
    const { prefixCls } = this;
    this.affixClassName = classNames({
      [prefixCls]: this.affixStyle
    });
  }
  setTargetEventListeners(target) {
    if (target == null) {
      return;
    }
    this.clearScrollEventListeners();
    this.scrollEvent = target.addEventListener(
      'scroll',
      this.updatePosition.bind(this)
    );
    this.resizeEvent = target.addEventListener(
      'resize',
      this.updatePosition.bind(this)
    );
  }
  clearScrollEventListeners() {
    ['scrollEvent', 'resizeEvent'].forEach(name => {
      if (this[name]) {
        this[name].remove();
      }
    });
  }
  updatePosition(e) {
    let { offsetTop, offsetBottom, offset, target } = this;
    const targetNode = target;

    // Backwards support
    offsetTop = offsetTop || offset;
    const scrollTop = this.getScroll(targetNode, true);
    const affixNode = this.affixEl.nativeElement;
    const elemOffset = this.getOffset(affixNode, targetNode);
    const elemSize = {
      width: affixNode.offsetWidth,
      height: affixNode.offsetHeight
    };

    const offsetMode = {
      top: false,
      bottom: false
    };
    // Default to `offsetTop=0`.
    if (typeof offsetTop !== 'number' && typeof offsetBottom !== 'number') {
      offsetMode.top = true;
      offsetTop = 0;
    } else {
      offsetMode.top = typeof offsetTop === 'number';
      offsetMode.bottom = typeof offsetBottom === 'number';
    }

    const targetRect = this.getTargetRect(targetNode);
    const targetInnerHeight =
      (targetNode as Window).innerHeight ||
      (targetNode as HTMLElement).clientHeight;
    if (scrollTop > elemOffset.top - (offsetTop as number) && offsetMode.top) {
      // Fixed Top
      const width = elemOffset.width;
      this.setAffixStyle(e, {
        position: 'fixed',
        top: targetRect.top + (offsetTop as number),
        left: targetRect.left + elemOffset.left,
        width
      });
      this.setPlaceholderStyle({
        width,
        height: affixNode.offsetHeight
      });
    } else if (
      scrollTop <
        elemOffset.top +
          elemSize.height +
          (offsetBottom as number) -
          targetInnerHeight &&
      offsetMode.bottom
    ) {
      // Fixed Bottom
      const targetBottomOffet =
        targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
      const width = elemOffset.width;
      this.setAffixStyle(e, {
        position: 'fixed',
        bottom: targetBottomOffet + (offsetBottom as number),
        left: targetRect.left + elemOffset.left,
        width
      });
      this.setPlaceholderStyle({
        width,
        height: affixNode.offsetHeight
      });
    } else {
      const { affixStyle } = this;
      if (
        e.type === 'resize' &&
        affixStyle &&
        affixStyle.position === 'fixed' &&
        affixNode.offsetWidth
      ) {
        this.setAffixStyle(e, { ...affixStyle, width: affixNode.offsetWidth });
      } else {
        this.setAffixStyle(e, null);
      }
      this.setPlaceholderStyle(null);
    }
  }
  setAffixStyle(e, affixStyle) {
    const { target } = this;
    const originalAffixStyle = this.affixStyle;
    const isWindow = target === window;
    if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) {
      return;
    }
    if (shallowequal(affixStyle, originalAffixStyle)) {
      return;
    }
    this.affixStyle = affixStyle;
    this.getClassName();
  }
  setPlaceholderStyle(placeholderStyle) {
    const originalPlaceholderStyle = this.placeholderStyle;
    if (shallowequal(placeholderStyle, originalPlaceholderStyle)) {
      return;
    }
    this.placeholderStyle = placeholderStyle;
  }
  getScroll(target, top): number {
    if (typeof window === 'undefined') {
      return 0;
    }

    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';
    const isWindow = target === window;

    let ret = isWindow ? target[prop] : target[method];
    // ie6,7,8 standard mode
    if (isWindow && typeof ret !== 'number') {
      ret = window.document.documentElement[method];
    }

    return ret;
  }
  getOffset(element: HTMLElement, target) {
    const elemRect = element.getBoundingClientRect();
    const targetRect = this.getTargetRect(target);

    const scrollTop = this.getScroll(target, true);
    const scrollLeft = this.getScroll(target, false);

    const docElem = window.document.body;
    const clientTop = docElem.clientTop || 0;
    const clientLeft = docElem.clientLeft || 0;

    return {
      top: elemRect.top - targetRect.top + scrollTop - clientTop,
      left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
      width: elemRect.width,
      height: elemRect.height
    };
  }
  getTargetRect(target): ClientRect {
    return target !== window
      ? target.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
  }
}
