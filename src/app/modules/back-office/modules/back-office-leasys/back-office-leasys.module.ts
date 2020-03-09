import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientReadyRejectedComponent} from './pages/client-ready-rejected/client-ready-rejected.component';
import {ReadyWaitingActivationComponent} from './pages/ready-waiting-activation/ready-waiting-activation.component';
import {BackOfficeLeasysRoutingModule} from './back-office-leasys-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material';
import {MaterialModule} from '../../../../material.module';
import {NgxUploaderModule} from 'ngx-uploader';
import {SharedModule} from '../../../../shared/shared.module';
import {FillColumn} from '../../../../services/FillColumn';
import {GenerateAction} from '../../../../services/GenerateAction';

@NgModule({
  declarations: [
    ClientReadyRejectedComponent,
    ReadyWaitingActivationComponent
  ],
  imports: [
    CommonModule,
    BackOfficeLeasysRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgxUploaderModule,
  ],
  providers: [
      FillColumn,
      GenerateAction
  ]
})
export class BackOfficeLeasysModule { }
