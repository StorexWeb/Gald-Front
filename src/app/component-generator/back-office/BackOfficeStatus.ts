import {ComponentGenerator} from '../ComponentGenerator';
import {BackOfficeActionExecutor} from './BackOfficeActionExecutor';

export abstract class BackOfficeStatus extends ComponentGenerator
{
    protected actionExecutor: BackOfficeActionExecutor;
}
