import UserController from '../controllers/user.controller';
import AuthController from '../controllers/auth.controller';
import SpotifyAuthController from '../controllers/spotify-auth.controller';
import SongController from '../controllers/song.controller';
import SongIndexer from '../search/song-indexer';
import express from 'express';
import logger from './logger';


export default function (app, config) {
    let router = express.Router();

    let userCtrl = new UserController();
    let authCtrl = new AuthController();
    let spotifyAuthCtrl = new SpotifyAuthController();
    let songIdx = new SongIndexer();
    let songCtrl = new SongController(songIdx);

    userCtrl.seedInitialUsers();

    router.get('/api/users', userCtrl.getUsers);
    router.post('/api/users', userCtrl.createUser);

    // router.get('/api/search', songCtrl.searchSongs);
    router.get('/api/search', (req, res, next) => {
        songIdx.searchSongs(req.query.q)
            .then((result) => {
                logger.info(result);
                res.json(result.hits.hits);
            });
    });

    router.get('/partials/:partialDir/:partialName', (req, res) => {
        res.render('../../public/app/' + req.params.partialDir + '/' + req.params.partialName);
    });

    router.post('/auth/login', authCtrl.login);
    router.post('/auth/logout', authCtrl.logout);

    router.get('/auth/spotify', spotifyAuthCtrl.login);
    router.get('/auth/spotify/callback', spotifyAuthCtrl.loginCallback);
    router.get('/user-data', spotifyAuthCtrl.getUsersData);
    /*router.get('*', (req, res) => {
     // res.render('../views/index', {
     //     title: "Decibel Wars",
     //     currentUser: {
     //         name: "pesho"
     //     }
     // });
     res.sendFile(path.join(config.root, 'client/src/index.html'));
     });*/

    app.use('/', router);
};