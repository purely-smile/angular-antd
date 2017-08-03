import { Component } from '@angular/core';
import { MessageService } from '../../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private messageService: MessageService) {}
  showMessage() {
    this.messageService.add({
      type: 'success',
      content: 'test'
    });
  }
}
