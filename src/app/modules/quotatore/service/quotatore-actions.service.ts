import {Injectable} from '@angular/core';
import {PracticeService} from '../../../services/practice.service';
import {AlertService} from '../../../services/alert.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Router} from '@angular/router';

@Injectable()

export class QuotatoreActionsService {

    constructor(
        private practiceService: PracticeService,
        private alertService: AlertService,
        private router: Router,
    ) { }

    run(event): Promise<any> {
        console.log(event);
        switch (event.action.action) {

            // Reject a Request: changes the practice status into REJECTED_REQUEST
            case 'reject_request': return this.rejectRequest(event) ;
            case 'client_reject': return this.clientReject(event) ;
            // Print a Request : generate pdf contains the request data
            case 'print': return this.print(event);
            case 'activate': return this.activate(event);

            case 'accept_gra': return this.changeStatus(event, 'SVILUPPA_RENT_ACCEPTED');

            case 'accept_without_offer': return this.changeStatus(event, 'SVILUPPA_RENT_ACCEPTED');


            case 'reject_gra': return this.changeStatus(event, 'SVILUPPA_RENT_REJECTED');

            // if the action is not known, reject with error message
            default : return new Promise<any>((resolve, reject) => { reject('Action is not known'); });
        }
    }

    rejectRequest(event): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.practiceService.rejectRequest(event._id, '')
                .subscribe(
                    result => {
                        this.alertService.alert('success', 'Refused!', `Request Refused Successfully` );
                        resolve(result);
                    },
                    error => {
                        this.alertService.alert('error', 'Oops !', error.msg);
                        reject(error);
                    }
                );
        });
    }

    clientReject(event): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.practiceService.clientReject(event._id, '')
                .subscribe(
                    result => {
                        this.alertService.alert('success', 'Refused!', `Request Refused Successfully` );
                        resolve(result);
                    },
                    error => {
                        this.alertService.alert('error', 'Oops !', error.msg);
                        reject(error);
                    }
                );
        });
    }

    activate(event): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.practiceService.activatePractice(event._id)
                .subscribe(
                    result => {
                        this.alertService.alert('success', 'Refused!', `Request Refused Successfully` );
                        resolve(result);
                    },
                    error => {
                        this.alertService.alert('error', 'Oops !', error.msg);
                        reject(error);
                    }
                );
        });
    }


    // TODO REMAKE IN A BETTER WAY
    print(event): Promise<any> {
        return new Promise((resolve, reject) => {
            // TODO get the element using an other way
            const data = document.getElementById('tableDetails') ;
            html2canvas(data).then(canvas => {
                const imgWidth = 208;
                const imgHeight = canvas.height * imgWidth / canvas.width ;
                const contentDataURL = canvas.toDataURL('image/png') ;
                const pdf = new jsPDF('p', 'mm', 'a4');
                const position = 0 ;
                pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight) ;
                pdf.save('MYPdf.pdf');
            });
            resolve('OK');
        });
    }


    changeStatus(event, status): Promise<any> {

        console.log(event);

        return new Promise(async (resolve, reject) => {

            this.practiceService.changeStatus(event._id, status).subscribe(
                data => {
                    resolve(data);
                    if (event.action.action != 'accept_gra') {
                        this.alertService.alert('success', 'Done !', 'Status Changed to ' + status);
                    }
                },
                error => {
                    this.alertService.alert('error', 'Oops!', 'Something went wrong!');
                    reject(error);
                }
            );

        });
    }


}
