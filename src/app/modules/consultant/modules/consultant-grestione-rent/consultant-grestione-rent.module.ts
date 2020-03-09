import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultantGrestioneRentRoutingModule } from './consultant-grestione-rent-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../../../material.module';
import {MatNativeDateModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxUploaderModule} from 'ngx-uploader';
import {GenerateAction} from '../../../../services/GenerateAction';
import {FillColumn} from '../../../../services/FillColumn';
import { RentAldComponent } from './pages/rent-ald/rent-ald.component';
import { RentAtholonComponent } from './pages/rent-atholon/rent-atholon.component';
import { RentArvalComponent } from './pages/rent-arval/rent-arval.component';
import { RentLeaseolanComponent } from './pages/rent-leaseolan/rent-leaseolan.component';
import { RentRifiutateComponent } from './pages/rent-rifiutate/rent-rifiutate.component';
import { RentLeasysComponent } from './pages/rent-leasys/rent-leasys.component';
import { RentSentComponent } from './pages/rent-sent/rent-sent.component';
import { RentAcceptedComponent } from './pages/rent-accepted/rent-accepted.component';
import { RentCaricateComponent } from './pages/rent-caricate/rent-caricate.component';

@NgModule({
  declarations: [RentAldComponent, RentAtholonComponent, RentArvalComponent, RentLeaseolanComponent, RentRifiutateComponent, RentLeasysComponent, RentSentComponent, RentAcceptedComponent, RentCaricateComponent],
  imports: [
    CommonModule,
    ConsultantGrestioneRentRoutingModule,
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
  ],
  exports: [
    ConsultantGrestioneRentRoutingModule
  ]
})
export class ConsultantGrestioneRentModule { }
