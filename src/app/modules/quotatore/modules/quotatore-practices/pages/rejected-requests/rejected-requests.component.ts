import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PracticeService } from '../../../../../../services/practice.service';
import { Practice } from '../../../../../../core/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GQL } from '../../../../../../config/gql.config';
import { AlertService } from '../../../../../../services/alert.service';
import { QuotatoreActionsService } from '../../../../service/quotatore-actions.service';
import {FillColumn} from '../../../../../../services/FillColumn';
import {GenerateAction} from '../../../../../../services/GenerateAction';


@Component({
    selector: 'app-rejected-requests',
    templateUrl: './rejected-requests.component.html',
    styleUrls: ['./rejected-requests.component.scss']
})
export class RejectedRequestsComponent implements OnInit, OnDestroy {

    /************************************************************************************************************/
    /********************************('Vars')***************************/
    /************************************************************************************************************/

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
    dataSize: number ;
    pageSizeOptions = [5, 10, 25, 100];

    /************************************************************************************************************/
    /********************************('')***************************/
    /************************************************************************************************************/


    constructor(
        private practiceService: PracticeService,
        private router: Router,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private quotatoreActionsService: QuotatoreActionsService,
        private columnsGenerator: FillColumn,
        private actionGenerator: GenerateAction
    ) {

        this.practices = this.route.snapshot.data.data.practices;
        this.dataSize = this.route.snapshot.data.data.n_practices;
        this.filterKey = this.filtersQueryCols[0].key;
        this.displayCols = columnsGenerator.fillList(4);
        this.actions = actionGenerator.generateActions(16);
    }

    ngOnInit(): void {
    }

    /************************************************************************************************************/
    /********************************('load data')***************************/
    /************************************************************************************************************/

    load(): void {
        this.practiceService.listPractices(
            'REQUEST_REJECTED' ,
            GQL.RECEIVED_PRACTICE_PAGINATION,
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
        this.quotatoreActionsService.run(event).then(
            result => {
                if (['reject_request', 'delete_request'].indexOf(event.action.action) !== -1) {
                    this.load();
                }
            },
        ) ;
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
