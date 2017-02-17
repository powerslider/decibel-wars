import {Component} from '@angular/core';
import {SongsService} from './songs.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SongsService]
})
export class AppComponent {
    title = 'app works!';
}
