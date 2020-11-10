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
import { DetailCategoryComponent } from './content/categoryManage/detail-category/detail-category.component';
import { PageUserComponent } from './form-login/page-user/page-user.component';
import { DetailUserComponent } from './form-login/detail-user/detail-user.component';
import { SongByUserComponent } from './content/userCreateManage/song-by-user/song-by-user.component';
import { SingerByUserComponent } from './content/userCreateManage/singer-by-user/singer-by-user.component';
import { CategoryByUserComponent } from './content/userCreateManage/category-by-user/category-by-user.component';
import { CreateBandComponent } from './content/bandManage/create-band/create-band.component';
import { PageBandComponent } from './content/bandManage/page-band/page-band.component';
import { DetailBandComponent } from './content/bandManage/detail-band/detail-band.component';
import { CreateAlbumComponent } from './content/albumManage/create-album/create-album.component';
import { PageAlbumComponent } from './content/albumManage/page-album/page-album.component';
import { DetailAlbumComponent } from './content/albumManage/detail-album/detail-album.component';
import { EditBandComponent } from './content/bandManage/edit-band/edit-band.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ShareButtonsConfig, ShareModule} from '@ngx-share/core';
import {MatVideoModule} from 'mat-video';
import { PageKaraokeComponent } from './content/karaokeManage/page-karaoke/page-karaoke.component';
import { CreateKaraokeComponent } from './content/karaokeManage/create-karaoke/create-karaoke.component';
import { EditKaraokeComponent } from './content/karaokeManage/edit-karaoke/edit-karaoke.component';
import {SafePipeModule} from 'safe-pipe';
import { CreateVideoComponent } from './content/videoManage/create-video/create-video.component';
import { EditVideoComponent } from './content/videoManage/edit-video/edit-video.component';
import { PageVideoComponent } from './content/videoManage/page-video/page-video.component';
import { DetailVideoComponent } from './content/videoManage/detail-video/detail-video.component';
import { CreateHocLapTrinhComponent } from './content/hoclaptrinhManage/create-hoc-lap-trinh/create-hoc-lap-trinh.component';
import { PageHocLapTrinhComponent } from './content/hoclaptrinhManage/page-hoc-lap-trinh/page-hoc-lap-trinh.component';
import { EditHocLapTrinhComponent } from './content/hoclaptrinhManage/edit-hoc-lap-trinh/edit-hoc-lap-trinh.component';
import { DetailHocLapTrinhComponent } from './content/hoclaptrinhManage/detail-hoc-lap-trinh/detail-hoc-lap-trinh.component';


// const config = new SocialAuthService([
//     {
//         id: FacebookLoginProvider.PROVIDER_ID,
//         provider: new FacebookLoginProvider('2203659926599837')
//     }
// ]);

// export function provideConfig() {
//     return config;
// }


const customConfig: ShareButtonsConfig = {
    include: ['facebook', 'twitter', 'linkedin', 'reddit', 'whatsapp', 'telegram', 'print', 'email'],
    theme: 'circles-dark',
    autoSetMeta: true,
    twitterAccount: 'ankitsharma_007'
}; //CONFIG SHARE FaceBook//


export const appRoutes: Routes = [
    {path: '', component: HomeComponent, data: {title: 'Home'}},
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
    {path: 'detailCategory/:id',component: DetailCategoryComponent, data: {title: 'DetailCategory'}},
    {path: 'pageUser', component: PageUserComponent, data: {title: 'PageUser'}},
    {path: 'detailUser/:id', component: DetailUserComponent, data: {title: 'DetailUser'}},
    {path: 'pageCategoryByUser/:id', component: CategoryByUserComponent, data: {title: 'PageCategoryByUser'}},
    {path: 'pageSongByUser/:id', component: SongByUserComponent, data: {title: 'PageSongByUser'}},
    {path: 'pageSingerByUser/:id', component: SingerByUserComponent, data: {title: 'SingerByUser'}},
    {path: 'editPlayList/:id', component: EditPlaylistComponent, data: {title: 'EditPlayList'}},
    {path: 'createBand', component: CreateBandComponent, data: {title: 'CreateBand'}},
    {path: 'pageBand', component: PageBandComponent, data: {title: 'PageBand'}},
    {path: 'createAlbum', component: CreateAlbumComponent, data:{title: 'CreateAlbum'}},
    {path: 'pageAlbum', component: PageAlbumComponent, data: {title: 'PageAlbum'}},
    {path: 'detailAlbum/:id',component: DetailAlbumComponent, data: {title: 'DetailAlbum'}},
    {path: 'editBand/:id',component: EditBandComponent, data:{title: 'EditBand'}},
    {path: 'detailBand/:id', component: DetailBandComponent, data:{title: 'DetailBand'}},
    {path: 'createKaraoke',component: CreateKaraokeComponent, data:{title: 'CreateKaraoke'}},
    {path: 'pageKaraoke',component: PageKaraokeComponent, data:{title: 'PageKaraoke'}},
    {path: 'editKaraoke/:id',component: EditKaraokeComponent, data: {title: 'EditKaraoke'}},
    {path: 'createVideo', component: CreateVideoComponent, data: {title: 'CreateVideo'}},
    {path: 'pageVideo',component: PageVideoComponent, data: {title: 'PageVideo'}},
    {path: 'editVideo/:id',component: EditVideoComponent, data: {title: 'EditVideo'}},
    {path: 'detailVideo/:id',component: DetailVideoComponent, data: {title: 'DetailVideo'}},
    {path: 'createHocLapTrinh', component: CreateHocLapTrinhComponent, data: {title: 'CreateHocLapTrinh'}},
    {path: 'pageHocLapTrinh', component: PageHocLapTrinhComponent, data: {title: 'PageHocLapTrinh'}},
    {path: 'editHocLapTrinh/:id', component: EditHocLapTrinhComponent, data: {title: 'EditHocLapTrinh'}},
    {path: 'detailHocLapTrinh/:id', component: DetailHocLapTrinhComponent, data: {title: 'DetailHocLapTrinh'}}
];

@NgModule({
    declarations: [
        AppComponent, HomeComponent,RegisterComponent, LoginComponent, UserComponent, UploadAvatarComponent, ChangePasswordComponent, ChangeProfileComponent, UploadFileComponent, CreateSingerComponent, AdminComponent, DetailSingerComponent, PageSingerComponent, EditSingerComponent, ChangeAvatarComponent, CreateSongComponent, CreateCategoryComponent, PageCategoryComponent, EditCategoryComponent, CreatePlaylistComponent, EditPlaylistComponent, AddsongToPlaylistComponent, DetailPlaylistComponent, PageSongComponent, DetailSongComponent, EditSongComponent, DetailCategoryComponent, PageUserComponent, DetailUserComponent, SongByUserComponent, SingerByUserComponent, CategoryByUserComponent,CreateBandComponent, PageBandComponent, DetailBandComponent, CreateAlbumComponent, PageAlbumComponent, DetailAlbumComponent, EditBandComponent, PageKaraokeComponent, CreateKaraokeComponent, EditKaraokeComponent, CreateVideoComponent, EditVideoComponent, PageVideoComponent, DetailVideoComponent, CreateHocLapTrinhComponent, PageHocLapTrinhComponent, EditHocLapTrinhComponent, DetailHocLapTrinhComponent,
    ],
  imports: [
    HttpClientModule,
    BrowserModule, FontAwesomeModule,
    MatCardModule, MatToolbarModule, MatIconModule, MatRadioModule, MatCheckboxModule, MatSlideToggleModule,

    BrowserAnimationsModule, ShareButtonsModule,
    NgxAudioPlayerModule,
    NgxPaginationModule,
    MatVideoModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(appRoutes, {useHash: false}), MatButtonModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, Ng2SearchPipeModule,
    ShareButtonsModule.withConfig(customConfig), SafePipeModule, //CONFIG SHARE FaceBook//

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
