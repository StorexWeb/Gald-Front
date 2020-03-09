
export const NavigationConfig = {
    navigation: [
        {
            id: 'role_management',
            title: 'Roles Management',
            titleTranslate: '',
            type: 'group',
            roles: ['superadmin'],
            children: [
                {
                    id: 'role',
                    title: 'Roles',
                    titleTranslate: '',
                    icon: '',
                    type: 'collapsable',
                    children: [

                        {
                            id: 'create_role',
                            title: 'Create New Role',
                            titleTranslate: '',
                            icon: 'add',
                            type: 'item',
                            url: 'role/create',
                            exactMatch: true,
                        },
                        {
                            id: 'assign_role_to_user',
                            title: 'Assign Role To User',
                            titleTranslate: '',
                            icon: '',
                            type: 'item',
                            url: 'role/assign',
                            exactMatch: true,
                        },

                        {
                            id: 'roles_list',
                            title: 'Roles List',
                            titleTranslate: '',
                            icon: '',
                            type: 'item',
                            url: 'role/list',
                            exactMatch: true,
                        }

                    ]
                },

                {
                    id: 'permissions',
                    title: 'Permissions',
                    titleTranslate: '',
                    icon: '',
                    type: 'collapsable',
                    children: [
                        {
                            id: 'permissions-list',
                            title: 'Permissions List',
                            titleTranslate: '',
                            icon: '',
                            type: 'item',
                            url: 'permissions/list',
                            exactMatch: true,
                        }
                    ]
                },


            ]
        },
        {
            id: 'gestione_uteti',
            title: 'GESTIONE UTENTI',
            translate: 'Users Options',
            transEn: 'Users Options',
            type: 'group',
            roles: ['superadmin'],
            children: [
                {
                    id: 'Utenti',
                    title: 'UTENTI',
                    translate: 'UTENTI',
                    transEn: 'Users',
                    type: 'collapsable',
                    icon: 'account_circle',
                    children: [
                        {
                            id: 'listUser',
                            title: 'Lista Utenti',
                            type: 'item',
                            url: 'users/list',
                            exactMatch: true
                        },

                        {
                            id: 'newUser',
                            title: 'Nuovo User',
                            type: 'item',
                            url: 'users/new',
                            exactMatch: true

                        }

                    ]
                }
            ]
        },
        {
            id: 'gestione_clienti',
            title: 'GESTIONE CLIENTI',
            translate: 'Clients Options',
            type: 'group',
            roles: ['consultant', 'superadmin'],
            children: [

                {
                    id: 'Clienti',
                    title: 'CLIENTI',
                    translate: 'CLIENTI',
                    type: 'collapsable',
                    icon: 'accessibility_new',
                    children: [
                        {
                            id: 'listClient',
                            title: 'Lista Clienti',
                            type: 'item',
                            url: 'clients/list',
                            exactMatch: true

                        }
                        ,
                        {
                            id: 'formClient',
                            title: 'Nuovo Cliente',
                            type: 'item',
                            url: 'clients/new',
                            exactMatch: true

                        }
                    ]
                }

            ]
        },
        {
            id: 'consultant',
            title: 'CONSULENTE',
            translate: 'CONSULENTE',
            type: 'group',
            roles: ['consultant', 'superadmin'],
            children: [
                {
                    id: 'RICHIESTE_PREVENTIVO',
                    title: 'RICHIESTE PREVENTIVO',
                    translate: 'RICHIESTE PREVENTIVO',
                    type: 'collapsable',
                    icon: 'library_books',
                    children: [
                        {
                            id: 'nuova-richiesta-preventivo',
                            title: 'Nuova richiesta',
                            icon: 'add',
                            type: 'item',
                            url: 'consultant/request/new',
                            exactMatch: true
                        },
                        {
                            id: 'richieste-inviate',
                            title: 'Richieste inviate',
                            icon: 'call_made',
                            type: 'item',
                            url: 'consultant/requests/sent',
                            exactMatch: true

                        },
                        {
                            id: 'preventivi-ricevuti',
                            title: 'Preventivi ricevuti',
                            type: 'item',
                            icon: 'call_received',
                            url: 'consultant/estimates/received',
                            exactMatch: true

                        },
                        {
                            id: 'preventivi-accettati',
                            title: 'Preventivi accettati',
                            type: 'item',
                            icon: 'thumb_up_alt',
                            url: 'consultant/estimates/accepted',
                            exactMatch: true
                        },
                        {
                            id: 'richieste-rigettate',
                            title: 'Richieste rigettate',
                            icon: 'delete',
                            type: 'item',
                            url: 'consultant/requests/rejected',
                            exactMatch: true

                        },
                        {
                            id: 'nuova-richiesta-preventivo-rapida',
                            title: 'Nuova Richiesta Rapida',
                            icon: 'add',
                            type: 'item',
                            url: 'consultant/quick/request/new',
                            exactMatch: true
                        },
                        {
                            id: 'preventivi-rapidi-inseriti',
                            title: ' Preventivi rapidi inseriti',
                            icon: 'directions_ru',
                            type: 'item',
                            url: 'consultant/quick/requests/sent',
                            exactMatch: true
                        },
                    ]
                } ,
                {
                    id: 'consultant-practice',
                    title: 'PRATICHE',
                    translate: 'PRATICHE',
                    type: 'collapsable',
                    icon: 'library_books',
                    children: [
                        {
                            id: 'waiting-approve-estimates',
                            title: 'IN ATTESA DI ESITO',
                            icon: 'access_time',
                            type: 'item',
                            url: 'consultant/practice/waiting/approve',
                            exactMatch: true
                        },
                        {
                            id: 'approved-loaded-estimates',
                            title: 'APPROVATE',
                            icon: 'playlist_add',
                            type: 'item',
                            url: 'consultant/practice/estimates/approved',
                            exactMatch: true
                        },
                        {
                            id: 'conditional-approved--loaded-estimates',
                            title: 'CONDIZIONATE',
                            icon: 'priority_high',
                            type: 'item',
                            url: 'consultant/practice/estimates/conditional-approved',
                            exactMatch: true
                        },
                        {
                            id: 'rejected-loaded-estimates',
                            title: 'RESPINTE',
                            icon: 'remove_circle',
                            type: 'item',
                            url: 'consultant/practice/estimates/rejected',
                            exactMatch: true
                        },
                        {
                            id: 'trashed-loaded-estimates',
                            title: 'CESTINATE',
                            icon: 'delete',
                            type: 'item',
                            url: 'consultant/practice/estimates/trashed',
                            exactMatch: true
                        },
                    ]
                },
                {
                    id: 'gerstioneCons',
                    title: 'GERSTIONE RENT',
                    translate: 'GERSTIONE RENT',
                    type : 'collapsable',
                    icon: 'library_books',
                    children: [
                        // rent-leasys rent in attesa

                        {
                            id: 'rent-leasys-cons',
                            title: 'RENT LEASYS',
                            icon: 'test',
                            type: 'item',
                            initIcon: true,
                            url: 'consultant/grestione/rent-leasys',
                            exactMatch: true
                        },
                        {
                            id: 'rent-ald-cons',
                            title: 'RENT ALD',
                            icon: 'markunread',
                            type: 'item',
                            url: 'consultant/grestione/rent-ald',
                            exactMatch: true
                        },
                        {
                            id: 'rent-atholon-cons',
                            title: 'RENT ATHOLON',
                            icon: 'markunread',
                            type: 'item',
                            url: 'consultant/grestione/rent-atholon',
                            exactMatch: true
                        },
                        {
                            id: 'rent-arval-cons',
                            title: 'RENT ARVAL',
                            icon: 'markunread',
                            type: 'item',
                            url: 'consultant/grestione/rent-arval',
                            exactMatch: true
                        },
                        {
                            id: 'rent-leaseolan-cons',
                            title: 'RENT LEASEPLAN',
                            icon: 'markunread',
                            type: 'item',
                            url: 'consultant/grestione/rent-leaseolan',
                            exactMatch: true
                        },
                        {
                            id: 'rent-accepted',
                            title: 'RENT ACCETTATI',
                            icon: 'thumb_up_alt',
                            type: 'item',
                            url: 'consultant/grestione/rent-accepted',
                            exactMatch: true
                        },
                        {
                            id: 'rent-in-attesa',
                            title: 'RENT IN ATTESA',
                            icon: 'access_time',
                            type: 'item',
                            url: 'consultant/grestione/rent-sent',
                            exactMatch: true
                        },
                        {
                            id: 'rent-caricate',
                            title: 'RENT CARICATE',
                            icon: 'file_copy',
                            type: 'item',
                            url: 'consultant/grestione/rent-caricate',
                            exactMatch: true
                        },
                        {
                            id: 'rent-rifiutate-cons',
                            title: 'RENT RIFIUTATE',
                            icon: 'report_off',
                            type: 'item',
                            url: 'consultant/grestione/rent-rifiutate',
                            exactMatch: true
                        }
                    ]
                }
            ]
        },
        {

            id: 'quotatore',
            title: 'QUOTATORE',
            translate: 'QUOTATORE',
            type: 'group',
            roles: ['quotatore', 'superadmin'],
            children: [
                {
                    id: 'pratiche',
                    title: 'PRATICHE',
                    translate: 'PRATICHE',
                    type: 'collapsable',
                    icon: 'library_books',
                    children: [
                        {
                            id: 'richieste_ricevute-quotatore',
                            title: 'Richieste ricevute',
                            icon: 'markunread',
                            type: 'item',
                            url: 'quotatore/received/requests',
                            exactMatch: true

                        },
                        {
                            id: 'preventivi_in_attesa',
                            title: 'Preventivi in attesa',
                            icon: 'av_timer',
                            type: 'item',
                            url: 'quotatore/estimates/pending',
                            exactMatch: true

                        },
                        {
                            id: 'richieste-rigettate',
                            title: 'Richieste rigettate',
                            icon: 'delete',
                            type: 'item',
                            url: 'quotatore/rejected/requests',
                            exactMatch: true

                        },
                        {
                            id: 'richieste_ricevute-rapide-quotatore',
                            title: 'Richieste ricevute rapide',
                            icon: 'directions_ru',
                            type: 'item',
                            url: 'quotatore/received/quick/requests',
                            exactMatch: true

                        },
                    ]
                },
                {
                    id: 'quotatore-leasys',
                    title: 'CLIENTI LEASYS',
                    translate: 'CLIENTI LEASYS',
                    type: 'collapsable',
                    icon: 'library_books',
                    children: [
                        {
                            id: 'quotatore-waiting-activation',
                            title: 'CLIENTI DA RENDERE EFFETTIVI',
                            icon: 'transfer_within_a_station',
                            type: 'item',
                            url: 'quotatore/leasys/waiting/activation',
                            exactMatch: true

                        },
                        {
                            id: 'quotatore-client-rejected',
                            title: 'CLIENTI RIFUTATI',
                            icon: 'thumb_down_alt',
                            type: 'item',
                            url: 'quotatore/leasys/client/rejected',
                            exactMatch: true

                        },
                    ]
                },
                {
                    id: 'gerstione-rent',
                    title: 'GERSTIONE RENT',
                    translate: 'GERSTIONE RENT',
                    type : 'collapsable',
                    icon: 'library_books',
                    children: [

                        {
                            id: 'rent-leasys',
                            title: 'Rent Leasys',
                            icon: 'markunread',
                            type: 'item',
                            url: 'quotatore/grestione/rent-leasys',
                            exactMatch: true
                        },
                        {
                            id: 'rent-ald',
                            title: 'RENT ALD',
                            icon: 'markunread',
                            type: 'item',
                            url: 'quotatore/grestione/rent-ald',
                            exactMatch: true
                        },

                        {
                            id: 'rent-atholon',
                            title: 'RENT ATHOLON',
                            icon: 'markunread',
                            type: 'item',
                            url: 'quotatore/grestione/rent-atholon',
                            exactMatch: true
                        },
                        {
                            id: 'rent-arval',
                            title: 'RENT ARVAL',
                            icon: 'markunread',
                            type: 'item',
                            url: 'quotatore/grestione/rent-arval',
                            exactMatch: true
                        },
                        {
                            id: 'rent-leaseolan',
                            title: 'RENT LEASEPLAN',
                            icon: 'markunread',
                            type: 'item',
                            url: 'quotatore/grestione/rent-leaseolan',
                            exactMatch: true
                        },
                        {
                            id: 'rent-accepted',
                            title: 'RENT ESPLETATE ',
                            icon: 'check_box',
                            type: 'item',
                            url: 'quotatore/grestione/rent-accepted',
                            exactMatch: true
                        },
                        {
                            id: 'rent-rifiutate',
                            title: 'RENT RIFIUTATE',
                            icon: 'indeterminate_check_box',
                            type: 'item',
                            url: 'quotatore/grestione/rent-rifiutate',
                            exactMatch: true
                        }
                    ]
                }


            ]
        },
        {
            id: 'backoffice',
            title: 'Back Office',
            translate: 'Back Office',
            type: 'group',
            roles: ['backoffice', 'superadmin'],
            children: [
                {
                    id: 'back-office-practice',
                    title: 'PRATICHE',
                    translate: 'PRATICHE',
                    type: 'collapsable',
                    icon: 'library_books',
                    children: [
                        {
                            id: 'waiting-approve-estimates',
                            title: 'IN ATTESA DI ESITO',
                            icon: 'access_time',
                            type: 'item',
                            url: 'backoffice/practice/waiting/approve',
                            exactMatch: true
                        },
                        {
                            id: 'approved-loaded-estimates',
                            title: 'APPROVATE',
                            icon: 'playlist_add',
                            type: 'item',
                            url: 'backoffice/practice/estimates/approved',
                            exactMatch: true
                        },
                        {
                            id: 'conditional-approved-loaded-estimates',
                            title: 'CONDIZIONATE',
                            icon: 'priority_high',
                            type: 'item',
                            url: 'backoffice/practice/estimates/conditional-approved',
                            exactMatch: true
                        },
                        {
                            id: 'rejected-loaded-estimates',
                            title: 'RESPINTE',
                            icon: 'remove_circle',
                            type: 'item',
                            url: 'backoffice/practice/estimates/rejected',
                            exactMatch: true
                        },
                        {
                            id: 'trashed-loaded-estimates',
                            title: 'CESTINATE',
                            icon: 'delete',
                            type: 'item',
                            url: 'backoffice/practice/estimates/trashed',
                            exactMatch: true
                        },
                    ]
                },
                {
                    id: 'internal-practice',
                    title: 'PRATICHE INTERNE',
                    translate: 'PRATICHE INTERNE',
                    type: 'collapsable',
                    icon: 'library_books',
                    children: [
                        {
                            id: 'received-something-quotatore',
                            title: 'INSERIMENTO PRATICHE',
                            icon: 'add_comment',
                            type: 'item',
                            url: 'backoffice/list/inserted/practices',
                            exactMatch: true
                        },
                        {
                            id: 'loaded_practice',
                            title: 'CARICATE',
                            icon: 'library_add_c',
                            type: 'item',
                            url: 'backoffice/list/loaded/practices',
                            exactMatch: true
                        },
                        {
                            id: 'loaded_accepted',
                            title: 'APPROVATE',
                            icon: 'playlist_add',
                            type: 'item',
                            url: 'backoffice/list/accepted/loaded',
                            exactMatch: true
                        },
                        {
                            id: 'loaded_conditional_accepted',
                            title: 'CONDIZIONATA',
                            icon: 'priority_high',
                            type: 'item',
                            url: 'backoffice/list/conditional/accepted/loaded',
                            exactMatch: true
                        },
                        {
                            id: 'loaded_conditional_accepd',
                            title: 'GESTIONE PRATICHE',
                            icon: 'library_books',
                            type: 'item',
                            url: 'backoffice/list/gestione-pratiche',
                            exactMatch: true
                        },
                        {
                            id: 'loaded_conditional_ccepd',
                            title: 'PRATICHE CONCLUSE',
                            icon: 'done_all',
                            type: 'item',
                            url: 'backoffice/list/pratiche-concluse',
                            exactMatch: true
                        },
                        {
                            id: 'loaded_rejected',
                            title: 'RIFUTATA',
                            icon: 'remove_circle',
                            type: 'item',
                            url: 'backoffice/list/rejected/loaded',
                            exactMatch: true
                        },
                    ]
                },
                {
                    id: 'back-office-leasys',
                    title: 'CLIENTI LEASYPLAN',
                    translate: 'CLIENTI LEASYPLAN',
                    type: 'collapsable',
                    icon: 'library_books',
                    children: [
                        {
                            id: 'back-office-waiting-activation',
                            title: 'CLIENTI DA RENDERE EFFETTIVI',
                            icon: 'transfer_within_a_station',
                            type: 'item',
                            url: 'backoffice/leasys/waiting/activation',
                            exactMatch: true
                        },
                        {
                            id: 'back-office-client-rejected',
                            title: 'CLIENTI RIFUTATI',
                            icon: 'thumb_down_alt',
                            type: 'item',
                            url: 'backoffice/leasys/client/rejected',
                            exactMatch: true
                        },
                    ]
                },
                {
                    id: 'gerstione-rent',
                    title: 'GERSTIONE RENT',
                    translate: 'GERSTIONE RENT',
                    type : 'collapsable',
                    icon: 'library_books',
                    children: [
                        {
                            id: 'rent-ald',
                            title: 'RENT DA CARICARE',
                            icon: 'description',
                            type: 'item',
                            url: 'backoffice/grestione/carica-rent',
                            exactMatch: true
                        },
                        {
                            id: 'rent-atholon',
                            title: 'CARICATE',
                            icon: 'library_add_c',
                            type: 'item',
                            url: 'backoffice/grestione/caricate',
                            exactMatch: true
                        },
                        {
                            id: 'rent-arval',
                            title: 'RIFIUTATE',
                            icon: 'thumb_down_alt',
                            type: 'item',
                            url: 'backoffice/grestione/rifiutate',
                            exactMatch: true
                        }
                        // {
                        //     id: 'rent-leaseolan',
                        //     title: 'RENT LEASEPLAN',
                        //     icon: 'markunread',
                        //     type: 'item',
                        //     url: 'backoffice/grestione/rent-leaseolan',
                        //     exactMatch: true
                        // },
                        // {
                        //     id: 'rent-rifiutate',
                        //     title: 'RENT RIFIUTATE',
                        //     icon: 'markunread',
                        //     type: 'item',
                        //     url: 'backoffice/grestione/rent-rifiutate',
                        //     exactMatch: true
                        // }
                    ]
                }
            ]
        }
    ],
};
