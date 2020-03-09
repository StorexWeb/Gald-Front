
import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    ActivatedRoute,
    RouterStateSnapshot
} from '@angular/router';
import decode from 'jwt-decode';
import {AuthenticationService} from './';

@Injectable()
export class RoleGuardService implements CanActivate {

    constructor(public auth: AuthenticationService, public router: Router, public activatedRoute: ActivatedRoute) { }

    canActivate(route: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): boolean {

        let _return = false;
        const roles: String[] = route.data.roles;

        //    const roles_2: String[] = route.date.roles_2;

        const user = JSON.parse(localStorage.getItem('utente'));
        if (user) {
            console.log(user.role)
            if (roles.length > 1) {
                roles.forEach(element => {
                    if ((user.role === element)) {
                        new Promise(async (resolve, reject) => {
                            _return = true;
                        });
                    }
                });
                return _return;
            } else {
                if ((user.role === roles)) {
                    const tokenPayload = decode(user.token);
                    _return = true;
                    return true;
                }
            }
        } else {
            this.router.navigate(['']);
            _return = false;
            return _return;
        }


    }
}