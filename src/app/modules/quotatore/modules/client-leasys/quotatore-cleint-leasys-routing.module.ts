import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RolesGuard} from '../../../../core/guards/roles.guird';
import {ListPracticesResolver} from '../../../../shared/resolvers/list-practices.resolver';
import {GQL} from '../../../../config/gql.config';
import {WaitingActivationComponent} from './pages/waiting-activation/waiting-activation.component';
import {ClientRejectedComponent} from './pages/client-rejected/client-rejected.component';

const routes: Routes = [

    {
        path: 'waiting/activation', component: WaitingActivationComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'quotatore'], data_shape: GQL.RECEIVED_PRACTICE_PAGINATION, state: 'ACCEPTED_WAIT_ACTIVATION'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'client/rejected', component: ClientRejectedComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'quotatore'], data_shape: GQL.RECEIVED_PRACTICE_PAGINATION, state: 'CLIENT_REJECT'},
        resolve: {data: ListPracticesResolver}
    },

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuotatoreCleintLeasysRoutingModule { }
