'use strict';

const express = require('express');
const api = express.Router();

const workshopOrdersControl = require('../controllers/workshop_orders_control');

api.get('/workshop/orders', workshopOrdersControl.getWorkshopOrder);

api.get('/', function(request, response) {
  response.send('Eplayas!!!');
});

module.exports = api;
