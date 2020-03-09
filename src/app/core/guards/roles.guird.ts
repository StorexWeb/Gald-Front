
import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    ActivatedRoute,
    RouterStateSnapshot
} from '@angular/router';
import {AuthenticationService} from '../../services';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(public auth: AuthenticationService, public router: Router, public activatedRoute: ActivatedRoute) { }

    canActivate(route: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): boolean {

        const roles: String[] = route.data.roles;

        //    const roles_2: String[] = route.date.roles_2;

        const user = JSON.parse(localStorage.getItem('utente'));
        if (!user) {
           this.router.navigate(['/login']);
           return false ;
        }


        if (roles.indexOf(user.role) !== -1) {
            return true ;
        }

        // TODO navigate to 403 page
        this.router.navigate(['/403']);
        return false ;


    }
}