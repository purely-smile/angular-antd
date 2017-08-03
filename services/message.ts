import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class MessageService {
  public addMessage: Observable<Message>;
  private _addMessage: Observer<Message>;
  constructor() {
    this.addMessage = new Observable<Message>(
      (observer: any) => (this._addMessage = observer)
    ).share();
  }
  add(config: Message) {
    const messageId = this.getGuiId();
    if (!this._addMessage) {
      throw new Error(
        'No Toaster Containers have been initialized to receive toasts.'
      );
    }
    this._addMessage.next(config);
    return config;
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
