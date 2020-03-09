import {
    HttpEvent, HttpHandler, HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/internal/operators';
import {AuthenticationService} from '../../services';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Ignore requests with `ignorehttperrors` header
        if (request.headers.get('ignorehttperrors')) {
            return next.handle(request) ;
        }

        // Check for errors, and handle them using the error status code
        return next.handle(request).pipe(
            catchError(e => {
                // navigate to 404 error page
                if (e.status === 404){
                    this.router.navigate(['/404'], );
                }
                // navigate to 403 error page
                else if (e.status === 403){
                    this.router.navigate(['/403'], );
                }
                // if the server returned that the token is invalid, logout
                else if (e.status === 401 ||
                    (e.status === 400 && e.error && e.error.errors && e.error.errors[0].status === 'UNAUTHENTICATED')) {
                    this.authenticationService.logout();
                }
                throw e;
            }));
    }
}