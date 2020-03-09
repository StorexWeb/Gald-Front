import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { PracticeService } from '../../../services/practice.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class GetPracticeResolver implements Resolve<any>, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(private practiceService: PracticeService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {

        return new Promise(async (resolve, reject) => {
            this.practiceService.getPractice(route.paramMap.get('id')).valueChanges.subscribe(
                result => {
                    resolve(result.data.getPractice);
                },
                error => {
                    reject(error);
                }
            );
        });
    }

 
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
