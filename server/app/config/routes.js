import UserController from '../controllers/user.controller';
import AuthController from '../controllers/auth.controller';
import express from 'express';
import path from 'path';


export default function (app, config) {
    let router = express.Router();

    let userCtrl = new UserController();
    let authCtrl = new AuthController();

    userCtrl.seedInitialUsers();

    router.get('/api/users', userCtrl.getUsers);
    router.post('/api/users', userCtrl.createUser);

    router.get('/partials/:partialDir/:partialName', (req, res) => {
        res.render('../../public/app/' + req.params.partialDir + '/' + req.params.partialName);
    });

    router.post('/login', authCtrl.login);
    router.post('/logout', authCtrl.logout);

    router.get('*', (req, res) => {
        // res.render('../views/index', {
        //     title: "Decibel Wars",
        //     currentUser: {
        //         name: "pesho"
        //     }
        // });
        res.sendFile(path.join(config.root, 'client/src/index.html'));
    });

    app.use('/', router);
};