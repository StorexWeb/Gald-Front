import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListClientsComponent} from './pages/list-clients/list-clients.component';
import {ClientFormComponent} from './pages/client-form/client-form.component';
import {ClientsRoutingModule} from './clients-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {GetUserResolver} from '../../shared/resolvers/get-user.resolver';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPasswordToggleModule} from 'ngx-password-toggle';
import {FileDropModule} from 'ngx-file-drop';
import {NgxUploaderModule} from 'ngx-uploader';
import {RolesGuard} from '../../core/guards/roles.guird';
import {ClientActionsService} from './service/client-actions.service';
import {ListClientsResolver} from './resolvers/list-clients.resolver';
import {FillColumn} from '../../services/FillColumn';
import {GenerateAction} from '../../services/GenerateAction';

@NgModule({
  declarations: [
      ListClientsComponent,
      ClientFormComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPasswordToggleModule,
    NgxUploaderModule,
    FileDropModule,
  ],
  providers: [
      GetUserResolver,
      ClientActionsService,
      ListClientsResolver,
      GenerateAction,
      FillColumn
  ]
})
export class ClientsModule { }
