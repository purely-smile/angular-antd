import { Component, Input, OnInit, OnChanges } from '@angular/core';
import classNames from 'classnames';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ant-collapse',
  templateUrl: './ant-collapse.html',
  styleUrls: ['./ant-collapse.scss']
})
export class AntCollapseComponent implements OnInit, OnChanges {
  @Input() accordion = false;
  @Input() prefixCls = 'ant-collapse';
  @Input() bordered = true;
  @Input() className: string;
  @Input() disabled = false;
  @Input() currentKey: string;
  public collapseClassName: string;
  public keySub: Subject<string> = new Subject();
  ngOnInit() {
    this.getClassName();
  }
  ngOnChanges() {
    this.getClassName();
  }
  setCurrentKey(key: string) {
    const { accordion } = this;
    this.currentKey = key;
    if (accordion) {
      this.keySub.next(key);
    }
  }
  getClassName() {
    const { prefixCls, className, bordered } = this;
    this.collapseClassName = classNames(prefixCls, className, {
      [`${prefixCls}-borderless`]: !bordered
    });
  }
}
