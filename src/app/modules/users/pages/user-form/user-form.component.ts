/**
 * This class allows you to insert or edit a user in the database.
 * @@author Mariangela Di Luccia
 * @param userInput if edit, retrieves date from : route.snapshot.date.date
 */

// Angular imports
import { Component, OnInit, OnChanges, SimpleChange, EventEmitter, ViewChild, ElementRef, OnDestroy, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
// Service import
import { CityService } from '../../../../services/city.service';
// Model import 
import { User, Seat, City, Common  } from '../../../../core/models';
import { UserService } from 'app/services/user.service';
// Other import 
import Swal from 'sweetalert2';

import * as _ from 'lodash'; 
import { Location } from '@angular/common';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';

import {UploadService} from '../../../../services/uload.service';

type ICallback = ( error: Error , result: any ) => void;

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})


export class UserFormComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('imageInput') imageInput: ElementRef;
  public fileImage;
  // file
  // UPLOAD
  public options: UploaderOptions;
  public formData: FormData;
  public files: UploadFile[] = [];
  public uploadInput: EventEmitter<UploadInput>;
  public dragOver: boolean;
  public form: FormGroup;
  public showFiller = false;
  // Stepper FORM
  public verticalStepperStep_account: FormGroup;
  public verticalStepperStep_personali: FormGroup;
  public verticalStepperStep_aziendali: FormGroup;
  public verticalStepperStep_point: FormGroup;
  // province dati aziendali
  public province_aziendali: [City];
  public options_province_aziendali: string[] = [];
  public filteredProvince_aziendali: Observable<string[]>;
  public sede = new Seat();
  // commons dati aziendali
  public comuni_aziendali: Common[] = [];
  public options_comuni_aziendali: any[] = [];
  public filteredComuni_aziendali: Observable<string[]>;
  // province dati point
  public province_point: [City];
  public options_province_point: string[] = [];
  public filteredProvince_point: Observable<string[]>;
  public sede_point = new Seat();
  // commons dati aziendali
  public comuni_point: Common[] = [];
  public options_comuni_point: any[] = [];
  public filteredComuni_point: Observable<string[]>;
  public currentAreaManager: User;
  public hidden_areamanager = true;
  // oscuramento stepper
  public hidden_dati_aziendali = true;
  public hidden_consulente = true;
  // inizializzo i dati del fotm
  public states: string[] = ['FREE', 'ATTIVO', 'DISATTIATO'];
  public province: [City];
  public options_province: string[] = [];
  public filteredProvince: Observable<string[]>;
  public options_comuni: string[] = [];
  public filteredComuni: Observable<string[]>;
  public comuni: Common[] = [];
  public changeLog: string[] = [];
  // input parameter
  public id: string;
  public userInput: User = new User();
  public point;
  public options_point: string[] = [];
  public filteredPoint: Observable<string[]>;
  public autocompletamento_areamanager: Observable<string[]>;
  public area_manager_input: String;
  public options_areamanager: string[] = [];
  public area_manager: User[] = [];
  private _unsubscribeAll: Subject<any>;
  public url_image = 'assets\\images\\galdierirent\\avatar_default.png';
  public imageProfile_user;
  public submitWatcher: Subscription;
  public formData1: FormData = new FormData();

  constructor(
      private userService: UserService,
      private route: ActivatedRoute,
      private _formBuilder: FormBuilder,
      private cityServices: CityService,
      private location: Location,
      private uploadService: UploadService
  ) {
    this._unsubscribeAll = new Subject();

    /**
     * Call to the DB that loads the names of the points.
     * When it receives the response it loads the names in point_name.
     * @return array_nome_point returns the names of the points filtered by the text entered in the user input
     */
    // this.userService.ricerca_point().valueChanges
    // .pipe(takeUntil(this._unsubscribeAll))
    // .subscribe(result => {
    //   this.point = result.data.ricerca_point;
    //   this.point.forEach(element => {
    //     if (element._id) {
    //       this.options_point.push(element._id);
    //     }
    //   });
    // });

    this.loadsPointsName();

    this.recoverUser();



    if (this.userInput.profile_img) {

      const utente = JSON.parse(localStorage.getItem('utente'));

      // TODO CHANGE this
      this.url_image = `https://graphql2.galdierirents.info/secure-api/api/avatar/:id=${this.userInput._id}/${this.userInput.profile_img}`;
      console.log(this.url_image);
      this.imageProfile_user = this.userInput.profile_img;
    }
    // I recover this date in order to offer a better view of the sub-files.
    if (this.userInput.seat) {
      this.sede = this.userInput.seat;
    }
    if (this.userInput.seat_point) {
      this.sede_point = this.userInput.seat_point;
    }
    if (this.userInput.area_manager) {
      this.area_manager_input = this.userInput.area_manager.name + ' ' + this.userInput.area_manager.surname;
    }
    if (this.userInput.client_type) {
      if (this.userInput.client_type.localeCompare('Persona fisica') === 0) {
        this.hidden_dati_aziendali = false;
      } else {
        this.hidden_dati_aziendali = true;
      }
    }
    if (this.userInput.role) {
      if (this.userInput.role.localeCompare('consultant') === 0) {
        this.hidden_consulente = false;
      }
    }
    /**************************************************************************************************************/
    /**********************************('init form account date')**************************************************/
    /**************************************************************************************************************/
    // this.verticalStepperStep_account = this._formBuilder.group({
    //   email: [this.userInput.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    //   password: [this.userInput.password, Validators.required],
    //   role: [this.userInput.role, Validators.required],
    //   client_type: [this.userInput.client_type, Validators.required],
    //   state: [this.userInput.state]
    // });

    this.initFormAccountDate();

    /**************************************************************************************************************/
    /********************************************('init form personal date')*************************************/
    /**************************************************************************************************************/
    // this.verticalStepperStep_personali = this._formBuilder.group({
    //   name: [this.userInput.name, Validators.required],
    //   surname: [this.userInput.surname, Validators.required],
    //   mobile: [this.userInput.mobile],
    //   title: [this.userInput.title],
    //   cf: [this.userInput.cf],
    //   province: [this.userInput.province],
    //   common: [this.userInput.common],
    //   cap: [this.userInput.cap],
    //   address: [this.userInput.address]
    // });

    this.initFormPersonalDate();

    /**************************************************************************************************************/
    /*******************************************('init form point date')*******************************************/
    /**************************************************************************************************************/
    // this.verticalStepperStep_point = this._formBuilder.group({
    //   area_manager: [this.area_manager_input],
    //   point_name: [this.userInput.point_name],
    //   province: [this.sede_point.province],
    //   common: [this.sede_point.common],
    //   cap: [this.sede_point.cap],
    //   address: [this.sede_point.address]
    // });

    this.initFormPointDate();
    /**************************************************************************************************************/
    /****************************('init form aziendali date business')*********************************************/
    /**************************************************************************************************************/
    // this.verticalStepperStep_aziendali = this._formBuilder.group({
    //   regionesociale: [this.userInput.regionesociale],
    //   company: [this.userInput.company],
    //   piva: [this.userInput.piva],
    //   phone: [this.userInput.phone],
    //   inizioattivita: [this.userInput.inizioattivita],
    //   province: [this.sede.province],
    //   common: [this.sede.common],
    //   cap: [this.sede.cap],
    //   address: [this.sede.address]
    // });
    this.initFormBusinessDate();
    /**************************************************************************************************************/
    /*************************************************('change the stepper display')********************************/
    /**************************************************************************************************************/
    // this.verticalStepperStep_account.controls['client_type'].valueChanges
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe(value => {
    //       if (value.localeCompare('Persona fisica') === 0) {
    //         this.hidden_dati_aziendali = false;
    //       } else {
    //         this.hidden_dati_aziendali = true;
    //       }
    //     });
    //
    // this.verticalStepperStep_account.controls['role'].valueChanges
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe(value => {
    //       if (value.localeCompare('consultant') === 0 || (value.localeCompare('point') === 0) || (value.localeCompare('area_manager') === 0)) {
    //         this.hidden_areamanager = true;
    //       } else {
    //         this.hidden_areamanager = false;
    //       }
    //       if (value.localeCompare('consultant') === 0) {
    //         this.hidden_consulente = false;
    //       }
    //     });
    // // it is not allowed to modify the email if it is an edit
    // if (this.userInput.email) {
    //   this.verticalStepperStep_account.controls['email'].setValue(this.userInput.email);
    //   this.verticalStepperStep_account.controls['email'].disable();
    // }
    // // autocomplete input area_manager
    // this.autocompletamento_areamanager = this.verticalStepperStep_point.controls['area_manager'].valueChanges
    //     .pipe(
    //         startWith(''),
    //         takeUntil(this._unsubscribeAll),
    //         map(value => this._filter_areamanager(value))
    //     );

    this.changeStepperDisplay();

    /**************************************************************************************************************/
    /*****************************************************('point')************************************************/
    /**************************************************************************************************************/
    // // autocomplete input point_name
    // this.filteredPoint = this.verticalStepperStep_point.controls['point_name'].valueChanges
    //     .pipe(
    //         startWith(''),
    //         takeUntil(this._unsubscribeAll),
    //         map(value => this._filter_nome_point(value))
    //     );
    // // autocomplete province
    // this.filteredProvince_point = this.verticalStepperStep_point.controls['province'].valueChanges
    //     .pipe(
    //         startWith(''),
    //         takeUntil(this._unsubscribeAll),
    //         map(value => this._filter_province_point(value))
    //     );
    // // autocomplete commons
    // this.filteredComuni_point = this.verticalStepperStep_point.controls['common'].valueChanges
    //     .pipe(
    //         startWith(''),
    //         takeUntil(this._unsubscribeAll),
    //         map(value => this._filter_common_point(value))
    //     );

    this.areaAutoComplete();

    /**************************************************************************************************************/
    /*********************************************('business')*****************************************************/
    /**************************************************************************************************************/
    // // autocomplete province
    // this.filteredProvince_aziendali = this.verticalStepperStep_aziendali.controls['province'].valueChanges
    //     .pipe(
    //         startWith(''),
    //         takeUntil(this._unsubscribeAll),
    //         map(value => this._filter_province_aziendali(value))
    //     );
    // // autocomplete commons
    // this.filteredComuni_aziendali = this.verticalStepperStep_aziendali.controls['common'].valueChanges
    //     .pipe(
    //         startWith(''),
    //         takeUntil(this._unsubscribeAll),
    //         map(value => this._filter_common_aziendali(value))
    //     );

    this.businessAutoComplete();
    /**************************************************************************************************************/
    /***************************************************('personal')***********************************************/
    /**************************************************************************************************************/
    // autocomplete province
    // this.filteredProvince = this.verticalStepperStep_personali.controls['province'].valueChanges
    //     .pipe(
    //         startWith(''),
    //         takeUntil(this._unsubscribeAll),
    //         map(value => this._filter_province(value))
    //     );
    // // autocomplete commons
    // this.filteredComuni = this.verticalStepperStep_personali.controls['common'].valueChanges
    //     .pipe(
    //         startWith(''),
    //         takeUntil(this._unsubscribeAll),
    //         map(value => this._filter_common(value))
    //     );

    this.personalAutoComplete();
  }

  ngOnInit() {
  }

  /**************************************************************************************************************/
  /*************************************************('user saving in the db')************************************/

  /**************************************************************************************************************/
  /**
   * Retrieve the parameters from the steppers and save the object created in the database.
   * @param verticalStepperStep_account all input values in the stepper
   * @param verticalStepperStep_personali all input values in the stepper
   * @param verticalStepperStep_aziendali all input values in the stepper
   * @param verticalStepperStep_point all input values in the stepper
   * @return message returns a message to indicate success or failure of creation
   */
  finishVerticalStepper(): void {
    // recovery of the parameters entered in the steppers
    let _user = new User();
    const tipologia_cliente = this.verticalStepperStep_account.controls['client_type'].value;
    _user = {
      ...this.verticalStepperStep_account.value,
      ...this.verticalStepperStep_personali.value,
      ...this.verticalStepperStep_aziendali.value,
      ...this.verticalStepperStep_point.value,
    };
    const utente = JSON.parse(localStorage.getItem('utente'));
    _user.consultant = utente;
    const address_aziendali = this.verticalStepperStep_aziendali.controls['address'].value;
    const provincia_aziendali = this.verticalStepperStep_aziendali.controls['province'].value;
    const common_aziendali = this.verticalStepperStep_aziendali.controls['common'].value;
    const cap_aziendali = this.verticalStepperStep_aziendali.controls['cap'].value;

    const address_point = this.verticalStepperStep_point.controls['address'].value;
    const provincia_point = this.verticalStepperStep_point.controls['province'].value;
    const common_point = this.verticalStepperStep_point.controls['common'].value;
    const cap_point = this.verticalStepperStep_point.controls['cap'].value;

    _user.address = this.verticalStepperStep_personali.controls['address'].value;
    _user.province = this.verticalStepperStep_personali.controls['province'].value;
    _user.common = this.verticalStepperStep_personali.controls['common'].value;
    _user.cap = this.verticalStepperStep_personali.controls['cap'].value;

    _user.seat_point = {address: address_point, province: provincia_point, common: common_point, cap: cap_point};
    _user.seat = {address: address_aziendali, province: provincia_aziendali, common: common_aziendali, cap: cap_aziendali};
    _user.inizioattivita = this.verticalStepperStep_aziendali.controls['inizioattivita'].value;
    if (tipologia_cliente.localeCompare('Persona fisica') === 0) {
      _user.seat = new Seat();
      _user.inizioattivita = false;
      _user.company = '';
      _user.regionesociale = '';
      _user.piva = '';
    }
    delete _user['area_manager'];
    _user['area_manager'] = this.currentAreaManager;
    // if it's an edit, remember your id
    if (this.id != null) {
      _user._id = this.id;
    }
    _user.profile_img = this.imageProfile_user;
    this.startUpload(this.userInput.email);
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

  // -----------------------------------------------------

  createDone(): void {

    this.uploadAttaches((error: Error, result: any): void => {
      if (result) {
        this.finishVerticalStepper();
      } else {
        Swal.fire({
          type: 'error',
          title: `Oops...`,
          text: `${error}`,
        });
      }
    });

  }

  // -----------------------------------------------------


  uploadAttaches(callback: ICallback): void {
    let data = null;
    this.uploadService.uploadMany(this.formData1, 'gg', (error, result) => {


      if (error != null) {
        console.log('Any');
        callback(null, false);
      } else {
        console.log('Success');

        data = result;

        console.log(result);

        for (const item of result.data) {
          console.log(item);
          this.imageProfile_user = item.fileName;

          // this.attaches_data[item.fileKey].file = {name: item.fileName, path: 'Path', type: 'type', size: 123, key: 'offer_file', date: new Date() };
        }

        console.log(this.imageProfile_user);
        callback(null, true);

      }

    });

  }


  // --------------------------------------------------------

  changeImage() {
    console.log('change image');
    const el: HTMLElement = this.imageInput.nativeElement;
    el.click();
    this.fileImage = event;
  }

  /**************************************************************************************************************/
  /*************************************************(business')**************************************************/

  /**************************************************************************************************************/
  /**
   * Retrieve the provinces through a filter on the name of the province.
   * Fills the options of the provinces and municipalities with the filtered date returned by the db
   * @param value value of the html input box province aziendali
   * @return options_province_aziendali this array is filled with the received date
   */
  private _filter_province_aziendali(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      this.cityServices.filterProvince(value).valueChanges
          .pipe(
              takeUntil(this._unsubscribeAll),
          ).subscribe(
          result => {
            const result_array: [] = result.data.filterCities;
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
              title: `Non sono trovare a caricare i le province aziendali`,
              text: 'Errore',
            });
          }
      );
      return this.options_province_aziendali.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  /**
   * Recover the municipalities through a filter on the name of the municipality.
   * Fills options municipalities with filtered date, they were added after selecting a specific province.
   * @param value value of the html input box commons aziendali
   * @return options_comuni_aziendali this array is filled with the received date
   */
  private _filter_common_aziendali(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.options_comuni_aziendali.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  /**************************************************************************************************************/
  /************************************************('point')*****************************************************/

  /**************************************************************************************************************/
  /**
   * Retrieve the provinces through a filter on the name of the province.
   * Fills the options of the provinces and municipalities with the filtered date returned by the db
   * @param value value of the html input box province point
   * @return options_province_point this array is filled with the received date
   */
  private _filter_province_point(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      this.cityServices.filterProvince(value).valueChanges
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(
              result => {
                const result_array: [] = result.data.filterCities;
                this.options_province_point = [];
                result_array.forEach(element_array => {
                  const element: any = element_array;
                  if (element.name.toLowerCase().includes(filterValue)) {
                    this.options_province_point.push(element.name);
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
      return this.options_province_point.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  /**
   * Recover the municipalities through a filter on the name of the municipality.
   * Fills options municipalities with filtered date, they were added after selecting a specific province.
   * @param value value of the html input box commons point
   * @return options_comuni_point this array is filled with the received date
   */
  private _filter_common_point(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.options_comuni_point.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  /**************************************************************************************************************/
  /************************************************('accounts')**************************************************/

  /**************************************************************************************************************/

  /**
   * Retrieve the provinces through a filter on the name of the province.
   * Fills the options of the provinces and municipalities with the filtered date returned by the db
   * @param value value of the html input box province account
   * @return options_province this array is filled with the received date
   */
  private _filter_province(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      this.cityServices.filterProvince(value).valueChanges
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(
              result => {
                const result_array: [] = result.data.filterCities;
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

  /**
   * Recover the municipalities through a filter on the name of the municipality.
   * Fills options municipalities with filtered date, they were added after selecting a specific province.
   * @param value value of the html input box commons account
   * @return options_comuni this array is filled with the received date
   */
  private _filter_common(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.options_comuni.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  /**
   * Recover users with an area manager role.
   * This must necessarily be expressed if a new point is created
   * @param value value of the html input box area_manager
   * @return options_areamanager this array is filled with the received date
   */
  private _filter_areamanager(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      this.userService.area_manager_autocomplete(value).valueChanges
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(
              result => {
                const result_array = result.data.area_manager_autocomplete;
                this.options_areamanager = [];
                this.area_manager = [];
                result_array.forEach(element => {
                  const s = element.name + ' ' + element.surname;
                  if (s.toLowerCase().includes(filterValue)) {
                    this.options_areamanager.push(s);
                    this.area_manager.push(element);
                  }
                });
                if (this.options_areamanager.length === 1) {
                  this.currentAreaManager = result_array[0];
                }
              },
              error => {
                Swal.fire({
                  type: 'error',
                  title: `Non sono trovare a caricare i modelli auto`,
                  text: 'Errore',
                });
              }
          );
      return this.options_areamanager.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  /**
   * filters the name of the points
   * This must necessarily be expressed if a new point is created
   * @param value value of the html input box area_manager
   * @return options_point this array is filled with the received date
   */
  private _filter_nome_point(value: string): string[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.options_point.filter(option => option.toLowerCase().includes(filterValue));
    }
  }


  /**************************************************************************************************************/
  /*************************************************('check')*******************************************************/

  /**************************************************************************************************************/
  /**
   * Verify that I the province inputs are associated correctly
   *
   * @param provinciaIn province to be validated
   * @paramType input html
   * @return error input province if not verified
   */
  validateProvincia(provinciaIn) {
    const provinciaTxt = provinciaIn.target.value;
    const type = provinciaIn.target.name;
    switch (type) {
      case 'provincia':
        if (this.options_province) {
          this.options_comuni = [];
          if (_.includes(this.options_province, provinciaTxt)) {
            this.cityServices.filterCommons(provinciaTxt).valueChanges
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(
                    result => {
                      result.data.filterCities[0].commons.forEach(element => {
                        this.options_comuni.push(element.name);
                      });
                    });
          } else {
            this.verticalStepperStep_personali.controls['province'].setErrors({'province': false});
          }
        }
        break;
      case 'provincia_aziendali':
        if (this.options_province_aziendali) {
          this.options_comuni_aziendali = [];
          if (_.includes(this.options_province_aziendali, provinciaTxt)) {
            this.cityServices.filterCommons(provinciaTxt).valueChanges
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(
                    result => {
                      const result_array: [] = result.data.filterCities[0].commons;
                      result_array.forEach(element => {
                        const e: any = element;
                        this.options_comuni_aziendali.push(e.name);
                      });
                    });
          } else {
            this.verticalStepperStep_aziendali.controls['province'].setErrors({'provincia_aziendali': false});
          }
        }
        break;
      case 'provincia_point':
        if (this.options_province_point) {
          this.options_comuni_point = [];
          if (_.includes(this.options_province_point, provinciaTxt)) {
            this.cityServices.filterCommons(provinciaTxt).valueChanges
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(
                    result => {
                      const result_array: [] = result.data.filterCities[0].commons;
                      result_array.forEach(element => {
                        const e: any = element;
                        this.options_comuni_point.push(e.name);
                      });
                    });
          } else {
            this.verticalStepperStep_point.controls['province'].setErrors({'provincia_point': false});
          }
        }
        break;
    }
  }

  /**
   * Verify that I the municipality inputs are associated correctly
   *
   * @param commonIn municipality to be validated
   * @paramType input html
   * @return error input commons if not verified
   */
  validateComune(commonIn) {
    const commonTxt = commonIn.target.value;
    const type = commonIn.target.name;
    switch (type) {
      case 'common':
        if (this.options_comuni) {

          if (!_.includes(this.options_comuni, commonTxt)) {
            this.verticalStepperStep_personali.controls['common'].setErrors({'common': false});
          }
        }
        break;
      case 'common_aziendali':
        if (!_.includes(this.options_comuni_aziendali, commonTxt)) {
          this.verticalStepperStep_aziendali.controls['common'].setErrors({'common_aziendali': false});
        }
        break;
      case 'common_point':
        if (!_.includes(this.options_comuni_point, commonTxt)) {
          this.verticalStepperStep_point.controls['common'].setErrors({'common_point': false});
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
      if (this.userInput.role) {
        if (this.userInput.role.localeCompare('consultant') === 0) {
          this.hidden_consulente = false;
        }
      }
      if (this.userInput.client_type) {
        if (this.userInput.client_type.localeCompare('Persona fisica') === 0) {
          this.hidden_dati_aziendali = false;
        } else {
          this.hidden_dati_aziendali = true;
        }
      }
      if (this.userInput.area_manager) {
        this.area_manager_input = this.userInput.area_manager.name + this.userInput.area_manager.name;
      }
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }

  // file
  onUploadOutput(output: UploadOutput): void {
    console.log(output.file.nativeFile);
    this.formData1.append('profile', output.file.nativeFile);
    console.log('Added to form data');
  }


  public onStepChange(event: any): void {
  }

  startUpload(_id): void {
    console.log(this.files);
    this.files.forEach(element => {
      return new Promise(async (resolve, reject) => {
        this.userService.upload(element, _id)
            .takeUntil(this._unsubscribeAll)
            .subscribe(
                (res) => {
                  console.log(res);
                  resolve(res);
                },
                (err) => {
                  reject(err);
                  Swal.fire({
                    type: 'error',
                    title: `Non sono trovare a caricare i clienti`,
                    text: 'Errore',
                  });
                }
            );
      });
    });
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({type: 'cancel', id: id});
  }

  removeFile(id: string): void {
    this.uploadInput.emit({type: 'remove', id: id});
  }

  removeAllFiles(): void {
    this.uploadInput.emit({type: 'removeAll'});
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  /** Construction changeStepperDisplay  **/

  /**
   * Call to the DB that loads the names of the points.
   * When it receives the response it loads the names in point_name.
   * @return array_nome_point returns the names of the points filtered by the text entered in the user input
   */
  private loadsPointsName(): void {

    this.userService.ricerca_point().valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(result => {
          this.point = result.data.ricerca_point;
          this.point.forEach(element => {
            if (element._id) {
              this.options_point.push(element._id);
            }
          });
        });
  }

  // ------------------------------------------------------------------------------

  private recoverUser(): void
  {

    // Recover the user from the resolver.
    this.userInput = this.route.snapshot.data.data;
    // When the user is null I create a new one,otherwise I keep id to edit the user.
    if (this.userInput == null) {
      this.userInput = new User();
    } else {
      this.id = this.userInput._id;
    }
  }


  // ------------------------------------------------------------------------------

  private initFormAccountDate(): void
  {
    this.verticalStepperStep_account = this._formBuilder.group({
      email: [this.userInput.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: [this.userInput.password, Validators.required],
      role: [this.userInput.role, Validators.required],
      client_type: [this.userInput.client_type, Validators.required],
      state: [this.userInput.state]
    });
  }

  // ------------------------------------------------------------------------------

  private initFormPersonalDate(): void
  {
    this.verticalStepperStep_personali = this._formBuilder.group({
      name: [this.userInput.name, Validators.required],
      surname: [this.userInput.surname, Validators.required],
      mobile: [this.userInput.mobile],
      title: [this.userInput.title],
      cf: [this.userInput.cf],
      province: [this.userInput.province],
      common: [this.userInput.common],
      cap: [this.userInput.cap],
      address: [this.userInput.address]
    });
  }

  // ------------------------------------------------------------------------------

  private initFormBusinessDate(): void
  {
    this.verticalStepperStep_aziendali = this._formBuilder.group({
      regionesociale: [this.userInput.regionesociale],
      company: [this.userInput.company],
      piva: [this.userInput.piva],
      phone: [this.userInput.phone],
      inizioattivita: [this.userInput.inizioattivita],
      province: [this.sede.province],
      common: [this.sede.common],
      cap: [this.sede.cap],
      address: [this.sede.address]
    });
  }

  // ------------------------------------------------------------------------------

  private initFormPointDate(): void
  {
    this.verticalStepperStep_point = this._formBuilder.group({
      area_manager: [this.area_manager_input],
      point_name: [this.userInput.point_name],
      province: [this.sede_point.province],
      common: [this.sede_point.common],
      cap: [this.sede_point.cap],
      address: [this.sede_point.address]
    });

  }

  // ------------------------------------------------------------------------------


  private changeStepperDisplay(): void
  {
    this.verticalStepperStep_account.controls['client_type'].valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(value => {
          if (value.localeCompare('Persona fisica') === 0) {
            this.hidden_dati_aziendali = false;
          } else {
            this.hidden_dati_aziendali = true;
          }
        });

    this.verticalStepperStep_account.controls['role'].valueChanges
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(value => {
          if (value.localeCompare('consultant') === 0 || (value.localeCompare('point') === 0) || (value.localeCompare('area_manager') === 0)) {
            this.hidden_areamanager = true;
          } else {
            this.hidden_areamanager = false;
          }
          if (value.localeCompare('consultant') === 0) {
            this.hidden_consulente = false;
          }
        });
    // it is not allowed to modify the email if it is an edit
    if (this.userInput.email) {
      this.verticalStepperStep_account.controls['email'].setValue(this.userInput.email);
      this.verticalStepperStep_account.controls['email'].disable();
    }
    // autocomplete input area_manager
    this.autocompletamento_areamanager = this.verticalStepperStep_point.controls['area_manager'].valueChanges
        .pipe(
            startWith(''),
            takeUntil(this._unsubscribeAll),
            map(value => this._filter_areamanager(value))
        );
  }

  // ------------------------------------------------------------------------------
  private areaAutoComplete(): void
  {
    // autocomplete input point_name
    this.filteredPoint = this.verticalStepperStep_point.controls['point_name'].valueChanges
        .pipe(
            startWith(''),
            takeUntil(this._unsubscribeAll),
            map(value => this._filter_nome_point(value))
        );
    // autocomplete province
    this.filteredProvince_point = this.verticalStepperStep_point.controls['province'].valueChanges
        .pipe(
            startWith(''),
            takeUntil(this._unsubscribeAll),
            map(value => this._filter_province_point(value))
        );
    // autocomplete commons
    this.filteredComuni_point = this.verticalStepperStep_point.controls['common'].valueChanges
        .pipe(
            startWith(''),
            takeUntil(this._unsubscribeAll),
            map(value => this._filter_common_point(value))
        );

  }

  // ------------------------------------------------------------------------------

  private businessAutoComplete(): void
  {
    // autocomplete province
    this.filteredProvince_aziendali = this.verticalStepperStep_aziendali.controls['province'].valueChanges
        .pipe(
            startWith(''),
            takeUntil(this._unsubscribeAll),
            map(value => this._filter_province_aziendali(value))
        );
    // autocomplete commons
    this.filteredComuni_aziendali = this.verticalStepperStep_aziendali.controls['common'].valueChanges
        .pipe(
            startWith(''),
            takeUntil(this._unsubscribeAll),
            map(value => this._filter_common_aziendali(value))
        );
  }

  // ------------------------------------------------------------------------------


  private personalAutoComplete(): void
  {
    this.filteredProvince = this.verticalStepperStep_personali.controls['province'].valueChanges
        .pipe(
            startWith(''),
            takeUntil(this._unsubscribeAll),
            map(value => this._filter_province(value))
        );
    // autocomplete commons
    this.filteredComuni = this.verticalStepperStep_personali.controls['common'].valueChanges
        .pipe(
            startWith(''),
            takeUntil(this._unsubscribeAll),
            map(value => this._filter_common(value))
        );
  }

  // ------------------------------------------------------------------------------


}
