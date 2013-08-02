//The document.ready() function
$(document).ready(function(){

	//These are for the nav bars. When clicked, they navigate toward a certain section of the infographic.
	$('.bar1').click(function(){
		window.scrollTo(0, 0);
	});
	
	$('.bar2').click(function(){
		window.scrollTo(0, 1100);
	});
	
	$('.bar3').click(function(){
		window.scrollTo(0, 2100);
	});
	
	$('.bar4').click(function(){
		window.scrollTo(0, 3100);
	});
	
	$('.bar5').click(function(){
		window.scrollTo(0, 4100);
	});
	
	$('.go_back_to_map').click(function(){
		window.scrollTo(0, 0);
	});
	
	$('.bar1, .bar2, .bar3, .bar4, .bar5').mouseover(function(){
		$(this).css("text-decoration","underline");
	});
	
	$('.bar1, .bar2, .bar3, .bar4, .bar5').mouseout(function(){
		$(this).css("text-decoration","none");
	});
	
	
});

//This function runs as soon as the window loads. It creates the map and plots the points from the fusion tables on it.
function initialize(){
	//This creates a geocoder that extracts data and plots an address when a user clicks on a point
	geocoder = new google.maps.Geocoder();
	
	//These map options specify the initial zoom of the map on the map canvas, where the map should be centered, and the type of map (roadmap or satellite)
	var mapOptions = {
		zoom: 4,
		center: new google.maps.LatLng(35.41719242517469, -95.3651930625),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	//The 'map' variable places the map on the 'map_canvas' div. The 'mapOptions' reaches back to the declared variable 'mapOptions'.
	var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	
	//The statesLayer_civic will take data from the 'geometry' column and plot it on the map as polygons
	var statesLayer_civic  = new google.maps.FusionTablesLayer({
		query: {
			select: "geometry",
			from: stateId
		},
		map:map,
		styleId: 8,
		templateId: 16,
		suppressInfoWindows: true
	});
	
	//The MSALayer creates the layer that will be populated with the metropolitan and micropolitan statistical areas
	var MSALayer = new google.maps.FusionTablesLayer({
		query: {
			select: "geometry",
			from: MSAId
		},
		map: map,
		styleId: 2,
		templateId: 2,
		suppressInfoWindows: true
	});
	
	//This hides or shows the MSALayer when the user loads the page
	MSALayer.setMap(map);
	
	//These functions add listeners, so something happens when a user clicks on the statesLayer_civic or the MSALayer
	google.maps.event.addListener(statesLayer_civic, 'click', findState);
	google.maps.event.addListener(MSALayer, 'click',findMSA)
	
	//This function returns the name of the state and spits it back out into the info div. It also sets the boundaries of the map to the boundaries of the state.
	function findState(address) {
	
	//statesLayer_civic.setMap(map);
	
	
		var row = address.row;
		for (var x in row) {
				  if (row.hasOwnProperty('name')){
					  myHtml = row['name'].value;
				  }
			  }
	        //Get a click to return a state name as myHtml
			var addressStr=myHtml;
			
          if (!address && (addressStr != '')) 
             address = "State of "+addressStr;
	  else 
             address = addressStr;
          if ((address != '') && (address != 'Alaska')  && geocoder) {
           geocoder.geocode( { 'address': address}, function(results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
             if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
               if (results && results[0]
	           && results[0].geometry && results[0].geometry.viewport) 
                 map.fitBounds(results[0].geometry.viewport);
             } else {
               alert("No results found");
             }
           } else {
            alert("Geocode was not successful for the following reason: " + status);
	   		}
			}
		)
	 }
	//This makes the MSALayer appear after the map zooms in	 
		MSALayer.setMap(map);
			  document.getElementById('info').innerHTML=myHtml; 
  	}
  	function findMSA(address) {
	
		var row = address.row;
		for (var x in row) {
				  if (row.hasOwnProperty('name')){
					  myHtml = row['name'].value;
				  }
			  }
	        //Get a click to return a state name as myHtml
			var addressStr=myHtml;
			
	//This makes the MSALayer appear after the map zooms in	 
		//MSALayer.setMap(map);
			  document.getElementById('info_here').innerHTML=myHtml;
			  slide_div();
  	}
}

//This function slides the div when you click on a point in the MSALayer
function slide_div(){
	//alert("Slide div");
	$('#map_canvas').animate({
		top:'-100%',
		duration:70000
	});
	//alert("Slow");
	create_infographic();
};

//This function will grab the infographic associated with the clicked MSA and display it on the screen
function create_infographic(){
	create_back_button();
	
	//Reveals navigation items and the infographic
	$('.bar1, .bar2, .bar3, .bar4, .bar5').css("display","block");
	
	$('.infographic').css('display','block').css('height','1000em');
	$('.volunteer_icon_main, .main_text, .stop_go_back, .map_person, .background_image').css('display','none');
	
	getjsons();
	
}

//This function will create the back button needed to get back to the map canvas. It also removes the back button when the user clicks it, and moves the map canvas back to the forefront.
function create_back_button(){
	$('body').append('<div id="back_button" class="back_button">Back to map</div>');
	
	$('.back_button').animate({
		opacity:'1',
		duration:70000
	});
	
	$('.back_button').click(function(){
		$('#map_canvas').animate({
			top:'15%',
			duration:70000
		});
		$('.fixed_top').html("Who are your volunteers?");
		$('.infographic').css("display","none");
		$('.bar1, .bar2, .bar3, .bar4, .bar5').css("display","none");
		$(".volunteers_by_year").html('');
		$(".where_people_volunteered, .public_schools, .corporations, .media, .politics, .public_official, .local_elections, .political_thoughts_online, .neighbor_talk").html('');
		//This makes the window scroll back to the top
		window.scrollTo(0, 0);
		
		//Make the various icons reappear
		$('.volunteer_icon_main, .main_text,.stop_go_back, .map_person, .background_image').css('display','block');
		$('.back_button').remove();
	});
	
}

function getjsons(){
	
	//Opening slide JSONs
	$.getJSON('jsons/MSA_names.json', function(data){
	
	//declare variables
	var MSA_name_from_table = $('#info_here').html();
	
		$.each(data.MSA_data, function(i, MSA_data){
			
			//Displays name of MSA at the top of the screen
			if (MSA_name_from_table === MSA_data['Metropolitan Area']){
				$('.fixed_top').html(MSA_data['Metropolitan Area']);
				
				//volunteers_by_year();
				/*
				if(MSA_data.gender === "female"){
					$('.gender_icon').html('<img src="images/main/female_icon.png" />')
				} else {
					$('.gender_icon').html('<img src="images/main/male_icon.png" />')
				}*/
				
				return false;
			}
			
			
		});
	});
	
	//Slide 1 JSONs
	where();
	volunteers_2011();
	
	//displays basic information
	basic_data();
	
	//Slide 2 JSONs
	
	//displays volunteer by gender
	volunteer_by_gender();
	
	//Gets data about the environment
	environmental_data();
	
	//Gets data about volunteering 2004-2011
	volunteer_by_year();
	
	//Activities
	create_activity_pies();
	
	//public schools
	public_schools();
	
	//corporations
	corporations();
	
	//displays age and race
	age_race();
	age_breakdown();
	special_populations();
	
	//media
	media();
	
	//displays five pie charts on bulletin board slide
	charts();
	
	
	
	
	
}

function volunteer_by_gender(){
	//Width and height
			var w = 113;
			var h = 250;
			var barPadding = 1;

			d3.json('jsons/gender.json', function(data){
			
				$.each(data.MSA_gender, function(i, MSA_gender){
					
				//console.log(MSA_gender);
				
					var MSA_name_from_table = $('#info_here').html();
				
					if (MSA_gender['metropolitan area'] == MSA_name_from_table) {
						
						//console.log(MSA_gender['volunteering_by_gender']);
						
						var by_gender = MSA_gender['volunteering_by_gender'];
						var by_gender_labels = MSA_gender['labels_volunteering_by_gender'];
						
						var dataset = [by_gender[0],by_gender[1]];
						var dataset2 = [by_gender_labels[0],by_gender_labels[1]];
						//console.log(dataset);
						
						//THIS IS WHERE THE BAR GRAPH CREATION CHART WILL GO
						
		var xScale = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, w], 0.05);

			var yScale = d3.scale.linear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);

			//Create SVG element
			var svg = d3.select(".volunteering_by_gender")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
			
			

			//Create bars
			
			
			

			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d);
			   })
			   .attr("width", xScale.rangeBand())
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + (d * 10) + ")";
			   })
			   
			   
			
			   .on("mouseover", function(d) {

					//Get this bar's x/y values, then augment for the tooltip
					var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
					var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

					//Create the tooltip label
					svg.append("text")
					   .attr("id", "tooltip")
					   .attr("x", xPosition)
					   .attr("y", yPosition)
					   .attr("text-anchor", "middle")
					   .attr("font-family", "sans-serif")
					   .attr("font-size", "11px")
					   .attr("font-weight", "bold")
					   .attr("fill", "black")
					   .text(d);

			   })
			   .on("mouseout", function() {

					//Remove the tooltip
					d3.select("#tooltip").remove();

			   })
			   .on("click", function() {
			   		sortBars();
			   });
			   
			   svg.selectAll("text")
			   .data(dataset2)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
			   })
			   .attr("y", function(d) {
			   		return h - 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "18px")
			   .attr("fill", "pink")
			   .attr("display","none");

			//Define sort order flag
			var sortOrder = false;

			//Define sort function
			var sortBars = function() {

				//Flip value of sortOrder
			   	sortOrder = !sortOrder;

				svg.selectAll("rect")
				   .sort(function(a, b) {
				   		if (sortOrder) {
					   		return d3.ascending(a, b);
				   		} else {
					   		return d3.descending(a, b);
				   		}
				   	})
				   .transition()
				   .delay(function(d, i) {
					   return i * 50;
				   })
				   .duration(1000)
				   .attr("x", function(d, i) {
				   		return xScale(i);
				   });

			};	
						
					}
					else{
						//alert("no!")
					}
			
				
					
});
});
}
