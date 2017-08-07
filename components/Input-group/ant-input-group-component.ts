import { Component, Input, OnInit, OnChanges } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-input-group',
  templateUrl: './ant-input-group.html',
  styleUrls: ['./ant-input-group.scss']
})
export class AntInputGroupComponent implements OnInit, OnChanges {
  @Input() prefixCls = 'ant-input-group';
  @Input() size: 'large' | 'small' | 'default' = 'default';
  @Input() compact = false;
  public groupClassName: string;
  ngOnInit() {
    this.getClassName();
  }
  ngOnChanges() {
    this.getClassName();
  }
  getClassName() {
    const { prefixCls, size, compact } = this;
    this.groupClassName = classNames(prefixCls, {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-compact`]: compact
    });
  }
}
