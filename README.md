# Decibel Wars

## Overview
Cool web application for ordering songs in karaoke bars. The way it works is
you sit at a table in the bar and by using your smartphone you find a song you
would like to sing, enter your name and table number. The DJ will receive your
request and you will receive a notification when you are going to sing.

## Used techologies
MEAN stack project using Angular 2, Elasticsearch for indexing of song metadata,
assisting in search, Mongoose as ODM for Mongo, Passport for authentication,
integrated Spotify login.

## Architecture
The project consists of a backend and frontend part which run separately.
* **Backend** - uses Express as a web framework and nodemon as an application
server. 

* **Frontend** - based on Angular 2 and is being served by its own
application server included in angular-cli.

* **Elasticsearch** - runs as a standalone process on http://localhost:9200 and 
includes the indexed data which the other components request when doing a search.

## Build
To build both modules run:
```
npm install
```
in **client** and **server** directories.

## Deploy
* Start backend on http://localhost:5000
```
cd server 
npm start
```

* Start frontend on http://localhost:4200
```
cd client 
ng serve
```

* Start Elasticsearch on http://localhost:9200
```
./bin/elasticsearch.sh
```

* MongoDB should run on http://localhost:27017