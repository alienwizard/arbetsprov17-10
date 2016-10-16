var expect    = require("chai").expect;
var request = require('request');
var assert = require('assert'),
//var server = require('../app.js');
http = require('http');

describe('/', function () {
  it('should return 200', function (done) {
    http.get('http://localhost:1337', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
