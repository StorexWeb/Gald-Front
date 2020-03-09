import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsultantRoutingModule} from './consultant-routing.module';
import {GetPraticeResolver} from './resolvers/get-pratice.resolver';
import {ConsultantActionsService} from './service/consultant-actions.service';
import {DetailsShowWindowsComponent} from '../../shared/components/details-show-windows/details-show-windows.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ConsultantRoutingModule,
    SharedModule
  ],
  providers: [
    GetPraticeResolver,
    ConsultantActionsService,
  ],
  entryComponents: [
    DetailsShowWindowsComponent,
  ]
})
export class ConsultantModule { }
