describe('The email service', function() {

  // bring in email service
  const emailService = require('../services/email.service');

  it('sendWelcome() should be defined', function() {

    expect(emailService.sendWelcome).toBeDefined();

  });

  it('sendClaimPlace() should be defined', function() {

    expect(emailService.sendClaimPlace).toBeDefined();

  });

  it('sendForgotPassword() should be defined', function() {

    expect(emailService.sendForgotPassword).toBeDefined();

  });

  it('sendAccountCancellation() should be defined', function() {

    expect(emailService.sendAccountCancellation).toBeDefined();

  });
});