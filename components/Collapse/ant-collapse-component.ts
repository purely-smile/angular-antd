import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-collapse',
  templateUrl: './ant-collapse.html',
  styleUrls: ['./ant-collapse.scss']
})
export class AntCollapseComponent implements OnInit {
  @Input() accordion = false;
  @Input() prefixCls = 'ant-collapse';
  @Input() bordered = true;
  @Input() className: string;
  @Input() disabled = false;
  ngOnInit() {}
}
