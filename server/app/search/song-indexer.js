import DataIndexer from './data-indexer';
import logger from '../config/logger';
import _ from 'lodash';
import songsData from '../../data/spotify-data.js';

const INDEX_NAME = 'songs-index';
const INDEX_TYPE = 'songs';

const INDEX_MAPPING_OBJ = {
    index: INDEX_NAME,
    type: "song",
    body: {
        properties: {
            album: {type: "string"},
            artists: {type: "string"},
            name: {type: "string"},
            id: {type: "string"},
            suggest: {
                type: "completion",
                analyzer: "simple",
                search_analyzer: "simple",
                payloads: true
            }
        }
    }
};

var makeBulkCallback = (docsList, callback) => {
    let playlistObjects = _.values(docsList.playlists);
    let bulkList = [];
    _.each(playlistObjects, playlist => {
        _.each(playlist.tracks, track => {
            bulkList.push(
                {index: {_index: INDEX_NAME, _type: INDEX_TYPE, _id: track.id}},
                {
                    'album': track.album,
                    'artists': track.artists,
                    'name': track.name,
                    'id': track.id,
                }
            );
        });
    });
    callback(bulkList);
};

class SongIndexer extends DataIndexer {

    indexSongData() {
        makeBulkCallback(songsData, (response) => {
            logger.info("Bulk content prepared");
            super.indexDocs(INDEX_NAME, 'songs', INDEX_MAPPING_OBJ, response);
        });
    }
}

export default SongIndexer;