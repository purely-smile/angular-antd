import { Component, Input, OnInit, OnChanges } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-card',
  templateUrl: './ant-card.html',
  styleUrls: ['./ant-card.scss']
})
export class AntCardComponent implements OnInit, OnChanges {
  @Input() prefixCls = 'ant-card';
  @Input() title: string;
  @Input() className: string;
  @Input() loading = false;
  @Input() bordered = true;
  @Input() noHovering = false;
  @Input() extra: string;
  @Input() bodyStyle;
  public cardClassName: string;
  ngOnInit() {}
  ngOnChanges() {
    this.getClassName();
  }
  getClassName() {
    const { prefixCls, loading, bordered, noHovering } = this;
    this.cardClassName = classNames(prefixCls, classNames, {
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-no-hovering`]: noHovering
    });
  }
}
