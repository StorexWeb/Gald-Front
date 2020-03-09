import {ComponentGenerator} from '../ComponentGenerator';
import {ConsultantActionExecutor} from './ConsultantActionExecutor';

export abstract class ConsultantStatus extends ComponentGenerator
{
    protected constructor(protected actionExecutor: ConsultantActionExecutor) {
        super();
    }
}
