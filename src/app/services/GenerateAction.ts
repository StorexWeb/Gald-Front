export class GenerateAction {
    
    public generateActions(switcher: number): any[]
    {
       
        switch (switcher) {
            case 1: 
                return this.generateUserListActions();
                
            case 2:
                return this.generateClientListAction();

            case 3:
                return this.generateSentRequestFromConsulant();

            case 4:
                return this.generateRecievedRequestsQuotatore();

            case 5:
                return this.generateApprovedRequestsConsulant();

            case 6:
                return this.generateRecievedEstimatesConsultant();

            case 7:
                return this.generateRecjectedEstimatesConsultant();

            case 8:
                return this.generateQuickRequestConsultant();

            case 9:
                return this.generateInsertedPracticeBackOffice();

            case 10:
                return this.generateLoadedPracticeBackOffice();

            case 11:
                return this.generateAcceptedLoadedPracticeBackOffice();

            case 12:
                return this.generateConditionalAcceptedLoadedBackOffice();

            case 13:
                return this.generateRejectedAcceptedLoadedBackOffice();

            case 14:
                return this.generateWaitingApproveConsultant();

            case 15:
                return this.generateConditionalAcceptedLoadedBackConsultant();

            case 16:
                return this.generateRejectedAcceptedLoadedBackConsultant();

            case 17:
                return this.generateReceivedQuickRequest();

            case 18:
                return this.generateWatingActivation();

            case 19:
                return this.generateRentLeasysConsultant();

            case 20:
                return this.rentAldQuotatore();

            case 21:
                return this.generateCaricateBackOffic();

            case 22:
                return this.generateReCaricateBackeOffice();

            case 23:
                return this.generateGestionePratiche();

            case 24:
                return this.generateDeletedGestonerent();

            case 25:
                return this.generate();

            case 26:
                return this.newD();
            default: 
                break;
        }
        
        return [];
    }


    public generateConsultantRent(practice: any): any[]
    {
        if(practice.state === 'SVILUPPA_RENT_ACCEPTED_WITH_OFFER')
            return [
                { action: 'view', value: 'VISUALIZZA', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
                { action: 'print', value: 'STAMPA', icon: 'print', color: 'warn' },
                { action: 'develop-rent', value: 'SVILUPPA RENT', icon: 'star', color: 'primary', route: (event) => ['consultant/request/edit', event._id, 1]},
                { action: 'carica_rent', value: 'CARICA RENT', icon: 'flash_on', color: 'warn' },
            ];

        return [
            { action: 'view', value: 'VISUALIZZA', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'print', value: 'STAMPA', icon: 'print', color: 'warn' },
            { action: 'develop-rent', value: 'SVILUPPA RENT', icon: 'star', color: 'primary', route: (event) => ['consultant/request/edit', event._id, 1]},
            { action: 'accept_const', value: 'ACCETTA PREVENTIVO', icon: 'thumb_up_alt', color: '#3a811d' },
            { action: 'carica_rent', value: 'CARICA RENT', icon: 'flash_on', color: 'warn' },
        ];
    }


    // ----------------------------------------------------------------------

    private generateUserListActions(): any[]
    {
        return [
            { action: 'update', value: 'UPDATE', icon: 'update', color: 'primary', route: (event) => ['users/edit/', event._id] },
            { action: 'delete', value: 'DELETE', icon: 'delete', color: 'warn' }
        ];
    }

    // ----------------------------------------------------------------------

    private generateClientListAction(): any[]
    {
        return [
            { action: 'update', value: 'UPDATE', icon: 'update', color: 'primary', route: (event) => ['clients/edit', event._id] },
            { action: 'delete', value: 'DELETE', icon: 'delete', color: 'warn' }
        ];
    }


    // ----------------------------------------------------------------------


    private generateSentRequestFromConsulant(): any[]
    {
        return [
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'update', value: 'Update', icon: 'update', color: 'primary', route: (event) => ['consultant/request/edit', event._id , 0] },
            { action: 'delete', value: 'Delete', icon: 'delete', color: 'warn' }
        ];
    }

    // ----------------------------------------------------------------------


    private generateRecievedRequestsQuotatore(): any[] {
        return  [
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'print', value: 'STAMPA', icon: 'print', color: 'warn' },
            { action: 'create_estimate', value: 'ALLEGA IL PREVENTIVO', icon: 'attach_file', color: 'warn', route: (actione) => ['quotatore/attach/estimate/', actione._id, 0] },
            { action: 'reject_request', value: 'RIGETTA LA RICHIESTA', icon: 'delete_forever', color: 'warn' },
        ];
    }

    // ----------------------------------------------------------------------

    private generateApprovedRequestsConsulant(): any[]
    {
        return [
            { action: 'wait_backoffice_activation', value: 'RENDI EFFETTIVO', icon: 'dog', color: 'primary', hide: (item) => ['Leaseplan'].indexOf(item.offer.lessor_location) === -1 || item.offer.processed},
            { action: 'rent-charge', value: 'CARICA RENT', icon: 'local_atm', color: 'primary'},
            { action: 'request-rent', value: 'RICHIEDI RENT', icon: 'send', color: 'primary'},
            { action: 'develop-rent', value: 'SVILUPPA RENT', icon: 'star', color: 'primary', route: (event) => ['consultant/request/edit/', event._id, 1]},
            { action: 'view', value: 'VISULIZZA', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'trash_loaded_estimate', value: 'CESTINA', icon: 'delete', color: 'primary'},
        ];
    }


    // ----------------------------------------------------------------------

    private generateRecievedEstimatesConsultant(): any[]
    {
        return [
            { action: 'print', value: 'STAMPA', icon: 'print', color: 'warn' },
            { action: 'accept_estimate', value: 'ACCETTA LA RICHIESTA', icon: 'thumb_up_alt', color: 'warn' },
            { action: 'reject_estimate', value: 'RIGETTA LA RICHIESTA', icon: 'thumb_down_alt', color: 'warn' },
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
        ];
    }

    // ----------------------------------------------------------------------

    private generateRecjectedEstimatesConsultant(): any[]
    {
        return  [
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
        ];

    }

    // ----------------------------------------------------------------------

    private generateQuickRequestConsultant(): any[]
    {
        return [
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'delete', value: 'Delete', icon: 'delete', color: 'warn' }
        ];
    }

    // ----------------------------------------------------------------------

    private generateInsertedPracticeBackOffice(): any[]
    {
        return [
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'estimateLoaded', value: 'Caricata', icon: 'flash_on', color: 'primary' },
        ];
    }

    // ----------------------------------------------------------------------

    private generateLoadedPracticeBackOffice(): any[]
    {
        return [
            { action: 'view', value: 'VIEW', icon: 'pie_chart', color: '#548dd6', route: (event) => ['/practice/view/' + event._id]},
            { action: 'accept', value: 'ACCETTATA', icon: 'thumb_up_alt', color: '#3a811d' },
            { action: 'conditional-accept', value: 'CONDIZIONATA', icon: 'error', color: '#ef6537' },
            { action: 'reject', value: 'RIFUTATA', icon: 'thumb_down_alt', color: '#ed3833' },
        ];
    }

    // ----------------------------------------------------------------------

    private generateAcceptedLoadedPracticeBackOffice(): any[]
    {
        return [
            { action: 'view', value: 'VIEW', icon: 'pie_chart', color: '#548dd6', route: (event) => ['/practice/view/' + event._id]},
        ];
    }

    // ----------------------------------------------------------------------

    private generateConditionalAcceptedLoadedBackOffice(): any[]
    {
        return [
            { action: 'view', value: 'VIEW', icon: 'pie_chart', color: '#548dd6', route: (event) => ['/practice/view/' + event._id]},
        ];
    }

    // ----------------------------------------------------------------------

    private generateRejectedAcceptedLoadedBackOffice(): any[]
    {
        return [
            { action: 'view', value: 'VIEW', icon: 'pie_chart', color: '#548dd6', route: (event) => ['/practice/view/' + event._id]},
        ];
    }

    // ----------------------------------------------------------------------

    private generateWaitingApproveConsultant(): any[]
    {
        return [
            { action: 'view', value: 'VISULIZZA', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
        ];
    }

    // ----------------------------------------------------------------------

    private generateConditionalAcceptedLoadedBackConsultant(): any[]
    {
        return [
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
        ];
    }

    // ----------------------------------------------------------------------


    private generateRejectedAcceptedLoadedBackConsultant(): any[]
    {
        return [
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
        ];
    }

    // ----------------------------------------------------------------------

    private generateReceivedQuickRequest(): any[]
    {
        return [
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'print', value: 'STAMPA', icon: 'print', color: 'warn' },
            { action: 'create_estimate', value: 'ALLEGA IL PREVENTIVO', icon: 'attach_file', color: 'warn', route: (actione) => ['quotatore/attach/estimate/', actione._id, 0] },
            { action: 'reject_request', value: 'RIGETTA LA RICHIESTA', icon: 'delete_forever', color: 'warn' },
        ];
    }

    // ----------------------------------------------------------------------


    private generateWatingActivation(): any[]
    {
        return [
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'activate', value: 'Rendi effettivo', icon: 'check', color: 'primary'},
            { action: 'client_reject', value: 'Rendi cliente', icon: 'delete', color: 'primary'},
        ];
    }

    // ----------------------------------------------------------------------

    private generateRentLeasysConsultant(): any[]
    {
        return [
            { action: 'view', value: 'VISUALIZZA', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'print', value: 'STAMPA', icon: 'print', color: 'warn' },
            { action: 'develop-rent', value: 'SVILUPPA RENT', icon: 'star', color: 'primary', route: (event) => ['consultant/request/edit', event._id, 1]},
            { action: 'accept_const', value: 'ACCETTA PREVENTIVO', icon: 'thumb_up_alt', color: '#3a811d' },
            { action: 'carica_rent', value: 'CARICA RENT', icon: 'flash_on', color: 'warn' },
        ];
    }

    // ----------------------------------------------------------------------

    private rentAldQuotatore(): any[]
    {
        return [

            { action: 'view', value: 'VISUALIZZA', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'print', value: 'STAMPA', icon: 'print', color: 'warn' },
            { action: 'accept_gra', value: 'Rispondi alla richiesta', icon: 'attach_file', color: 'warn', route: (actione) => ['quotatore/grestione/add/offer', actione._id] },
            { action: 'accept_without_offer', value: 'preventivo definitivo', icon: 'thumb_up_alt', color: 'warn' },
            { action: 'reject_gra', value: 'RIFUTATA', icon: 'thumb_down_alt', color: '#ed3833' },
        ];
    }

    // ----------------------------------------------------------------------


    private generateCaricateBackOffic(): any[]
    {
        return [
            { action: 'view', value: 'VISUALIZZA', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'carica_rent', value: 'CARICA RENT', icon: 'flash_on', color: 'warn' },
            { action: 'reject_gra', value: 'RIFUTATA', icon: 'thumb_down_alt', color: '#ed3833' },
        ];
    }

    // ----------------------------------------------------------------------

    private generateReCaricateBackeOffice(): any[]
    {
        return [
            { action: 'view', value: 'VISUALIZZA', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},

            { action: 'gestisci', value: 'GESTISCI', icon: 'flash_on', color: 'warn' },

            { action: 'reject_gra', value: 'RIFUTATA', icon: 'thumb_down_alt', color: '#ed3833' },
        ];
    }

    // ----------------------------------------------------------------------


    private generateGestionePratiche(): any[]
    {
        return [
            { action: 'view', value: 'VISUALIZZA', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id ]},
            { action: 'gesatisci', value: 'GESTISCI', icon: 'flash_on', color: 'warn',  route: (event) => ['backoffice/gestisci-form/' + event._id + '/' + 1] },

        ];
    }

    private newD(): any[]
    {
        return [
            { action: 'view', value: 'VISUALIZZA', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id ]},
            { action: 'gesatisci', value: 'GESTISCI', icon: 'flash_on', color: 'warn',  route: (event) => ['backoffice/gestisci-form/' + event._id + '/' + 2] },

        ];
    }

    private generateDeletedGestonerent(): any[]
    {
        return [
            { action: 'view', value: 'VISUALIZZA', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]}
        ];
    }

    private generate(): any[]{
        return [
            { action: 'print', value: 'STAMPA', icon: 'print', color: 'warn' },
            { action: 'view', value: 'VIEW', icon: 'search', color: 'primary', route: (event) => ['/practice/view/' + event._id]},
            { action: 'wait_activation', value: 'RENDI EFFETTIVO', icon: 'dog', color: 'primary', hide: (item) => ['Leasys'].indexOf(item.offer.lessor_location) === -1 || item.offer.processed},
            { action: 'reject_estimate', value: 'RIGETTA LA RICHIESTA', icon: 'thumb_down_alt', color: 'warn' },
        ];
    }
}
