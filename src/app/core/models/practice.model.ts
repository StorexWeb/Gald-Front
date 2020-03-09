import { User } from './user.model';

export class Action {
    _id?: string ;
    name?: string ;
    description?: string ;
    note?: string ;
    user?: User ;
    date?: Date ;
    type?: any ;
}

export class Offer {
    _id?: string ;
    file?: File ;
    commission?: number ;
    lessor_location?: string ;
    discount?: number ;
    path?: string ;
    processed?: number;
    idCasaLocatrice?: string ;
}


export class FinalDeal{
    _id: string ;
    frame: string;
    licensePlate: string;
    sendingDate: Date;
    requestDate: Date;
    pendingRegistration: Date;
    registrationDate: Date;
    boardRequestDate: Date;
    requestMadeAvailable: Date;
    deliveryDate: Date;
    disCount: number;
    note: string;
    seller: string;
    ownerHouse: string;
    folderDeliveryDate: string;
}

export class FinalDealInput {
    _id: string ;
    frame: string;
    licensePlate: string;
    sendingDate: Date;
    requestDate: Date;
    pendingRegistration: Date;
    registrationDate: Date;
    boardRequestDate: Date;
    requestMadeAvailable: Date;
    deliveryDate: Date;
    disCount: number;
    note: string;
    seller: string;
    ownerHouse: string;
    folderDeliveryDate: string;
    
}

export class File {
    id?: string ;
    name?: string; // The original file name
    size?: Number; // File size in bits
    type?: string; // File Type
    date?: Date; // Upload Date
    key?: string; // File Type in the system, Ex. Attachment, Presentation receipt, IBAN banking
    path?: string; // File name on the server
}

export class FileInput {
    _id?: string ;
    name?: string; // The original file name
    size?: Number; // File size in bits
    type?: string; // File Type
    date?: Date; // Upload Date
    key?: string; // File Type in the system, Ex. Attachment, Presentation receipt, IBAN banking
    path?: string; // File name on the server
}


export class Practice {
    public _id?: string;
    public infocar?: string;
    public brand?: string;
    public model?: string;
    public supply?: string;
    public preparation?: string;
    public optional?: string[];
    public duration?: number;
    public kilometres?: number;
    public commission?: number;
    public advance?: number;
    public preference_lessee_location?: string;
    public product?: string;
    public constructor_code?: string;
    public franchigia_rca?: number;
    public theft_deductible?: number;
    public kasko_franchise?: number;
    public replacement_car?: boolean;
    public tire_replacement?: boolean;
    public fuel_card?: boolean;
    public delivery_location?: string;
    public client?: User;
    public consultant: User;
    public createDate?: Date;
    public state?: string;
    public type?: string;
    public attaches?: File[];
    public actions?: Action[];
    public offers?: Offer[];
    public clientFiles?: File[];
    public finalDeal: FinalDeal;
    public  estimatedWithOffer: boolean

    constructor(obj?: PracticeInterface) {
        this.set(obj);
    }

    set(obj): Practice {
        if (!obj) {
            return this ;
        }
        Object.entries(obj).map(([key, value]) => {
            this[key] = value ;
        });
        return this ;
    }

    // TODO remake in a better way
    getFiles(): any {
        const offerFiles = [] ;
        const attaches = [] ;
        let idx = 1 ;
        if (this.offers) {

            this.offers.forEach((offer) => {
                idx++ ;
                // offer.file.name = 'Offer File ( ' + idx + ' )' ;
                offer.path = 'offer';
               // offerFiles.push(offer.file) ;
            });
        }

        idx = 1 ;
        if (this.attaches) {
            this.attaches.forEach(attach => {
                idx++ ;
                // attach.name = 'Attachment ( ' + idx + ' )';
                attach.path = 'practice';
                attaches.push(attach);
            });
        }


        return [...attaches, ...this.getClientFilesView(), ...offerFiles] ;
    }

    getStatusLog(): any {
        return this.actions ? this.actions.filter((e) => e.type === 'STATE_CHANGE') : [] ;
    }

    getNote(): string {
        return this.actions ? this.actions[this.actions.length - 1].note : '';
    }

    getView(): any {
        return {
            infocar: this.infocar,
            Marca: this.brand,
            modello: this.model,
            Alimentazione: this.supply,
            Allestimento: this.preparation,
            optional: this.optional.join(' , '),
            Mesi: this.duration,
            Chilometri: this.kilometres,
            Provvigioni_Richieste: this.commission,
            advance: this.advance,
            Casa_locatrice_di_preferenza: this.preference_lessee_location,
            Prodotto: this.product,
            Costruttore: this.constructor_code,
            Franchigia_RCA: this.franchigia_rca,
            Franchigia_Furto: this.theft_deductible,
            Franchigia_Kasko: this.kasko_franchise,
            Auto_sostitutiva  : this.replacement_car,
            Sostituzione_pneumatici : this.tire_replacement,
            Fuel_Card : this.fuel_card,
            Luogo_Consegna: this.delivery_location,
            Creare_La_Data: this.createDate,
            Cliente: this.client.name + ' ' + this.client.surname,
            Consulente: this.consultant.name + ' ' + this.consultant.surname
        };
    }

    getViewLog(): any {
        return this.actions.filter((elm) => ['PRACTICE_VIEW', 'USER_FILE_UPLOADED'].indexOf(elm.type) !== -1 );
    }

    getClientFilesView(): any {

        if (this.type === 'PRACTICE' && ['NEW', 'ESTIMATE', 'ESTIMATE_REJECTED', 'REQUEST_REJECTED'].indexOf(this.state) !== -1) {
            return [] ;
        }

        const files = {
            'privacy_form' : {required: true, label: 'Modulo privacy', clientFile: true, key: 'privacy_form'},
            'id_document': {required: true, label: 'Documento di identita fronte/retro', clientFile: true, key: 'id_document'},
            'fiscal_code': {required: true, label: 'Codice Fiscale fronte/retro', clientFile: true, key: 'fiscal_code'},
            'iban': {required: true, label: 'IBAN bancario (non postale)', clientFile: true, key: 'iban'},
            'last_unique_model': {required: true, label: 'Ultimo modello unico', clientFile: true, key: 'last_unique_model'},
            'presentation_receipt': {required: true, label: 'Ricevuta di presentazione', clientFile: true, key: 'presentation_receipt'},
            'updated_view': {required: true, label: 'Visura aggiornata (o attribuzione partita iva per i casi di non iscrizione in CCIAA)', clientFile: true, key: 'updated_view'},
            'general_attachment_1': {required: false, label: 'Allegato generico', clientFile: true, key: 'general_attachment_1'},
            'general_attachment_2': {required: false, label: 'Allegato generico', clientFile: true, key: 'general_attachment_2'},
            'general_attachment_3': {required: false, label: 'Allegato generico', clientFile: true, key: 'general_attachment_3'},
            'general_attachment_4': {required: false, label: 'Allegato generico', clientFile: true, key: 'general_attachment_4'},
        };

            if (!this.clientFiles) {
            return Object.values(files) ;
        }

        this.clientFiles.forEach((elm) => {
            if (files[elm.key]) {
                files[elm.key].file = elm ;
            }
            console.log(elm);
        });

        return Object.values(files) ;
    }

    isAllClientFilesOK(): boolean {
        let valid = true ;
        this.getClientFilesView().forEach((elm) => {
            if (elm.required && !elm.file) {
                valid = false ;
            }
        });

        return true ;
    }

    getNotes(): any {
        const notes = [] ;
        this.actions.forEach((elm) => {
            if (elm.note) {
                notes.push(elm.note);
            }
        });
        return notes ;
    }

}



export interface PracticeInterface {
    _id?: string;
    infocar?: string;
    brand?: string;
    model?: string;
    supply?: string;
    preparation?: string;
    optional?: string[];
    duration?: number;
    kilometres?: number;
    commission?: number;
    advance?: number;
    preference_lessee_location?: string;
    product?: string;
    constructor_code?: string;
    franchigia_rca?: number;
    theft_deductible?: number;
    kasko_franchise?: number;
    replacement_car?: boolean;
    tire_replacement?: boolean;
    fuel_card?: boolean;
    delivery_location?: string;
    client?: User;
    consultant?: User;
    createDate?: Date;
    state?: string;
    type?: string;
    attaches?: File[];
    actions?: Action[];
    offers?: Offer[];
    clientFiles?: File[];
    // finalDeal: FinalDeal;
}

