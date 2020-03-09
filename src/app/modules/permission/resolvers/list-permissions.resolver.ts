import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {PermissionService} from '../services/permission.service';

@Injectable()

export class ListPermissionsResolver implements Resolve<any>, OnDestroy{

    private _unsubscribeAll: Subject<any>;

    constructor(private permissionService: PermissionService) {
        this._unsubscribeAll = new Subject();

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {

                this.permissionService.getPermissionsList(0, 10)
                   // .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(
                        results => {
                            resolve(results.data.getPermissionsList);
                        },

                        errors => {
                            reject(errors);
                        }
                    );

        });
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}