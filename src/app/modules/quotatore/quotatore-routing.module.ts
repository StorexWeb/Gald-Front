import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: './modules/quotatore-practices/quotatore-practices.module#QuotatorePracticesModule'},
    {path: 'leasys', loadChildren: './modules/client-leasys/client-leasys.module#ClientLeasysModule'},
    {path: 'grestione', loadChildren: './modules/quotatore-grestione-rent/quotatore-grestione-rent.module#QuotatoreGrestioneRentModule'},

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuotatoreRoutingModule { }
