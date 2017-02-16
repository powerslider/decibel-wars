import SongIndexer from '../search/song-indexer';
import logger from '../config/logger';


class SongController {

    constructor(songIndexer) {
        this.songIndexer = songIndexer;
    }

    searchSongs(req, res, next) {
        this.songIndexer.searchSongs(req.query.q)
            .then((result) => {
                logger.info(result);
                res.json(result.hits.hits);
            });
    }
}

export default SongController;