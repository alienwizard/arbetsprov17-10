var $=require("jquery");$(document).ready(function(){var documentW=$(".idol-wrapper").width();var documentH=$(".idol-wrapper").height();console.log($(".idol-wrapper"));var min_x=0;var min_y=100;var idols=$(".idol");var prevIdol={};var startposY=0;var startposX=0;var prevEPosY=[];var filled_areas=new Array;var length=250;
//Placera ut idolerna på skärmen
$(".idol").each(function(){
//var string = $('.idol-desc',this)[0].innerHTML
//var trimmedString = string.substring(0, length);
//trimmedString += ' ... <a href="/idol" class="more">Läs mer</a>' 
//$('.idol-desc',this)[0].innerHTML = trimmedString;
var rand_x=0;var rand_y=0;var area;do{rand_x=Math.round(min_x+(documentW-min_x)*(Math.random()%1));rand_y=Math.round(min_y+(documentH-min_y)*(Math.random()%1));area={x:rand_x,y:rand_y,width:$(this).width(),height:$(this).height()}}while(check_overlap(area));filled_areas.push(area);$(this).css({left:rand_x,top:rand_y})});function check_overlap(area){for(var i=0;i<filled_areas.length;i++){check_area=filled_areas[i];var bottom1=area.y+area.height;var bottom2=check_area.y+check_area.height;var top1=area.y;var top2=check_area.y;var left1=area.x;var left2=check_area.x;var right1=area.x+area.width;var right2=check_area.x+check_area.width;if(bottom1<top2||top1>bottom2||right1<left2||left1>right2){continue}return true}return false}
//Hover for the popup
$(".close").click(function(e){e.stopPropagation();$(this).closest(".popup").removeClass("visible");console.log($(this).closest(".popup"));
//$('.popup',this).removeClass('visible');
$(".videolist").remove();$(".popup").removeClass("visible")});$(".idol").mouseenter(function(){
//console.log(this);
$(".highlight",this).addClass("visible")}).mouseleave(function(){$(".highlight",this).removeClass("visible")});$(".idol").click(function(){console.log("idolclick");$(".popup",this).addClass("visible");var tag=$(this).attr("id");
//console.log(tag);
$.getJSON("http://api.tv4play.se/play/video_assets.json?tags="+tag+"",function(data){var videos=[];console.log(data.total_hits);console.log(data);var totalHits=data.total_hits;var vidLimit=6;var page=1;var number_of_pages=Math.ceil(totalHits/vidLimit);console.log(number_of_pages);var navigation_html='<a class="previous_link" href="javascript:previous();">Prev</a>';var current_link=0;while(number_of_pages>current_link){navigation_html+='<a class="page_link" href="javascript:go_to_page('+current_link+')" longdesc="'+current_link+'">'+(current_link+1)+"</a>";current_link++}navigation_html+='<a class="next_link" href="javascript:next();">Next</a>';$(".pagination").html(navigation_html);$(".pagination .page_link:first").addClass("active_page");for(var i=vidLimit-1;i>=0;i--){console.log(data.results[i].id);var id=data.results[i].id;var img=data.results[i].image;videos.push('<a class="video" id="'+id+'" href="http://www.tv4play.se/program/idol?video_id='+id+'"><img src="'+img+'"></a>');var lastID=id}$("<div/>",{class:"videolist",html:videos.join("")}).appendTo(".popup")})});
//animate the idols
animateIdols()});var posChange=0;function animateIdols(){var animated=0;var idols=$(".idol");var documentW=$(".page-wrapper").width();for(var i=idols.length-1;i>=0;i--){var oldPosLeft=$(idols[i]).offset().left;if(oldPosLeft>documentW){$(idols[i]).css({left:"0px"})}var scaleChange=Math.random()*1+.7;var oldPosTop=$(idols[i]).offset().top}setTimeout(function(){animateIdols()},4e3)}