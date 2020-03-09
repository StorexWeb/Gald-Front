import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SharedModule} from '../../../../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material';
import {MaterialModule} from '../../../../material.module';
import {NgxUploaderModule} from 'ngx-uploader';
import {AttachEstimateComponent} from './pages/attach-estimate/attach-estimate.component';
import {PendingEstimatesComponent} from './pages/pending-estimates/pending-estimates.component';
import {PreventiveHistoryComponent} from './pages/preventive-history/preventive-history.component';
import {ReceivedQuickRequestsComponent} from './pages/received-quick-requests/received-quick-requests.component';
import {ReceivedRequestsComponent} from './pages/received-requests/received-requests.component';
import {RejectedRequestsComponent} from './pages/rejected-requests/rejected-requests.component';
import {QuotatorePracticesRoutingModule} from './quotatore-practices-routing.module';
import {FillColumn} from '../../../../services/FillColumn';
import {GenerateAction} from '../../../../services/GenerateAction';

@NgModule({
  declarations: [
      AttachEstimateComponent,
      PendingEstimatesComponent,
      PreventiveHistoryComponent,
      ReceivedQuickRequestsComponent,
      ReceivedRequestsComponent,
      RejectedRequestsComponent
  ],
  imports: [
    CommonModule,
    QuotatorePracticesRoutingModule,
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
export class QuotatorePracticesModule { }
