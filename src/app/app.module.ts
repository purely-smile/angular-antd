import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
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
  AntProgressComponent
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
    AntProgressComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
