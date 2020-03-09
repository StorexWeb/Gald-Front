/**
 * This class allows you to insert or edit a client in the database.
 * @@author Mariangela Di Luccia
 * @param userInput if edit, retrieves date from : route.snapshot.date.date
 */

//angular
import { Component, OnInit, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { Location } from '@angular/common';
//service
import { CityService } from '../../../../services/city.service';
import { UserService } from 'app/services/user.service';
//model
import { User, Seat, City, Common } from '../../../../core/models';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit, OnChanges, OnDestroy {
  private _unsubscribeAll: Subject<any>;

  // Stepper FORM
  public verticalStepperStep_account: FormGroup;
  public verticalStepperStep_personali: FormGroup;
  public verticalStepperStep_aziendali: FormGroup;
  //province dati aziendali
  public province_aziendali: [City];
  public options_province_aziendali: string[] = [];
  public filteredProvince_aziendali: Observable<string[]>;
  public sede = new Seat();
  //commons dati aziendali
  public comuni_aziendali: Common[] = [];
  public options_comuni_aziendali: any[] = [];
  public filteredComuni_aziendali: Observable<string[]>;
  //visualizzazine del form dati aziendali
  public hidden_dati_aziendali: boolean = true;
  //verifico se edit
  public update: Boolean;
  //inizializzo i dati del fotm 
  public states: string[] = ['FREE', 'ATTIVO', 'DISATTIATO'];
  public province: [City];
  public options_province: string[] = [];
  public filteredProvince: Observable<string[]>;
  public options_comuni: string[] = [];
  public filteredComuni: Observable<string[]>;
  public comuni: Common[] = [];
  public changeLog: string[] = [];
  //input parameter
  public id: string;
  public userInput: User = new User();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private cityServices: CityService,
    private location: Location
  ) {
    this._unsubscribeAll = new Subject();

    //Retrieve the parameter representing the user from the resolver
    this.userInput = this.route.snapshot.data.data;
    //if the recovered user is empty it means that it is not an edit but the insertion of a new user
    if (this.userInput == null) {
      this.userInput = new User();
    }
    //Sub-file management
    if (this.userInput.seat) {
      this.sede = this.userInput.seat;
    }
    if (this.userInput.client_type) {
      if (this.userInput.client_type.localeCompare('Persona fisica') === 0) {
        this.hidden_dati_aziendali = false;
      } else {
        this.hidden_dati_aziendali = true;
      }
    }
  }

  ngOnInit() {


    // this.verticalStepperStep_account = this._formBuilder.group({
    //   email: [this.userInput.email, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    //   client_type: [this.userInput.client_type, Validators.required],
    // });


    /** Init First form tab**/
    this.initFirstTab();

    // this.verticalStepperStep_personali = this._formBuilder.group({
    //   name: [this.userInput.name, Validators.required],
    //   surname: [this.userInput.surname, Validators.required],
    //   mobile: [this.userInput.mobile, Validators.required],
    //   title: [this.userInput.title, Validators.required],
    //   cf: [this.userInput.cf, Validators.required],
    //   province: [this.userInput.province, Validators.required],
    //   common: [this.userInput.common, Validators.required],
    //   cap: [this.userInput.cap, Validators.required],
    //   address: [this.userInput.address, Validators.required]
    // });

    /** Init Second tab **/
    this.initSecondTab();



    // this.verticalStepperStep_aziendali = this._formBuilder.group({
    //   company: [this.userInput.company, Validators.required],
    //   regionesociale: [this.userInput.regionesociale, Validators.required],
    //   piva: [this.userInput.piva, Validators.required],
    //   phone: [this.userInput.phone],
    //   inizioattivita: [this.userInput.inizioattivita],
    //   province: [this.sede.province, Validators.required],
    //   common: [this.sede.common, Validators.required],
    //   cap: [this.sede.cap, Validators.required],
    //   address: [this.sede.address, Validators.required]
    // });

    /** Init Third tab **/
    this.initThirdTab();

    this.filteredProvince_aziendali = this.verticalStepperStep_aziendali.controls['province'].valueChanges
      .pipe(
        startWith(''),
        takeUntil(this._unsubscribeAll),
        map(value => this._filter_province_aziendali(value))
      );

    this.filteredComuni_aziendali = this.verticalStepperStep_aziendali.controls['common'].valueChanges
      .pipe(
        startWith(''),
        takeUntil(this._unsubscribeAll),
        map(value => this._filter_comune_aziendali(value))
      );

    /**************************************************************************************************************/
    /**********************('filtro menu autocompletamento province,commons dati personali')*********************************/
    /**************************************************************************************************************/
    this.filteredProvince = this.verticalStepperStep_personali.controls['province'].valueChanges
      .pipe(
        startWith(''),
        takeUntil(this._unsubscribeAll),
        map(value => this._filter_province(value))
      );

    this.filteredComuni = this.verticalStepperStep_personali.controls['common'].valueChanges
      .pipe(
        startWith(''),
        takeUntil(this._unsubscribeAll),
        map(value => this._filter_comune(value))
      );

    /**************************************************************************************************************/
    /*************************************************('change visibility stepper')*******************************************************/
    /**************************************************************************************************************/

    this.verticalStepperStep_account.controls['client_type'].valueChanges
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(value => {
        if (value === 'Persona fisica') {
          this.hidden_dati_aziendali = false;
        } else {
          this.hidden_dati_aziendali = true;
        }
      });
  }


  /**************************************************************************************************************/
  /*************************************************('save client db ')*******************************************************/
  /**************************************************************************************************************/

  finishVerticalStepper(): void {
    //assegno l'id ricevuro in input al client per edit
    let _user = new User();

    let tipologia_cliente = this.verticalStepperStep_account.controls['client_type'].value;
    if (tipologia_cliente.localeCompare('Persona fisica') === 0) {
      _user = {
        ...this.verticalStepperStep_account.value,
        ...this.verticalStepperStep_personali.value,
        ...this.verticalStepperStep_aziendali.value,
      };
    } else {
      _user = {
        ...this.verticalStepperStep_account.value,
        ...this.verticalStepperStep_personali.value,
      };
    }
    if(this.userInput._id){
      _user._id = this.userInput._id;
    }
    const utente = JSON.parse(localStorage.getItem('utente'));
    delete utente['consultant'];
    _user.consultant = utente;
    let indirizzo_aziendali = this.verticalStepperStep_aziendali.controls['address'].value;
    let provincia_aziendali = this.verticalStepperStep_aziendali.controls['province'].value;
    let comune_aziendali = this.verticalStepperStep_aziendali.controls['common'].value;
    let cap_aziendali = this.verticalStepperStep_aziendali.controls['cap'].value;
    _user.address = this.verticalStepperStep_personali.controls['address'].value;
    _user.province = this.verticalStepperStep_personali.controls['province'].value;
    _user.common = this.verticalStepperStep_personali.controls['common'].value;
    _user.cap = this.verticalStepperStep_personali.controls['cap'].value;
    _user.seat = { address: indirizzo_aziendali, province: provincia_aziendali, common: comune_aziendali, cap: cap_aziendali };
    _user.inizioattivita = this.verticalStepperStep_aziendali.controls['inizioattivita'].value;
    _user.role = 'client';
    if (event) {
      this.userService.create(_user)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        result => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'User creato con successo',
            showConfirmButton: false,
            timer: 1500
          });
          this.location.back();
        },
        error => {
          Swal.fire({
            type: 'error',
            title: `Oops...`,
            text: `${error}`,
          });
        });
    }
  }



  /**************************************************************************************************************/
  /****************('metodo filtro autocompletamento province,commons dati aziendali')****************************/
  /**************************************************************************************************************/


  private _filter_province_aziendali(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      this.cityServices.filterProvince(value).valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        result => {
          const Result: any = result;
          let result_array: [] = Result.data.filterCities;
          this.options_province_aziendali = [];
          result_array.forEach(element_array => {
            const element: any = element_array;
            if (element.name.toLowerCase().includes(filterValue)) {
              this.options_province_aziendali.push(element.name);
            }
          });
        },
        error => {
          Swal.fire({
            type: 'error',
            title: `Non sono trovare a caricare i modelli auto`,
            text: 'Errore',
          });
        }
      );
      return this.options_province_aziendali.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  private _filter_comune_aziendali(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.options_comuni_aziendali.filter(option => option.toLowerCase().includes(filterValue));
    }
  }
  /**************************************************************************************************************/
  /****************('metodo filtro autocompletamento province commons dati personali')****************************/
  /**************************************************************************************************************/


  private _filter_province(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      this.cityServices.filterProvince(value).valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        result => {
          const Result: any = result;
          let result_array: [] = Result.data.filterCities;
          this.options_province = [];
          result_array.forEach(element_array => {
            const element: any = element_array;
            if (element.name.toLowerCase().includes(filterValue)) {
              this.options_province.push(element.name);
            }
          });

        },
        error => {
          Swal.fire({
            type: 'error',
            title: `Non sono trovare a caricare i modelli auto`,
            text: 'Errore',
          });
        }
      );
      return this.options_province.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  private _filter_comune(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.options_comuni.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  /**************************************************************************************************************/
  /*************************************************('validatore province')*******************************************************/
  /**************************************************************************************************************/


  validateProvincia(provinciaIn) {
    console.log(provinciaIn);
    var provinciaTxt = provinciaIn.target.value;
    var type = provinciaIn.target.name;
    switch (type) {
      case 'province':
        if (this.options_province) {
          this.options_comuni = [];
          if (_.includes(this.options_province, provinciaTxt)) {
            this.cityServices.filterCommons(provinciaTxt).valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
              result => {
                const Result: any = result;
                let result_array: [] = Result.data.filterCities[0].commons;
                result_array.forEach(element => {
                  let e: any = element;
                  this.options_comuni.push(e.name);
                });
              });
          } else {
            this.verticalStepperStep_personali.controls['province'].setErrors({ 'province': false });
          }
        }
        break;
      case 'province_aziendali':
        if (this.options_province_aziendali) {
          this.options_comuni_aziendali = [];
          if (_.includes(this.options_province_aziendali, provinciaTxt)) {
            this.cityServices.filterCommons(provinciaTxt).valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
              result => {
                const Result: any = result;
                let result_array: [] = Result.data.filterCities[0].commons;
                result_array.forEach(element => {
                  let e: any = element;
                  this.options_comuni_aziendali.push(e.name);
                });
              });
          } else {
            this.verticalStepperStep_aziendali.controls['province'].setErrors({ 'provincia_aziendali': false });
          }
        }
        break;
    }
  }
  /**************************************************************************************************************/
  /*************************************************('validatore commons')*******************************************************/
  /**************************************************************************************************************/
  validateComune(comuneIn) {
    var comuneTxt = comuneIn.target.value;
    var type = comuneIn.target.name;
    switch (type) {
      case 'common':
        if (this.options_comuni) {

          if (!_.includes(this.options_comuni, comuneTxt)) {
            this.verticalStepperStep_personali.controls['common'].setErrors({ 'common': false });
          }
        }
        break;
      case 'comune_aziendali':
        if (!_.includes(this.options_comuni_aziendali, comuneTxt)) {
          this.verticalStepperStep_aziendali.controls['common'].setErrors({ 'comune_aziendali': false });
        }
        break;
      default:
        break;
    }
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    const log: string[] = [];
    // tslint:disable-next-line: forin
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      this.userInput = changedProp.currentValue;
      if (this.userInput.seat) {
        this.sede = this.userInput.seat;
      }
      if (this.userInput.client_type) {
        if (this.userInput.client_type.localeCompare('Persona fisica') === 0) {
          this.hidden_dati_aziendali = false;
        } else {
          this.hidden_dati_aziendali = true;
        }
      }

      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        //        this.form.setValue(changedProp.currentValue);
        var from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  /** Construction changeStepperDisplay  **/

  private initFirstTab(): void
  {
    this.verticalStepperStep_account = this._formBuilder.group({
      email: [this.userInput.email, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      client_type: [this.userInput.client_type, Validators.required],
    });
  }

  // ---------------------------------------------------------------
  private initSecondTab(): void
  {
    this.verticalStepperStep_personali = this._formBuilder.group({
      name: [this.userInput.name, Validators.required],
      surname: [this.userInput.surname, Validators.required],
      mobile: [this.userInput.mobile, Validators.required],
      title: [this.userInput.title, Validators.required],
      cf: [this.userInput.cf, Validators.required],
      province: [this.userInput.province, Validators.required],
      common: [this.userInput.common, Validators.required],
      cap: [this.userInput.cap, Validators.required],
      address: [this.userInput.address, Validators.required]
    });
  }
  // ---------------------------------------------------------------
  private initThirdTab(): void
  {
    this.verticalStepperStep_aziendali = this._formBuilder.group({
      company: [this.userInput.company, Validators.required],
      regionesociale: [this.userInput.regionesociale, Validators.required],
      piva: [this.userInput.piva, Validators.required],
      phone: [this.userInput.phone],
      inizioattivita: [this.userInput.inizioattivita],
      province: [this.sede.province, Validators.required],
      common: [this.sede.common, Validators.required],
      cap: [this.sede.cap, Validators.required],
      address: [this.sede.address, Validators.required]
    });
  }

  // ---------------------------------------------------------------

}
