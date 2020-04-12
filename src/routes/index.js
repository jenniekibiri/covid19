
// import covid19ImpactEstimator from './estimator';
// import xml from 'xml';

const path = require('path');
const covid19ImpactEstimator = require('../estimator');
const xmlParser = require('./fast-xml-parser');

const appRoot = path.dirname(require.main.filename); // will fail if using a launcher like pm2

exports.evalCovidJSON = (req, res, next) => {
  try {
    const data = req.body;
    if (data == null) {
      res.sendStatus(400); return;
    }
    const output = covid19ImpactEstimator(data);
    res.type('application/json');
    res.status(200).json(output);
  } catch (error) {
    next(error);
  }
};

exports.evalCovidXML = (req, res, next) => {
  try {
    const data = req.body;
    if (data == null) {
      res.sendStatus(400); return;
    }
    const output = covid19ImpactEstimator(data);
    // xml requires that there is only a single root element
    const xmlOutput = xmlParser.parse({ root: output });
    res.set('Content-Type', 'application/xml');
    res.status(200);
    res.send(xmlOutput);
  } catch (error) {
    next(error);
  }
};

exports.getLogs = (req, res) => {
  res.status(200);
  res.sendFile(`${appRoot}/logs/app.log`);
};

exports.getXML = (req, res) => {
  const data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
  };
  const xmlOutput = xmlParser.parse({ root: data });
  res.set('Content-Type', 'application/xml');
  res.status(200);
  res.send(xmlOutput);
};
