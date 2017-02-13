import Crypto from '../auth/crypto';
import mongoose from 'mongoose';

const User = mongoose.model('User');

class UserController {

    createUser(req, res, next) {
        let newUserData = req.body;
        newUserData.salt = Crypto.generateSalt();
        newUserData.hashPass = Crypto.generateHashPassword(newUserData.salt, newUserData.password);
        User.create(newUserData, (err, user) => {
            if (err) {
                console.log('Failed to register new user ' + err);
                return;
            }
            req.logIn(user, (err) => {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                }
                res.send(user);
            });
        });
    }

    getUsers(req, res) {
        var userId = req.query.uId;
        if (userId) {
            User.find({_id: userId}).exec((err, user) => {
                if (err) {
                    console.log('User could not be loaded ' + err);
                }
                console.log(user);
                res.send(user);
            });
        } else {
            User.find({}).exec((err, collection) => {
                if (err) {
                    console.log('User could not be loaded ' + err);
                }
                res.send(collection);
            });
        }
    }

    seedInitialUsers() {
        User.find({}).exec((err, collection) => {
            if (err) {
                console.log('Cannot find users: ' + err);
                return;
            }

            let crypto = new Crypto();

            if (collection.length === 0) {
                var salt,
                    hashPass;
                salt = crypto.generateSalt();
                hashPass = crypto.generateHashPassword(salt, '123');
                User.create({
                    username: 'monnn',
                    firstName: 'Moni',
                    lastName: 'Shopova',
                    salt: salt,
                    hashPass: hashPass,
                    roles: ['admin']
                });
                User.create({
                    username: 'ivan',
                    firstName: 'Ivan',
                    lastName: 'Ivanov',
                    salt: salt,
                    hashPass: hashPass,
                    roles: ['standart']
                });
                console.log('Users added to Database');
            }
        });
    }
}

export default UserController;