import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShareButtonsModule} from '@ngx-share/buttons';

import {AppComponent} from './app.component';
import {FontAwesomeModule, FaIconLibrary} from '@fortawesome/angular-fontawesome';

import {faFacebookF} from '@fortawesome/free-brands-svg-icons/faFacebookF';
import {faTwitter} from '@fortawesome/free-brands-svg-icons/faTwitter';
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons/faLinkedinIn';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {HomeComponent} from './home/home.component';
import {GettingStartedComponent} from './gettingstarted/gettingstarted.component';
import {AngularFireModule} from '@angular/fire';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import {MatButtonModule} from "@angular/material/button";
import {RegisterComponent} from './form-login/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './form-login/login/login.component';
import {UserComponent} from './form-login/user/user.component';
import {environment} from "../environments/environment.prod";
import { UploadAvatarComponent } from './content/upload/upload-avatar/upload-avatar.component';
import { ChangePasswordComponent } from './form-login/change-password/change-password.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {A11yModule} from "@angular/cdk/a11y";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {CdkTableModule} from "@angular/cdk/table";
import {CdkTreeModule} from "@angular/cdk/tree";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatBadgeModule} from "@angular/material/badge";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSliderModule} from "@angular/material/slider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTreeModule} from "@angular/material/tree";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {PortalModule} from "@angular/cdk/portal";
import { AddAvatarComponent } from './form-login/add-avatar/add-avatar.component';
import { UploadFileComponent } from './content/upload/upload-file/upload-file.component';
import { CreateSingerComponent } from './content/singerManage/create-singer/create-singer.component';
import { AdminComponent } from './form-login/admin/admin.component';
import { DetailSingerComponent } from './content/singerManage/detail-singer/detail-singer.component';
import { SingerComponent } from './content/singerManage/singer/singer.component';
import { EditSingerComponent } from './content/singerManage/edit-singer/edit-singer.component';
import { httpInterceptorProviders} from "./auth/auth-interceptor";
import {AuthGuard} from "./auth/auth.guard";
import {AuthService} from "./auth/auth.service";
import {ChangePassword} from "./auth/change-password";



export const appRoutes: Routes = [
    {path: '', component: HomeComponent, data: {title: 'Home'}},
    {path: 'guide/getting-started', component: GettingStartedComponent, data: {title: 'Getting Started'}},
    {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
    {path: 'login', component: LoginComponent, data: {title: 'Login'}},
    {path: 'user', component: UserComponent, data: {title: 'User'}},
    {path: 'changepass', component: ChangePasswordComponent, data: {title: 'ChangePassword'}},
    {path: 'uploadAvatar', component: UploadAvatarComponent, data: {title: 'UploadAvatar'}},
    {path: 'addAvatar',component: AddAvatarComponent, data: {title: 'AddAvatar'}},
    {path: 'admin',component: AdminComponent, data: {title: 'Admin'}},
    {path: 'detailSinger/:id', component: DetailSingerComponent, data:{title: 'DetailSinger'}},
    {path: 'createSinger', component: CreateSingerComponent, data: {title: 'CreateSinger' }},
    {path: 'editSinger/:id', component: EditSingerComponent, data: {title: 'EditSinger'}},
    {path: 'singer', component: SingerComponent, data: {title: 'Singer'}}
];

@NgModule({
    declarations: [
        AppComponent, HomeComponent, GettingStartedComponent, RegisterComponent, LoginComponent, UserComponent, UploadAvatarComponent, ChangePasswordComponent, AddAvatarComponent, UploadFileComponent, CreateSingerComponent, AdminComponent, DetailSingerComponent, SingerComponent, EditSingerComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule, FontAwesomeModule,
        MatCardModule, MatToolbarModule, MatIconModule, MatRadioModule, MatCheckboxModule, MatSlideToggleModule,
        BrowserAnimationsModule, ShareButtonsModule,
        NgxAudioPlayerModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterModule.forRoot(appRoutes, {useHash: false}), MatButtonModule, FormsModule, MatFormFieldModule, ReactiveFormsModule,

    ],
    // entryComponents: [UserComponent],
    providers: [
        httpInterceptorProviders, AuthGuard//Doan code lay JWT cho Header gui request lien quan ChangePass//
    ],
    bootstrap: [AppComponent],
    exports: [
        A11yModule,
        ClipboardModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        PortalModule,
        ScrollingModule,

    ]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faFacebookF, faTwitter, faLinkedinIn);
    }
}
