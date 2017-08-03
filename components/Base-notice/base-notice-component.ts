import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'base-notice',
  templateUrl: './base-notice.html',
  styleUrls: ['./base-notice.scss']
})
export class BaseNoticeComponent implements OnInit, OnDestroy {
  @Input() className: string;
  @Input() duration = 1.5;
  @Input() style = { right: '50%' };
  @Input() prefixCls = 'ant-message';
  @Input() closable = false;
  @Input() noticeList: any[] = [];
  public noticePrefixCls: string;
  public noticeClassName: string;
  public closeTimer;
  public iconTypeObj = {
    info: 'info-circle',
    success: 'check-circle',
    error: 'cross-circle',
    warning: 'exclamation-circle',
    loading: 'loading'
  };
  ngOnInit() {
    const { duration } = this;
    this.getClassName();
    if (duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, duration * 1000);
    }
  }
  ngOnDestroy() {
    this.clearCloseTimer();
  }
  getClassName() {
    const { prefixCls, closable, className } = this;
    const noticePrefixCls = (this.noticePrefixCls = `${prefixCls}-notice`);
    this.noticeClassName = classNames(`${noticePrefixCls}`, className, {
      [`${noticePrefixCls}-closable`]: closable
    });
  }
  clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  close() {
    this.clearCloseTimer();
  }
}
