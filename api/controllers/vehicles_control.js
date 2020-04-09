'use strict';

const VehiclesModel = require('../models/vehicles_model');

function getVehicles(req, res) {
  VehiclesModel.find().exec((err, doc) => {
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

function getVehicle(req, res) {
  let id = req.params.id;

  VehiclesModel.findById(id).exec((err, doc) => {
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

function postVehicle(req, res) {
  const data = new VehiclesModel();

  data.date = req.body.date;

  data.save((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored._id);
  });
}

function putVehicle(req, res) {
  const id = req.params.id;
  const update = req.body;

  VehiclesModel.findByIdAndUpdate(id, update).exec((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored);
  });
}

function deleteVehicle(req, res) {
  const id = req.params.id;

  VehiclesModel.findByIdAndRemove(id).exec((err, docStored) => {
    if (err)
      res.status(500).send({
        message: `Error al salvar en la base de datos: ${err} `
      });

    res.status(200).send(docStored);
  });
}

module.exports = {
  getVehicle,
  getVehicles,
  postVehicle,
  putVehicle,
  deleteVehicle
};
