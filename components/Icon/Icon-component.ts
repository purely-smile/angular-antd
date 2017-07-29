import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-icon',
  templateUrl: './Icon.html',
  styleUrls: ['./Icon.scss']
})

export class IconComponent implements OnInit {
  @Input() type: string;
  @Input() class: string;
  @Input() spin: boolean;
  public iconClass: string;
  ngOnInit() {
    const { type, class: className, spin } = this;
    this.iconClass = classNames({
      anticon: true,
      'anticon-spin': !!spin || type === 'loading',
      [`anticon-${type}`]: true
    }, className);
  }
}