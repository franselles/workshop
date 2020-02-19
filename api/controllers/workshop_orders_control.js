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

function postWorkshopOrder(req, res) {
  const data = new WorkshopOrdersModel();

  data.date = req.body.date;

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

module.exports = {
  getWorkshopOrder,
  postWorkshopOrder,
  putWorkshopOrder,
  deleteWorkshopOrder
};
