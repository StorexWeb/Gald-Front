import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RolesGuard} from '../../../../core/guards/roles.guird';
import {GQL} from '../../../../config/gql.config';
import {ListPracticesResolver} from '../../../../shared/resolvers/list-practices.resolver';
import {RentAldComponent} from './pages/rent-ald/rent-ald.component';
import {RentAtholonComponent} from './pages/rent-atholon/rent-atholon.component';
import {RentArvalComponent} from './pages/rent-arval/rent-arval.component';
import {RentRifiutateComponent} from './pages/rent-rifiutate/rent-rifiutate.component';
import {RentLeaseolanComponent} from './pages/rent-leaseolan/rent-leaseolan.component';

const routes: Routes = [
  {
    path: 'carica-rent', component: RentAldComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'backoffice'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'CARICA_RENT_CONSULTANT', type: 'ANY'},
    resolve: {data: ListPracticesResolver}
  },
  {
    path: 'caricate', component: RentAtholonComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'backoffice'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'CARICA_RENT_BACK_OFFICE', type: 'ANY'},
    resolve: {data: ListPracticesResolver}
  },
  {
    path: 'rifiutate', component: RentArvalComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'backoffice'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'SVILUPPA_RENT_REJECTED_BACK_OFFICE', type: 'ANY'},
    resolve: {data: ListPracticesResolver}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeGrestioneRentRoutingModule { }
