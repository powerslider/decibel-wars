import elasticsearch from 'elasticsearch';
import logger from '../config/logger';


class DataIndexer {

    constructor() {
        this.elasticClient = new elasticsearch.Client({
            host: 'localhost:9200',
            log: 'info'
        });
    }

    deleteIndex(indexName) {
        return this.elasticClient.indices.delete({
            index: indexName
        });
    }

    initIndex(indexName) {
        return this.elasticClient.indices.create({
            index: indexName
        });
    }

    initIndexMapping(mappingObj) {
        return this.elasticClient.indices.putMapping(mappingObj);
    }

    indexExists(indexName) {
        return this.elasticClient.indices.exists({
            index: indexName
        });
    }

    bulkAdd(indexName, indexType, makeBulk) {
        this.elasticClient.bulk({
            maxRetries: 5,
            index: indexName,
            type: indexType,
            body: makeBulk
        }, (err, resp, status) => {
            if (err) {
                logger.error(err);
            } else {
                logger.info("Successfully indexed ->");
                logger.info(resp.items);
            }
        });
    }

    indexBulkDocs(indexName, indexType, mappingObj, makeBulkCallback) {
        this.indexExists(indexName)
            .then((exists) => {
                if (exists) {
                    return this.deleteIndex(indexName);
                }
            })
            .then(() => {
                return this.initIndex(indexName)
                    .then(() => {
                        this.initIndexMapping(mappingObj);
                    })
                    .then(() => {
                        this.bulkAdd(indexName, indexType, makeBulkCallback);
                    });
            });
    }

    // indexDocs(indexName, indexType, mappingObj, dataList) {
    //     this.indexExists(indexName)
    //         .then((exists) => {
    //             if (exists) {
    //                 return this.deleteIndex(indexName);
    //             }
    //         })
    //         .then(() => {
    //             return this.initIndex(indexName)
    //                 .then(() => {
    //                     this.initIndexMapping(mappingObj);
    //                 })
    //                 .then(() => {
    //                     let promises = dataList.map(item => this.addDocument(indexName, indexType, item));
    //                     return Promises.all(promises);
    //                 });
    //         });
    // }
    //
    // addDocument(indexName, indexType, bodyObj) {
    //     return this.elasticClient.index({
    //         index: indexName,
    //         type: indexType,
    //         body: bodyObj
    //     });
    // }

    multiMatchSearch(indexName, indexType, fields, query) {
        return this.elasticClient.search({
            index: indexName,
            type: indexType,
            body: {
                query: {
                    multi_match: {
                        fields: fields,
                        query: query,
                        fuzziness: "AUTO"
                    }
                }
            }
        });
    }

    getSuggestions(input, indexName, indexType) {
        return this.elasticClient.suggest({
            index: indexName,
            type: indexType,
            body: {
                namesuggest: {
                    text: input,
                    completion: {
                        field: "name_suggest",
                        fuzzy: true
                    }
                }
            }
        });
    }
}

export default DataIndexer;