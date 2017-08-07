import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-back-top',
  templateUrl: './ant-back-top.html',
  styleUrls: ['./ant-back-top.scss']
})
export class AntBackTopComponent implements OnInit, OnDestroy {
  @Input() prefixCls = 'ant-back-top';
  @Input() className: string;
  @Input() visibilityHeight = 300;
  @Input() visible = false;
  public scrollEvent;
  public backTopClassName: string;
  public target = window;
  ngOnInit() {
    this.getClassName();
    this.handleScroll();
    this.scrollEvent = this.target.addEventListener(
      'scroll',
      this.handleScroll.bind(this)
    );
  }
  ngOnDestroy() {
    this.target.removeEventListener('scroll', this.handleScroll.bind(this));
  }
  private easeInOutCubic(t: number, b: number, c: number, d: number) {
    const cc = c - b;
    t /= d / 2;
    if (t < 1) {
      return cc / 2 * t * t * t + b;
    } else {
      return cc / 2 * ((t -= 2) * t * t + 2) + b;
    }
  }
  getCurrentScrollTop() {
    const targetNode = this.target;
    if (targetNode === window) {
      return (
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop
      );
    }
    // return (targetNode as HTMLElement).scrollTop;
  }

  scrollToTop() {
    const scrollTop = this.getCurrentScrollTop();
    const startTime = Date.now();
    console.log(scrollTop);
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      this.setScrollTop(this.easeInOutCubic(time, scrollTop, 0, 450));
      if (time < 450) {
        requestAnimationFrame(frameFunc);
      }
    };
    requestAnimationFrame(frameFunc);
  }

  setScrollTop(value: number) {
    const targetNode = this.target;
    if (targetNode === window) {
      document.body.scrollTop = value;
      document.documentElement.scrollTop = value;
    } else {
      // (targetNode as HTMLElement).scrollTop = value;
    }
  }

  handleScroll() {
    const { visibilityHeight } = this;
    const target = window;
    const scrollTop = this.getScroll(target, true);
    this.visible = scrollTop > visibilityHeight;
  }
  getScroll(target, top) {
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
  getClassName() {
    const { className, prefixCls } = this;
    this.backTopClassName = classNames(className, prefixCls);
  }
}
