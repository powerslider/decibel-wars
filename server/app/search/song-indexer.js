import DataIndexer from './data-indexer';
import logger from '../config/logger';
import _ from 'lodash';
import songsData from '../../data/music_data.js';


const INDEX_NAME = 'songs_index';
const INDEX_TYPE = 'song';

const INDEX_MAPPING_OBJ = {
    index: INDEX_NAME,
    type: INDEX_TYPE,
    body: {
        properties: {
            album: {type: "string"},
            artists: {type: "string"},
            name: {type: "string"},
            id: {type: "string"},
            // name_suggest: {
            //     type: "completion",
            //     // analyzer: "simple",
            //     // search_analyzer: "simple"
            // },
            // album_suggest: {
            //     type: "completion",
            //     // analyzer: "simple",
            //     // search_analyzer: "simple",
            // },
            // artists_suggest: {
            //     type: "completion",
            //     // analyzer: "simple",
            //     // search_analyzer: "simple",
            // }
        }
    }
};

var makeBulkCallback = (docsList, callback) => {
    let playlistObjects = _.values(docsList.playlists);
    let bulkList = [];
    _.each(playlistObjects, playlist => {
        _.each(playlist.tracks, (track, i)=> {
            bulkList.push(
                {index: {_index: INDEX_NAME, _type: INDEX_TYPE, _id: i}},
                {
                    'album': track.album,
                    'artists': track.artists,
                    'name': track.name,
                    'id': track.id,
                    // 'name_suggest': {
                    //     input: track.name.split(" "),
                    //     output: track.name,
                    // },
                    // 'album_suggest': {
                    //     input: track.album.split(" "),
                    //     output: track.album
                    // },
                    // 'artists_suggest': {
                    //     input: track.artists.join(' ').split(' '),
                    //     output: track.artists
                    // }
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
            super.indexBulkDocs(INDEX_NAME, INDEX_TYPE, INDEX_MAPPING_OBJ, response);
        });
    }

    searchSongs(query) {
        return super.multiMatchSearch(INDEX_NAME, INDEX_TYPE, ['name', 'album', 'artists'], query);
    }
}

export default SongIndexer;