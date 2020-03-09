import { Component, OnInit, OnDestroy } from '@angular/core';
import { PracticeService } from '../../../../../../services/practice.service';
import { Practice } from '../../../../../../core/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GQL } from '../../../../../../config/gql.config';
import { AlertService} from '../../../../../../services/alert.service';
import {ConsultantActionsService} from '../../../../service/consultant-actions.service';
import {GenerateAction} from '../../../../../../services/GenerateAction';
import {FillColumn} from '../../../../../../services/FillColumn';

@Component({
    selector: 'app-practices-rejected-estimates',
    templateUrl: './rejected-estimates.component.html',
    styleUrls: ['./rejected-estimates.component.scss']
})
export class RejectedEstimatesComponent implements OnInit, OnDestroy {

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
        private route: ActivatedRoute,
        private alertService: AlertService,
        private consultantActionsService: ConsultantActionsService,
        private actionGenerator: GenerateAction,
        private columnsGenerator: FillColumn
    ) {
        this.practices = this.route.snapshot.data.data.practices;
        this.dataSize = this.route.snapshot.data.data.n_practices;
        this.filterKey = this.filtersQueryCols[0].key;
        this.actions = this.actionGenerator.generateActions(16);
        this.displayCols = this.columnsGenerator.fillList(4);
    }

    ngOnInit(): void {
    }

    /************************************************************************************************************/
    /********************************('load data')***************************/
    /************************************************************************************************************/

    load(): void {
        this.practiceService.listPractices(
            'LOADED_REJECT' ,
            GQL.SENT_PRACTICE_PAGINATION,
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
        this.consultantActionsService.run(event).then(
            result => {
                if (event.action && ['delete_request'].indexOf(event.action.action) !== -1) {
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
