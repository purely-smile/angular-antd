import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChildren,
  ElementRef,
  AfterViewInit,
  QueryList
} from '@angular/core';
@Component({
  selector: 'base-tabs-nav',
  templateUrl: './ant-tabs-nav.html',
  styleUrls: ['./ant-tabs-nav.scss']
})
export class BaseTabsNavComponent implements OnInit, AfterViewInit {
  @Input() prefixCls = 'ant-tabs';
  @Input() navs: any[];
  @Input()
  set value(val) {
    this.tmpValue = val;
    this.valueChange.emit(val);
  }
  get value() {
    return this.tmpValue;
  }
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @ViewChildren('navEl') navEl: QueryList<any>;
  public tmpValue = 0;
  public inkBarStyle: {
    width: string;
    transform: string;
  };
  public childrenObj: ChildrenObj[] = [];
  changeTab(index) {
    const val = this.childrenObj[index];
    this.value = index;
    if (!val) {
      return;
    }
    this.inkBarStyle = {
      width: `${val.offsetWidth}px`,
      transform: `translate3d(${val.offsetLeft}px, 0px, 0px)`
    };
  }
  ngAfterViewInit() {
    this.childrenObj = this.navEl.map(val => {
      const { offsetLeft, offsetWidth } = val.nativeElement;
      return { offsetLeft, offsetWidth };
    });
    if (this.childrenObj.length > 0) {
      setTimeout(() => {
        this.changeTab(this.value);
      });
    }
  }
  ngOnInit() {}
}

interface ChildrenObj {
  offsetLeft: number;
  offsetWidth: number;
}
