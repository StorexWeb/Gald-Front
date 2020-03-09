import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RolesGuard} from '../../../../core/guards/roles.guird';
import {ListPracticesResolver} from '../../../../shared/resolvers/list-practices.resolver';
import {GQL} from '../../../../config/gql.config';
import {RejectedEstimatesComponent} from './pages/rejected-estimates/rejected-estimates.component';
import {ApprovedEstimatesComponent} from './pages/approved-estimates/approved-estimates.component';
import {ConditionalApprovedEstimatesComponent} from './pages/received-estimates/conditional-approved-estimates.component';
import {TrashedLoadedEstimatesComponent} from './pages/trashed-loaded-estimates/trashed-loaded-estimates.component';
import {WaitingApproveComponent} from './pages/waiting-approve/waiting-approve.component';

const routes: Routes = [
    {
        path: 'estimates/approved', component: ApprovedEstimatesComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant'], data_shape: GQL.ACCEPTED_ESTIMATE_PAGINATION, state: 'LOADED_ACCEPT', type: 'ANY'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'estimates/conditional-approved', component: ConditionalApprovedEstimatesComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'LOADED_ACCEPT_WITH_CONDITION', type: 'ANY'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'estimates/rejected', component: RejectedEstimatesComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'LOADED_REJECT', type: 'ANY'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'estimates/trashed', component: TrashedLoadedEstimatesComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'LOADED_TRASHED', type: 'ANY'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'waiting/approve', component: WaitingApproveComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant'], data_shape: GQL.SENT_PRACTICE_PAGINATION, state: 'READY_ESTIMATE', type: 'ANY'},
        resolve: {data: ListPracticesResolver}
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackOfficePracticesRoutingModule { }
