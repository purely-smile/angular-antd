import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ComponentFactoryResolver,
  ElementRef,
  ComponentRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import classNames from 'classnames';
import { Subject } from 'rxjs/Subject';

import { ModalHostDirective } from '../../directives/modal';
import { ModalService, ModalConfig } from '../../services';

@Component({
  selector: 'ant-modal-wrap',
  templateUrl: './ant-modal-wrap.html',
  styleUrls: ['./ant-modal-wrap.scss']
})
export class AntModalWrapComponent implements OnInit, OnDestroy {
  @ViewChild(ModalHostDirective) modalHost: ModalHostDirective;
  public modalWidth = 520;
  public title = '消息提示';
  public showModal = false;
  private showModalSubscribe: Subscription;
  private modalSub: Subject<any>;
  private componentRef: ComponentRef<any>;
  constructor(
    public componentFactoryResolver: ComponentFactoryResolver,
    public modalService: ModalService
  ) {}
  ngOnInit() {
    this.registerSubscribes();
  }
  ngOnDestroy() {
    this.showModal = false;
    const { componentRef, showModalSubscribe } = this;
    componentRef && componentRef.destroy();
    showModalSubscribe && showModalSubscribe.unsubscribe();
  }
  loadComponent({ config, subject }) {
    const { width, component } = config;
    this.setModalWidth(width);
    this.modalSub = subject;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );
    const viewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = (this.componentRef = viewContainerRef.createComponent(
      componentFactory
    ));
    this.showModal = true;
  }
  handleCancel() {
    this.showModal = false;
    this.modalSub.next(false);
  }
  handleOk() {
    this.showModal = false;
    this.modalSub.error(true);
  }
  private setModalWidth(width: number) {
    if (width) {
      this.modalWidth = width;
    }
  }
  private registerSubscribes() {
    this.showModalSubscribe = this.modalService.showModal.subscribe(config => {
      this.loadComponent(config);
    });
  }
}
