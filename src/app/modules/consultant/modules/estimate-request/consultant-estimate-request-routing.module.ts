import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AcceptedEstimatesComponent} from './pages/accepted-estimates/accepted-estimates.component';
import {ReceivedEstimatesComponent} from './pages/received-estimates/received-estimates.component';
import {RolesGuard} from '../../../../core/guards/roles.guird';
import {RejectedRequestsComponent} from './pages/rejected-requests/rejected-requests.component';
import {SentRequestsComponent} from './pages/sent-requests/sent-requests.component';
import {RequestFormComponent} from './pages/request-form/request-form.component';
import {ListPracticesResolver} from '../../../../shared/resolvers/list-practices.resolver';
import {QuickRequestFormComponent} from './pages/quick-request-form/quick-request-form.component';
import {SentQuickRequestsComponent} from './pages/sent-quick-requests/sent-quick-requests.component';
import {GQL} from '../../../../config/gql.config';
import {GetPraticeResolver} from '../../resolvers/get-pratice.resolver';

const routes: Routes = [
    {
        path: 'estimates/accepted', component: AcceptedEstimatesComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant'], data_shape: GQL.ACCEPTED_ESTIMATE_PAGINATION, state: 'ESTIMATE_ACCEPTED'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'estimates/received', component: ReceivedEstimatesComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'ESTIMATE'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'requests/sent', component: SentRequestsComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'NEW'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'request/new', component: RequestFormComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant']}
    },
    {
        path: 'quick/request/new', component: QuickRequestFormComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant']}
    },
    {
        path: 'request/edit/:id/:from', component: RequestFormComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant'], status: 'NEW'}, resolve: {data: GetPraticeResolver},
    },
    {
        path: 'requests/rejected', component: RejectedRequestsComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant'],
            data_shape: GQL.SENT_PRACTICE_PAGINATION,
            state: ['REQUEST_REJECTED', 'CLIENT_REJECT', 'ESTIMATE_REJECTED', 'CLIENT_READY_REJECT']},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'quick/requests/sent', component: SentQuickRequestsComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'NEW', type: 'QUICK'},
        resolve: {data: ListPracticesResolver}
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsultantEstimateRequestRoutingModule { }
