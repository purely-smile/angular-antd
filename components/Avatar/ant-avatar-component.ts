import { Component, Input, OnInit } from '@angular/core';
import classNames from 'classnames';
@Component({
  selector: 'ant-avatar',
  templateUrl: './ant-avatar.html',
  styleUrls: ['./ant-avatar.scss']
})
export class AntAvatarComponent implements OnInit {
  @Input() shape: 'square' | 'circle' = 'circle';
  @Input() size: 'large' | 'small' | 'default' = 'default';
  @Input() src: string;
  @Input() icon: string;
  @Input() prefixCls = 'ant-avatar';
  @Input() className: string;
  public scale = 1;
  public isImgExist = true;
  public avatarClassName = '';
  ngOnInit() {
    this.getavatarClassName();
  }
  handleImgLoadError() {
    this.isImgExist = false;
  }
  getavatarClassName() {
    const { prefixCls, className, size, shape, src, icon } = this;
    this.avatarClassName = classNames(prefixCls, className, {
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-image`]: src,
      [`${prefixCls}-icon`]: icon
    });
  }
}
