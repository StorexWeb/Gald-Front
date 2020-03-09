import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListUsersResolver} from './resolvers/list-users.resolver';
import {GetUserResolver} from '../../shared/resolvers/get-user.resolver';
import {ListUsersComponent} from './pages/list-users/list-users.component';
import {UserFormComponent} from './pages/user-form/user-form.component';

const routes: Routes = [
    // List users
    {path: 'list', component: ListUsersComponent, resolve: {data: ListUsersResolver}},
    // Create User
    {path: 'new', component: UserFormComponent },
    // Edit User
    {path: 'edit/:id', component: UserFormComponent, resolve: {data: GetUserResolver}},
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
