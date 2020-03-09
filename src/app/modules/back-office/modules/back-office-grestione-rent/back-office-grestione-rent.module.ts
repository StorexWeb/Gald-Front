import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeGrestioneRentRoutingModule } from './back-office-grestione-rent-routing.module';
import { RentAldComponent } from './pages/rent-ald/rent-ald.component';
import {SharedModule} from '../../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../../../material.module';
import {MatNativeDateModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxUploaderModule} from 'ngx-uploader';
import {GenerateAction} from '../../../../services/GenerateAction';
import {FillColumn} from '../../../../services/FillColumn';
import { RentAtholonComponent } from './pages/rent-atholon/rent-atholon.component';
import { RentArvalComponent } from './pages/rent-arval/rent-arval.component';
import { RentLeaseolanComponent } from './pages/rent-leaseolan/rent-leaseolan.component';
import { RentRifiutateComponent } from './pages/rent-rifiutate/rent-rifiutate.component';

@NgModule({
  declarations: [RentAldComponent, RentAtholonComponent, RentArvalComponent, RentLeaseolanComponent, RentRifiutateComponent],
  imports: [
    CommonModule,
    BackOfficeGrestioneRentRoutingModule,
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
export class BackOfficeGrestioneRentModule { }
