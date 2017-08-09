import { Component, Input, OnInit, OnChanges, Inject } from '@angular/core';
import classNames from 'classnames';
import { AntCollapseComponent } from '../Collapse';

@Component({
  selector: 'ant-collapse-panel',
  templateUrl: './ant-collapse-panel.html',
  styleUrls: ['./ant-collapse-panel.scss']
})
export class AntCollapsePanelComponent implements OnInit, OnChanges {
  @Input() className: string;
  @Input() prefixCls = 'ant-collapse';
  @Input() header: string;
  @Input() headerClass: string;
  @Input() isActive = false;
  @Input() showArrow = true;
  @Input() disabled = false;
  @Input() key: string;
  public itemClassName: string;
  public headerClassName: string;
  public contentClassName: string;
  constructor(
    @Inject(AntCollapseComponent) private parent: AntCollapseComponent
  ) {}
  ngOnInit() {
    this.parent.keySub.subscribe(key => {
      this.isActive = key === this.key;
      this.getClassName();
    });
  }
  ngOnChanges() {
    this.getClassName();
  }
  toggleItem() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.parent.setCurrentKey(this.key);
    }
    this.getClassName();
  }
  getClassName() {
    const { prefixCls, isActive, disabled, className } = this;
    this.itemClassName = classNames(`${prefixCls}-item`, className, {
      [`${prefixCls}-item-active`]: isActive,
      [`${prefixCls}-item-disabled`]: disabled
    });
    this.headerClassName = classNames(`${prefixCls}-header`, className);
    this.contentClassName = classNames(`${prefixCls}-content`, {
      [`${prefixCls}-content-active`]: isActive,
      [`${prefixCls}-content-inactive`]: !isActive
    });
  }
}
