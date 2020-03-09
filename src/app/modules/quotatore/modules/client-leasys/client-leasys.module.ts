import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../../shared/shared.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatNativeDateModule} from '@angular/material';
import {MaterialModule} from '../../../../material.module';
import {QuotatoreCleintLeasysRoutingModule} from './quotatore-cleint-leasys-routing.module';
import {WaitingActivationComponent} from './pages/waiting-activation/waiting-activation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxUploaderModule} from 'ngx-uploader';
import {ClientRejectedComponent} from './pages/client-rejected/client-rejected.component';
import {FillColumn} from '../../../../services/FillColumn';
import {GenerateAction} from '../../../../services/GenerateAction';

@NgModule({
  declarations: [
      WaitingActivationComponent,
      ClientRejectedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuotatoreCleintLeasysRoutingModule,
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
export class ClientLeasysModule { }
