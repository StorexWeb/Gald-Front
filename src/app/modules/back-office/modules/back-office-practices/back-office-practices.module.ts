import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RejectedEstimatesComponent} from './pages/rejected-estimates/rejected-estimates.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SharedModule} from '../../../../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material';
import {MaterialModule} from '../../../../material.module';
import {NgxUploaderModule} from 'ngx-uploader';
import {BackOfficePracticesRoutingModule} from './back-office-practices-routing.module';
import {ApprovedEstimatesComponent} from './pages/approved-estimates/approved-estimates.component';
import {ConditionalApprovedEstimatesComponent} from './pages/received-estimates/conditional-approved-estimates.component';
import {TrashedLoadedEstimatesComponent} from './pages/trashed-loaded-estimates/trashed-loaded-estimates.component';
import {WaitingApproveComponent} from './pages/waiting-approve/waiting-approve.component';
import {GenerateAction} from '../../../../services/GenerateAction';
import {FillColumn} from '../../../../services/FillColumn';

@NgModule({
  declarations: [
    ApprovedEstimatesComponent,
    ConditionalApprovedEstimatesComponent,
    RejectedEstimatesComponent,
    TrashedLoadedEstimatesComponent,
    WaitingApproveComponent
  ],
  imports: [
    CommonModule,
    BackOfficePracticesRoutingModule,
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
      GenerateAction,
      FillColumn
  ]
})
export class BackOfficePracticesModule { }
