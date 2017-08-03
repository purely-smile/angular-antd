import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  OnDestroy
} from '@angular/core';
@Component({
  selector: 'base-align',
  templateUrl: './base-align.html',
  styleUrls: ['./base-align.scss']
})
export class BaseAlignComponent implements OnInit, OnChanges, OnDestroy {
  @Input() align;
  @Input() target = window;
  @Input() monitorBufferTime = 50;
  @Input() monitorWindowResize = false;
  @Input() disabled = false;
  @ViewChild('alignEl') alignEl: ElementRef;
  public bufferMonitor;
  public resizeHandler;
  ngOnInit() {
    const { disabled, monitorWindowResize } = this;
    this.forceAlign();
    if (!disabled && monitorWindowResize) {
      this.startMonitorWindowResize();
    }
  }
  ngOnChanges() {
    let reAlign = false;
    const { disabled, monitorWindowResize, align } = this;
    if (!disabled) {
      if (disabled) {
        reAlign = true;
      } else {
        if (align === window) {
          reAlign = false;
        } else {
          reAlign = true;
        }
      }
    }

    if (reAlign) {
      this.forceAlign();
    }

    if (monitorWindowResize && !disabled) {
      this.startMonitorWindowResize();
    } else {
      this.stopMonitorWindowResize();
    }
  }
  ngOnDestroy() {
    this.stopMonitorWindowResize();
  }
  startMonitorWindowResize() {
    if (!this.resizeHandler) {
      this.bufferMonitor = buffer(this.forceAlign, this.monitorBufferTime);
      this.resizeHandler = window.addEventListener(
        'resize',
        this.bufferMonitor
      );
    }
  }

  stopMonitorWindowResize() {
    if (this.resizeHandler) {
      this.bufferMonitor.clear();
      this.resizeHandler.remove();
      this.resizeHandler = null;
    }
  }

  forceAlign = () => {};
}

function buffer(fn, ms) {
  let timer;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function bufferFn() {
    clear();
    timer = setTimeout(fn, ms);
  }
  return Object.assign(bufferFn, clear);
}
