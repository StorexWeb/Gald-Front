import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UserFormComponent} from './pages/user-form/user-form.component';
import {ListUsersComponent} from './pages/list-users/list-users.component';
import {ListUsersResolver} from './resolvers/list-users.resolver';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPasswordToggleModule} from 'ngx-password-toggle';
import {NgxUploaderModule} from 'ngx-uploader';
import {FileDropModule} from 'ngx-file-drop';
import {SharedModule} from '../../shared/shared.module';
import {GetUserResolver} from '../../shared/resolvers/get-user.resolver';
import {MaterialModule} from '../../material.module';
import {UserActionsService} from './service/user-actions.service';
import {FillColumn} from '../../services/FillColumn';
import {GenerateAction} from '../../services/GenerateAction';

@NgModule({
  declarations: [
    UserFormComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPasswordToggleModule,
    NgxUploaderModule,
    FileDropModule,
  ],
  providers: [
      ListUsersResolver,
      GetUserResolver,
      UserActionsService,
      FillColumn,
      GenerateAction
  ]
})
export class UsersModule { }
