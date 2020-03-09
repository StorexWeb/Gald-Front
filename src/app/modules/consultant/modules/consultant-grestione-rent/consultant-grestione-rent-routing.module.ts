import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RolesGuard} from '../../../../core/guards/roles.guird';
import {GQL} from '../../../../config/gql.config';
import {ListPracticesResolver} from '../../../../shared/resolvers/list-practices.resolver';
import {RentAldComponent} from './pages/rent-ald/rent-ald.component';
import {RentAtholonComponent} from './pages/rent-atholon/rent-atholon.component';
import {RentArvalComponent} from './pages/rent-arval/rent-arval.component';
import {RentLeaseolanComponent} from './pages/rent-leaseolan/rent-leaseolan.component';
import {RentRifiutateComponent} from './pages/rent-rifiutate/rent-rifiutate.component';
import {RentLeasysComponent} from './pages/rent-leasys/rent-leasys.component';
import {RentSentComponent} from './pages/rent-sent/rent-sent.component';
import {RentAcceptedComponent} from './pages/rent-accepted/rent-accepted.component';
import {RentCaricateComponent} from './pages/rent-caricate/rent-caricate.component';


const routes: Routes = [
  {
    path: 'rent-sent', component: RentSentComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'SVILUPPA_RENT', type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },
  {
    path: 'rent-ald', pathMatch: 'full'  ,component: RentAldComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'SVILUPPA_RENT_ACCEPTED', type: 'ANY'},
    resolve: {data: ListPracticesResolver}
  },
  {
    path: 'rent-atholon', component: RentAtholonComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'SVILUPPA_RENT_ACCEPTED', type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },
  {
    path: 'rent-arval', component: RentArvalComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'SVILUPPA_RENT_ACCEPTED', type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },
  {
    path: 'rent-leaseolan', component: RentLeaseolanComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'SVILUPPA_RENT_ACCEPTED', type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },
  {
    path: 'rent-rifiutate', component: RentRifiutateComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'SVILUPPA_RENT_REJECTED_BACK_OFFICE', type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },
  {
    path: 'rent-leasys', component: RentLeasysComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'SVILUPPA_RENT_ACCEPTED', type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },

  {
    path: 'rent-accepted', component: RentAcceptedComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'ACCEPTED_FROM_CONSULTANT', type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },

  {
    path: 'rent-caricate', component: RentCaricateComponent, canActivate: [RolesGuard],
    data: { roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'CARICA_RENT_CONSULTANT', type: 'ANY'},
    resolve: {data: ListPracticesResolver}, pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultantGrestioneRentRoutingModule { }
