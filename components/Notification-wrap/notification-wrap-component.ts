import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy,
  AfterContentInit
} from '@angular/core';
import classNames from 'classnames';
import { BaseNoticeComponent } from '../Base-notice';
import { NotificationDirective } from '../../directives/notification';
import { MessageService } from '../../services';

@Component({
  selector: 'notification-wrap',
  templateUrl: './notification-wrap.html',
  styleUrls: ['./notification-wrap.scss']
})
export class NotificationWrapComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
  @Input() prefixCls = 'ant-message';
  @Input() className: string;
  @Input()
  style = {
    top: 65,
    left: '50%'
  };
  @ViewChild(NotificationDirective) notificationHost: NotificationDirective;
  public notificationClassName: string;
  private addMessageSubscribe;
  public timmer;
  constructor(
    public componentFactoryResolver: ComponentFactoryResolver,
    public messageService: MessageService
  ) {}
  ngOnInit() {
    this.getClassName();
    this.registerSubscribes();
  }
  ngOnDestroy() {
    const { timmer } = this;
    timmer && clearTimeout(timmer);
  }
  ngAfterViewInit() {}
  ngAfterContentInit() {
    // this.loadComponent();
  }
  getClassName() {
    const { prefixCls, className } = this;
    this.notificationClassName = classNames(prefixCls, className);
  }
  loadComponent(config) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      BaseNoticeComponent
    );
    const viewContainerRef = this.notificationHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    Object.assign(componentRef.instance, {
      duration: 1,
      prefixCls: this.prefixCls,
      noticeList: [config]
    });
    this.timmer = setTimeout(() => {
      viewContainerRef.clear();
    }, 2000);
  }
  private registerSubscribes() {
    this.addMessageSubscribe = this.messageService.addMessage.subscribe(
      config => {
        this.loadComponent(config);
      }
    );
  }
}
