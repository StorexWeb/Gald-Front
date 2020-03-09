import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InsertedPracticesComponent} from './pages/inserted-practices/inserted-practices.component';
import {LoadedPracticesComponent} from './pages/loaded-practices/loaded-practices.component';
import {AcceptedLoadedComponent} from './pages/accepted-loaded/accepted-loaded.component';
import {RejectedLoadedComponent} from './pages/rejected-loaded/rejected-loaded.component';
import {ConditionalAcceptedLoadedComponent} from './pages/conditional-accepted-loaded/conditional-accepted-loaded.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material';
import {MaterialModule} from '../../../../material.module';
import {BackOfficeInternalPracticesRoutingModule} from './back-office-internal-practices-routing.module';
import {FillColumn} from '../../../../services/FillColumn';
import {GenerateAction} from '../../../../services/GenerateAction';
import { GestionePraticheComponent } from './pages/gestione-pratiche/gestione-pratiche.component';
import { PraticheConcluseComponent } from './pages/pratiche-concluse/pratiche-concluse.component';
import { GestisciFormComponent } from './pages/gestisci-form/gestisci-form.component';
import {GetPracticeResolver} from '../../../practice/resolver/get-practice.resilver';
import {GetPraticeResolver} from '../../../consultant/resolvers/get-pratice.resolver';
import {PracticeService} from '../../../../services/practice.service';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    InsertedPracticesComponent,
    LoadedPracticesComponent,
    AcceptedLoadedComponent,
    RejectedLoadedComponent,
    ConditionalAcceptedLoadedComponent,
    GestionePraticheComponent,
    PraticheConcluseComponent,
    GestisciFormComponent
  ],
  imports: [
    CommonModule,
    BackOfficeInternalPracticesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
  ],
  providers: [
      FillColumn,
      GenerateAction,
      GetPraticeResolver,
      FormBuilder,
      PracticeService,
      DatePipe
  ]
})
export class BackOfficeInternalPracticesModule { }
