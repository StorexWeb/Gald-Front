import {EventEmitter, Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {Headers, ResponseContentType} from '@angular/http';
import {AppConfig} from '../config/app.config';
import {HttpClient} from '@angular/common/http';


type ICallback = ( error: Error , result: any ) => void;


@Injectable()
export class UploadService
{



    public uploading = new EventEmitter();

    public fileName: any;

    constructor(private apollo: Apollo, private http: HttpClient) {
       // this.fileName = 'any;"
    }

    private _upload = gql`
      mutation createFile($file: Upload, $path: String){
        createFile(file: $file, path: $path)
      }
    `;
 
    upload(file, path): any {
        const formData = new FormData();
        formData.append('profile', file);
        formData.append('path', path);

        console.log(formData.get('profile'));
        console.log(file);


        this.http.post('http://192.168.1.103:3000/file', formData).subscribe(
            (res) => {
                this.fileName = res;
                console.log('From Service');
                console.log(res);
                return res;
            },
            (err) => {
                console.log(err);
                return false;
            }
        );
    }



    uploadMany(formData: FormData, path , callBack: ICallback): any {
        this.http.post(AppConfig.endpoints.upload, formData).subscribe(
            (res) => {
                console.log('From Service');
                console.log(res);
                callBack(null, res);
                return res;
            },
            (err) => {
                console.log(err);
                callBack(err, null);
                return false;
            }
        );
    }



    download(file): any {
        const formData = new FormData();
        formData.append('file', file.name);
        formData.append('path', file.path);
        return this.http.get(AppConfig.endpoints.download, {
            params: {
                file: file
            }
        });
    }
}
