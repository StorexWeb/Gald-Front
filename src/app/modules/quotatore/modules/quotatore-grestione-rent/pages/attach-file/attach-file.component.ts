import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import {UploadService} from '../../../../../../services/uload.service';
import {AuthenticationService} from '../../../../../../services';
import {PracticeService} from '../../../../../../services/practice.service';
import {AlertService} from '../../../../../../services/alert.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Practice} from '../../../../../../core/models';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/internal/operators';
import {map, startWith} from 'rxjs/operators';

type ICallback = ( error: Error , result: any ) => void;

@Component({
  selector: 'app-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss']
})

export class AttachFileComponent implements OnInit {

  formData = new FormData();

  fileMap = new Map();

  tempIndex = 0;

  from: any;


  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private uploadService: UploadService,
      private authenticationService: AuthenticationService,
      private practiceService: PracticeService,
      private alertService: AlertService,
      private formBuilder: FormBuilder
  ) {
    this.practice = this.route.snapshot.data.data;
    this._unsubscribeAll = new EventEmitter();
    this.from = route.snapshot.paramMap.get('from');

    console.log(this.practice);
}

  practice: Practice;
  _unsubscribeAll: Subject<any>;
  files = [];
  files_data = [];
  offers_array = [] ;
  offers_ids = [];
  errors = [] ;
  filteredCL = {};
  form = {} ;
  options_CL: string[] = ['Arval', 'Athlon', 'Leaseplan', 'Leasys', 'Ald'];
  lessValue: any;

  ngOnInit(): void{
    this.addOffer();
  }

  // --------------------------------------------------------------------------------------

  async submit(): Promise<any> {

    this.errors = [] ;
    this.offers_array = [] ;
    this.offers_ids.forEach((id) => {
      this.offers_array.push(this.form[id].value);
    });

    console.log(this.offers_array);

    this.uploadFiles((error: Error , result: any ): void => {
      if (result){
        this.practiceService.createEstimate(this.practice._id, this.offers_array).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                res => {
                    this.alertService.alert('success', 'Success', 'Estimate Created');
                    this.router.navigate(['quotatore/grestione/rent-ald']);
                },
                error1 => {
                  this.alertService.alert('error', 'Oops!', 'Something went wrong.');
                }
            );
      } else{
        this.alertService.alert('error', 'Oops!', 'Error Uploading files');
      }
    });

  }


  // --------------------------------------------------------------------------------------


  uploadFiles(callback ?: ICallback): void {

    console.log('First Offer Array', this.offers_array)

    let index = 0;

    this.fileMap.forEach((value: any, key: any) => {
      this.formData.append(String(index), value);
      index++;
    });
    // Send Form Data
    this.uploadService.uploadMany(this.formData, 'offer', (error: Error , result: any): void => {

      if (error != null){
        callback( null, false);
      }else {

        this.offers_array[0].file =  {name: result.data[0].fileName, path: 'Path', type: 'type', size: 123, key: 'offer_file', date: new Date() } ;

        if (result.data.length > 1){
          this.offers_array[0].extraFile = {name: result.data[0].fileName, path: 'Path', type: 'type', size: 123, key: 'offer_file', date: new Date() };
        }


        console.log(this.offers_array);

        callback(null, true);
      }
    });
  }

  // --------------------------------------------------------------------------------------


  ngOnDestroy(): void {
    this._unsubscribeAll = new Subject();
  }


  // --------------------------------------------------------------------------------------


  changeFiles(event, offer): void {

   let formDataKey = offer + event.length;

    console.log(formDataKey);

    if (event.length > 2){
      event[1] = event[event.length - 1];
      event.splice(event.length - 1, 1);
    }

    const file = event[event.length - 1].nativeFile;


    this.fileMap.set(formDataKey , file);


  }

  // --------------------------------------------------------------------------------------



  addOffer(): void {

    this.tempIndex = 0;

    const temp_id = Math.random().toString(36).substr(2, 9) ;

    this.form[temp_id] = this.formBuilder.group({
      'lessor_location': ['', Validators.required],
      'idCasaLocatrice': ['', Validators.required],
      'discount': [0, Validators.required],
      'commission': ['', Validators.required],
      'note': ['']
    });
    this.addAutoCompleteListener(temp_id);
    this.offers_ids.push(temp_id) ;
  }

  // --------------------------------------------------------------------------------------


  addAutoCompleteListener(temp_id): void {
    this.filteredCL[temp_id] = this.form[temp_id].controls['lessor_location'].valueChanges
        .pipe(
            startWith(''),
            takeUntil(this._unsubscribeAll),
            map(value => this._filter(this.options_CL, value))
        );
  }

  // --------------------------------------------------------------------------------------


  removeOffer(id): void {
    this.offers_ids = this.offers_ids.filter((elm) => elm !== id);
    delete this.form[id];
    delete this.filteredCL[id];
  }

  // --------------------------------------------------------------------------------------


  _filter(list, val): any {
    if (!val) {
      return;
    }
    return list.filter(option => option.toLowerCase().includes(val.toLowerCase()));
  }

  // --------------------------------------------------------------------------------------


  changeClient(value: any): void {
    console.log(value);
    this.lessValue = value;
  }

}
