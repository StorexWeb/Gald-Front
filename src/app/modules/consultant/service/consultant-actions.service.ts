import {Injectable} from '@angular/core';
import {PracticeService} from '../../../services/practice.service';
import {AlertService} from '../../../services/alert.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable()

export class ConsultantActionsService {

    constructor(
        private practiceService: PracticeService,
        private alertService: AlertService,
    ) { }

    run(event): Promise<any> {

        console.log('event');


        console.log(event);
        switch (event.action.action) {

            // Delete Request : Deletes a request
            case 'delete': return this.deleteRequest(event);
            // Print a Request : generate pdf contains the request data
            case 'print': return this.print(event);

            case 'accept_estimate': return this.acceptEstimate(event);
            case 'reject_estimate': return this.rejectEstimate(event);
            case 'trash_loaded_estimate': return this.trashLoadedEstimate(event);
            case 'wait_activation': return this.waitActivation(event);
            case 'wait_backoffice_activation': return this.waitBackOfficeActivation(event);

            // case 'develop-rent': return this.changeStatus(event, 'SVILUPPA_RENT');

            case 'accept_const': return this.changeStatus(event, 'ACCEPTED_FROM_CONSULTANT');

            case 'carica_rent': return this.changeStatus(event, 'CARICA_RENT_CONSULTANT');



            default : return new Promise<any>((resolve, reject) => { reject(`Action ${event.action.action} is not known`); });
        }

    }

    acceptEstimate(event): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            this.practiceService.acceptEstimate(event._id).subscribe(
                data => {
                    resolve(data) ;
                    this.alertService.alert('success', 'Done !', 'Estimate accepted');
                },
                error => {
                    this.alertService.alert('error', 'Oops!', 'Something went wrong!');
                    reject(error) ;
                }
            );
        });
    }

    waitActivation(event): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            this.practiceService.waitActivation(event._id).subscribe(
                data => {
                    resolve(data) ;
                    this.alertService.alert('success', 'Done !', 'Estimate accepted');
                },
                error => {
                    this.alertService.alert('error', 'Oops!', 'Something went wrong!');
                    reject(error) ;
                }
            );
        });
    }
    waitBackOfficeActivation(event): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            this.practiceService.waitBackOfficeActivation(event._id).subscribe(
                data => {
                    resolve(data) ;
                    this.alertService.alert('success', 'Done !', 'Estimate accepted');
                },
                error => {
                    this.alertService.alert('error', 'Oops!', 'Something went wrong!');
                    reject(error) ;
                }
            );
        });
    }

    rejectEstimate(event): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            this.practiceService.rejectEstimate(event._id).subscribe(
                data => {
                    resolve(data) ;
                    this.alertService.alert('success', 'Done !', 'Estimate accepted');
                },
                error => {
                    this.alertService.alert('error', 'Oops!', 'Something went wrong!');
                    reject(error) ;
                }
            );
        });
    }

    changeStatus(event, status): Promise<any> {

        console.log('Edited');
        return new Promise(async (resolve, reject) => {

            this.practiceService.changeStatus(event._id, status).subscribe(
                data => {
                    resolve(data);
                    if (status != 'SVILUPPA_RENT') {
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

    deleteRequest(event): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.alertService.confirm(
                'warning',
                'Sei sicuro?',
                'Vuoi davvero eliminare?\n' + `${event._id}`,
                'Si, elimina!'
                ).then((result) => {
                if (result.value) {
                    this.practiceService.delete(event._id, 'PREVENTIVAZIONE').subscribe(
                        data => {
                            this.alertService.alert('success', 'Eliminato!', `Partica eliminata correttemante!`);
                            return resolve(data);
                        },
                        error => {
                            this.alertService.alert('error', `Oops...${error}`, `Eliminazione pratica non riuscita!`);
                            return reject(error);
                        });
                }
                this.alertService.alert('success', 'Operazione annullata', '');
                resolve('Canceled');
            });
        });
    }
    trashLoadedEstimate(event): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.alertService.confirm(
                'warning',
                'Sei sicuro?',
                'Are you shure you want to trash this?\n' + `${event._id}`,
                'Si!'
                ).then((result) => {
                if (result.value) {
                    this.practiceService.loadedEstimateTrash(event._id, '').subscribe(
                        data => {
                            this.alertService.alert('success', 'Done !', 'Estimate accepted');
                            return resolve(data) ;
                        },
                        error => {
                            this.alertService.alert('error', 'Oops!', 'Something went wrong!');
                            return reject(error) ;
                        }
                    );
                }
                this.alertService.alert('success', 'Operazione annullata', '');
                resolve('Canceled');
            });
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



}
