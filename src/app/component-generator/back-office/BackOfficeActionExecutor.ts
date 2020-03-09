import {ActionExecutor} from '../ActionExecutor';

export class BackOfficeActionExecutor extends ActionExecutor{

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

    runActions(event): Promise<any> {
        return undefined;
    }

}
