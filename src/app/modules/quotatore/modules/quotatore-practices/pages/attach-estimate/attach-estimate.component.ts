// angular
import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
// Model
import {Practice} from '../../../../../../core/models';
import {UploadService} from '../../../../../../services/uload.service';
import {PracticeService} from '../../../../../../services/practice.service';
import {takeUntil} from 'rxjs/internal/operators';
import {Observable, Subject} from 'rxjs';
import {AuthenticationService} from '../../../../../../services';
import {AlertService} from '../../../../../../services/alert.service';
import {FormBuilder, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

type ICallback = ( error: Error , result: any ) => void;



@Component({
  selector: 'app-attach-estimate',
  templateUrl: './attach-estimate.component.html',
  styleUrls: ['./attach-estimate.component.scss']
})
export class AttachEstimateComponent implements OnInit, OnDestroy {

    formData = new FormData();

    fileMap = new Map();

    tempIndex: number = 0;

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
                     this.router.navigate(['quotatore/received/requests']);
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
                for (const item of result.data){

                    console.log(item);

                    this.offers_array[item.fileKey].file = {name: item.fileName, path: 'Path', type: 'type', size: 123, key: 'offer_file', date: new Date() };
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
      if (event.length > 1){
          event[0] = event[event.length - 1];
          event.splice(event.length - 1, 1);
      }

      const file = event[0].nativeFile;


      this.fileMap.set(offer , file);
  }

    // --------------------------------------------------------------------------------------



    addOffer(): void {

      this.tempIndex = 0;

      const temp_id = Math.random().toString(36).substr(2, 9) ;

      this.form[temp_id] = this.formBuilder.group({
          'lessor_location': ['', Validators.required],
          'idCasaLocatrice': ['', Validators.required],
          'discount': ['', Validators.required],
          'commission': ['', Validators.required]
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
