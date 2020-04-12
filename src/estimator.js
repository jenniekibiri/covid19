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

function computeImpact(currentlyInfected) {
  const output = {
    currentlyInfected

  };
  return output;
}


const covid19ImpactEstimator = () => {
  const currentlyInfected = data.reportedCases * 10;
  const currentlyInfectedSevere = data.reportedCases * 50;
  const output = {
    data,
    impact: computeImpact(currentlyInfected, data),
    severeImpact: computeImpact(currentlyInfectedSevere, data)
  };
  return output;
};

module.exports = covid19ImpactEstimator;
