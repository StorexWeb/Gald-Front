import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HorizontalLayout1Component} from './layout/horizontal/layout-1/layout-1.component';
import {VerticalLayout1Component} from './layout/vertical/layout-1/layout-1.component';
import {VerticalLayout2Component} from './layout/vertical/layout-2/layout-2.component';
import {VerticalLayout3Component} from './layout/vertical/layout-3/layout-3.component';
import {FuseSharedModule} from '../../@fuse/shared.module';
import {RouterModule} from '@angular/router';
import {ContentComponent} from './components/content/content.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NavbarVerticalStyle1Component} from './components/navbar/vertical/style-1/style-1.component';
import {NavbarVerticalStyle2Component} from './components/navbar/vertical/style-2/style-2.component';
import {NavbarHorizontalStyle1Component} from './components/navbar/horizontal/style-1/style-1.component';
import {QuickPanelComponent} from './components/quick-panel/quick-panel.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import { LayoutComponent } from './layout/layout.component';
import {MaterialModule} from '../material.module';
import {FuseNavigationModule, FuseProgressBarModule, FuseSearchBarModule,
    FuseShortcutsModule, FuseSidebarModule, FuseThemeOptionsModule} from '../../@fuse/components';
import {LoginComponent} from './pages/login/login.component';
import {PanelDashboardComponent} from './pages/panel-dashboard/panel-dashboard.component';
import {AuthenticationService} from '../services';
import { E404Component } from './pages/e404/e404.component';
import { E403Component } from './pages/e403/e403.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {SharedModule} from '../shared/shared.module';
import {FileDropModule} from 'ngx-file-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxUploaderModule} from 'ngx-uploader';
import {NgxPasswordToggleModule} from 'ngx-password-toggle';


@NgModule({
  declarations: [

    // Components
    ContentComponent,
    FooterComponent,
    NavbarVerticalStyle1Component,
    NavbarVerticalStyle2Component,
    NavbarHorizontalStyle1Component,
    NavbarComponent,
    QuickPanelComponent,
    ToolbarComponent,

    // Layout
    HorizontalLayout1Component,
    VerticalLayout1Component,
    VerticalLayout2Component,
    VerticalLayout3Component,
    LayoutComponent,

    // pages

    LoginComponent,
    PanelDashboardComponent,
    E404Component,
    E403Component,
    ProfileComponent

  ],
  imports: [

    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPasswordToggleModule,
    NgxUploaderModule,
    FileDropModule,

    // Fuse modules
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseNavigationModule,
    FuseSearchBarModule,
    FuseShortcutsModule,
    FuseThemeOptionsModule,
    FuseSharedModule,

  ],
  exports: [
    LayoutComponent,
    LoginComponent,
    PanelDashboardComponent
  ],

  providers: [
      AuthenticationService
  ]
})
export class CoreModule { }
