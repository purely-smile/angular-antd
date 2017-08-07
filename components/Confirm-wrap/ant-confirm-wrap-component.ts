import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ModalService, ConfirmConfig } from '../../services';

@Component({
  selector: 'ant-confirm-wrap',
  templateUrl: './ant-confirm-wrap.html',
  styleUrls: ['./ant-confirm-wrap.scss']
})
export class AntConfirmWrapComponent implements OnInit, OnDestroy {
  public title = '标题';
  public content = '内容';
  public cancelText = '取消';
  public okText = '确认';
  public showConfirm = false;
  private confirmSubscribe: Subscription;
  public contentWidth = 416;
  public confirmSub: Subject<any>;
  constructor(private modalService: ModalService) {}
  ngOnInit() {
    this.registerSubscribe();
  }
  ngOnDestroy() {
    this.showConfirm = false;
    this.confirmSub.unsubscribe();
  }
  registerSubscribe() {
    this.confirmSubscribe = this.modalService.showConfirm.subscribe(
      (config: ConfirmConfig) => {
        const { title, content, okText, cancelText, sub } = config;
        this.title = title;
        this.content = content;
        this.confirmSub = sub;
        this.showConfirm = true;
        if (okText) {
          this.okText = okText;
        }
        if (cancelText) {
          this.cancelText = cancelText;
        }
      }
    );
  }
  handleCancel() {
    this.showConfirm = false;
    this.confirmSub.error(false);
    this.confirmSub.unsubscribe();
  }
  handleOk() {
    this.showConfirm = false;
    this.confirmSub.next(true);
    this.confirmSub.unsubscribe();
  }
}
