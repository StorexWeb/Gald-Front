import { Injectable } from '@angular/core';

import { Resolve, RouterStateSnapshot } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { PracticeService } from '../../../services/practice.service';
import { Observable } from 'rxjs';

@Injectable()
export class GetPraticeResolver implements Resolve<any> {
    constructor(private practiceService: PracticeService) {}
    
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return new Promise(async (resolve, reject) => {
        // get pratice status .
        let status = 'NEW' ;

        if (route.data['status']) {
            status = route.data['status'] ;
        }
        this.practiceService.getPracticeAt(route.paramMap.get('id'), status).valueChanges.subscribe(
            result => {
                resolve(result.data.getPracticeAt);
            },
            error => {
              reject(error);
            }
          );
    });

  }

}
