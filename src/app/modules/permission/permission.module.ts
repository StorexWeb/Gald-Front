import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { PermissionListComponent } from './pages/permission-list/permission-list.component';
import {MatBadgeModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatListModule, MatTableModule, MatTreeModule} from '@angular/material';
import {SharedModule} from '../../shared/shared.module';
import {FlexModule} from '@angular/flex-layout';

@NgModule({
  declarations: [PermissionListComponent],
    imports: [
        CommonModule,
        PermissionRoutingModule,
        MatFormFieldModule,
        SharedModule,
        MatIconModule,
        MatTableModule,
        FlexModule,
        MatListModule,
        MatTreeModule,
        MatCheckboxModule,
        MatButtonModule,
        MatBadgeModule
    ]
})
export class PermissionModule { }
