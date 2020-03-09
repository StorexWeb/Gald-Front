import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RolesGuard} from '../../core/guards/roles.guird';
import {ViewPracticeComponent} from './pages/view-practice/view-practice.component';
import {GetPracticeResolver} from './resolver/get-practice.resilver';


const routes: Routes = [
    {
        path: 'view/:id', component: ViewPracticeComponent, canActivate: [RolesGuard],
        data: { roles: ['superadmin', 'quotatore', 'consultant', 'area_manager', 'point']},

        resolve: {
                data: GetPracticeResolver
        }

    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PracticeRoutingModule { }
