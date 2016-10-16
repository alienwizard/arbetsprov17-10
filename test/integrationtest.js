
var sw = require('selenium-webdriver');
var driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.chrome())
  .build()

var chai = require('chai');
var chaiWebdriver = require('chai-webdriver');
chai.use(chaiWebdriver(driver));

  it('it should get tempalted with the show name', function (done) {
driver.get('http://127.0.0.1:1337/');
chai.expect('.title').dom.to.not.contain.text("I'm a kitty!");

done();
});