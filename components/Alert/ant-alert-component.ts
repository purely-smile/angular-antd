import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'ant-alert',
  templateUrl: './ant-alert.html',
  styleUrls: ['./ant-alert.scss']
})
export class AntAlertComponent implements OnInit {
  @Input() type: 'success' | 'info' | 'warning' | 'error' = 'info';
  @Input() closable = false;
  @Input() closeText: string;
  @Input() showIcon = true;
  @Input() prefixCls = 'ant-alert';
  @Input() banner: boolean;
  @Input() className = '';
  @ViewChild('messageEl') messageEl: ElementRef;
  @ViewChild('descEl') descEl: ElementRef;
  public alertClassName = '';
  public iconType = '';
  private iconTypesObj = {
    success: 'check-circle',
    info: 'info-circle',
    error: 'cross-circle',
    warning: 'exclamation-circle'
  };
  ngOnInit() {
    const { type, iconTypesObj } = this;
    this.getAlertClassName();
    this.iconType = iconTypesObj[type] || 'default';
  }
  getAlertClassName() {
    const { type, showIcon, banner, className, prefixCls } = this;
    const descChiledLength = this.descEl.nativeElement.children.length;
    this.alertClassName = classNames(
      prefixCls,
      className,
      `${prefixCls}-${type}`,
      {
        [`${prefixCls}-with-description`]: descChiledLength > 0,
        [`${prefixCls}-no-icon`]: !showIcon,
        [`${prefixCls}-banner`]: banner
      }
    );
  }
}
