import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsultantEstimateRequestRoutingModule} from './consultant-estimate-request-routing.module';
import {AcceptedEstimatesComponent} from './pages/accepted-estimates/accepted-estimates.component';
import {ReceivedEstimatesComponent} from './pages/received-estimates/received-estimates.component';
import {RejectedRequestsComponent} from './pages/rejected-requests/rejected-requests.component';
import {SentRequestsComponent} from './pages/sent-requests/sent-requests.component';
import {RequestFormComponent} from './pages/request-form/request-form.component';
import {QuickRequestFormComponent} from './pages/quick-request-form/quick-request-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material';
import {MaterialModule} from '../../../../material.module';
import {NgxUploaderModule} from 'ngx-uploader';
import {SharedModule} from '../../../../shared/shared.module';
import {SentQuickRequestsComponent} from './pages/sent-quick-requests/sent-quick-requests.component';
import {GenerateAction} from '../../../../services/GenerateAction';
import {FillColumn} from '../../../../services/FillColumn';


@NgModule({
  declarations: [
      AcceptedEstimatesComponent,
      ReceivedEstimatesComponent,
      RejectedRequestsComponent,
      SentRequestsComponent,
      RequestFormComponent,
      QuickRequestFormComponent,
      SentQuickRequestsComponent,


  ],
  imports: [
    CommonModule,
    ConsultantEstimateRequestRoutingModule,
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
export class EstimateRequestModule { }
