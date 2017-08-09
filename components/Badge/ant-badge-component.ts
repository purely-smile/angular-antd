import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-badge',
  templateUrl: './ant-badge.html',
  styleUrls: ['./ant-badge.scss']
})
export class AntBadgeComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() count: number;
  @Input() showZero = false;
  @Input() overflowCount = 99;
  @Input() dot = false;
  @Input() prefixCls = 'ant-badge';
  @Input() text: string;
  @Input() status: 'success' | 'processing' | 'default' | 'error' | 'warning';
  @Input() className: string;
  @ViewChild('contentEl') contentEl: ElementRef;
  public badgeClassName: string;
  public statusClassName: string;
  public subClassName: string;
  public displayCount;
  ngOnInit() {
    this.getClassName();
  }
  ngOnChanges() {
    this.getClassName();
  }
  ngAfterViewInit() {}
  getClassName() {
    const { className, prefixCls, status, dot, overflowCount, count } = this;
    const isDot = dot;
    this.displayCount = isDot
      ? ''
      : count > overflowCount ? overflowCount : count;
    this.badgeClassName = classNames(className, prefixCls, {
      [`${prefixCls}-status`]: status
    });
    this.statusClassName = classNames(`${prefixCls}-status-${status}`, {
      [`${prefixCls}-status-dot`]: status
    });
    this.subClassName = classNames('ant-scroll-number', {
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot
    });
  }
}
