import request from 'request';
import querystring from 'querystring';


const SPOTIFY_ACCOUNT_SERVICE_URL = 'https://accounts.spotify.com/api/token';

const APP_KEY = 'f11c9b09cd794778b08c987bee34e0ef';
const APP_SECRET = '3cd86de08c4b448a805b8c3c5bf69827';

const REDIRECT_URI = 'http://localhost:5000/auth/spotify/callback';
const AUTH_HEADER_VAL = 'Basic ' + (new Buffer(APP_KEY + ':' + APP_SECRET).toString('base64'));
const STATE_KEY = 'spotify_auth_state';

let generateRandomString = length => {
    let text = '',
        possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        // your application requests authorization
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const CLIENT_CRED_OPTIONS = {
    url: SPOTIFY_ACCOUNT_SERVICE_URL,
    headers: {
        'Authorization': 'Basic ' + (new Buffer(APP_KEY + ':' + APP_SECRET).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

let AUTH_OPTIONS = code => {
    return {
        url: SPOTIFY_ACCOUNT_SERVICE_URL,
        form: {
            code: code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {'Authorization': AUTH_HEADER_VAL},
        json: true
    }
};

let REFRESH_TOKEN_OPTIONS = refreshToken => {
    return {
        url: SPOTIFY_ACCOUNT_SERVICE_URL,
        headers: {'Authorization': AUTH_HEADER_VAL},
        form: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        },
        json: true
    };
};

class SpotifyAuthController {

    login(req, res, next) {
        let state = generateRandomString(16);
        res.cookie(STATE_KEY, state);

        // your application requests authorization
        let scope = 'user-read-private user-read-email';
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: APP_KEY,
                scope: scope,
                redirect_uri: REDIRECT_URI,
                state: state
            }));
    }

    loginCallback(req, res, next) {
        // your application requests refresh and access tokens
        // after checking the state parameter

        let code = req.query.code || null,
            state = req.query.state || null,
            storedState = req.cookies ? req.cookies[STATE_KEY] : null;

        if (state === null || state !== storedState) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {
            res.clearCookie(STATE_KEY);

            request.post(AUTH_OPTIONS(code), function (error, response, body) {
                if (!error && response.statusCode === 200) {

                    let accessToken = body.access_token,
                        refreshToken = body.refresh_token;

                    let options = {
                        url: 'https://api.spotify.com/v1/me',
                        headers: {'Authorization': 'Bearer ' + accessToken},
                        json: true
                    };

                    // use the access token to access the Spotify Web API
                    request.get(options, (error, response, body) => {
                        console.log(body);
                    });

                    // we can also pass the token to the browser to make requests from there
                    res.redirect('/#' +
                        querystring.stringify({
                            access_token: accessToken,
                            refresh_token: refreshToken
                        }));
                } else {
                    res.redirect('/#' +
                        querystring.stringify({
                            error: 'invalid_token'
                        }));
                }
            });
        }
    }

    refreshToken(req, res, next) {
        // requesting access token from refresh token
        let refreshToken = req.query.refresh_token;
        request.post(REFRESH_TOKEN_OPTIONS(refreshToken), (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let accessToken = body.access_token;
                res.send({
                    'access_token': access_token
                });
            }
        });
    }

    getUsersData(req, res, next) {
        request.post(CLIENT_CRED_OPTIONS, (error, response, body) => {
            if (!error && response.statusCode === 200) {

                // use the access token to access the Spotify Web API
                let token = body.access_token,
                    options = {
                        url: 'https://api.spotify.com/v1/me',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        },
                        json: true
                    };
                request.get(options, function (error, response, body) {
                    req.send(body);
                });
            }
        });
    }
}

export default SpotifyAuthController;