var baseURL = "http://api.wunderground.com/api/";
var apiKey = "004ee43afc5c6206";
var input;
var fullURL;
var state;
var city;
var mySubmit = document.getElementById("button");
mySubmit.addEventListener("click", form, false);

function form (e){

	e.preventDefault();

/////////////////////////////CLIENT INPUT STRING MANIPULATION///////////////////////////////////////
	input = document.getElementById("input").value;
	input = input.trim();
	firstLetter = input.substring(0,1);
	otherLetters = input.substring(1);
	firstLetter = firstLetter.toUpperCase();
	input = firstLetter + otherLetters;
	
	var space = input.search(" ");

	if (space > -1) {
		 secLetterPos = space +1;
		 secLetter = input.substring(secLetterPos, secLetterPos + 1);
		 secLetter = secLetter.toUpperCase();
		 rest = input.slice(secLetterPos +1);
		 newSecWord = secLetter + rest;
		 firstWord = input.slice(0,space);
		 input = firstWord + " " + newSecWord;
		  
	}
	input = input.replace(/ /g,"_");
	//console.log(input); // I WORK!!!

/////////////////////////////RETRIEVING JSON FROM UNDERGROUND WEATHER////////////////////////////////
	state = document.getElementById("selected").value;
	fullURL = baseURL + apiKey + "/conditions/forecast/q/" + state + "/" + input + ".json";

	function getData () {
		$.getJSON(fullURL)
				
		.done(function(data){	// IF DATA IS SUCESSFULLY RETRIEVED,THEN...
			 console.log(data);
			 targetLoc = data.current_observation.display_location.full;
			 targetIcon = data.current_observation.icon_url;
			 iconDesc = data.current_observation.icon;
			 currTempCel = data.current_observation.temp_c;
			 currTempFar = data.current_observation.temp_f;
			 container = $("#represent");
			 container.addClass("newClass");
			
			container.html(targetLoc + "<br/>" + "<img src='" +targetIcon +"'/><br/>" + iconDesc + "<br/>" +
			currTempCel + "&#8451;<br/>" + currTempFar + "&#8457;")
			
		}).fail(function(){	   // IF I DATA RETRIEVAL FAILS, THEN...
			console.log("Sorry, couldn't load data");
		})
	}
	getData();
	
}
	
