import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: './modules/back-office-internal-practices/back-office-internal-practices.module#BackOfficeInternalPracticesModule'},
    {path: 'leasys', loadChildren: './modules/back-office-leasys/back-office-leasys.module#BackOfficeLeasysModule'},
    {path: 'practice', loadChildren: './modules/back-office-practices/back-office-practices.module#BackOfficePracticesModule'},
    {path: 'grestione', loadChildren: './modules/back-office-grestione-rent/back-office-grestione-rent.module#BackOfficeGrestioneRentModule'}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
