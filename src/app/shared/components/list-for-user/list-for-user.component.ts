import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Action} from '../../../core/models/utility.model';

@Component({
  selector: 'app-list-for-user',
  templateUrl: './list-for-user.component.html',
  styleUrls: ['./list-for-user.component.scss']
})
export class ListForUserComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() from: any;
  @Input() displayCols: any;
  @Input() actions: any[] = [];
  @Output() onAction = new EventEmitter();
  @Output() onPagination = new EventEmitter();

  @Input() fields_excluded_details: string[] = [];



  expandedElement: any | null;
  innerWidth = null;
  flex: string;
  details = [] ;
  isExpanded: boolean[] = [] ;

  constructor(
      private deviceService: DeviceDetectorService,
  ) {
    this.flex = '0 0 100px';
    if (this.deviceService.isMobile()) {
      this.flex = '0 0 0px';

    }



    //this.convertColumns();

    console.log(this.data);
  }

  ngOnInit(): void {

    //  console.log(this.displayCols);
    //this.convertColumns();

  }


  viewUsersDetails(element: any): void {
    console.log(element);
    const cols = {
      _id: element._id,
      nome: element.name,
      cognome: element.surname,
      email: element.email,
      ruolo: element.role,
      mobile : element.mobile,
      indirizzo: element.address,
      cap: element.cap,
      provincia: element.province,
      comune: element.common,
      cf: element.cf,
    };

    this.details = Object.entries(cols).map(([key, value]) => ({ key, value }));
  }

  viewDetails(element): void {
    console.log(this.from);


    if (this.from === 1){
      this.viewUsersDetails(element);
      return;
    }

    const cols = {
      _id: element._id,
      nome: element.user,
      piva: element.piva,
      veicolo: element.vehicle,
      durata: element.duration,
      chilometri : element.kilometres,
      data: new Date(element.date),
      consegna: element.delivery,
      state: element.state,
      prodotto: element.product,
      commissione: element.commission,
      final_commission: element.final_commission,
      cliente: element.client,
    };

    this.details = Object.entries(cols).map(([key, value]) => ({ key, value }));
  }

  onActionEvent(event, id): void {
    this.onAction.emit(new Action(id, event));
    this.isExpanded = [false];
  }

  onPaginateChange(event): void{
    this.onPagination.emit(event);
  }

  /*****************************************************************************************/
  /************************************('view html method')*********************************/
  /*****************************************************************************************/

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 600) {
      this.flex = '0 0 0px';
    } else {
      this.flex = '0 0 100px';
    }
  }

  getTypeOf(item): String{
    return typeof item ;
  }


  checkIsExpanded(item: any, index: number): void {

    if (this.isExpanded[index]) {
      this.isExpanded[index] = false;
    }
    else {
      this.isExpanded[index] = true;
      this.viewDetails(item);
    }
  }


  convertColumns(): void
  {
    let newObj = {
      keys: [],
      labels: [],
      format: {},
    };

    for (let i=0 ; i<this.displayCols.length; i++){

      if (this.displayCols[i].type !== 'FUNCTION'){
        newObj.keys.push(this.displayCols[i].key);
        newObj.labels.push(this.displayCols[i].value);
      }

    }


    this.displayCols = newObj;
  }

}
