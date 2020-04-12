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

function computeImpact() {
  const currentlyInfected = data.reportedCases * 10;
  const currentlyInfectedSevere = data.reportedCases * 50;
  let days = null;
  const duration = data.timeToElapse;
  if (data.periodType === 'days') {
    days = duration;
  }
  if (data.periodType === 'weeks') {
    days = duration * 7;
  }
  if (data.periodType === 'months') {
    days = duration * 30;
  }
  const factor = Math.trunc(days / 3);
  const infectionsByRequestedTimeImpact = currentlyInfected * (2 ** factor);
  const infectionsByRequestedTimeSevere = currentlyInfectedSevere * (2 ** factor);
  const severeCasesByRequestedTimeImpact = 0.15 * infectionsByRequestedTimeImpact;
  const severeCasesByRequestedTimeSevere = 0.15 * infectionsByRequestedTimeSevere;
  const output = {
    infectionsByRequestedTimeImpact,
    infectionsByRequestedTimeSevere,
    currentlyInfected,
    currentlyInfectedSevere,
    severeCasesByRequestedTimeImpact,
    severeCasesByRequestedTimeSevere

  };
  return output;
}


const covid19ImpactEstimator = (currentlyInfected, currentlyInfectedSevere) => {
  const output = {
    data,
    impact: computeImpact(currentlyInfected, data),
    severeImpact: computeImpact(currentlyInfectedSevere, data)
  };
  return output;
};

module.exports = covid19ImpactEstimator;
