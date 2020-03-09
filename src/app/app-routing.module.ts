import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './core/pages/login/login.component';
import {PanelDashboardComponent} from './core/pages/panel-dashboard/panel-dashboard.component';
import {AuthGuard} from './core/guards/auth.guard';
import {RolesGuard} from './core/guards/roles.guird';
import {E404Component} from './core/pages/e404/e404.component';
import {E403Component} from './core/pages/e403/e403.component';
import {ProfileComponent} from './core/pages/profile/profile.component';

const routes: Routes = [
    {path: '', component: PanelDashboardComponent, canActivate: [AuthGuard]},
    {
        path: 'users', loadChildren: './modules/users/users.module#UsersModule',
        // canActivate: [RolesGuard], data: {roles: ['superadmin']}
    },
    {path: 'clients', loadChildren: './modules/clients/clients.module#ClientsModule'},
    {path: 'consultant', loadChildren: './modules/consultant/consultant.module#ConsultantModule'},
    {path: 'quotatore', loadChildren: './modules/quotatore/quotatore.module#QuotatoreModule'},
    {path: 'practice', loadChildren: './modules/practice/practice.module#PracticeModule'},
    {path: 'backoffice', loadChildren: './modules/back-office/back-office.module#BackOfficeModule'},
    {path: 'list', loadChildren: './modules/single-list/single-list.module#SingleListModule'},
    {path: 'role', loadChildren: './modules/role/role.module#RoleModule'},
    {path: 'permissions', loadChildren: './modules/permission/permission.module#PermissionModule'},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: '404', component: E404Component},
    {path: '403', component: E403Component},
    {path: '**', redirectTo: '/404'}

];

@NgModule({
    imports: [RouterModule.forRoot(routes,
        { useHash: true })],
    exports: [RouterModule]
})


export class AppRoutingModule { }

