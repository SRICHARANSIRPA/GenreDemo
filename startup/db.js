const mongoose = require("mongoose");
const logger = require("../middleware/winston");
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
module.exports = function () {
  mongoose.connect("mongodb://localhost:27017/vidly", options).then(() => {
    logger.info("Connected to MongoDB...");
  });
};
