var express = require("express");
var app = express();
var router = express.Router();
var Profile = require("./profile.js");
var Profiles = require("./profiles.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");

var commonHeader = {'content-Type' :'text/html'};

//mina statisca filer css osv
app.use(express.static('public'));


//GET FÖR ALLA IDOLERNA
app.get('/', function (request, response) {

        var idolProfiles = new Profiles();

      idolProfiles.on("end", function(idolsJSON){
        var idols  = idolsJSON.participant_groups[0].participants;

      var values = {

        idols: idols,
        name: idolsJSON.name,
        siteimg: idolsJSON.program_image,
        person_tag: idolsJSON.person_tag,
        desc: idolsJSON.description

      }

      values.idols.forEach(function(idol){
        console.log(idol.person_tag)
      })


    //visa idoler
    response.writeHead(200, commonHeader);
    renderer.view("header",values, response);
    renderer.addIdols('idolerna', values, response);
    renderer.view('footer', {}, response);
    response.end();

    });

          

});


//GET FÖR EN IDOL

app.get('/idol/:ID', function (request, response) {
    var idolProfile = new Profile(request.params.ID);


    idolProfile.on('end', function(idolsJSON){

      var values =  {
        totalVids: idolsJSON.total_hits,
        vidArray: idolsJSON.results
      }

    response.writeHead(200, commonHeader);
    renderer.view("header",values, response);
    renderer.addIdol(values, response);
    renderer.view('footer', {}, response);
    response.end();

    })


})



app.listen(1337, function () {
  console.log('Example app listening on port 1337!');
});
