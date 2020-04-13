/* eslint-disable no-use-before-define */

const express = require('express');
const bodyParser = require('body-parser');
const covid19ImpactEstimator = require('../estimator.js');
const estimator = require('../estimator.js');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('hello sever');
});
app.post('/api/v1/on-covid-19', (req, res) => {
  const {
    // eslint-disable-next-line max-len
    name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation
  } = req.body.region;
  const {
    periodType, timeToElapse, reportedCases, population, totalHospitalBeds
  } = req.body;
  const inputData = {
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };


  const data = estimator(inputData);
  // const output = covid19ImpactEstimator();

  res.status(200).json(data);
});
app.post('/json', (req, res) => {
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
  const output = covid19ImpactEstimator(data);
  res.type('application/json');
  res.status(200).json(output);


  const data = estimator(inputData);

  res.status(200).json(data);
});
const PORT = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
