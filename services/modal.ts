import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class ModalService {
  public showModal: Observable<any>;
  private _showModal: Observer<any>;
  public showConfirm: Observable<any>;
  private _showConfirm: Observer<any>;
  constructor() {
    this.showModal = new Observable<any>((observer: any) => {
      this._showModal = observer;
    }).share();
    this.showConfirm = new Observable<any>((observer: any) => {
      this._showConfirm = observer;
    }).share();
  }
  /**
   * 显示弹窗
   * @param component 组件
   */
  show(config: ModalConfig): Subject<any> {
    if (!this._showModal) {
      throw new Error('请在页面中添加ant-modal-wrap组件');
    }
    const subject = new Subject();
    this._showModal.next({ config, subject });
    return subject;
  }
  confirm(config: ConfirmConfig) {
    if (!this._showConfirm) {
      throw new Error('请在页面中添加ant-confirm-wrap组件');
    }
    config.sub = new Subject();
    this._showConfirm.next(config);
  }
}

export interface ModalConfig {
  component: any;
  width: number;
}

export interface ConfirmConfig {
  title: string;
  content: string;
  cancelText?: string;
  okText?: string;
  sub?: Subject<any>;
}
