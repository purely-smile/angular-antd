import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'ant-breadcrumb-item',
  templateUrl: './ant-breadcrumb-item.html',
  styleUrls: ['./ant-breadcrumb-item.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AntBreadcrumbItemComponent implements OnInit {
  @Input() prefixCls = 'ant-breadcrumb';
  @Input() separator = '/';
  @Input() href: string;
  ngOnInit() {}
}
