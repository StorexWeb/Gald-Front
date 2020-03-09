import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UploaderOptions, UploadFile, UploadInput, UploadOutput} from 'ngx-uploader';
import {Practice} from '../../../core/models';
import {Subject} from 'rxjs';
import {UploadService} from '../../../services/uload.service';

@Component({
    selector: 'app-fileinput',
    templateUrl: './fileinput.component.html',
    styleUrls: ['./fileinput.component.scss']
})
export class FileinputComponent implements OnInit, OnDestroy {

    @Input() practice: Practice;
    @Input() save_btn = true;
    @Input() multiple = true;
    @Input() deleted = true;

    @Output() refresh = new EventEmitter<any>();
    @Output() onSave = new EventEmitter();
    @Output() onChange = new EventEmitter();

    private _unsubscribeAll: Subject<any>;

    public uploadInput: EventEmitter<UploadInput>;

    public options: UploaderOptions;
    public files: UploadFile[] = [];
    public dragOver: boolean;

    constructor(private uploadService: UploadService) {
        this.uploadInput = new EventEmitter<UploadInput>();
        this._unsubscribeAll = new Subject();

    }

    ngOnInit(): void {
    }

    onUploadOutput(output: UploadOutput): void {

        if (output.type === 'allAddedToQueue') {
            this.change();
        }
        else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
            this.files.push(output.file);
        }
        else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            // edit current date in files array for uploading file
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
        }
        else if (output.type === 'removed') {
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
            this.change();
        }
        else if (output.type === 'dragOver') {
            this.dragOver = true;
        }
        else if (output.type === 'dragOut') {
            this.dragOver = false;
        }
        else if (output.type === 'drop') {
            this.dragOver = false;
        }
    }

    save(): void {
        this.onSave.emit(this.files);
    }

    change(): void {
        this.onChange.emit(this.files);
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
}
