var fs = require('fs');

function mergeValues(values, content){

	//cycle over keys
			//replace all {{keys}} with the value from the values object

				for (var key in values) {

					content = content.replace("{{" + key + "}}", values[key]);
					
				}

		//return merged content
		return content;

}

function view(templateName, values, response) {

		//read from template files
		var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});

	
		//Insert values in to the content
		fileContents = mergeValues(values, fileContents);

		//write out the response
		response.write(fileContents);	
		
}

function addIdols(templateName, values, response){

	var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});

	var html = "";


	values.idols.forEach(function(idol){


		var trimmedString = idol.description.substring(0, 250);

		html += '<div class="idol" id="'+idol.person_tag+'">'
		html += '<div class="idol-img" style="background-image:url('+ idol.image.url +')"></div>'
		html += '<div class="popup"><span class="close">Stäng</span><h2 class="idol-title" >' + idol.name + '</h2>'
		html += '<p class="idol-desc">' + trimmedString + '...</p><div class="pagination"></div></div>'
		html += '<div class="highlight"></div>'
		html += '</div>'

		//<a href="idol/'+idol.person_tag+'">Läs mer</a>


	})







	response.write(html, {encoding: "utf8"});

}
function addIdol(values, response){

	var vidsPerPage = 6;
	var html = "";
		values.vidArray.forEach(function(vid){

		html += '<div class="video"><a href="http://www.tv4play.se/program/idol?video_id='+vid.id+'"><img src="'+vid.image+'"</a></div>'

		})

	response.write(html, {encoding: "utf8"});

}


module.exports.addIdol = addIdol;
module.exports.view = view;
module.exports.addIdols = addIdols;


