import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RolesGuard} from '../../../../core/guards/roles.guird';
import {GQL} from '../../../../config/gql.config';
import {ListPracticesResolver} from '../../../../shared/resolvers/list-practices.resolver';
import {LoadedPracticesComponent} from './pages/loaded-practices/loaded-practices.component';
import {InsertedPracticesComponent} from './pages/inserted-practices/inserted-practices.component';
import {AcceptedLoadedComponent} from './pages/accepted-loaded/accepted-loaded.component';
import {GestionePraticheComponent} from './pages/gestione-pratiche/gestione-pratiche.component';
import {PraticheConcluseComponent} from './pages/pratiche-concluse/pratiche-concluse.component';
import {GetPraticeResolver} from '../../../consultant/resolvers/get-pratice.resolver';
import {GestisciFormComponent} from './pages/gestisci-form/gestisci-form.component';


const routes: Routes = [
    {
        path: 'list/inserted/practices', component: InsertedPracticesComponent, canActivate: [RolesGuard],
        data: { roles: ['superadmin', 'backoffice'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'READY_ESTIMATE', type: 'ANY'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'list/loaded/practices', component: LoadedPracticesComponent, canActivate: [RolesGuard],
        data: { roles: ['superadmin', 'backoffice'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'LOADED', type: 'ANY'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'list/accepted/loaded', component: AcceptedLoadedComponent, canActivate: [RolesGuard],
        data: { roles: ['superadmin', 'backoffice'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'LOADED_ACCEPT', type: 'ANY'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'list/rejected/loaded', component: AcceptedLoadedComponent, canActivate: [RolesGuard],
        data: { roles: ['superadmin', 'backoffice'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'LOADED_REJECT', type: 'ANY'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'list/conditional/accepted/loaded', component: AcceptedLoadedComponent, canActivate: [RolesGuard],
        data: { roles: ['superadmin', 'backoffice'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'LOADED_ACCEPT_WITH_CONDITION', type: 'ANY'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'list/gestione-pratiche', component: GestionePraticheComponent, canActivate: [RolesGuard],
        data: { roles: ['superadmin', 'backoffice'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'GESTISCI_BACK_OFFICE', type: 'ANY'},
        resolve: {data: ListPracticesResolver}
    },

    {
        path: 'list/pratiche-concluse', component: PraticheConcluseComponent, canActivate: [RolesGuard],
        data: { roles: ['superadmin', 'backoffice'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'PRATICH_CONCLUSE', type: 'ANY'},
        resolve: {data: ListPracticesResolver}
    },

    {
        path: 'gestisci-form/:id/:from', component: GestisciFormComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant'], status: 'GESTISCI_BACK_OFFICE'}, resolve: {data: GetPraticeResolver},
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackOfficeInternalPracticesRoutingModule { }
