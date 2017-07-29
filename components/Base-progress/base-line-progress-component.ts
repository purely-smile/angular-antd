import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'base-line-progress',
  templateUrl: './base-line-progress.html',
  styleUrls: ['./base-line-progress.scss']
})
export class BaseLineProgressComponent implements OnInit {
  @Input() className = '';
  @Input() percent = 0;
  @Input() prefixCls = 'ant-progress';
  @Input() strokeColor = '#2db7f5';
  @Input() strokeLinecap: 'butt' | 'round' | 'square' = 'round';
  @Input() strokeWidth = 1;
  @Input() trailColor = '#d9d9d9';
  @Input() trailWidth = 1;
  public pathStyle;
  public center = 0;
  public right = 0;
  public pathString;
  public viewBoxString;
  ngOnInit() {
    this.getBaseData();
  }
  getBaseData() {
    const { percent, strokeWidth, strokeLinecap } = this;
    const center = (this.center = this.strokeWidth / 2);
    const right = (this.right = 100 - this.center);
    this.pathString = `M ${strokeLinecap === 'round' ? center : 0},${center}
           L ${strokeLinecap === 'round' ? right : 100},${center}`;
    this.viewBoxString = `0 0 100 ${strokeWidth}`;
    this.pathStyle = {
      strokeDasharray: '100px, 100px',
      strokeDashoffset: `${100 - percent}px`,
      transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s linear'
    };
  }
}
