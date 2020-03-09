import { NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Apollo } from 'apollo-angular';
import {AppConfig} from './config/app.config';


@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [],
})


export class GraphqlModule {
    // modulo con autenticazione
    constructor(apollo: Apollo, httpLink: HttpLink) {
        apollo.create({
            link: httpLink.create( {uri: AppConfig.endpoints.graphql} ),
            cache: new InMemoryCache({
                addTypename: false
            })
        });
    }
}

