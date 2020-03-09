import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { takeUntil } from 'rxjs/operators';
@Injectable()
export class ListUsersResolver implements Resolve<any>, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  constructor(private userService: UserService) { 
    this._unsubscribeAll = new Subject();

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.userService.listUsers(0, 10, '', '')
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        result => {
          resolve(result.data.listUsers);
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




