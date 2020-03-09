import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {Practice} from '../../../../../../core/models';
import {PracticeService} from '../../../../../../services/practice.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../../../services/alert.service';
import {GenerateAction} from '../../../../../../services/GenerateAction';
import {FillColumn} from '../../../../../../services/FillColumn';
import {GQL} from '../../../../../../config/gql.config';
import {takeUntil} from 'rxjs/operators';
import {QuotatoreActionsService} from '../../../../service/quotatore-actions.service';

@Component({
  selector: 'app-rent-atholon',
  templateUrl: './rent-atholon.component.html',
  styleUrls: ['./rent-atholon.component.scss']
})
export class RentAtholonComponent implements OnInit {

  actions = [];


  displayCols: any;

  filtersQueryCols = [
    {key: 'client', label: 'client'},
    {key: 'vehicle', label: 'vehicle'},
    {key: 'duration', label: 'duration'},
    {key: 'kilometres', label: 'kilometres'},
    {key: 'commissions', label: 'commissions'},
  ];


  _unsubscribeAll: Subject<any> = new Subject() ;
  filterKey: string ;
  filterValue: string ;
  rpp = 10;
  page = 0;
  practices: [Practice] ;
  newPractices = [];
  dataSize: number ;
  pageSizeOptions = [5, 10, 25, 100];

  /************************************************************************************************************/
  /********************************('')***************************/
  /************************************************************************************************************/


  constructor(
      private practiceService: PracticeService,
      private router: Router,
      private route: ActivatedRoute,
      private alertService: AlertService,
      private actionGenerator: GenerateAction,
      private columnsGenerator: FillColumn,
      private quotatoreActionsService: QuotatoreActionsService
  ) {
    this.practices = this.route.snapshot.data.data.practices;
    this.filterPractice('Athlon', this.practices);
    this.dataSize = this.route.snapshot.data.data.n_practices;
    this.filterKey = this.filtersQueryCols[0].key;
    this.actions = actionGenerator.generateActions(20);
    this.displayCols = columnsGenerator.fillList(4);
  }

  ngOnInit(): void {
  }

  /************************************************************************************************************/
  /********************************('load data')***************************/
  /************************************************************************************************************/

  load(): void {
    this.practiceService.listPractices(
        'SVILUPPA_RENT' ,
        GQL.ACCEPTED_ESTIMATE_PAGINATION,
        this.page,
        this.rpp,
        this.filterKey ? this.filterKey : '',
        this.filterValue ? this.filterValue : '',
        'ANY'

    ).valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(
        result => {
          if (result.error) {
            this.alertService.alert('error', 'Oops...', `${result.error}`);
            return ;
          }
          this.practices = result.data.listPractices.practices;
          this.dataSize = result.data.listPractices.n_practices;
        },
        error => {
          this.alertService.alert('error', 'Oops...', `${error}`);
        });
  }

  /**************************************************************************************************************/
  /*************************************************('run event')*******************************************************/
  /**************************************************************************************************************/

  runAction(event): void {
    this.quotatoreActionsService.run(event).then(result => {
      this.load();
    });
  }


  /**************************************************************************************************************/
  /*************************************************('pagination')*******************************************************/
  /**************************************************************************************************************/

  onPaginationChange(event): void {
    this.rpp = event.pageSize;
    this.page = event.pageIndex;
    this.load();
  }

  /**************************************************************************************************************/
  /*************************************************('on destroy')*******************************************************/
  /**************************************************************************************************************/

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  private filterPractice(key: string, practice: [any]): void {

    console.log('New Pra');

    for (let i = 0; i < practice.length; i++)
    {
      if ( (practice[i].offer.lessor_location === key && practice[i].state === 'SVILUPPA_RENT')
          ||
          (practice[i].offer.lessor_location === key && practice[i].state === 'SVILUPPA_RENT_ACCEPTED' && practice[i].estimatedWithOffer === null)){
        this.newPractices.push(practice[i]);
      }
    }

    console.log(this.newPractices);

  }
}
