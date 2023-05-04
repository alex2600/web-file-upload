const winston = require('winston');
const settings = require("./settings")

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    // defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({filename: settings.logFile}),
        // new winston.transports.Console({
        //     format: winston.format.combine(
        //         winston.format.splat(),
        //         winston.format.simple(),
        //     )
        // })
        new winston.transports.Console({format: winston.format.json()})
        // new winston.transports.Console({format: winston.format.simple()})
    ],
});

module.exports = logger

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple(),
//     }));
// }
