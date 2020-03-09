import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface KeyValue {
    key: any;
    value: any;
};

@Component({
    selector: 'app-details-show-windows',
    templateUrl: './details-show-windows.component.html',
    styleUrls: ['./details-show-windows.component.scss']
})
export class DetailsShowWindowsComponent implements OnInit {

    @Input() dataSource: KeyValue[] = [];

    labels = ['DESCRIZIONE', 'VALORE'];
    keys = ['key', 'value'];


    constructor(public dialogRef: MatDialogRef<DetailsShowWindowsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: KeyValue[]
    ) {
        if (this.data) {
            this.dataSource = data ;
            console.log(this.data);
        }
    }

    ngOnInit(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

