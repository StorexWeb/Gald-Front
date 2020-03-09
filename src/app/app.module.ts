import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from 'app/app.component';
import { ApolloModule } from 'apollo-angular';
import { GraphqlModule } from './graphql.module';
import { AuthenticationService } from './services/index';
import { UserService } from './services/user.service';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material.module';
import { PracticeService } from './services/practice.service';
import { CityService } from './services/city.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppFuseConfig } from './config/fuse.config';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './core/guards/auth.guard';
import {RolesGuard} from './core/guards/roles.guird';
import {HttpErrorInterceptor} from './shared/interceptors/http.error.interceptor';
import {environment} from '../environments/environment';
import {AppConfig} from './config/app.config';
import {JwtInterceptor} from './shared/interceptors/jwt.interceptor';
import {NavigationService} from './services/navigation.service';
import {UploadService} from './services/uload.service';
import {AlertService} from './services/alert.service';
import {ListPracticesResolver} from './shared/resolvers/list-practices.resolver';
import {Practice} from './core/models';
import {SingleListModule} from './modules/single-list/single-list.module';
import {GetPracticeResolver} from './modules/practice/resolver/get-practice.resilver';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


export function tokenGetter(): string {
    const utente = JSON.parse(localStorage.getItem('utente'));
    if (utente) {
        return utente.token;
    } else {
        return '';
    }
}


@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MaterialModule,
        MatButtonModule,
        MatIconModule,

        //http
        HttpModule,

        // Fuse modules
        FuseModule.forRoot(AppFuseConfig.default),

        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: [environment.apiUrl],
                blacklistedRoutes: [AppConfig.endpoints.login]
            }
        }),
        GraphqlModule,
        ApolloModule,

        // App modules
        CoreModule,
        SingleListModule
    ],
    providers: [
        NavigationService,
        AuthenticationService,
        UserService,
        PracticeService,
        CityService,
        DeviceDetectorService,
        AuthGuard,
        RolesGuard,
        UploadService,
        AlertService,
        GetPracticeResolver,
        ListPracticesResolver,
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    ],

    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}
