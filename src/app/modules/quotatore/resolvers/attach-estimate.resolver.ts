import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { PracticeService } from '../../../services/practice.service';
import { Observable } from 'rxjs';

@Injectable()
export class AttachEstimateResolver implements Resolve<any> {
  constructor(private practiceService: PracticeService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    return new Promise(async (resolve, reject) => {
      this.practiceService.getPublicPracticeAt(route.params.id, 'NEW').valueChanges.subscribe(
        result => {
          resolve(result.data.getPublicPracticeAt);
        },
        error => {
            // TODO alert error
        }
      );
    });
  }

}