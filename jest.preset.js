const nxPreset = require('@nrwl/jest/preset').default;
nxPreset.coverageReporters = ['text-summary'];

module.exports = {
  ...nxPreset,
};
