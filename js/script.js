var baseURL = "http://api.wunderground.com/api/";
var apiKey = "004ee43afc5c6206";
var input;
var fullURL;
var state;
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
			 iconDesc = data.current_observation.weather;
			 currTempCel = data.current_observation.temp_c;
			 currTempFar = data.current_observation.temp_f;
			 container = $("#represent");
			 container.addClass("newClass");
			
			container.html(targetLoc + "<br/>" + "<img src='" +targetIcon +"'/><br/>" + iconDesc + "<br/>" +
			currTempCel + "&#8451;<br/>" + currTempFar + "&#8457;");

//////////////////////////RETRIEVING FORECAST DATA AND GENERATING HTML DYNAMICALLY//////////////////////////////////

			for(i = 0; i < data.forecast.simpleforecast.forecastday.length; i++) {
				currDay = data.forecast.simpleforecast.forecastday[i];

				 month = currDay.date.monthname;
				 date = currDay.date.day;
				 weekDay = currDay.date.weekday;

				 foreIconDesc = currDay.conditions;
				 foreIconUrl = currDay.icon_url;

				 highTempCel = currDay.high.celsius;
				 highTempFar = currDay.high.fahrenheit;

				 lowTempCel = currDay.low.celsius;
				 lowTempFar = currDay.low.fahrenheit;
				 // console.log(document.getElementById("day" + (i+1)));

				$("#day" + (i+1)).html( month +" " + date + "<br/>" + weekDay + "<br/><img src='" + foreIconUrl + "' /><br/>" +
					foreIconDesc +"<br/><br/> High: " + highTempCel + "&#8451;" + " / " + "High: " + highTempFar + "&#8457; <br/>" +
					"Low: " + lowTempCel + "&#8451;" + " / " + lowTempFar + "&#8457;" );
				
				$("#day" + (i+1)).addClass("newClassFore");
			}
			
		}).fail(function(){	   // IF I DATA RETRIEVAL FAILS, THEN...
			console.log("Sorry, couldn't load data");
		})
	}
	getData();
	
}
	
