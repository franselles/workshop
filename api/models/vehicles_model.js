var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var vehiclesSchema = new Schema(
  {
    numero: { type: String },
    matricula: { type: String },
    nombre: { type: String },
    ult_rev: { type: String },
    prx_rev: { type: String },
    int_rev: { type: String },
    ult_itv: { type: String },
    prx_itv: { type: String },
    int_itv: { type: String },
    nota: { type: String }
  },
  { collection: 'vehiculos' }
);

module.exports = mongoose.model('Vehicles', vehiclesSchema);
