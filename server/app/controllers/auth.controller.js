import passport from 'passport';


class AuthController {

    login(req, res, next) {
        let auth = passport.authenticate('local', (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.send({success: false});
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.send({success: true, user: user});
            });
        });
        auth(req, res, next);
    }

    logout(req, res, next) {
        req.logout();
        res.end();
    }

    isAuthenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    }

    isInRole(role) {
        return (req, res, next) => {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            } else {
                res.status(403);
                res.end();
            }
        }
    }
}

export default AuthController;