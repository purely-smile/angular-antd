import {
  Component,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  OnInit
} from '@angular/core';
import { MessageService, ModalService } from '../../services';
import { AntSwitchComponent } from '../../components/Switch';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private modalService: ModalService
  ) {}
  @ViewChild('modalContent') modalContent: ViewContainerRef;
  public spining = true;
  public spinSize;
  public inputValue = '';
  public tabValue = 0;
  public placements = [
    'top',
    'left',
    'right',
    'bottom',
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight',
    'leftTop',
    'leftBottom',
    'rightTop',
    'rightBottom'
  ];
  public inputStyle = {
    'margin-bottom': '10px'
  };
  public inputNumberValue = 1;
  public collapseAccordion = false;
  ngOnInit() {}
  showMessage() {
    this.messageService.add({
      type: 'success',
      content: 'test'
    });
  }
  showModal() {
    this.modalService
      .show({
        component: AntSwitchComponent,
        width: 600
      })
      .subscribe(n => console.log(n), err => console.log(err));
  }
  showConfirm() {
    this.modalService.confirm({
      title: '消息提示',
      content: '确认要退出登录吗？'
    });
  }
  showNotification(placement) {
    this.messageService.showNotification({
      type: 'success',
      placement,
      message: placement,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
    });
  }
  handleInputEnter(e) {
    console.log('input enter', e);
  }
  handleInputSearch(e) {
    console.log('input search', e);
  }
}
