import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

/**
 * Material imports
 */
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * Application imports
 */
import {AppComponent} from './app.component';
import {DecibelToolbarComponent} from './decibel-toolbar/decibel-toolbar.component';
import {SongCardComponent} from './song-card/song-card.component';
import {RequestSongComponent} from './request-song/request-song.component';
import {SearchSongComponent} from './search-song/search-song.component';
import { AppLoginComponent } from './app-login/app-login.component';

const appRoutes: Routes = [
    {path: 'login', component: AppLoginComponent},
    {path: 'search-song', component: SearchSongComponent},
    {path: 'request-song', component: RequestSongComponent},
    {path: '', redirectTo: 'search-song', pathMatch: 'full'}
];

@NgModule({
    declarations: [
        AppComponent,
        DecibelToolbarComponent,
        SongCardComponent,
        RequestSongComponent,
        SearchSongComponent,
        AppLoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        FlexLayoutModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
