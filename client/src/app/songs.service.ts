import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Song} from './model/song';
import {Errors} from "./utils/errors";

const API_URL: string = "http://localhost:5000";
const SONGS_API_URL: string = API_URL + "/api/search";

@Injectable()
export class SongsService {

    constructor(private http: Http) { }

    public getSongs(query: string): Observable<Song[]> {
        return this.http.get(SONGS_API_URL + "?q=" + query)
            .map(SongsService.extractData)
            .catch(Errors.handleError);
    }

    private static extractData(res: Response) {
        let body = res.json();
        console.log(body);
        return body.data || {};
    }
}
