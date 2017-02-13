import elasticsearch from 'elasticsearch';

class SearchController {

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

    indexExists(indexName) {
        return this.elasticClient.indices.exists({
            index: indexName
        });
    }
}