import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { PracticeService } from '../../services/practice.service';
import { Observable } from 'rxjs';

@Injectable()
export class ListPracticesResolver implements Resolve<any> {
    constructor(private practiceService: PracticeService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

        const data_view = route.data.data_shape ;
        const state = route.data.state ;
        const type = route.data.type ? route.data.type : 'PRACTICE' ;

        return new Promise(async (resolve, reject) => {
            this.practiceService.listPractices(state, data_view, 0, 10, '', '', type ).valueChanges.subscribe(
                result => {
                    resolve(result.data.listPractices);
                },
                error => {
                    reject(error);
                }
            );
        });

    }

}




