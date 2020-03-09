import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleListRoutingModule } from './single-list-routing.module';
import { SingleComponent } from './single/single.component';
import {SharedModule} from '../../shared/shared.module';
import {QuotatoreCleintLeasysRoutingModule} from '../quotatore/modules/client-leasys/quotatore-cleint-leasys-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../material.module';
import {MatNativeDateModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxUploaderModule} from 'ngx-uploader';
import {FillColumn} from '../../services/FillColumn';
import {GenerateAction} from '../../services/GenerateAction';
import {FlexModule} from '@angular/flex-layout/typings/esm5/flex';
import {ComponentFactory} from '../../component-generator/ComponentFactory';
import {ComponentGenerator} from '../../component-generator/ComponentGenerator';

@NgModule({
  declarations: [SingleComponent],
  imports: [
    CommonModule,
    SharedModule,
    SingleListRoutingModule,
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
    GenerateAction,
    ComponentFactory,
  ]
})
export class SingleListModule { }
