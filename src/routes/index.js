const express = require('express');

const estimator = require('../estimator.js');

const route = express.Router();
route.get('/', (req, res) => {
  res.send('Hello Evans');
});
route.post('/', (req, res) => {
  const inputData = {
    region: {
      name: req.body.region.name,
      avgAge: req.body.region.avgAge,
      avgDailyIncomeInUSD: req.body.region.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: req.body.region.avgDailyIncomePopulation
    },
    periodType: req.body.periodType,
    timeToElapse: req.body.timeToElapse,
    reportedCases: req.body.reportedCases,
    population: req.body.population,
    totalHospitalBeds: req.body.totalHospitalBeds
  };


  const data = estimator(inputData);

  res.status(200).json(data);
});
route.post('/json', (req, res) => {
  const inputData = {
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


  const data = estimator(inputData);

  res.status(200).json(data);
});

module.exports = route;
