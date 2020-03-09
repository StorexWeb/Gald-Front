import { Injectable, OnDestroy } from '@angular/core';

import { Resolve, RouterStateSnapshot } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserService } from 'app/services/user.service';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class GetUserResolver implements Resolve<any>,OnDestroy {

    _unsubscribeAll: Subject<any>;

    constructor(private userService: UserService) {
        this._unsubscribeAll = new Subject();
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise(async (resolve, reject) => {
            this.userService.getUserById(route.paramMap.get('id')).valueChanges
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(
                    result => {
                        const Result: any = result;
                        resolve(Result.data.getUserById);
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