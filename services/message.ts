import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class MessageService {
  public addMessage: Observable<Message>;
  private _addMessage: Observer<Message>;
  public addNotification: Observable<NotificationConfig>;
  private _addNotification: Observer<NotificationConfig>;
  constructor() {
    this.addMessage = new Observable<Message>(
      (observer: any) => (this._addMessage = observer)
    ).share();
    this.addNotification = new Observable<
      NotificationConfig
    >((observer: any) => {
      this._addNotification = observer;
    }).share();
  }
  add(config: Message) {
    if (!this._addMessage) {
      throw new Error('需要添加message-wrap组件');
    }
    this._addMessage.next(config);
    return config;
  }
  showNotification(config: NotificationConfig) {
    if (!this._addNotification) {
      throw new Error('需要添加ant-notification组件');
    }
    config.sub = new Subject();
    this._addNotification.next(config);
    return config.sub;
  }
  private getGuiId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

interface Message {
  type: 'info' | 'success' | 'error' | 'warning' | 'loading';
  content: string;
}

export interface NotificationConfig {
  type: 'success' | 'info' | 'error' | 'warning' | 'default';
  placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  sub?: Subject<any>;
  message: string;
  description: string;
}
