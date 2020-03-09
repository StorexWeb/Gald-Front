import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RolesGuard} from '../../../../core/guards/roles.guird';
import {ListPracticesResolver} from '../../../../shared/resolvers/list-practices.resolver';
import {GQL} from '../../../../config/gql.config';
import {ReadyWaitingActivationComponent} from './pages/ready-waiting-activation/ready-waiting-activation.component';
import {ClientReadyRejectedComponent} from './pages/client-ready-rejected/client-ready-rejected.component';

const routes: Routes = [

    {
        path: 'waiting/activation', component: ReadyWaitingActivationComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'quotatore'], data_shape: GQL.RECEIVED_PRACTICE_PAGINATION, state: 'READY_WAITING_ACTIVATION'},
        resolve: {data: ListPracticesResolver}
    },
    {
        path: 'client/rejected', component: ClientReadyRejectedComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'quotatore'], data_shape: GQL.RECEIVED_PRACTICE_PAGINATION, state: 'CLIENT_READY_REJECT'},
        resolve: {data: ListPracticesResolver}
    },

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackOfficeLeasysRoutingModule { }
