import { Component } from '@angular/core';
import { SongsService } from './songs.service';
import { LoginService } from './login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SongsService, LoginService]
})
export class AppComponent {
    title = 'app works!';
}
