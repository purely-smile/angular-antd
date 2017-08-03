import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-breadcrumb',
  templateUrl: './ant-breadcrumb.html',
  styleUrls: ['./ant-breadcrumb.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AntBreadcrumbComponent implements OnInit {
  @Input() prefixCls = 'ant-breadcrumb';
  @Input() separator = '/';
  @Input() routes: any[];
  @Input() params: Object;
  @Input() className: string;
  public breadcrumbClassName;
  ngOnInit() {
    this.getClassName();
  }
  getClassName() {
    const { className, prefixCls } = this;
    this.breadcrumbClassName = classNames(className, prefixCls);
  }
}
