import express from 'express';
import './app/models'; // this MUST be done before controllers

import config from './app/config/config';
import logger from './app/config/logger';
import expressConfig from './app/config/express';
import mongooseConfig from './app/config/mongoose';
import passportConfig from './app/config/passport';
import routes from './app/config/routes';

import SongIndexer from './app/search/song-indexer';

// let songIndexer = new SongIndexer();
// songIndexer.indexSongData();

// create app
const app = express();

// Express setup
expressConfig(app, config);

// Mongoose setup
mongooseConfig(config, logger);

// Passport setup
passportConfig();

// Init routes
routes(app, config);

// START AND STOP
const server = app.listen(config.port, () => {
    logger.info(`listening on port ${config.port}`);
});

process.on('SIGINT', () => {
    logger.info('shutting down!');
    db.close();
    server.close();
    process.exit();
});