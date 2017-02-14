import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/**
 * Material imports
 */
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule} from '@angular/flex-layout'; 

/**
 * Application imports
 */
import { AppComponent } from './app.component';
import { DecibelToolbarComponent } from './decibel-toolbar/decibel-toolbar.component';
import { SongCardComponent } from './song-card/song-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DecibelToolbarComponent,
    SongCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
