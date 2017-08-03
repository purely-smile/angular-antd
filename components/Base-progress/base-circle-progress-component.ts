import { Component, Input, OnInit, OnChanges } from '@angular/core';
@Component({
  selector: 'base-circle-progress',
  templateUrl: './base-circle-progress.html',
  styleUrls: ['./base-circle-progress.scss']
})
export class BaseCircleProgressComponent implements OnInit, OnChanges {
  @Input() className = '';
  @Input() percent = 0;
  @Input() prefixCls = 'ant-progress';
  @Input() strokeColor = '#2db7f5';
  @Input() strokeLinecap: 'butt' | 'round' | 'square' = 'round';
  @Input() strokeWidth = 1;
  @Input() trailColor = '#d9d9d9';
  @Input() trailWidth = 1;
  @Input() gapDegree = 0;
  @Input() gapPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  public pathString;
  public trailPathStyle;
  public strokePathStyle;
  ngOnInit() {}
  ngOnChanges() {
    this.getPathStyles();
    console.log('run here');
  }
  getPathStyles() {
    const { percent, strokeWidth, gapDegree = 0, gapPosition } = this;
    const radius = 50 - strokeWidth / 2;
    let beginPositionX = 0;
    let beginPositionY = -radius;
    let endPositionX = 0;
    let endPositionY = -2 * radius;
    switch (gapPosition) {
      case 'left':
        beginPositionX = -radius;
        beginPositionY = 0;
        endPositionX = 2 * radius;
        endPositionY = 0;
        break;
      case 'right':
        beginPositionX = radius;
        beginPositionY = 0;
        endPositionX = -2 * radius;
        endPositionY = 0;
        break;
      case 'bottom':
        beginPositionY = radius;
        endPositionY = 2 * radius;
        break;
      default:
    }
    const pathString = (this.pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
     a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
     a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`);
    const len = Math.PI * 2 * radius;
    const trailPathStyle = (this.trailPathStyle = {
      strokeDasharray: `${len - gapDegree}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2}px`,
      transition:
        'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
    });
    const strokePathStyle = (this.strokePathStyle = {
      strokeDasharray: `${percent / 100 * (len - gapDegree)}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2}px`,
      transition:
        'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
    });
  }
}
