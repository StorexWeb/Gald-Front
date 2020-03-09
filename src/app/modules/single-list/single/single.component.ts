import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {Practice} from '../../../core/models';
import {PracticeService} from '../../../services/practice.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../services/alert.service';
import {GenerateAction} from '../../../services/GenerateAction';
import {FillColumn} from '../../../services/FillColumn';
import {GQL} from '../../../config/gql.config';
import {takeUntil} from 'rxjs/operators';
import {ComponentFactory} from '../../../component-generator/ComponentFactory';
import {ComponentGenerator} from '../../../component-generator/ComponentGenerator';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  /************************************************************************************************************/
  /********************************('Vars')***************************/
  /************************************************************************************************************/

  _unsubscribeAll: Subject<any> = new Subject() ;
  filterKey: string ;
  filterValue: string ;
  rpp = 10;
  page = 0;
  practices: [Practice] ;
  newPractices = [];
  dataSize: number ;
  pageSizeOptions = [5, 10, 25, 100];

  componentGenerator: any;

  componentData: any;

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
      private componentFactory: ComponentFactory,
  ) {
   // this.componentGenerator = this.componentFactory.factory(route.snapshot.data.state);
   // this.componentData = this.componentGenerator.generateComponent();
    this.practices = this.route.snapshot.data.data.practices;
    this.dataSize = this.route.snapshot.data.data.n_practices;
    this.filterKey = this.componentData.filterColumns[0].key;
  }


  ngOnInit(): void {
  }

  /************************************************************************************************************/
  /********************************('load data')***************************/
  /************************************************************************************************************/

  load(): void {
    this.practiceService.listPractices(
        this.route.snapshot.data.state ,
        GQL.SENT_PRACTICE_PAGINATION,
        this.page,
        this.rpp,
        this.filterKey ? this.filterKey : '',
        this.filterValue ? this.filterValue : ''
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

    this.componentGenerator.actionExecutor.runActions(event).then(r => {
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

}
