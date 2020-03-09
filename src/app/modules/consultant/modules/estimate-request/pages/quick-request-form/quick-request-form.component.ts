//angular
import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {UploaderOptions, UploadInput, UploadFile, UploadOutput} from 'ngx-uploader';
import {Observable} from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {PracticeService} from '../../../../../../services/practice.service';
import {UserService} from 'app/services/user.service';
import {MatStepper} from '@angular/material/stepper';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Practice, User} from '../../../../../../core/models';
import {MatDialog} from '@angular/material';
import {AuthenticationService} from '../../../../../../services';
import {DetailsShowWindowsComponent} from '../../../../../../shared/components/details-show-windows/details-show-windows.component';
import {AlertService} from '../../../../../../services/alert.service';
import {UploadService} from '../../../../../../services/uload.service';

type ICallback = ( error: Error , result: any ) => void;

@Component({
    selector: 'app-quick-request-form',
    templateUrl: './quick-request-form.component.html',
    styleUrls: ['./quick-request-form.component.scss']
})



export class QuickRequestFormComponent implements OnInit {
    @ViewChild('stepper') stepper: MatStepper;


    note: String ;
    options: UploaderOptions;
    files: UploadFile[] = [];
    form: FormGroup;
    clients = [] ;
    allFiles = [];
    client_name: String ;
    attaches = [] ;
    attaches_data = [];
    clientFiles = []
    clientFilesData = [] ;
    allClientFilesOk ;
    to_upload_client_file ;
    // Stepper FORM
    verticalStepperStep1: FormGroup;
    verticalStepperStep2: FormGroup;
    verticalStepperStep3: FormGroup;

    uploadInput: EventEmitter<UploadInput>;

    // RELATIVE COMPONENT
    practice: Practice = new Practice();
    practice_data: object ;
    filteredCliente: Observable<string[]>;
    filteredMarca: Observable<string[]>;
    options_marca: string[] = [];
    filteredModello: Observable<string[]>;
    options_modello: string[] = [];
    filteredAlimentazione: Observable<string[]>;
    options_alimentazione: string[] = ['Disel', 'Benzina', 'Metano', 'Gpl', 'Ibrida', 'Elettrica'];
    filteredOptional: Observable<string[]>;
    options_optional: string[] = ['City Braking', 'Hill Assist', 'Cruidr control', 'Start&Stop', 'Fari full led'];
    filteredCL: Observable<string[]>;
    options_CL: string[] = ['Arval', 'Athlon', 'Leaseplan', 'Leasys'];
    options_Mesi: number[] = [];
    options_KM: number[] = [];
    options_FR: number[] = [0, 150, 250];
    options_FF: number[] = [0, 5, 10];
    options_FC: number[] = [0, 250, 500, 1000, 1500, 1800];
    car_optional: string[] = [];
    // edit
    id: string;
    details: any[] = [];
    update: boolean = true;
    private fileMap: any = new Map();
    private formData: FormData = new FormData();

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private practiceService: PracticeService,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private uploadService: UploadService
    ) {
        this.practice = new Practice(this.route.snapshot.data.data);
        this.allClientFilesOk = this.practice.isAllClientFilesOK();
        this.clientFiles = this.practice.getClientFilesView();
    }

    ngOnInit(): void {
        
        this.stepper.selectionChange.subscribe(selection => {
            if (selection.selectedIndex === 5) {
                this.showPracticePreview();
            }
        });

        if (this.practice._id) {
            this.client_name = this.practice.client.name + ' ' + this.practice.client.surname;
            this.note = this.practice.getNote();
        }

        // TODO move to view
        for (let i = 12; i <= 60; i++) {
            this.options_Mesi.push(i);
        }
        // TODO move to view
        for (let k = 5000; k <= 200000; k += 5000) {
            this.options_KM.push(k);
        }

        this.initForm();
        this.initAutoCompleteListeners();
        this.loadCars();
        this.note = this.practice.getNote();
    }

    loadCars(): void {
        this.practiceService.getCars().valueChanges.subscribe(
            result => {
                result.data.getCars.forEach(element => {
                    this.options_marca.push(element.brand);
                    element.models.forEach(model => {
                        this.options_modello.push(model);
                    });
                });
            },
            error => {
                this.alertService.alert('error', `Non sono trovare a caricare i modelli auto`, 'Errore');
            }
        );
    }

    initAutoCompleteListeners(): void {

        this.filteredCliente = this.verticalStepperStep1.controls['client'].valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter_client(value))
            );
        this.filteredMarca = this.verticalStepperStep2.controls['brand'].valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter_marca(value))
            );

        this.filteredModello = this.verticalStepperStep2.controls['model'].valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(this.options_modello, value))
            );

        this.filteredAlimentazione = this.verticalStepperStep2.controls['supply'].valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(this.options_alimentazione, value))
            );

        this.filteredOptional = this.verticalStepperStep2.controls['optional'].valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(this.options_optional, value))
            );

        this.filteredCL = this.verticalStepperStep3.controls['preference_lessee_location'].valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(this.options_CL, value))
            );
    }

    initForm(): void {

        this.verticalStepperStep1 = this.formBuilder.group({
            client: [this.client_name],
        });

        this.verticalStepperStep2 = this.formBuilder.group({
            infocar: [this.practice.infocar],
            brand: [this.practice.brand],
            model: [this.practice.model],
            supply: [this.practice.supply],
            preparation: [this.practice.preparation],
            optional: [this.practice.optional],
        });

        this.verticalStepperStep3 = this.formBuilder.group({
            duration: [this.practice.duration],
            kilometres: [this.practice.kilometres],
            commission: [this.practice.commission],
            advance: [this.practice.advance],
            preference_lessee_location: [this.practice.preference_lessee_location],
            product: [this.practice.product],
            constructor_code: [this.practice.constructor_code],
            franchigia_rca: [this.practice.franchigia_rca],
            theft_deductible: [this.practice.theft_deductible],
            kasko_franchise: [this.practice.kasko_franchise],
            replacement_car: [this.practice.replacement_car],
            tire_replacement: [this.practice.tire_replacement],
            fuel_card: [this.practice.fuel_card],
            delivery_location: [this.practice.delivery_location],
            note: [this.note],
        });

    }

    viewClientDetails(index): void {
        const details = Object.entries(this.clients[index]).map(([key, value]) => ({key, value}));
        this.dialog.open(DetailsShowWindowsComponent, {
            width: '550px',
            height: '550px',
            data: details
        });
    }

    addOptional(optional): void {
        this.car_optional.push(optional.value);
        this.verticalStepperStep2.controls['optional'].reset();
    }

    deleteOptional(optional): void {
        this.car_optional.splice(this.car_optional.indexOf(optional), 1);
    }

    showPracticePreview(): void {

        this.practice_data = {
            ...this.verticalStepperStep2.value,
            ...this.verticalStepperStep3.value,
            optional: this.car_optional,
            client: this.practice.client._id
        };

        this.details = Object.entries(this.practice_data).map(([key, value]) => ({key, value}));

        this.note = this.practice_data['note'] ;
        delete this.practice_data['note'];

    }

    submit(): void {

        if (this.practice._id) {
             this.edit() ;
        }

         this.create();
    }

    create(): void {

        this.uploadAttaches(( error: Error , result: any ): void => {
            if (result) {
                console.log('------');
                console.log(this.practice_data);
                console.log(this.attaches_data);
                console.log('------');
                this.practiceService.createQuick(this.practice_data, this.note, this.attaches_data, this.allFiles).subscribe(
                    result1 => {
                        this.alertService.alert('success', 'Success', 'Inseriemento: effettuato correttemante!');
                        this.router.navigate(['consultant/quick/requests/sent']);
                    },
                    error1 => {
                        this.alertService.alert('error', 'Oops!', 'Something went wrong.');
                    }
                );

            } else {
                this.alertService.alert('error', 'Oops!', 'Something went wrong.');
            }
        });
    }

    // ----------------------------------------------------------------------------------

    async edit(): Promise<any> {
        this.alertService.alert('warning', 'Oops', 'This feature is not done yet :(');
    }

    /**********************************************************************************************************/
    /*****************************************('UPLOAD METHOD')************************************************/
    /**********************************************************************************************************/

    changeAttaches(event): void{
        this.attaches = event ;
    }

    // async uploadAttaches(): Promise<any> {
    //     return new Promise(async (resolve, reject) => {
    //         let _error = false ;
    //         for (let i = 0; i < this.attaches.length; ++i) {
    //             const data = await this.uploadService.upload(this.attaches[i], 'practice').toPromise();
    //             if (data.data) {
    //                 const {type, size, name} = this.attaches[i];
    //                 this.attaches_data.push({name: name, path: data.data.createFile, type: type, size: size, date: new Date()});
    //             }else {
    //                 _error = true ;
    //                 break ;
    //             }
    //         }
    //         if (_error) {
    //             return reject('error');
    //         }
    //         return resolve('done');
    //     });
    // }
    // ---------------------------------------------------------------------------

    uploadAttaches(callback: ICallback): void
    {
        let data = null;

        this.uploadService.uploadMany(this.formData, 'gg', (error, result) => {
            if (error != null){
                console.log('Any');
                callback( null, false);
            }else {

                console.log('Success');

                data = result;

                console.log(result);

                for (const item of result.data){
                    console.log(item);
                    let temp = {
                        name: item.fileName,
                        path: 'Any',
                        size: 11,
                        type: 'File',
                        key: item.fileKey,
                        date: new Date()
                    };
                    // this.attaches_data.push({name: temp.name, path: temp.path, type: temp.type, size: temp.size, date: new Date()});
                    this.allFiles.push({name: temp.name, path: temp.path, type: temp.type, size: temp.size, date: new Date(), key: temp.key});
                }
                // console.log(this.uploadedFile);
                callback( null, true);
            }
        });
    }

    // ----------------------------------------------------


     uploadClientFile(event, target, btn): void  {
        
        target.file = event.file.nativeFile;

        target.isUploded = 'waiting';

        console.log(target.key);

        this.fileMap.set(target.key, target.file);

        console.log(this.fileMap.size);

        console.log(this.fileMap.get(target.key));

        this.formData.append(target.key, target.file);

        // this.checkOnFiles();
        // console.log(this.can_send_to_next_status);
    }


    /**********************************************************************************************************/
    /*****************************************('FILTERS')************************************************/
    /**********************************************************************************************************/

    _filter_client(value: string): string[] {
        if (!value) {
            return ;
        }
        this.userService.client_autocomplete(value).valueChanges.subscribe(
            result => {
                this.clients = result.data.client_autocomplete ;
                this.practice.client = this.clients[0];
            },
            error => {
                this.alertService.alert('error', `Non sono trovare a caricare i modelli auto`, 'Errore');
            }
        );

        return this.clients.map((elm) => elm.name + ' ' + elm.surname)
            .filter(opt => opt.toLowerCase().includes(value.toLowerCase()));
    }


    _filter(list, val): any {
        if (!val) {
            return ;
        }
        return list.filter(option => option.toLowerCase().includes(val.toLowerCase()))
    }

    // selezionando una brand verrà poi modificato il valore della tendina contenente i modelli solo della brand selezionata

    _filter_marca(value: string): string[] {
        if (value) {
            this.practiceService.filteredBrands(value).valueChanges.subscribe(
                result => {
                    this.options_marca = [];
                    result.data.filteredBrands.forEach(element => {
                        if (element.brand.toLowerCase().includes(value)) {
                            this.options_marca.push(element.brand);
                            this.options_modello = element.models;
                        }
                    });
                },
                error => {
                    this.alertService.alert('error', `Non sono trovare a caricare i modelli auto`, 'Errore');
                }
            );
            return this._filter(this.options_marca, value);
        }
    }

}
