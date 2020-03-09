// angular
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
// fuse
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
// models
import { User } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
// services
import { AuthenticationService } from '../../../services/index';
import { takeUntil } from 'rxjs/operators';
import {AppFuseConfig} from '../../../config/fuse.config';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})


export class LoginComponent implements OnInit, OnDestroy {

    public loading = false;
    public loginForm: FormGroup;
    public returnUrl: string;
    public navigation: any;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
    ) {
        this._unsubscribeAll = new Subject();

        // Configure the layout
        this._fuseConfigService.config = AppFuseConfig.login;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {

        // if the user is already logged in, redirect to homepage
        if (this.authenticationService.getUser()) {
            this.router.navigate(['/']);
        }

        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl']  || '/';

    }

    ngOnDestroy(): void {
        const user: any = this.authenticationService.getUser();
        if (user) {
            this._fuseConfigService.gr_config_state = true;
            this._fuseConfigService.config = user.fuseconfig || AppFuseConfig.default;
            // console.log(user.fuseconfig);
        } else {
            this._fuseConfigService.config = AppFuseConfig.default;
        }
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Login Event
    // -----------------------------------------------------------------------------------------------------

    login(): void {
        this.loading = true;
        this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                result => {
                    if (result && result.token) {
                        this.router.navigate([this.returnUrl]);
                    } else {
                        this.error('Unknown Error, Try Again');
                    }
                },
                error => {
                    console.log(error);
                    this.error(error.error.message);
                    this.loading = false;
                }
            );
    }

    error(msg): void {
        Swal.fire({
            type: 'error',
            title: `Oops...`,
            text: `${msg}`,
        });
    }


}
