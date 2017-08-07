import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { MessageService, NotificationConfig } from '../../services';

@Component({
  selector: 'ant-notification',
  templateUrl: './ant-notification.html',
  styleUrls: ['./ant-notification.scss']
})
export class AntNotificationComponent implements OnInit {
  @Input() className: string;
  public message = 'message';
  public description = 'description';
  public type: 'success' | 'info' | 'error' | 'warning' | 'default' = 'info';
  public placement:
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight' = 'topRight';
  public wrapClassName: string;
  public outerPrefixCls = 'ant-notification';
  public prefixCls = this.outerPrefixCls + '-notice';
  public outerClassName: string;
  public iconTypeClassName: string;
  public iconType: string;
  private readonly styleSize = '24px';
  public iconClassName: string;
  public closeSub: Subject<any>;
  private typeObj = {
    success: 'check-circle-o',
    info: 'info-circle-o',
    error: 'cross-circle-o',
    warning: 'exclamation-circle-o'
  };
  private styleObj = {
    topLeft: {
      left: 0,
      top: this.styleSize,
      bottom: 'auto'
    },
    bottomLeft: {
      left: 0,
      top: 'auto',
      bottom: this.styleSize
    },
    bottomRight: {
      right: 0,
      top: 'auto',
      bottom: this.styleSize
    },
    topRight: {
      right: 0,
      top: this.styleSize,
      bottom: 'auto'
    }
  };
  public style;
  public showNotification = false;
  public notificationSub: Subscription;
  constructor(private messageService: MessageService) {}
  ngOnInit() {
    this.registerSubscribe();
  }
  getClassName() {
    const { type, prefixCls, outerPrefixCls, placement, typeObj } = this;
    this.outerClassName = classNames(
      outerPrefixCls,
      `${outerPrefixCls}-${placement}`
    );
    this.iconTypeClassName = type ? `${prefixCls}-with-icon` : '';
    this.iconType = typeObj[type];
    this.iconClassName = classNames(
      `${prefixCls}-icon`,
      `${prefixCls}-icon-${type}`
    );
  }
  getStyle() {
    const { placement } = this;
    this.style = this.styleObj[placement];
  }
  registerSubscribe() {
    this.notificationSub = this.messageService.addNotification.subscribe(
      (config: NotificationConfig) => {
        const { type, placement, sub, message, description } = config;
        this.type = type;
        this.placement = placement;
        this.closeSub = sub;
        this.message = message;
        this.description = description;
        this.showNotification = true;
        this.getClassName();
        this.getStyle();
      }
    );
  }
  close() {
    this.showNotification = false;
    this.closeSub.next('close');
  }
}
