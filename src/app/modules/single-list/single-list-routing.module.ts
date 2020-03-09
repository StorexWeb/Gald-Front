import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SingleComponent} from './single/single.component';
import {WaitingActivationComponent} from '../quotatore/modules/client-leasys/pages/waiting-activation/waiting-activation.component';
import {RolesGuard} from '../../core/guards/roles.guird';
import {GQL} from '../../config/gql.config';
import {ListPracticesResolver} from '../../shared/resolvers/list-practices.resolver';
import {ClientRejectedComponent} from '../quotatore/modules/client-leasys/pages/client-rejected/client-rejected.component';

const routes: Routes = [

    // ------------------------------------------Consultant-----------------------------------------------------------------------

  {
    path: 'consultant/requests/sent', component: SingleComponent, canActivate: [RolesGuard],
    data: {roles: ['consultant', 'superadmin'], data_shape: GQL.RECEIVED_PRACTICE_PAGINATION, state: 'NEW'},
    resolve: {data: ListPracticesResolver}
  },


    // ------------------------------------------Quotatore-----------------------------------------------------------------------
  {
    path: 'quotatore/leasys/waiting/activation', component: SingleComponent, canActivate: [RolesGuard],
    data: {roles: ['superadmin', 'quotatore'], data_shape: GQL.RECEIVED_PRACTICE_PAGINATION, state: 'ACCEPTED_WAIT_ACTIVATION'},
    resolve: {data: ListPracticesResolver}
  },

  {
    path: 'quotatore/leasys/client/rejected', component: SingleComponent, canActivate: [RolesGuard],
    data: {roles: ['superadmin', 'quotatore'], data_shape: GQL.RECEIVED_PRACTICE_PAGINATION, state: 'CLIENT_REJECT'},
    resolve: {data: ListPracticesResolver}
  },

  // -----------------------------------------------BackOffice-----------------------------------------------------------------------

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SingleListRoutingModule {
}
