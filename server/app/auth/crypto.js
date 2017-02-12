import crypto from 'crypto';

class Crypto {

    generateSalt() {
        return crypto.randomBytes(128).toString('base64');
    }

    generateHashPassword(salt, pwd) {
        let hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    }
}

export default Crypto;