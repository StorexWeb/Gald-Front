import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {FuseSharedModule} from '../../@fuse/shared.module';
import {MaterialModule} from '../material.module';
import {DetailsComponent} from './components/details/details.component';
import {ListComponent} from './components/list/list.component';
import {FileinputComponent} from './components/fileinput/fileinput.component';
import {ActionsComponent} from './components/actions/actions.component';
import {DetailsShowWindowsComponent} from './components/details-show-windows/details-show-windows.component';
import {NgxUploaderModule} from 'ngx-uploader';
import {FileDropModule} from 'ngx-file-drop';
import { ListForUserComponent } from './components/list-for-user/list-for-user.component';

@NgModule({
  declarations: [
    DetailsComponent,
    ListComponent,
    FileinputComponent,
    ActionsComponent,
    DetailsShowWindowsComponent,
    ListForUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    MatSnackBarModule,
    FuseSharedModule,
    FileDropModule,
    // BrowserModule,
    // FlexLayoutModule,
    NgxUploaderModule
  ],
  exports: [
    DetailsComponent,
    ListComponent,
    FileinputComponent,
    ActionsComponent,
    DetailsShowWindowsComponent
  ]
})
export class SharedModule { }
