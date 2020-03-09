import {ComponentGenerator} from './ComponentGenerator';
import {AcceptedEstimatesComponent} from '../modules/consultant/modules/estimate-request/pages/accepted-estimates/accepted-estimates.component';
import {AcceptedWaitActivationStatus} from './quotatore/AcceptedWaitActivationStatus';
import {NewStatus} from './consultant/NewStatus';

export class ComponentFactory {

    public factory(status: string): any{
        switch (status) {

            // case 'NEW': return new NewStatus();

            case 'ACCEPTED_WAIT_ACTIVATION':{
                return new AcceptedWaitActivationStatus();
            }

        }
    }

}
