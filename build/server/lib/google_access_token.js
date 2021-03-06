// Generated by CoffeeScript 1.11.1
var OAuth2, client, data, log, oauth2Client, querystring, request, requestJson, scopes;

requestJson = require('request-json');

request = require('request');

querystring = require('querystring');

log = require('printit')({
  prefix: 'GAT'
});

client = requestJson.createClient('https://www.googleapis.com/oauth2/v3/token');

client.headers['Content-Type'] = 'application/x-www-form-urlencoded';

data = {
  client_secret: "1gNUceDM59TjFAks58ftsniZ",
  redirect_uri: "urn:ietf:wg:oauth:2.0:oob",
  grant_type: "authorization_code",
  client_id: "260645850650-2oeufakc8ddbrn8p4o58emsl7u0r0c8s.apps.googleusercontent.com"
};

scopes = ['https://www.google.com/m8/feeds', 'https://www.googleapis.com/auth/userinfo.email'];

OAuth2 = require('google-auth-library').prototype.OAuth2;

oauth2Client = new OAuth2(data.client_id, data.client_secret, data.redirect_uri);

module.exports.oauth2Client = oauth2Client;

module.exports.getAuthUrl = function() {
  return oauth2Client.generateAuthUrl({
    scope: scopes
  });
};

module.exports.generateRequestToken = function(authCode, callback) {
  var urlEncodedData;
  data.code = authCode;
  urlEncodedData = querystring.stringify(data);
  log.debug("requestToken " + authCode);
  return client.post("?" + urlEncodedData, data, function(err, res, body) {
    if ((err == null) && (body.error != null)) {
      err = body;
    }
    if (err) {
      return callback(err);
    }
    log.debug("gotToken", body);
    return callback(err, body);
  });
};

module.exports.refreshToken = function(refreshToken, callback) {
  var form;
  form = {
    client_secret: data.client_secret,
    client_id: data.client_id,
    refresh_token: refreshToken,
    grant_type: "refresh_token"
  };
  return request({
    method: 'POST',
    form: form,
    uri: "https://www.googleapis.com/oauth2/v3/token",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, function(err, res, body) {
    if (err) {
      return callback(err);
    }
    body = JSON.parse(body);
    if (body.error != null) {
      err = body;
    }
    log.debug("got fresh Token", body);
    return callback(err, body);
  });
};
