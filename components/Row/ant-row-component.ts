import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-row',
  templateUrl: './ant-row.html',
  styleUrls: ['./ant-row.scss']
})
export class AntRowComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() className: string;
  @Input() type: 'flex' = 'flex';
  @Input() align: 'top' | 'middle' | 'bottom';
  @Input() gutter = 0;
  @Input()
  justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  @Input() prefixCls = 'ant-row';
  @ViewChild('el') el: ElementRef;
  public rowClassName: string;
  public rowStyle;
  constructor(private renderer2: Renderer2) {}
  ngOnInit() {
    this.getClassName();
  }
  ngOnChanges() {
    this.getClassName();
  }
  ngAfterViewInit() {
    const { gutter } = this;
    if (gutter <= 0) {
      return;
    }
    Array.from(this.el.nativeElement.children).forEach(el => {
      this.renderer2.setStyle(el, 'paddingLeft', gutter / 2 + 'px');
      this.renderer2.setStyle(el, 'paddingRight', gutter / 2 + 'px');
    });
  }
  getClassName() {
    const { type, justify, align, className, gutter, prefixCls } = this;
    this.rowClassName = classNames(className, {
      [prefixCls]: !type,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${type}-${justify}`]: type && justify,
      [`${prefixCls}-${type}-${align}`]: type && align
    });
    this.rowStyle =
      gutter > 0
        ? {
            marginLeft: gutter / -2,
            marginRight: gutter / -2
          }
        : null;
  }
}
