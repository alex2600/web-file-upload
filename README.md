# Web File Upload

## About

- The system provides a REST API that supports file uploading and downloading, as well as other features.
- A web-based frontend is available to facilitate file uploads and downloads using the REST API.
- Uploaded files are stored in the system for 48 hours by default, but users can mark files as "pinned" to keep them
  around longer.
- The system provides a backend area that's accessible only to authenticated users, where files can be managed (listed,
  viewed, and deleted) and media files can be previewed without downloading.
- Email notifications can be configured to send a list of recently uploaded files to a specified address.

## Settings

### REST API

Make a copy of `settings.default.json`.
Rename it to `settings.$NODE_ENV.json` (where `$NODE_ENV` is the environment variable that determines the environment
the app is running in, e.g. `development`, `production`, etc.).

Change inside your new settings file the following settings:

- uploadDir: The directory where the uploaded files will be stored.
- baseUrl: The base URL the server will be running on.
- mail: The sender and recipient email addresses for the notification email, as well as the CRON schedule for sending
  the email.
- auth: The username and password for the backend area.

### Frontend

The frontend needs to know the base URL of the REST API.
This is configured in `vue/.env`.

Remember to rebuild the frontend after changing the settings.

## Install dependencies

    npm i


## Running

### REST API

    npm start

Or run using PM2 process manager (on server)

    pm2 start --name fileUpload bin/www


### Frontend

    npm run build-ui

This will generate the frontend files in the `vue/dist` directory.

`vue/dist` will be served by express at path `/`.

## Development

Running the Web Frontend in development mode

    npm run dev-ui

Running the REST API

    npm run dev

## Security

Right now the CORS settings of the REST API are set to allow all origins.
If this is not desired, change the CORS settings in `app.js` to your needs.

