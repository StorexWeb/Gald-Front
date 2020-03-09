import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PermissionListComponent} from './pages/permission-list/permission-list.component';


const routes: Routes = [
  {path: 'list', component: PermissionListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
