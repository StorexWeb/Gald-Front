import { Injectable } from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {NavigationConfig} from '../config/navigation.config';
import {FuseNavigationService} from '../../@fuse/components/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  constructor(
      private authenticationService: AuthenticationService,
      private fuseNavigationService: FuseNavigationService
  ) { }


  navigationName = 'public' ;
  getCurrentUserNavigation(): any {
    if (!this.authenticationService.isAuthenticated()){
      return [] ;
    }

    const navigation = [];
    NavigationConfig.navigation.forEach((elm) => {
      if (!elm.roles || elm.roles.indexOf(this.authenticationService.getUser().role) !== -1) {
        navigation.push(elm);
      }
    });
    return navigation;
  }

  getCurrentNavigationName(): string {
      if (!this.authenticationService.isAuthenticated()){
        return 'public' ;
      } else {
        return this.authenticationService.getUser().role ;
      }
  }

  update(): void {
      this.fuseNavigationService.unregister(this.navigationName);
      this.navigationName = this.getCurrentNavigationName() ;
      this.fuseNavigationService.register(this.navigationName, this.getCurrentUserNavigation());
      this.fuseNavigationService.setCurrentNavigation(this.navigationName);
  }


}
