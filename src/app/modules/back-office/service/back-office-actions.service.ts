import {Injectable} from '@angular/core';
import {PracticeService} from '../../../services/practice.service';
import {AlertService} from '../../../services/alert.service';
import {Router} from '@angular/router';

@Injectable()

export class BackOfficeActionsService {

    constructor(
        private practiceService: PracticeService,
        private alertService: AlertService,
    ) { }

    run(event): Promise<any> {
        switch (event.action.action) {

            // Reject a Request: changes the practice status into REJECTED_REQUEST
            case 'estimateLoaded': return this.estimateLoaded(event) ;
            case 'accept': return this.accept(event) ;
            case 'conditional-accept': return this.conditionalAccept(event) ;
            case 'reject': return this.reject(event) ;
            case 'activate': return this.activate(event);
            case 'client_reject': return this.clientReject(event) ;

            case 'carica_rent': return this.changeStatus(event, 'CARICA_RENT_BACK_OFFICE');
            case 'reject_gra': return this.changeStatus(event, 'SVILUPPA_RENT_REJECTED_BACK_OFFICE') ;
            case 'gestisci': return this.changeStatus(event, 'GESTISCI_BACK_OFFICE') ;

            // if the action is not known, reject with error message
            default : return new Promise<any>((resolve, reject) => { reject('Action is not known'); });
        }
    }

    estimateLoaded(event): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.practiceService.estimateLoaded(event._id, '')
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

    accept(event): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.practiceService.loadedEstimateAccept(event._id, '')
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

    conditionalAccept(event): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.practiceService.loadedEstimateConditionalAccept(event._id, '')
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

    reject(event): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.practiceService.loadedEstimateReject(event._id, '')
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
            this.practiceService.activateReadyPractice(event._id)
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
            this.practiceService.rejectReadyPractice(event._id, '')
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

    changeStatus(event, status): Promise<any> {

        console.log('Edited');
        return new Promise(async (resolve, reject) => {

            this.practiceService.changeStatus(event._id, status).subscribe(
                data => {
                    resolve(data);
                    this.alertService.alert('success', 'Done !', 'Status Changed to ' + status);
                },
                error => {
                    this.alertService.alert('error', 'Oops!', 'Something went wrong!');
                    reject(error);
                }
            );

        });
    }
}
