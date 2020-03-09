import {ConsultantStatus} from './ConsultantStatus';
import {Column} from '../../shared/column/Column';
import {EColumn} from '../../shared/column/ColumnType';
import {ConsultantActionExecutor} from './ConsultantActionExecutor';

export class NewStatus extends ConsultantStatus
{
    constructor(protected actionExecutor: ConsultantActionExecutor) {
        super(actionExecutor);
    }

    generateAction(): any[] {
        return [
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'update', value: 'Update', icon: 'update', color: 'primary', route: (event) => ['consultant/request/edit', event._id , 0] },
            { action: 'delete', value: 'Delete', icon: 'delete', color: 'warn' }
        ];
    }

    generateColumns(): any[] {
        return [
            new Column('_id', EColumn.Value, 'ID'),
            new Column('client', EColumn.Value, 'Cliente'),
            new Column('piva', EColumn.Value, 'piva'),
            new Column('vehicle', EColumn.Value, 'Veicolo'),
            new Column('duration', EColumn.Value, 'Durata'),
            new Column('kilometres', EColumn.Value, 'Chilometri'),
            new Column('state', EColumn.Value, 'Stato'),
            new Column('date', EColumn.FUNCTION, (elm) => (new Date(elm)).toLocaleDateString()),
            new Column('user', EColumn.Value, 'Utente')
        ];
    }

    generateFilterColumns(): any[] {
        return [
                {key: 'client', label: 'client'},
                {key: 'vehicle', label: 'vehicle'},
                {key: 'duration', label: 'duration'},
                {key: 'kilometres', label: 'kilometres'},
                {key: 'commissions', label: 'commissions'}
            ];
    }

    runActions(event): Promise<any> {
        return this.actionExecutor.runActions(event);
    }

}
