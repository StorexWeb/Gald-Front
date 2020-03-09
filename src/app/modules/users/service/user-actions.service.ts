import {Injectable} from '@angular/core';
import {AlertService} from '../../../services/alert.service';
import {UserService} from '../../../services/user.service';

@Injectable()

export class UserActionsService {

    constructor(
        private userService: UserService,
        private alertService: AlertService,
    ) { }

    run(event): Promise<any> {

        switch (event.action.action) {

            case 'delete': return this.delete(event);

            default : return new Promise<any>((resolve, reject) => { reject(`Action ${event.action.action} is not known`); });
        }

    }

    delete(event): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            this.alertService.confirm(
                'warning',
                'Sei sicuro?',
                `Vuoi davvero eliminare? \n ${event._id}`,
                'Si, elimina!'
            ).then((result) => {
                if (result.value) {
                    this.userService.delete(event._id)
                        .subscribe(
                            data => {
                                this.alertService.alert('success', 'Eliminato', '');
                                return resolve(result) ;
                            },
                            errors => {
                                this.alertService.alert('error', 'Operazione annullata', '');
                                return reject(errors);
                            }
                        );
                } else {
                    this.alertService.alert('success', 'Operazione annullata', '');
                }
            });
        });
    }

}
