'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workshopOrdersSchema = Schema(
  {
    order_id: Number,
    year: Number,
    date: String,
    fault: String,
    vehicle_id: String,
    vehicle: String,
    license_plate: String,
    price: Number,
    hours: Number,
    materials: Number,
    closed: Boolean,
    finished: Boolean,
    images: Array
  },
  { collection: 'workshop_orders' }
);

module.exports = mongoose.model('workshop_orders', workshopOrdersSchema);
