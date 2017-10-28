import mongoose from 'mongoose';

export default function (config, logger) {
    // MONGOOSE SET-UP
    // warn if MONGOURI is being used and pass is undefined
    if (config.db === process.env.MONGOURI && !config.pass)
        logger.warn(`bad credentials for ${config.db} -- check env.`);

    mongoose.connect(config.db);
    //     , {
    //     user: config.user,
    //     pass: config.pass
    // });

    const db = mongoose.connection;
    db.on('error', () => {
        throw new Error(`unable to connect to database at ${config.db}`);
    });

    return db;
}