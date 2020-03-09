import {EventEmitter, Injectable} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from '../core/models';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../config/app.config';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {NavigationService} from './navigation.service';
import {UserService} from './user.service';


@Injectable({providedIn: "root"})
export class AuthenticationService {

  public currentUser: User;
  public userChanges = new EventEmitter() ;
  constructor(
      private jwtHelper: JwtHelperService,
      private router: Router,
      private http: HttpClient,
      private userService: UserService
  ) {}


  public isAuthenticated(): boolean {
    return this.getUser() && !this.jwtHelper.isTokenExpired(this.getUser().token);
  }

  // sends the authentication request
  login(username: string, password: string): Observable<User | any> {

      // Init credentials formData .
      const credentials = new FormData();
      credentials.append('username', username) ;
      credentials.append('password', password) ;
      // Tell the http error interceptor to ignore http errors from this request.
      const options = { headers: new HttpHeaders({'ignorehttperrors': '1'}) } ;

      // Send the http request
      return this.http.post<any>(AppConfig.endpoints.login, credentials, options)
          .pipe(map(user => {
              if (user && user.token) {

                  // don't ask why, I found not better way to do it considering the time I have, we should do it in a better way later
                  user = this.clearIds(user);

                  // store user details and jw token in local storage
                  localStorage.setItem('utente', JSON.stringify(user));

                  this.currentUser = user ;
                  this.userChanges.emit(user) ;
              }
              return user;
          }));
  }

  logout(): void {
    localStorage.removeItem('utente');
    this.currentUser = null ;
    this.userChanges.emit(null);
    this.router.navigate(['/login']);
  }


  // returns the current user.
  getUser(): User | null {
    return JSON.parse(localStorage.getItem('utente'));
  }

  // remake this thing in a better way !..
  clearIds(user): any{
      if (user.fuseconfig) {
          delete user.fuseconfig.layout.toolbar._id ;
          delete user.fuseconfig.layout._id ;
          delete user.fuseconfig.layout.sidepanel._id ;
          delete user.fuseconfig.layout.footer._id ;
          delete user.fuseconfig.layout.navbar._id ;
      }
      if (user.seat) { delete user.seat._id ; }
      if (user.seat_point) {delete user.seat_point._id ; }
      return user ;
  }

  refreshLoadedUser(): void {
      this.userService.getCurrentUserData().valueChanges.subscribe(
          data => {
              const user = data.data.getCurrentUserData ;
              user.token = this.getUser().token ;
              localStorage.setItem('utente', JSON.stringify(user));
              window.location.reload();
          },
          error => {
              console.log(error);
          }
      );

  }


}
