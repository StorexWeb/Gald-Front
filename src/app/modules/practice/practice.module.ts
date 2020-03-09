import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FileDropModule } from 'ngx-file-drop';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxUploaderModule } from 'ngx-uploader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { MatNativeDateModule, MatSnackBarModule } from '@angular/material';
import { SharedModule } from '../../shared/shared.module';
import {PracticeRoutingModule} from './practice-routing.module';
import {ViewPracticeComponent} from './pages/view-practice/view-practice.component';
import {GetPracticeResolver} from './resolver/get-practice.resilver';
import {MaterialModule} from '../../material.module';
import {ConsultantActionsService} from '../consultant/service/consultant-actions.service';

@NgModule({
  declarations: [
      ViewPracticeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PracticeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    FuseSharedModule,
    FileDropModule,
    HttpClientModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgxPasswordToggleModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
      GetPracticeResolver,
      ConsultantActionsService
  ]
})
export class PracticeModule { }
