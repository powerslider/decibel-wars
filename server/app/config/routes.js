import UserController from '../controllers/user.controller';
import AuthController from '../controllers/auth.controller';


export default function(app) {
    app.get('/api/users', UserController.getUsers);
    app.post('/api/users', UserController.createUser);

    app.get('/partials/:partialDir/:partialName', function (req, res) {
        res.render('../../public/app/' + req.params.partialDir + '/' + req.params.partialName);
    });

    app.post('/login', AuthController.login);
    app.post('/logout', AuthController.logout);

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};