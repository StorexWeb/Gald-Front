import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../../../services/user.service';

@Injectable()
export class ListClientsResolver implements Resolve<any> {
    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

        return new Promise(async (resolve, reject) => {
            this.userService.listClients(0, 10, '', '' ).subscribe(
                result => {
                    resolve(result.data.listClients);
                },
                error => {
                    reject(error);
                }
            );
        });

    }

}




