'use strict';

// packages
const request = require('request');

// services
const environmentService = require('../services/environment.service');

const mailgun = {
  key: environmentService.returnMailgun().key,
  domain: environmentService.returnMailgun().domain,
  url: function() {
    return `https://api:key-${this.key}@api.mailgun.net/v3/${this.domain}/messages`;
  }
};

/**
 * Builds the body of the email
 * @param {*} user 
 * @param {string} previewText
 * @param {string} firstMessage
 * @param {string} ctaLink
 * @param {*} ctaText
 * @param {*} secondMessage
 * @returns {string} - the built-out email
 */
const constructEmail = function(user, previewText, firstMessage, ctaLink, ctaText, secondMessage) {

  let email = 
  `<!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Sipi Guia Urbana</title>
    </head>
    <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
      <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
        <tr>
          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
          <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
            <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
  
              <!-- START HEADER -->
              <div class="footer" style="clear: both; text-align: center; width: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                  <tr>
                    <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                      <img alt="El logo de Sipi" height="50" src="http://sipi.herokuapp.com/assets/svgs/sipi-logo.svg" width="50">
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END HEADER -->
            
              <!-- START CENTERED WHITE CONTAINER -->
              <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">${previewText}</span>
              <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
  
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                      <tr>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hola ${user},</p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">${firstMessage}</p>
                          <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                            <tbody>
                              <tr>
                                <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                    <tbody>
                                      <tr>
                                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #007bff; border-radius: 5px; text-align: center;"> <a href="${ctaLink}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #007bff; border: solid 1px #007bff; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #007bff;">${ctaText}</a> </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">${secondMessage}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
              <!-- END MAIN CONTENT AREA -->
              </table>
  
              <!-- START FOOTER -->
              <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                  <tr>
                    <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                      <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">
                      Servicios Integrales Pro Imagen S.A de C.V
                      San Salvador, El Salvador
                      </span>
                      <br>¿Cambiastes de opinion? <a href="http://i.imgur.com/CScmqnj.gif" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">Cancelar suscripción</a>.
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
  
            <!-- END CENTERED WHITE CONTAINER -->
            </div>
          </td>
          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>`;

  return email;

}

/**
 * Sends welcome email
 * @async
 * @param {object} user - the user object
 */
module.exports.sendWelcome = function(user) {

  let body = { 
    from: 'jorge.e.valle@gmail.com', 
    subject: 'Bienvenido a Sipi', 
    to: user.email,
    html: constructEmail(
      user.firstName,
      '<p>¡Bienvenido a Sipi!</p>', // this is preview text
      '<p>Bienvenido a Sipi, la guia urbana de Centroamerica y el Caribe.</p>',
      'http://www.google.com',
      'Hacer la cosa',
      '<p>Gracias por su membresia.</p>'
    )
  };

  // execute post
  request.post({
    url: mailgun.url(),
    form: body
  },
  function(err, httpResponse, body) {
    console.log(err, body);
  });

};

/**
 * Sends claim place email
 * @param {object} user
 */
module.exports.sendClaimPlace = function(user) {

  let body = { 
    from: 'jorge.e.valle@gmail.com', 
    subject: 'Verificar su lugar', 
    to: user.email,
    html: constructEmail(
      user.firstName,
      '<p>Verificar su lugar</p>', // this is preview text
      '<p>Verifique su lugar. </p>',
      'http://www.google.com',
      'Verificar',
      '<p>Si tiene cualquier problema, por favor contactenos.</p>'
    )
  };

  // execute post
  request.post({
    url: mailgun.url(),
    form: body
  },
  function(err, httpResponse, body) {
    console.log(err, body);
  });

};

/**
 * Sends forgot password email
 * @async
 * @param {object} user
 */
module.exports.sendForgotPassword = function(user) {

  let body = { 
    from: 'jorge.e.valle@gmail.com', 
    subject: 'Cambiar su contraseña', 
    to: user.email,
    html: constructEmail(
      user.firstName,
      '<p>Cambiar su contraseña</p>', // this is preview text
      '<p>Parece que quiere cambiar su contraseña. </p>',
      'http://www.google.com',
      'Cambie Su Contraseña',
      '<p>Si tiene cualquier problema, por favor contactenos.</p>'
    )
  };

  // execute post
  request.post({
    url: mailgun.url(),
    form: body
  },
  function(err, httpResponse, body) {
    console.log(err, body);
  });

};

/**
 * Sends account cancellation email
 * @async
 * @param {object} user
 */
module.exports.sendAccountCancellation = function(user) {

  let body = { 
    from: 'jorge.e.valle@gmail.com', 
    subject: 'Cancelar membresia', 
    to: user.email,
    html: constructEmail(
      user.firstName,
      '<p>Cancelar membresia</p>', // this is preview text
      '<p>Sentimos mucho que quiere cancelar su membresia. </p>',
      'http://www.google.com',
      'Cancelar Membresia',
      '<p>Si tiene cualquier problema, por favor contactenos.</p>'
    )
  };

  // execute post
  request.post({
    url: mailgun.url(),
    form: body
  },
  function(err, httpResponse, body) {
    console.log(err, body);
  });

};