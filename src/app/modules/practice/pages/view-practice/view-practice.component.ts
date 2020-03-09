import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UploaderOptions, UploadFile, UploadInput, UploadOutput} from 'ngx-uploader';
import Swal from 'sweetalert2';
import {PracticeService} from '../../../../services/practice.service';
import {Action, Practice} from '../../../../core/models';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FileAzione, NotaAzione} from '../../../../core/models/utility.model';
import {AlertService} from '../../../../services/alert.service';
import {UploadService} from '../../../../services/uload.service';
import {ConsultantActionsService} from '../../../consultant/service/consultant-actions.service';
import {environment} from '../../../../../environments/environment';

type ICallback = ( error: Error , result: any ) => void;


@Component({
    selector: 'app-view-practice',
    templateUrl: './view-practice.component.html',
    styleUrls: ['./view-practice.component.scss']
})
export class ViewPracticeComponent implements OnInit, OnDestroy {

    _unsubscribeAll: Subject<any> = new Subject();


    practice: Practice;
    practice_files = [];
    details;
    status_log = [] ;
    files_data = [];
    offers = [] ;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    options: UploaderOptions;
    notes: String[];
    view_log = [] ;
    to_upload_client_file: any ;
    view_date = new Date() ;
    can_send_to_next_status: boolean ;
    formData: FormData = new FormData();

    fileMap = new Map();

    fileMap2 = new Map();

    tempMap = new Map();


    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private practiceService: PracticeService,
        private alertService: AlertService,
        private uploadService: UploadService,
        private ac: ConsultantActionsService
    ) {
        
        this.files = [];
        this.uploadInput = new EventEmitter<UploadInput>();
        this.practice = new Practice(this.route.snapshot.data.data);
        this.status_log = this.practice.getStatusLog();
        this.notes = this.practice.getNotes();
        this.can_send_to_next_status = this.practice.isAllClientFilesOK();
        if (this.practice.offers.length && ['Leasys'].indexOf(this.practice.offers[0].lessor_location) !== -1){
            this.can_send_to_next_status = this.can_send_to_next_status && this.practice.offers[0].processed > 0;
        }
        this.view_log = this.practice.getViewLog();

        const vals = this.practice.getView();

        this.details = Object.entries(this.practice.getView()).map(([key, value]) => ({key, value}));

        console.log('Details');

        console.log(vals);

        this.practice_files = this.practice.getFiles();
        this.offers = this.practice.offers ;

        console.log(this.practice.offers);

        console.log(this.practice_files);

        console.log(' ----------------------- Prea ---------------------------------');
        console.log(this.practice);

        this.addDone();
    }

    /**********************************************************************************************************/


    ngOnInit(): void {

    }

    /**********************************************************************************************************/


    refresh(): void {
        console.log('refresh');
    }

    /**********************************************************************************************************/


    saveNote(note): void {
        
        this.practiceService.addNote(this.practice, note.value)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                result => {
                    if (this.practice.state === 'SVILUPPA_RENT_REJECTED_BACK_OFFICE'){
                        this.ac.changeStatus({_id: this.practice._id}, 'SVILUPPA_RENT_ACCEPTED').then(r => {
                            this.alertService.alert('success', 'Saves', 'Note was Added');
                        });
                    }else{
                        this.refresh();
                        note.value = '';
                        this.alertService.alert('success', 'Saves', 'Note was Added');
                    }

                    this.router.navigate(['/practice/view/' + this.practice._id ]);

                },
                error => {
                    this.alertService.alert('error', 'Oops', 'Something went wrong');
                }
            );
    }

    // /**************************************************************************************************************/

    // /*************************************************('download file')*******************************************************/

    // /**************************************************************************************************************/

    downloadFile(fileName): void {

        console.log('This is file');

        console.log(fileName);
        
        const url = environment.apiUrl + '/download1?file=' + fileName;

        window.open(url, 'download');
    }

    /**************************************************************************************************************/

    /*************************************************('view selector')*******************************************************/

    /**************************************************************************************************************/

    /**********************************************************************************************************/

    /*****************************************('UPLOAD METHOD')************************************************/

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
                  this.fileMap2.set(item.fileKey, temp);
                    // this.attaches_data[item.fileKey].file = {name: item.fileName, path: 'Path', type: 'type', size: 123, key: 'offer_file', date: new Date() };
                }
               // console.log(this.uploadedFile);
                callback( null, true);
            }
        });
    }

    /**********************************************************************************************************/


     uploadClientFile(event, target, btn): void {

         target.file = event.file.nativeFile;

         target.isUploded = 'waiting';

         console.log(target.key);

         this.fileMap.set(target.key, target.file);

         console.log(this.fileMap.size);

         console.log(this.fileMap.get(target.key));

          this.checkOnFiles();

         console.log(this.can_send_to_next_status);
    }


    /**********************************************************************************************************/


    commitClientFiles(noteInput): void{

         this.loading = true;

         this.fileMap.forEach((value: any, key: any) => {
             this.formData.append(key, value);
         });

         this.uploadAttaches((error: Error, result: any) => {

             if (result){

                 this.addKey(noteInput);


             }else{
                 this.alertService.alert('error', 'Oops!', 'Something went wrong uploading the file');
             }

         });
    }

    /**********************************************************************************************************/


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**********************************************************************************************************/

    checkOnFiles(): void {
         for (const file of this.practice_files){
             if (!file.file && file.required){
                 return;
             }
         }

         this.can_send_to_next_status = true;
    }


    /**********************************************************************************************************/


    private addDone() {
        for (const file of this.practice_files){
            if (file.file){
                file.isUploded = 'done';
            }
        }
    }

    /**********************************************************************************************************/

    updatePracticeStatus(noteInput: any): void{
        this.practiceService.commitClientFiles(this.practice, noteInput.value)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                data => {
                    this.alertService.alert('success', 'Done', 'Practice moved to the next state');
                    this.practice.state = 'READY_ESTIMATE' ;
                    this.router.navigate(['/consultant/estimates/accepted']);
                },
                error => {
                    this.alertService.alert('error', 'Ooops', 'Something went wrong');
                }
            );
    }

    /**********************************************************************************************************/


    addUserFile(value: any, callBack: ICallback): void{
         // let res = false;
        this.practiceService.addUserFile(this.practice, value, this.view_date).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                result1 => {

                    console.log(result1);

                  callBack(null, true);
                },
                error1 => {
                    callBack(error1, false);
                }
            );

    }

    /**********************************************************************************************************/


    addKey(note: any): void{

         console.log(this.fileMap2.size);

         if (this.fileMap2.size > 0){

             const key = this.fileMap2.keys().next().value;

             const value = this.fileMap2.get(key);

             const res = this.addUserFile(value, (error: Error, result: any ) => {

                 if (result){
                     console.log('EEE');
                     this.fileMap2.delete(key);

                     console.log(this.fileMap2.size);

                     this.addKey(note);
                 }else {
                     console.log(error);
                 }

             });

         }else {

             this.updatePracticeStatus(note);
        }

    }

    /**********************************************************************************************************/

}
