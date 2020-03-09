import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotatoreGrestioneRentRoutingModule } from './quotatore-grestione-rent-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../../../material.module';
import {MatDialogModule, MatNativeDateModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxUploaderModule} from 'ngx-uploader';
import {FillColumn} from '../../../../services/FillColumn';
import {GenerateAction} from '../../../../services/GenerateAction';
import { RentRifiutateComponent } from './pages/rent-rifiutate/rent-rifiutate.component';
import { RentLeaseolanComponent } from './pages/rent-leaseolan/rent-leaseolan.component';
import { RentArvalComponent } from './pages/rent-arval/rent-arval.component';
import { RentAtholonComponent } from './pages/rent-atholon/rent-atholon.component';
import { RentAldComponent } from './pages/rent-ald/rent-ald.component';
import { RentAcceptedComponent } from './pages/rent-accepted/rent-accepted.component';
import { AttachFileComponent } from './pages/attach-file/attach-file.component';
import {RentLeasysComponent} from './pages/rent-leasys/rent-leasys.component';


@NgModule({
  declarations: [RentRifiutateComponent, RentLeaseolanComponent, RentArvalComponent, RentAtholonComponent, RentAldComponent, RentAcceptedComponent, AttachFileComponent, RentLeasysComponent],
  imports: [
    CommonModule,
    QuotatoreGrestioneRentRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgxUploaderModule,
    MatDialogModule
  ],
  providers: [
    FillColumn,
    GenerateAction
  ],
  exports: [
    QuotatoreGrestioneRentRoutingModule
  ],
  entryComponents: [
    AttachFileComponent
  ]
})
export class QuotatoreGrestioneRentModule { }
