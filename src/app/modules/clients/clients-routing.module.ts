import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GetUserResolver} from '../../shared/resolvers/get-user.resolver';
import {ClientFormComponent} from './pages/client-form/client-form.component';
import {ListClientsComponent} from './pages/list-clients/list-clients.component';
import {RolesGuard} from '../../core/guards/roles.guird';
import {ListClientsResolver} from './resolvers/list-clients.resolver';

const routes: Routes = [
    // create new client
    { path: 'new', component: ClientFormComponent},
    // edit client
    { path: 'edit/:id', component: ClientFormComponent, resolve: {data: GetUserResolver}},
    // list clients
    { path: 'list', component: ListClientsComponent, canActivate: [RolesGuard],
        data: {roles: ['superadmin', 'consultant']},
        resolve: {data: ListClientsResolver}},
    { path: 'list/:id', component: ListClientsComponent}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientsRoutingModule { }
