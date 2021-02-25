const Joi = require("joi");
const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true,
  },
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
});

const Customer = mongoose.model("customer", customerSchema);

const validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().min(5).max(20).required(),
    phone: Joi.number().required(),
    isGold: Joi.boolean().required(),
  };
  return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
