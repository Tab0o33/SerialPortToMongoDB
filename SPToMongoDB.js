const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const Measure = require('./measure.model');
const mongoose = require('mongoose');
var credentials = require('./credentials');

const path = 'COM17';
const port = new SerialPort(path, { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

mongoose.connect(credentials.connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

function addMeasure(valuesObjParam) {

    const measureObject = JSON.parse(valuesObjParam);
    const measureResu = new Measure({
        ...measureObject,
    });
    measureResu.save()
        .then(() => console.log('Mesure enregistrée !'))
        .catch(error => console.log('Error : unable to save the measure : ', error));
};
parser.on('data', function (data) {
    const today = new Date().toISOString();
    data = data + '1';
    const values = data.split(';');
    const valuesObj = `{"measureDate":"${today}", "temperature":${values[1]}, "pressure":${values[2]}, "humidity":${values[3]}, "luminosity":"${values[0]}", "movement":${values[4]}, "cardId":${values[5]} }`
    addMeasure(valuesObj);
});