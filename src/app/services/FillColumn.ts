import {Column} from '../shared/column/Column';
import {EColumn} from '../shared/column/ColumnType';

export class FillColumn 
{
    /**
     * Fill all column list
     **/
    
    public fillList(switcher: number): any
    {
        switch (switcher) {
            case 1: 
                return this.fillUserList();
                
            case 2:
                return this.fillClientList();

            case 3:
                return this.fillSentRequestsConsultant();

            case 4:
                return this.fillApprovedRequestsConsultant();

            case 5:
                return this.fillQuickRequestsConsultant();
        }
    }
    
    // -----------------------------------------------------------------------

    private fillUserList(): any {

        return {
            keys: ['name', 'surname', 'cf', 'piva', 'regionesociale', 'province', 'consultant'],
            labels: ['Nome', 'Cognome', 'C.F', 'Piva', 'Ragione Sociale', 'Province', 'Consulente'],
            format: {'consultant': (elm) => elm.name + ' ' + elm.surname}
        };

        // [
        //     new Column('name', EColumn.Value, 'Nome'),
        //
        //     new Column('surname', EColumn.Value,  'Cognome'),
        //
        //     new Column('cf', EColumn.Value, 'C.F'),
        //
        //     new Column('piva', EColumn.Value, 'Piva'),
        //
        //     new Column('regionesociale', EColumn.Value, 'Ragione Sociale'),
        //
        //     new Column('Province', EColumn.Value, 'Province'),
        //
        //     new Column('consultant', EColumn.FUNCTION, (elm) => elm.name + ' ' + elm.surname)
        // ];

    }

    // -----------------------------------------------------------------------


    private fillClientList(): any {
        return [];
    }

    // -----------------------------------------------------------------------

    private fillSentRequestsConsultant(): any
    {
        return {
            keys: ['_id', 'client', 'piva', 'vehicle', 'duration', 'kilometres', 'state', 'date', 'user'],
            labels: ['ID', 'Cliente', 'piva', 'Veicolo', 'Durata', 'Chilometri', 'Stato',  'Data', 'Utente'],
            format: {'date': (elm) => (new Date(elm)).toLocaleDateString()}
        };

    //     [
    //             //new Column('_id', EColumn.Value, 'ID'),
    //             new Column('client', EColumn.Value, 'Cliente'),
    //             new Column('piva', EColumn.Value, 'piva'),
    //             new Column('vehicle', EColumn.Value, 'Veicolo'),
    //             new Column('duration', EColumn.Value, 'Durata'),
    //             new Column('kilometres', EColumn.Value, 'Chilometri'),
    //             new Column('state', EColumn.Value, 'Stato'),
    //             new Column('date', EColumn.FUNCTION, (elm) => (new Date(elm)).toLocaleDateString()),
    //             new Column('user', EColumn.Value, 'Utente')
    //     ];
    }


    // -----------------------------------------------------------------------


    private fillApprovedRequestsConsultant(): any
    {

        return {
            keys: ['_id', 'client', 'piva', 'vehicle', 'duration', 'kilometres', 'discount', 'state', 'commissions', 'user', 'date'],
            labels: ['ID', 'Cliente', 'piva', 'Veicolo', 'Durata', 'Chilometri', 'Sconto', 'Stato', 'Commissioni', 'Utente', 'Data'],
            format: {'date': (elm) => (new Date(elm)).toLocaleDateString()}
        };

        // return [
        //   //  new Column('_id', EColumn.Value, 'ID'),
        //     new Column('client', EColumn.Value, 'Cliente'),
        //     new Column('piva', EColumn.Value, 'piva'),
        //     new Column('vehicle', EColumn.Value, 'Veicolo'),
        //     new Column('duration', EColumn.Value, 'Durata'),
        //     new Column('kilometres', EColumn.Value, 'Chilometri'),
        //     new Column('discount', EColumn.Value, 'Sconto'),
        //     new Column('state', EColumn.Value, 'Stato'),
        //     new Column('commissions', EColumn.Value, 'Commissioni'),
        //     new Column('user', EColumn.Value, 'Utente'),
        //     new Column('date', EColumn.FUNCTION, (elm) => (new Date(elm)).toLocaleDateString())
        // ];
    }

    // -----------------------------------------------------------------------

    private fillQuickRequestsConsultant(): any
    {

        return {
            keys: ['_id', 'client', 'piva', 'state', 'date', 'user'],
            labels: ['ID', 'Cliente', 'piva', 'Stato', 'Data', 'Utente'],
            format: {'date': (elm) => (new Date(elm)).toLocaleDateString()}
        };
        // return [
        //   //  new Column('_id', EColumn.Value, 'ID'),
        //     new Column('client', EColumn.Value, 'Cliente'),
        //     new Column('piva', EColumn.Value, 'P.IVA'),
        //     new Column('state', EColumn.Value, 'Stato'),
        //     new Column('date', EColumn.FUNCTION, (elm) => (new Date(elm)).toLocaleDateString()),
        //     new Column('user', EColumn.Value, 'Utente'),
        // ];
    }

    // -----------------------------------------------------------------------

}
