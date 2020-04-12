const input = {
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
const data = input;
function computeImpact() {
  const currentlyInfected = data.reportedCases * 10;

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
  const power = 2 ** factor;
  const infections = currentlyInfected * power;
  const infectionsByRequestedTime = infections;
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;

  const output = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime

  };
  return output;
}
function computeSevereImpact() {
  const currentlyInfected = data.reportedCases * 50;
  let days = null;
  const duration = data.timeToElapse;
  if (data.periodType === 'days') {
    days = duration;
    return days;
  }
  if (data.periodType === 'weeks') {
    days = duration * 7;
    return days;
  }
  if (data.periodType === 'months') {
    days = duration * 30;
    return days;
  }
  const factor = Math.trunc(days / 3);
  const power = 2 ** factor;
  const infections = currentlyInfected * power;
  const infectionsByRequestedTime = infections;
  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;


  const output = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime

  };
  return output;
}
const covid19ImpactEstimator = () => {
  const output = {
    data: input,
    impact: computeImpact(),
    severeImpact: computeSevereImpact()
  };
  return output;
};

export default covid19ImpactEstimator;
