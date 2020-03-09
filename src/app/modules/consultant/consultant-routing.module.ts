import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: './modules/estimate-request/estimate-request.module#EstimateRequestModule'},
    {path: 'practice', loadChildren: './modules/consultant-practices/consultant-practices.module#ConsultantPracticesModule'},
    {path: 'grestione', loadChildren: './modules/consultant-grestione-rent/consultant-grestione-rent.module#ConsultantGrestioneRentModule'}
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsultantRoutingModule { }
