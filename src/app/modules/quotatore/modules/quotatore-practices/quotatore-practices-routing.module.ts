import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RolesGuard} from '../../../../core/guards/roles.guird';
import {ReceivedRequestsComponent} from './pages/received-requests/received-requests.component';
import {AttachEstimateComponent} from './pages/attach-estimate/attach-estimate.component';
import {AttachEstimateResolver} from '../../resolvers/attach-estimate.resolver';
import {PendingEstimatesComponent} from './pages/pending-estimates/pending-estimates.component';
import {ListPracticesResolver} from '../../../../shared/resolvers/list-practices.resolver';
import {ReceivedQuickRequestsComponent} from './pages/received-quick-requests/received-quick-requests.component';
import {GQL} from '../../../../config/gql.config';

const routes: Routes = [

    {
        path: 'received/requests', component: ReceivedRequestsComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'quotatore'], data_shape: GQL.RECEIVED_PRACTICE_PAGINATION, state: 'NEW'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'received/quick/requests', component: ReceivedQuickRequestsComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'quotatore'], data_shape: GQL.RECEIVED_PRACTICE_PAGINATION, state: 'NEW', type: 'QUICK'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'attach/estimate/:id/:from', component: AttachEstimateComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'quotatore']}, resolve: {data: AttachEstimateResolver}
    },
    {
        path: 'estimates/pending', component: PendingEstimatesComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'quotatore'], data_shape: GQL.RECEIVED_PRACTICE_PAGINATION, state: 'ESTIMATE'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'rejected/requests', component: PendingEstimatesComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'quotatore'], data_shape: GQL.RECEIVED_PRACTICE_PAGINATION, state: 'REQUEST_REJECTED'},
        resolve: {data: ListPracticesResolver}
    },


];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuotatorePracticesRoutingModule {}
