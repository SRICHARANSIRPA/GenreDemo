const winston = require("winston");
require("winston-mongodb");
options = [
  new winston.transports.File({ filename: "logfile.log" }),
  new winston.transports.MongoDB({
    db: "mongodb://localhost:27017/vidly",
    options: {
      poolSize: 2,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
];

const logger = winston.createLogger({
  transports: options,
  exceptionHandlers: [
    new winston.transports.File({ filename: "unCaughtExpections.log" }),
  ],
});

module.exports = logger;
