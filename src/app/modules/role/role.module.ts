import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { CreateRoleComponent } from './pages/create-role/create-role.component';
import { AssignRoleComponent } from './pages/assign-role/assign-role.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import {FormsModule} from '@angular/forms';
import {MatIconModule, MatInputModule, MatSelectModule, MatStepperModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [CreateRoleComponent, AssignRoleComponent, RoleListComponent],
    imports: [
        CommonModule,
        RoleRoutingModule,
        FormsModule,
        MatSelectModule,
        MatIconModule,
        MatStepperModule,
        MatInputModule,
        FlexLayoutModule
    ]
})
export class RoleModule {}
