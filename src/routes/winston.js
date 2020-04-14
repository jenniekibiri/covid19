const winston = require('winston');
const path = require('path');

const appRoot = path.dirname(require.main.filename); // will fail if using a launcher like pm2

// configs for winston transports i.e. file and console
const options = {
  file: {
    // level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: false,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    // level: 'debug',
    handleExceptions: false,
    json: false,
    colorize: true
  }
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message) {
    // use the 'info' log level so the output will be picked up by both transports(file and console)
    logger.log(`${message}ms`);
  }
};

// include winston logging e.g. in error handler in app.js
// winston.error(`${req.method} \t\t ${req.url} \t\t ${err.status || 500}`);

module.exports = logger;
