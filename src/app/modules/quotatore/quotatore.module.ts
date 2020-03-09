import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuotatoreRoutingModule} from './quotatore-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {AttachEstimateResolver} from './resolvers/attach-estimate.resolver';
import {QuotatoreActionsService} from './service/quotatore-actions.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuotatoreRoutingModule,
  ],
  providers: [
    AttachEstimateResolver,
    QuotatoreActionsService
  ]
})
export class QuotatoreModule { }
