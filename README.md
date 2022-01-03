# Web File Uploader

## About

TODO write this

## Setup

### File upload destination

Specify your file upload destination in `settings.default.json` (or overwrite in `settings.$ENV.json`).

### Auth

Uploading and Downloading files does not require Authentication, but accessing the advanced features does.

The username and password can be set in `settings.default.json` or in a dedicated `settings.$NODE_ENV.json` file.

## Deployment 

    npm ci

## Build lib 

    npm run build-production

## Run

    npm start

## Running with PM2

    pm2 start --name fileUpload bin/www

## Running with Docker

### Build and Start

    npm run docker-rebuild


## Development

Running the REST API

    npm run dev

Running the Web Frontend in development mode

    npm run watch

