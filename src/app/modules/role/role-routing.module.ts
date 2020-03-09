import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateRoleComponent} from './pages/create-role/create-role.component';
import {AssignRoleComponent} from './pages/assign-role/assign-role.component';
import {RoleListComponent} from './pages/role-list/role-list.component';

const routes: Routes = [
  {path: 'create', component: CreateRoleComponent},

  {path: 'assign', component: AssignRoleComponent},

  {path: 'list', component: RoleListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
