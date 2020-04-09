'use strict';

const WorkshopOrdersModel = require('../models/workshop_orders_model');

function getWorkshopOrder(req, res) {
  let id = req.params.id;

  WorkshopOrdersModel.findById(id).exec((err, doc) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición: ${err}`
      });
    if (!doc)
      return res.status(404).send({
        message: 'No existe'
      });

    res.status(200).send(doc);
  });
}

function getWorkshopOrders(req, res) {
  let state = req.params.state;

  WorkshopOrdersModel.find({ closed: state }).exec((err, doc) => {
    if (err)
      return res.status(500).send({
        message: `Error al realizar la petición: ${err}`
      });
    if (!doc)
      return res.status(404).send({
        message: 'No existe'
      });

    res.status(200).send(doc);
  });
}

function postWorkshopOrder(req, res) {
  const data = new WorkshopOrdersModel();

  data.order_id = req.body.order_id;
  data.year = req.body.year;
  data.date = req.body.date;
  data.fault = req.body.fault;
  data.vehicle_id = req.body.vehicle_id;
  data.vehicle = req.body.vehicle;
  data.license_plate = req.body.license_plate;
  data.price = req.body.price;
  data.hours = req.body.hours;
  data.materials = req.body.materials;
  data.closed = req.body.closed;
  data.finished = req.body.finished;
  data.images = req.body.images;

  data.save((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored._id);
  });
}

function putWorkshopOrder(req, res) {
  const id = req.params.id;
  const update = req.body;

  WorkshopOrdersModel.findByIdAndUpdate(id, update).exec((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored);
  });
}

function deleteWorkshopOrder(req, res) {
  const id = req.params.id;

  WorkshopOrdersModel.findByIdAndRemove(id).exec((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored);
  });
}

function getWorkshopOrdersLast(req, res) {
  let year = req.params.year;

  WorkshopOrdersModel.findOne({ year: year })
    .sort({ order_id: -1 })
    .limit(1)
    .exec((err, doc) => {
      if (err)
        return res.status(500).send({
          message: `Error al realizar la petición: ${err}`
        });
      if (!doc)
        return res.status(404).send({
          message: 'No existe'
        });

      res.status(200).send(doc);
    });
}

module.exports = {
  getWorkshopOrder,
  getWorkshopOrders,
  postWorkshopOrder,
  putWorkshopOrder,
  deleteWorkshopOrder,
  getWorkshopOrdersLast
};
