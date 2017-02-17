import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Errors} from "./utils/errors";

@Injectable()
export class LoginService {

    constructor(private http: Http) { }

    public loginSpotify() {
        return this.http.get("/auth/spotify")
            .map(resp => resp)
            .catch(Errors.handleError);
    }

    public login() {
        return this.http.get("/auth/login")
            .map(resp => {
                return resp.json().user;
            })
            .catch(Errors.handleError);
    }
}
