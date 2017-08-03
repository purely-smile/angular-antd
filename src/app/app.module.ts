import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { AppComponent } from './app.component';
import { TooltipDirective, NotificationDirective } from '../../directives';
import { MessageService } from '../../services';
import {
  IconComponent,
  ButtonComponent,
  AntStarComponent,
  AntRateComponent,
  AntSwitchComponent,
  AntStepComponent,
  AntStepsComponent,
  BaseCheckboxComponent,
  AntRadioComponent,
  AntCheckboxComponent,
  AntAvatarComponent,
  AntAlertComponent,
  BaseLineProgressComponent,
  BaseCircleProgressComponent,
  AntProgressComponent,
  AntBreadcrumbItemComponent,
  AntBreadcrumbComponent,
  AntAffixComponent,
  BaseMenuItemComponent,
  BaseAlignComponent,
  BasePopupComponent,
  BaseTriggerComponent,
  AntTooltipComponent,
  AntTooltipWrapComponent,
  BaseNoticeComponent,
  NotificationWrapComponent
} from '../../components';

@NgModule({
  declarations: [
    AppComponent,
    IconComponent,
    ButtonComponent,
    AntStarComponent,
    AntRateComponent,
    AntSwitchComponent,
    AntStepComponent,
    AntStepsComponent,
    BaseCheckboxComponent,
    AntRadioComponent,
    AntCheckboxComponent,
    AntAvatarComponent,
    AntAlertComponent,
    BaseLineProgressComponent,
    BaseCircleProgressComponent,
    AntProgressComponent,
    AntBreadcrumbItemComponent,
    AntBreadcrumbComponent,
    AntAffixComponent,
    BaseMenuItemComponent,
    BaseAlignComponent,
    BasePopupComponent,
    BaseTriggerComponent,
    AntTooltipComponent,
    TooltipDirective,
    AntTooltipWrapComponent,
    BaseNoticeComponent,
    NotificationDirective,
    NotificationWrapComponent
  ],
  imports: [BrowserModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
  entryComponents: [BaseNoticeComponent]
})
export class AppModule {}
