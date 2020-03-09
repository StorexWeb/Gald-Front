// angular
import {Component, HostListener, OnDestroy, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
// material
import {MatDialog} from '@angular/material';
// service
import {UserService} from '../../../../services/user.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {takeUntil} from 'rxjs/operators';
import {AlertService} from '../../../../services/alert.service';
import {UserActionsService} from '../../service/user-actions.service';
import {Column} from '../../../../shared/column/Column';

import {EColumn} from '../../../../shared/column/ColumnType';
import {FillColumn} from '../../../../services/FillColumn';
import {GenerateAction} from '../../../../services/GenerateAction';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent implements OnInit, OnDestroy {

    // variabili html
    innerWidth = null;
    flex: string;

    // variabili da passare come input alla lista generia
    selectionQueryColumns: string[] = ['name', 'surname', 'regionesociale', 'phone', 'piva', 'province', 'cf'];

    displayedColumns: any;

    fields_excluded_details: string[] = ['token', 'seat_point', 'username', 'password', 'point_name', 'role'];

    actions_specific: any[];

    _unsubscribeAll: Subject<any> = new Subject() ;
    filterKey: string ;
    filterValue: string ;
    rpp = 10;
    page = 0;
    users = [];
    dataSize: number ;
    pageSizeOptions = [5, 10, 25, 100];

    constructor(
        private userService: UserService, public dialog: MatDialog,
        private deviceService: DeviceDetectorService, private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private userActionsService: UserActionsService,
        private columnGenerator: FillColumn,
        private actionGenerator: GenerateAction
    ) {

        this.flex = '0 0 100px';

        if (this.deviceService.isMobile()) {
            this.flex = '0 0 0px';
        }

        this.users = this.route.snapshot.data.data.users;

        this.dataSize = this.route.snapshot.data.data.n_users;

        this.filterKey = this.selectionQueryColumns[0];

        this.displayedColumns = columnGenerator.fillList(1);

        this.actions_specific = actionGenerator.generateActions(1);
    }

    ngOnInit(): void {
    }

    load(): void {
        this.userService.listUsers(this.page, this.rpp, this.filterKey, this.filterValue)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                result => {
                    this.users = result.data.listUsers.users;
                    this.dataSize = result.data.listUsers.n_users;
                },
                error => {
                    this.alertService.alert('error', 'Oops...', 'Caricamento utenti non risucito!Ricarica!');
                }
            );
    }

    /*************************************************************************************************/
    /************************************('actions')*********************************/
    /***********************************************************************************************/

    actions(event): void {

        console.log('Event:');

        console.log(event);

        this.userActionsService.run(event).then(
            result => {
                if (event.action.action && ['delete'].indexOf(event.action.action) !== -1) {
                    this.load();
                }
            },
        ) ;
    }

    /************************************************************************************************************/
    /********************************('evento scatenato dal cambiamento della pagina')***************************/
    /************************************************************************************************************/

    onPaginateChange(event): void {
        this.rpp = event.pageSize;
        this.page = event.pageIndex;
        this.load();
    }


    /**************************************************************************************************************/
    /*************************************************('html control')*******************************************************/
    /**************************************************************************************************************/

    @HostListener('window:resize', ['$event'])
    onResize(event): void {
        this.innerWidth = window.innerWidth;
        if (this.innerWidth < 600) {
            this.flex = '0 0 0px';
        } else {
            this.flex = '0 0 100px';
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
