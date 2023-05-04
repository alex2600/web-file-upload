# Web File Uploader

## About

*Web File Upoader* provides:

- a REST API for uploading and downloading files (and more)
- a Web-Frontend to up- and download files using a browser
- upload is by default free for all
- for downloading a file you only need to know the file URL
- there is also a Backend area which requires authenication
  - here all available files can be listed, viewed, deleted
  - Media files can be previewed without having to download the file
- by default all uploaded files are deleted after 48 hours
- files can be pinned - pinned files are not deleted automatically after a period of time
- a list of recently uploaded files are reported to a specified email adress


## Setup

### File upload destination

Specify your file upload destination in `settings.default.json` (or overwrite the defaults by using a custom settings file `settings.$NODE_ENV.json`).

### Auth

Uploading and Downloading files does not require Authentication, but accessing the advanced features does.

The username and password can be set in `settings.default.json` or in a dedicated `settings.$NODE_ENV.json` file.

## Install dependencies 

    npm ci

## Build lib 

    npm run build-production

## Run

Simply run the App

    npm start

... or run using PM2 process manager (on server)

    pm2 start --name fileUpload bin/www

... or run using Docker

    npm run docker-rebuild


## Development

Running the REST API

    npm run dev

Running the Web Frontend in development mode

    npm run watch

