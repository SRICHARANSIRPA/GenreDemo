const mongoose = require("mongoose");
const Joi = require("joi");
const customerSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        min: 5,
        max: 20,
      },
      phone: {
        type: Number,
        required: true,
      },
      isGold: {
        type: Boolean,
        required: true,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
    }),
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: {
      type: Number,
      min: 0,
    },
  },
});

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };
  return Joi.validate(rental, schema);
}

exports.Rental = mongoose.model("rentals", customerSchema);
exports.validate = validateRental;
