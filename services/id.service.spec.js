describe('The guid service', function() {

  // bring in guid service
  const guidService = require('../services/guid.service');

  it('generateLong() should be defined', function() {

    expect(guidService.generateLong).toBeDefined();

  });
  
});