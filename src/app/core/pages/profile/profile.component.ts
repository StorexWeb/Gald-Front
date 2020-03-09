// Angular imports
import {Component, ElementRef, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
// Model import
import {User} from '../../models';
import {UserService} from 'app/services/user.service';
// Other import

import {UploadOutput} from 'ngx-uploader';
import {AppConfig} from '../../../config/app.config';
import {AlertService} from '../../../services/alert.service';
import {AuthenticationService} from '../../../services';
import {UploadService} from '../../../services/uload.service';

type ICallback = ( error: Error , result: any ) => void;


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {

    @ViewChild('imageInput') imageInput: ElementRef;

    _unsubscribeAll: Subject<any> = new Subject();
    fileImage;
    profileForm: FormGroup;
    user: User;
    url_image: string;
    imageProfile_user;
    files;
    dragOver;
    image;
    formData: FormData = new FormData();

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private uploadService: UploadService
    ) {

        /**
         * Call to the DB that loads the names of the points.
         * When it receives the response it loads the names in point_name.
         * @return array_nome_point returns the names of the points filtered by the text entered in the user input
         */

        this.user = this.authenticationService.getUser();
        // When the user is null I create a new one,otherwise I keep id to edit the user.

        if (this.user && this.user.profile_img) {
            this.url_image = AppConfig.endpoints.profile_img +  this.user.profile_img;
        } else {

            this.url_image = `${AppConfig.endpoints.profile_img}?id=default`;
        }

        /**************************************************************************************************************/
        /**********************************('init form account date')**************************************************/
        /**************************************************************************************************************/
        this.profileForm = this.formBuilder.group({
            password: ['',],
            name: [this.user.name, Validators.required],
            surname: [this.user.surname, Validators.required],
            mobile: [this.user.mobile],
            phone: [this.user.phone],
      });
    }

    ngOnInit(): void{}

    changeImage(): void{
        let el: HTMLElement = this.imageInput.nativeElement;
        el.click();
        this.fileImage = event;

        console.log(event);
    }

    onUploadOutput(event, output: UploadOutput  = null ): void {

        console.log('This is event');
       // console.log(event.file.nativeFile);

        this.formData.append('file', event.file.nativeFile);


        console.log(event);

        //console.log(output);


        this.files=[];
        this.files.push(event.file);
        this.imageProfile_user = event.file.name;
        const reader = new FileReader();
        console.log(event.file.nativeFile);
        reader.readAsDataURL(event.file.nativeFile); // read file as date url
        reader.onload = (event) => { // called once readAsDataURL is completed
            let a: any = event.target;
            this.url_image = a.result;
        };


        //
        // if (event.target.files.length > 0){
        //
        //     console.log('From Profile');
        //
        //     console.log(event.target.files[0]);
        //
        //     this.image = event.target.files[0];
        // }

        // console.log(output);
        // if (output.type === 'allAddedToQueue') { // when all files added in queue
        // }
        // else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
        //     let n = output.file.type.search("application");
        //     if (n < 0) {
        //         this.files=[];
        //         this.files.push(output.file);
        //         this.imageProfile_user=output.file.name;
        //         const reader = new FileReader();
        //         console.log(output.file.nativeFile);
        //         reader.readAsDataURL(output.file.nativeFile); // read file as date url
        //         reader.onload = (event) => { // called once readAsDataURL is completed
        //             let a: any = event.target;
        //             this.url_image = a.result;
        //         };
        //     } else {
        //         Swal.fire({
        //             type: 'error',
        //             title: `Non puoi caricare file exe`,
        //             text: 'Errore',
        //         });
        //     }
        // } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
        //     // edit current date in files array for uploading file
        //     console.log(output,'uploadinf');
        //     const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
        //     this.files[index] = output.file;
        // } else if (output.type === 'removed') {
        //     // remove file from array when removed
        //     this.files = this.files.filter((file: UploadFile) => file !== output.file);
        // } else if (output.type === 'dragOver') {
        //     this.dragOver = true;
        // } else if (output.type === 'dragOut') {
        //     this.dragOver = false;
        // } else if (output.type === 'drop') {
        //     this.dragOver = false;
        // }
    }

    submit(): void{
      if (!this.profileForm.valid) {
        return ;
      }


      this.uploads((error: Error, result: any) => {

          if (result){
              this.userService.updateProfile({...this.profileForm.value, profile_img: this.imageProfile_user}).subscribe(
                  res => {
                      this.authenticationService.refreshLoadedUser();
                      this.alertService.alert('success', 'Edited', 'Ypur profile was edited successfully');
                      //this.router.navigate(['/']).then(r => console.log('Hi'));
                      // console.log("Pimg: " + pimg);
                  },
                  err => {
                      this.alertService.alert('error', 'Oops!', 'Something went wrong.');
                  }
              );

          }else{
              this.alertService.alert('error', 'Oops!', 'Something went wrong.');
          }


      });




    }

    // ----------------------------




    uploads(callback: ICallback): void {
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
                    this.imageProfile_user = item.fileName;

                    // this.attaches_data[item.fileKey].file = {name: item.fileName, path: 'Path', type: 'type', size: 123, key: 'offer_file', date: new Date() };
                }

                console.log(this.imageProfile_user);
                callback( null, true);

            }

        });

    }





    // ----------------------------

    async uploadProfileImage(): Promise<any> {
      return new Promise((resolve, reject) => {
        if (!this.files) {

            return resolve(false);
        }
        this.uploadService.upload(this.files[0], 'avatar').subscribe(
            data => {
              resolve(data) ;
              console.log(data, "Data");
            },
            error => {
              reject(error);
            }
        );
      });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
