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