import mongoose from 'mongoose';
import Crypto from '../auth/crypto';


const userSchema = new mongoose.Schema({
    username: {type: String, require: '{PATH} is required', unique: true},
    firstName: {type: String, require: '{PATH} is required'},
    lastName: {type: String, require: '{PATH} is required'},
    salt: String,
    hashPass: String,
    roles: [String],
    // pins: [{type: Schema.Types.ObjectId, ref: 'Pin'}]
});

userSchema.method({
    authenticate(password) {
        return Crypto.generateHashPassword(this.salt, password) === this.hashPass;
    }
});

mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt,
                hashPass;
            salt = Crypto.generateSalt();
            hashPass = Crypto.generateHashPassword(salt, '123');
            User.create({username: 'monnn', firstName: 'Moni', lastName: 'Shopova', salt: salt, hashPass: hashPass, roles: ['admin']});
            User.create({username: 'ivan', firstName: 'Ivan', lastName: 'Ivanov',  salt: salt, hashPass: hashPass, roles: ['standart']});
            console.log('Users added to Database');
        }
    });
}