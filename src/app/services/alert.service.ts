import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable()

export class AlertService {

    constructor() { }


    alert(type, title, msg): void {

        Swal.fire({
            type: type,
            title: title,
            text: msg,
            timer: 1500
        });

    }

    confirm(type, title, msg, confirm_btn_txt): Promise<any> {

        let confirm_btn_color = 'green' ;
        const cancel_btn_color = '#d33' ;
        if (['warning', 'error'].indexOf(type) !== -1) {
            confirm_btn_color = '#3085d6' ;
        }

        return Swal.fire({
            title: title,
            text: msg,
            type: type,
            showCancelButton: true,
            confirmButtonColor: confirm_btn_color,
            cancelButtonColor: cancel_btn_color,
            confirmButtonText: confirm_btn_txt
        });
    }


}
