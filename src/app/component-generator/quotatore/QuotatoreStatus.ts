import {ComponentGenerator} from '../ComponentGenerator';
import {QuotatoreActionExecutor} from './QuotatoreActionExecutor';

export abstract class QuotatoreStatus extends ComponentGenerator
{
    protected actionExecutor: QuotatoreActionExecutor;

}
