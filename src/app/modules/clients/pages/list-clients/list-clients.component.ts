// angular
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
// material
import { MatDialog } from '@angular/material';
// module
import {User} from '../../../../core/models';
// service
import { UserService } from '../../../../services/user.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { takeUntil } from 'rxjs/operators';
import {AlertService} from '../../../../services/alert.service';
import {ClientActionsService} from '../../service/client-actions.service';
import {Column} from '../../../../shared/column/Column';
import {FillColumn} from '../../../../services/FillColumn';
import {GenerateAction} from '../../../../services/GenerateAction';


@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit, OnDestroy {

  // variabili html
  innerWidth = null;
  flex: string;

  // variabili da passare come input alla lista generia
  selectionQueryColumns: string[] = ['name', 'surname', 'regionesociale', 'phone', 'piva', 'province', 'cf'];

  // displayedColumns = {
  //     keys: ['name', 'surname', 'cf', 'piva', 'regionesociale', 'province', 'consultant'],
  //     labels: ['Nome', 'Cognome', 'C.F', 'Piva', 'Ragione Sociale', 'Province', 'Consulente'],
  //     format: {'consultant': (elm) => elm.name + ' ' + elm.surname}
  // };

  displayedColumns: any;
  actions_specific: any[];
  
  
  fields_excluded_details: string[] = ['token', 'seat_point', 'username', 'password', 'point_name', 'role'];
  // actions_specific = [
  //   { action: 'update', value: 'UPDATE', icon: 'update', color: 'primary', route: (event) => ['clients/edit', event._id] },
  //   { action: 'delete', value: 'DELETE', icon: 'delete', color: 'warn' }
  // ];

  _unsubscribeAll: Subject<any> = new Subject() ;
  filterKey: string ;
  filterValue: string ;
  rpp = 10;
  page = 0;
  clients = [];
  dataSize: number ;
  pageSizeOptions = [5, 10, 25, 100];



  constructor(
    private userService: UserService, public dialog: MatDialog,
    private deviceService: DeviceDetectorService, private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private clientActionsService: ClientActionsService,
    private columnsGenerator: FillColumn,
    private actionsGenerator: GenerateAction
  ) {

    this.flex = '0 0 100px';
    if (this.deviceService.isMobile()) {
      this.flex = '0 0 0px';
    }

    this.clients = this.route.snapshot.data.data.users;
    this.dataSize = this.route.snapshot.data.data.n_users;

    this.filterKey = this.selectionQueryColumns[0];
    
    this.displayedColumns = this.columnsGenerator.fillList(1);
    this.actions_specific = this.actionsGenerator.generateActions(2);

    console.log(this.displayedColumns);
  }

  ngOnInit(): void {
  }

  load(): void {
    this.userService.listClients(this.page, this.rpp, this.filterKey, this.filterValue)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(
            result => {
                this.clients = result.data.listClients.users;
                this.dataSize = result.data.listClients.n_users;
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
    this.clientActionsService.run(event).then(
        result => {
            if (event.action.action && ['delete'].indexOf(event.action) !== -1) {
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
