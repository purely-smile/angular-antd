import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-tag',
  templateUrl: './ant-tag.html',
  styleUrls: ['./ant-tag.scss']
})
export class AntTagComponent implements OnInit, OnChanges {
  @Input()
  color:
    | 'pink'
    | 'red'
    | 'yellow'
    | 'orange'
    | 'cyan'
    | 'green'
    | 'blue'
    | 'purple';
  @Input() prefixCls = 'ant-tag';
  @Input() className: string;
  @Input() closable = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  public tagClassName: string;
  public closed = false;
  ngOnInit() {
    this.getClassName();
  }
  ngOnChanges() {
    this.getClassName();
  }
  handleColose(e) {
    this.closed = true;
    this.onClose.emit(e);
  }
  getClassName() {
    const { color, closable, prefixCls, className } = this;
    this.tagClassName = classNames(prefixCls, className, {
      [`${prefixCls}-${color}`]: color,
      [`${prefixCls}-close`]: closable
    });
  }
}
