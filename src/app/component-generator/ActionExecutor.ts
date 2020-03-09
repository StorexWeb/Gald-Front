import {PracticeService} from '../services/practice.service';
import {AlertService} from '../services/alert.service';

export abstract class ActionExecutor {

    constructor(protected practiceService: PracticeService, protected alertService: AlertService) {
    }

    public abstract runActions(event): Promise<any>;


}
