import { Component, Input, OnInit, OnChanges } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-icon',
  templateUrl: './Icon.html',
  styleUrls: ['./Icon.scss']
})
export class IconComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() class: string;
  @Input() spin: boolean;
  @Input() className: string;
  public iconClass: string;
  ngOnInit() {}
  ngOnChanges() {
    this.getClassName();
  }
  getClassName() {
    const { type, class: className, spin } = this;
    this.iconClass = classNames(className, 'anticon', `anticon-${type}`, {
      'anticon-spin': !!spin || type === 'loading'
    });
  }
}
