'use strict';

const express = require('express');
const api = express.Router();

const workshopOrdersControl = require('../controllers/workshop_orders_control.js');
const workshopVehiclesControl = require('../controllers/vehicles_control.js');

api.get('/workshop/order', workshopOrdersControl.getWorkshopOrder);
api.get('/workshop/orders/:state', workshopOrdersControl.getWorkshopOrders);
api.post('/workshop/order', workshopOrdersControl.postWorkshopOrder);
api.put('/workshop/order/:id', workshopOrdersControl.putWorkshopOrder);
api.get(
  '/workshop/orders/last/:year',
  workshopOrdersControl.getWorkshopOrdersLast
);

api.get('/workshop/vehicles', workshopVehiclesControl.getVehicles);

api.get('/', function(request, response) {
  response.send('NODE AT WORK!!!');
});

module.exports = api;
