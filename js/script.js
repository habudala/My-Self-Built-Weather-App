var baseURL = "http://api.wunderground.com/api/";
var apiKey = "004ee43afc5c6206";
var input;
var fullURL;
var state;
var newData;
var city;


function form (){
	input = document.getElementById("input").value;
	state = document.getElementById("selected").value;
	fullURL = baseURL + apiKey + "/conditions/forecast/q/" + state + "/" + input + ".json";

	function getData () {
		$.getJSON(fullURL)
				
		.done(function(data){
			console.log(data);
		}).fail(function(){
			console.log("Sorry, couldn't load data");
		})
	}
	getData();

	return false;

}
	
