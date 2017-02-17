import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login.service";

@Component({
    selector: 'app-app-login',
    templateUrl: './app-login.component.html',
    styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {


    constructor(private loginService: LoginService) {
    }

    ngOnInit() {
    }

    onSpotifyLoginClicked() {
        this.loginService.loginSpotify();
    }

    onLoginClicked() {
        this.loginService.login();
    }

}
