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
import { ChangeProfileComponent } from './form-login/change-profile/change-profile.component';
import { UploadFileComponent } from './content/upload/upload-file/upload-file.component';
import { CreateSingerComponent } from './content/singerManage/create-singer/create-singer.component';
import { AdminComponent } from './form-login/admin/admin.component';
import { DetailSingerComponent } from './content/singerManage/detail-singer/detail-singer.component';
import { PageSingerComponent } from './content/singerManage/pageSinger/page-singer.component';
import { EditSingerComponent } from './content/singerManage/edit-singer/edit-singer.component';
import { httpInterceptorProviders} from "./auth/auth-interceptor";
import {AuthGuard} from "./auth/auth.guard";
import {AuthService} from "./auth/auth.service";
import {ChangePassword} from "./auth/change-password";
import {ChangeAvatarComponent} from "./form-login/change-avatar/change-avatar.component";
import {SingerService} from "./service/singer.service";
import { CreateSongComponent } from './content/songManage/create-song/create-song.component';
import { CreateCategoryComponent } from './content/categoryManage/create-category/create-category.component';
import { PageCategoryComponent } from './content/categoryManage/page-category/page-category.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { EditCategoryComponent } from './content/categoryManage/edit-category/edit-category.component';
import { CreatePlaylistComponent } from './content/playlistManage/create-playlist/create-playlist.component';
import { EditPlaylistComponent } from './content/playlistManage/edit-playlist/edit-playlist.component';
import { AddsongToPlaylistComponent } from './content/playlistManage/addsong-to-playlist/addsong-to-playlist.component';
import { DetailPlaylistComponent } from './content/playlistManage/detail-playlist/detail-playlist.component';
import { PageSongComponent } from './content/songManage/page-song/page-song.component';
import { DetailSongComponent } from './content/songManage/detail-song/detail-song.component';
import { EditSongComponent } from './content/songManage/edit-song/edit-song.component';
import { AddsongToCategoryComponent } from './content/categoryManage/addsong-to-category/addsong-to-category.component';
import { DetailCategoryComponent } from './content/categoryManage/detail-category/detail-category.component';
import { AddsongToSingerComponent } from './content/singerManage/addsong-to-singer/addsong-to-singer.component';
import { PageUserComponent } from './form-login/page-user/page-user.component';
import { DetailUserComponent } from './form-login/detail-user/detail-user.component';
import { SongByUserComponent } from './content/userCreateManage/song-by-user/song-by-user.component';
import { SingerByUserComponent } from './content/userCreateManage/singer-by-user/singer-by-user.component';
import { CategoryByUserComponent } from './content/userCreateManage/category-by-user/category-by-user.component';
import { AddPlayListToCategoryComponent } from './content/categoryManage/add-play-list-to-category/add-play-list-to-category.component';
import { AddPlayListToSingerComponent } from './content/singerManage/add-play-list-to-singer/add-play-list-to-singer.component';

// const config = new SocialAuthService([
//     {
//         id: FacebookLoginProvider.PROVIDER_ID,
//         provider: new FacebookLoginProvider('2203659926599837')
//     }
// ]);

// export function provideConfig() {
//     return config;
// }

export const appRoutes: Routes = [
    {path: '', component: HomeComponent, data: {title: 'Home'}},
    {path: 'guide/getting-started', component: GettingStartedComponent, data: {title: 'Getting Started'}},
    {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
    {path: 'login', component: LoginComponent, data: {title: 'Login'}},
    {path: 'user', component: UserComponent, data: {title: 'User'}},
    {path: 'changepass', component: ChangePasswordComponent, data: {title: 'ChangePassword'}},
    {path: 'uploadAvatar', component: UploadAvatarComponent, data: {title: 'UploadAvatar'}},
    {path: 'changeProfile',component: ChangeProfileComponent, data: {title: 'ChangeProfile'}},
    {path: 'admin',component: AdminComponent, data: {title: 'Admin'}},
    {path: 'detailSinger/:id', component: DetailSingerComponent, data:{title: 'DetailSinger'}},
    {path: 'createSinger', component: CreateSingerComponent, data: {title: 'CreateSinger' }},
    {path: 'editSinger/:id', component: EditSingerComponent, data: {title: 'EditSinger'}},
    {path: 'singer', component: PageSingerComponent, data: {title: 'Singer'}},
    {path: 'changeAvatar', component: ChangeAvatarComponent, data:{title: 'ChangeAvatar'}},
    {path: 'createSong', component: CreateSongComponent, data: {title: 'CreateSong'}},
    {path: 'createCategory', component: CreateCategoryComponent, data: {title: 'CreateCategory'}},
    {path: 'pageCategory', component: PageCategoryComponent, data: {title: 'PageCategory'}},
    {path: 'editCategory/:id', component: EditCategoryComponent, data: {title: 'EditCategory'}},
    {path: 'createPlayList', component: CreatePlaylistComponent, data: {title: 'CreatePlayList'}},
    {path: 'detailPlayList/:id', component: DetailPlaylistComponent, data: {title: 'DetailPlayList'}},
    {path: 'addSongToPlayList/:id', component: AddsongToPlaylistComponent, data: {title: 'AddSongToPlayList'}},
    {path: 'pageSong', component: PageSongComponent, data: {title: 'PageSong'}},
    {path: 'detailSong/:id',component: DetailSongComponent, data: {title: 'DetailSong'}},
    {path: 'editSong/:id', component: EditSongComponent, data: {title: 'EditSong'}},
    {path: 'addSongToCategory/:id', component: AddsongToCategoryComponent, data: {title: 'AddSongToCategory'}},
    {path: 'detailCategory/:id',component: DetailCategoryComponent, data: {title: 'DetailCategory'}},
    {path: 'addSongToSinger/:id', component: AddsongToSingerComponent, data: {title: 'AddSongToSinger'}},
    {path: 'pageUser', component: PageUserComponent, data: {title: 'PageUser'}},
    {path: 'detailUser/:id', component: DetailUserComponent, data: {title: 'DetailUser'}},
    {path: 'pageCategoryByUser', component: CategoryByUserComponent, data: {title: 'PageCategoryByUser'}},
    {path: 'pageSongByUser', component: SongByUserComponent, data: {title: 'PageSongByUser'}},
    {path: 'pageSingerByUser', component: SingerByUserComponent, data: {title: 'SingerByUser'}},
    {path: 'editPlayList/:id', component: EditPlaylistComponent, data: {title: 'EditPlayList'}},
    {path: 'addPlayListToCategory/:id', component: AddPlayListToCategoryComponent, data: {title: 'AddPlayListToCategory'}},
    {path: 'addPlayListToSinger/:id', component: AddPlayListToSingerComponent, data: {title: 'AddPlayListToSinger'}},
];

@NgModule({
    declarations: [
        AppComponent, HomeComponent, GettingStartedComponent, RegisterComponent, LoginComponent, UserComponent, UploadAvatarComponent, ChangePasswordComponent, ChangeProfileComponent, UploadFileComponent, CreateSingerComponent, AdminComponent, DetailSingerComponent, PageSingerComponent, EditSingerComponent, ChangeAvatarComponent, CreateSongComponent, CreateCategoryComponent, PageCategoryComponent, EditCategoryComponent, CreatePlaylistComponent, EditPlaylistComponent, AddsongToPlaylistComponent, DetailPlaylistComponent, PageSongComponent, DetailSongComponent, EditSongComponent, AddsongToCategoryComponent, DetailCategoryComponent, AddsongToSingerComponent, PageUserComponent, DetailUserComponent, SongByUserComponent, SingerByUserComponent, CategoryByUserComponent, AddPlayListToCategoryComponent, AddPlayListToSingerComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule, FontAwesomeModule,
        MatCardModule, MatToolbarModule, MatIconModule, MatRadioModule, MatCheckboxModule, MatSlideToggleModule,
        BrowserAnimationsModule, ShareButtonsModule,
        NgxAudioPlayerModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterModule.forRoot(appRoutes, {useHash: false}), MatButtonModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, Ng2SearchPipeModule,

    ],
    // entryComponents: [UserComponent],
    providers: [
        httpInterceptorProviders, AuthGuard, SingerService//Doan code lay JWT cho Header gui request lien quan ChangePass//
        // AuthSer,
        //
        // {
        //     provide: SocialLoginModule,
        //     useFactory: socialConfigs
        // }
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
