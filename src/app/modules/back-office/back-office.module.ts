import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackOfficeRoutingModule} from './back-office-routing.module';
import {MaterialModule} from '../../material.module';
import {MatNativeDateModule} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BackOfficeActionsService} from './service/back-office-actions.service';
import {GetPraticeResolver} from '../consultant/resolvers/get-pratice.resolver';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
  ],
  providers: [
      BackOfficeActionsService,
      GetPraticeResolver
  ]
})
export class BackOfficeModule { }
