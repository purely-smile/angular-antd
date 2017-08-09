import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class TooltipService {
  public showToolTip: Observable<TooltipConfig>;
  public _showToolTip: Observer<TooltipConfig>;
  public hideToolTip: Observable<any>;
  public _hideToolTip: Observer<any>;
  constructor() {
    this.showToolTip = new Observable<any>((observer: any) => {
      this._showToolTip = observer;
    }).share();
    this.hideToolTip = new Observable<any>((observer: any) => {
      this._hideToolTip = observer;
    }).share();
  }
  /**
   * 显示tooltip
   * @param config
   */
  show(config: TooltipConfig) {
    if (!this._showToolTip) {
      throw new Error('请在页面中添加tooltip-wrap组件');
    }
    const { el } = config;
    const rect = el.getBoundingClientRect();
    config.style = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height
    };
    delete config.el;
    this._showToolTip.next(config);
  }
  hide() {
    if (!this._hideToolTip) {
      throw new Error('请在页面中添加tooltip');
    }
    this._hideToolTip.next(true);
  }
}

interface TooltipConfig {
  tip: string;
  el: HTMLElement;
  placement:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
  style?: Object;
}
