import {Column} from '../../shared/column/Column';
import {EColumn} from '../../shared/column/ColumnType';
import {QuotatoreStatus} from './QuotatoreStatus';

export class AcceptedWaitActivationStatus extends QuotatoreStatus{

    constructor() {
        super();
    }
    
    generateAction(): any[] {
        return [
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'activate', value: 'Rendi effettivo', icon: 'check', color: 'primary'},
            { action: 'client_reject', value: 'Rendi cliente', icon: 'delete', color: 'primary'},
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
            new Column('discount', EColumn.Value, 'Sconto'),
            new Column('state', EColumn.Value, 'Stato'),
            new Column('commissions', EColumn.Value, 'Commissioni'),
            new Column('user', EColumn.Value, 'Utente'),
            new Column('date', EColumn.FUNCTION, (elm) => (new Date(elm)).toLocaleDateString())
        ];
    }

    generateFilterColumns(): any[] {
        return [
            {key: 'client', label: 'client'},
            {key: 'vehicle', label: 'vehicle'},
            {key: 'duration', label: 'duration'},
            {key: 'kilometres', label: 'kilometres'},
            {key: 'commissions', label: 'commissions'},
        ];
    }

    runActions(event): Promise<any> {
        return this.actionExecutor.runActions(event);
    }
    
}
