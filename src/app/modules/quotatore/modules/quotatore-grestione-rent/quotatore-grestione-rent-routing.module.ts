import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RolesGuard} from '../../../../core/guards/roles.guird';
import {GQL} from '../../../../config/gql.config';
import {ListPracticesResolver} from '../../../../shared/resolvers/list-practices.resolver';
import {RentRifiutateComponent} from './pages/rent-rifiutate/rent-rifiutate.component';
import {RentLeaseolanComponent} from './pages/rent-leaseolan/rent-leaseolan.component';
import {RentArvalComponent} from './pages/rent-arval/rent-arval.component';
import {RentAtholonComponent} from './pages/rent-atholon/rent-atholon.component';
import {RentAldComponent} from './pages/rent-ald/rent-ald.component';
import {RentAcceptedComponent} from './pages/rent-accepted/rent-accepted.component';
import {AttachFileComponent} from './pages/attach-file/attach-file.component';
import {AttachEstimateComponent} from '../quotatore-practices/pages/attach-estimate/attach-estimate.component';
import {AttachEstimateResolver} from '../../resolvers/attach-estimate.resolver';
import {RentLeasysComponent} from './pages/rent-leasys/rent-leasys.component';

const routes: Routes = [
  {
    path: 'rent-ald', pathMatch: 'full'  ,component: RentAldComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'quotatore'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: ['SVILUPPA_RENT', 'SVILUPPA_RENT_ACCEPTED'], type: 'ANY'},
    resolve: {data: ListPracticesResolver}
  },
  {
    path: 'rent-atholon', component: RentAtholonComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'quotatore'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: ['SVILUPPA_RENT', 'SVILUPPA_RENT_ACCEPTED'], type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },
  {
    path: 'rent-arval', component: RentArvalComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'quotatore'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: ['SVILUPPA_RENT', 'SVILUPPA_RENT_ACCEPTED'], type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },
  {
    path: 'rent-leaseolan', component: RentLeaseolanComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'quotatore'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: ['SVILUPPA_RENT', 'SVILUPPA_RENT_ACCEPTED'], type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },

  {
    path: 'rent-leasys', component: RentLeasysComponent, canActivate: [RolesGuard],
      data: { roles: ['superadmin', 'quotatore'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: ['SVILUPPA_RENT', 'SVILUPPA_RENT_ACCEPTED'], type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },

  {
    path: 'rent-rifiutate', component: RentRifiutateComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'quotatore'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'SVILUPPA_RENT_REJECTED', type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },
  {
    path: 'rent-accepted', component: RentAcceptedComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'quotatore'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'SVILUPPA_RENT_ACCEPTED', type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },

  {
    path: 'add/offer/:id', component: AttachFileComponent, canActivate: [RolesGuard],
    data: {roles: ['superadmin', 'quotatore']}, resolve: {data: AttachEstimateResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotatoreGrestioneRentRoutingModule { }
