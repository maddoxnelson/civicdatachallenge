function volunteer_by_year(){
	//Width and height
			var w = 300;
			var h = 150;
			var barPadding = 1;

			d3.json('jsons/years_of_volunteering.json', function(data){
			
				$.each(data.MSA_years, function(i, MSA_years){
					
					var MSA_name_from_table = $('#info_here').html();
					
					if (MSA_years['Metropolitan Area'] == MSA_name_from_table) {
						
						//console.log(MSA_years['number of volunteers in thousands']);
						
						var by_year = MSA_years['number of volunteers in thousands'];
						var by_year_labels = MSA_years['years'];
						
						var dataset = [by_year[0],by_year[1],by_year[2],by_year[3],by_year[4],by_year[5],by_year[6],by_year[7]];
						var dataset2 = [by_year_labels[0],by_year_labels[1],by_year_labels[2],by_year_labels[3],by_year_labels[4],by_year_labels[5],by_year_labels[6],by_year_labels[7]];
						//console.log(dataset);
						//console.log(dataset2);
						
						//THIS IS WHERE THE BAR GRAPH CREATION CHART WILL GO
						
		var xScale = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, w], 0.05);

			var yScale = d3.scale.linear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);

			//Create SVG element
			var svg = d3.select(".volunteers_by_year")
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
					   .attr("x", xPosition+15)
					   .attr("y", yPosition+30)
					   .attr("text-anchor", "middle")
					   .attr("font-family", "sans-serif")
					   .attr("font-size", "18px")
					   .attr("font-weight", "bold")
					   .attr("fill", "white")
					   .attr("stroke","1px")
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
			   .attr("font-size", "11px")
			   .attr("fill", "white");

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
function environmental_data(){
	d3.json('jsons/environmental.json', function(data){
	
	$.each(data.MSA_environmental, function(i, MSA_environmental){
					
				//console.log(MSA_environmental);
				
				var MSA_name_from_table = $('#info_here').html();
				
				if (MSA_environmental['Metropolitan Area'] == MSA_name_from_table) {
				
					var unemployment = MSA_environmental['Unemployment Rate, 2010'];
					var homeownership = MSA_environmental['Homeownership Rate'];
					var high_school_education = MSA_environmental['Percent of Residents with a High School Education'];
					var college_degree = MSA_environmental['Percent of Residents with a College Degree'];
					var poverty_rate = MSA_environmental['Poverty Rate'];
					var nonprofits = MSA_environmental['Nonprofits: Number per 1000 residents'];
					var environmental_labels = MSA_environmental['labels_environment'];
				
					//console.log(poverty_rate + "% unemployed");
					
					$('.high_school').html('<span class="environmental_num">'+ high_school_education + '%</span>'+ "<br/>have a high-school education");
					$('.college').html('<span class="environmental_num">'+college_degree + '%</span>'+ "<br/>have a college degree");
					$('.homeowners').html('<span class="environmental_num">' + homeownership + '%</span>'+"<br/>are homeowners");
					$('.underemployed').html('<span class="environmental_num">' + unemployment + '%</span>'+"<br/>are unemployed");
					$('.non_profits').html('<span class="environmental_num">' + nonprofits + '</span>'+"<br/>non-profits per 1000 residents");
					$('.poverty_rate').html('<span class="environmental_num">' + poverty_rate + '%</span>'+"<br/>are in poverty");
				
				};
				
				});
	});
}

function basic_data(){
/*
	d3.json('jsons/basic_data.json', function(data){
	
		$.each(data.MSA_basic_data, function(i, MSA_basic_data){
					
					var MSA_name_from_table = $('#info_here').html();
					
					if (MSA_basic_data['Metropolitan Area'] == MSA_name_from_table) {
						
						var total_hours = MSA_basic_data['Total Volunteer Hours (all organizations; in millions), annual data 2011'];
						var volunteer_num = MSA_basic_data['Number of volunteers (in thousands) 2011'];
					
						//console.log(MSA_basic_data['Total Volunteer Hours (all organizations; in millions), annual data 2011']);
						
						$('.volunteer_info').html(volunteer_num + ' volunteers volunteered for a total of ' + total_hours + ' hours in 2011 at all types of organizations!');

					}
					});
					});
					*/
					}
					
function where(){

	var w = 300,                        //width
    h = 300,                            //height
    r = 140,                            //radius
    color = d3.scale.ordinal().range(["#000000","#003300","#074707","#1F701F","#50AB50","#FFFFFF"]);     //builtin range of colors
    
	d3.json('jsons/where.json', function(data){
	
	$.each(data.MSA_where, function(i, MSA_where){
					
				//console.log(MSA_environmental);
				
				var MSA_name_from_table = $('#info_here').html();
				
				if (MSA_where['Metropolitan Area'] == MSA_name_from_table) {
					//console.log(MSA_where["Civic, political, professional or international"]);
					
					dataset = 	[{"label": "Civic, political, professional or international","value":MSA_where["Civic, political, professional or international"]}, 
            					{"label":"Educational or youth service", "value":MSA_where["Educational or youth service"]}, 
            					{"label":"Religious", "value":MSA_where["Religious"]},
            					{"label":"Social or community service", "value":MSA_where["Social or community service"]},
            					{"label":"Sport, hobby, cultural or arts", "value":MSA_where["Sport, hobby, cultural or arts"]},
            					{"label":"Other", "value":MSA_where["Other"]}];
            		//console.log(dataset);
            		
            		var vis = d3.select(".where_people_volunteered")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([dataset])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r)
        .innerRadius(r-30);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
		
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc)
                .attr("stroke","1");                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")      
            .attr("display","none")                    //center the text on it's origin
            .text(function(d, i) { return dataset[i].label; });
				}
				
				
				
				});
				});
}

function volunteers_2011(){
	d3.json('jsons/years_of_volunteering.json', function(data){
			
				$.each(data.MSA_years, function(i, MSA_years){
					
					var MSA_name_from_table = $('#info_here').html();
					
					if (MSA_years['Metropolitan Area'] == MSA_name_from_table) {
						
						$('.volunteers_2011').html('<span class="bolded_class">'+ MSA_years['number of volunteers in thousands'][7]);
						
						console.log(MSA_years['number of volunteers in thousands'][7]);
					}
					
					});
					});
}

function create_activity_pies(){

var w = 200,                        //width
    h = 300,                            //height
    r = 70,                            //radius
    color = d3.scale.ordinal().range(["#314510","#ABD958","#D0D0D0"]);     //builtin range of colors
    
	d3.json('jsons/politics.json', function(data){
	
	$.each(data.MSA_politics, function(i, MSA_politics){
					
				//console.log(MSA_activity_pies);
				
				var MSA_name_from_table = $('#info_here').html();
				
				if (MSA_politics['Metropolitan Area'] == MSA_name_from_table) {
					console.log(MSA_politics["Discuss Politics - Frequently"]);
					
				dataset= [{"label":"Discuss Politics - Frequently","value":MSA_politics["Discuss Politics - Frequently"]},
							{"label":" Discuss Politics - Infrequently","value":MSA_politics[" Discuss Politics - Infrequently"]},
							{"label":"Other","value":MSA_politics["Other"]}];
				
				var vis = d3.select(".politics")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([dataset])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
		
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")      
            .attr("display","none")                    //center the text on it's origin
            .text(function(d, i) { return dataset[i].label; });
				}
				
				
				
				});
				
				});
}

function public_schools(){
	var w = 300,                        //width
    h = 300,                            //height
    r = 80,                            //radius
    color = d3.scale.ordinal().range(["#A8DAFF","#2358FE","#1D47C7","#193990"]);     //builtin range of colors
    
	d3.json('jsons/public_schools.json', function(data){
	
	$.each(data.MSA_public_schools, function(i, MSA_public_schools){
					
				//console.log(MSA_activity_pies);
				
				var MSA_name_from_table = $('#info_here').html();
				
				if (MSA_public_schools['Metropolitan Area'] == MSA_name_from_table) {
					console.log(MSA_public_schools["Q21: Confidence in Public School - Hardly any Confidence"]);
					
				dataset= [{"label":"Q21: Confidence in Public Schools - No Confidence","value":MSA_public_schools["Q21: Confidence in Public Schools - No Confidence"]},
							{"label":"Q21: Confidence in Public School - Hardly any Confidence","value":MSA_public_schools["Q21: Confidence in Public School - Hardly any Confidence"]},
							{"label":"Q21: Confidence in Public Schools - Some Confidence","value":MSA_public_schools["Q21: Confidence in Public Schools - Some Confidence"]},
							{"label":"Q21: Confidence in Public Schools - A great Deal of Confidence","value":MSA_public_schools["Q21: Confidence in Public Schools - A great Deal of Confidence"]}];
				
				var vis = d3.select(".public_schools")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([dataset])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice")
                .attr("stroke","1px");    //allow us to style things in the slices (like text)
		
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc)
                .attr("stroke","1px");                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")      
            .attr("display","none")                    //center the text on it's origin
            .text(function(d, i) { return dataset[i].label; });
				}
				
				
				
				});
				
				});
}

function corporations(){
	var w = 300,                        //width
    h = 300,                            //height
    r = 80,                            //radius
    color = d3.scale.ordinal().range(["#A8DAFF","#2358FE","#1D47C7","#193990"]);     //builtin range of colors
    
	d3.json('jsons/corporations.json', function(data){
	
	$.each(data.MSA_corporations, function(i, MSA_corporations){
					
				//console.log(MSA_activity_pies);
				
				var MSA_name_from_table = $('#info_here').html();
				
				if (MSA_corporations['Metropolitan Area'] == MSA_name_from_table) {
					//console.log(MSA_public_schools["Discuss Politics - Frequently"]);
					
				dataset2= [{"label":"Q21: Confidence in Corporations - No Confidence","value":MSA_corporations["Q21: Confidence in Corporations - No Confidence"]},
					{"label":"Q21: Confidence in Corporations - Hardly Any Confidence","value":MSA_corporations["Q21: Confidence in Corporations - Hardly Any Confidence"]},
					{"label":"Q21: Confidence in Corporations - Some Confidence","value":MSA_corporations["Q21: Confidence in Corporations - Some Confidence"]},
					{"label":"Q21: Confidence in Corporations - A great Deal of Confidence","value":MSA_corporations["Q21: Confidence in Corporations - A great Deal of Confidence"]}
					];
				console.log(dataset2);
				var vis = d3.select(".corporations")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([dataset2])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
		
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                  //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")      
            .attr("display","none")                    //center the text on it's origin
            .text(function(d, i) { return dataset2[i].label; });
				}
				
				
				
				});
				
				});
}

function media(){
	var w = 300,                        //width
    h = 300,                            //height
    r = 80,                            //radius
    color = d3.scale.ordinal().range(["#A8DAFF","#2358FE","#1D47C7","#193990"]);     //builtin range of colors
    
	d3.json('jsons/media.json', function(data){
	
	$.each(data.MSA_media, function(i, MSA_media){
					
				//console.log(MSA_activity_pies);
				
				var MSA_name_from_table = $('#info_here').html();
				
				if (MSA_media['Metropolitan Area'] == MSA_name_from_table) {
					//console.log(MSA_public_schools["Discuss Politics - Frequently"]);
					
				dataset2= [{"label":"Q21: Confidence in The Media - No Confidence","value":MSA_media["Q21: Confidence in The Media - No Confidence"]},
					{"label":"Q21: Confidence in The Media - Hardly any Confidence","value":MSA_media["Q21: Confidence in The Media - Hardly any Confidence"]},
					{"label":"Q21: Confidence in The Media - Some Confidence","value":MSA_media["Q21: Confidence in The Media - Some Confidence"]},
					{"label":"Q21: Confidence in The Media - A great Deal of Confidence","value":MSA_media["Q21: Confidence in The Media - A great Deal of Confidence"]}
					];
				console.log(dataset2);
				var vis = d3.select(".media")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([dataset2])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
		
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                  //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")      
            .attr("display","none")                    //center the text on it's origin
            .text(function(d, i) { return dataset2[i].label; });
				}
				
				
				
				});
				
				});
}

function charts(){

var w = 200,                        //width
    h = 300,                            //height
    r = 70,                            //radius
    color = d3.scale.ordinal().range(["#314510","#ABD958","#D0D0D0"]);     //builtin range of colors
    
	d3.json('jsons/charts.json', function(data){
	
	$.each(data.MSA_charts, function(i, MSA_charts){
					
				//console.log(MSA_activity_pies);
				
				var MSA_name_from_table = $('#info_here').html();
				
				if (MSA_charts['Metropolitan Area'] == MSA_name_from_table) {
					//console.log(MSA_Charts["Discuss Politics - Frequently"]);
					
				dataset= [{"label":"Vote in local elections (frequent)","value":MSA_charts["Vote in local elections (frequent)"]},
							{"label":"Vote in local elections (infrequent)","value":MSA_charts["Vote in local elections (infrequent)"]}];
				
				dataset2= [{"label":"internet frequent","value":MSA_charts["internet frequent"]},
							{"label":"internet infrequent","value":MSA_charts["internet infrequent"]}];
				
				dataset3= [{"label":"Q4a: Contacted Public Official - Yes","value":MSA_charts["Q4a: Contacted Public Official - Yes"]},
							{"label":"Q4a: Contacted Public Official - No","value":MSA_charts["Q4a: Contacted Public Official - No"]}];
				
				dataset4= [{"label":"Q10rc: Talk with Neighbors - Frequently","value":MSA_charts["Q10rc: Talk with Neighbors - Frequently"]},
							{"label":"Q10rc: Talk with Neighbors - Infrequently","value":MSA_charts["Q10rc: Talk with Neighbors - Infrequently"]}];
						
				public_official();
				
				voting();
				
				internet();
				
				neighbor_talk();
				
				
				}
				
				
				
				});
				
				});
}

function public_official(){

var w = 200,                        //width
    h = 300,                            //height
    r = 70,                            //radius
    color = d3.scale.ordinal().range(["#314510","#ABD958","#D0D0D0"]); 
	var vis = d3.select(".public_official")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([dataset])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
		
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")      
            .attr("display","none")                    //center the text on it's origin
            .text(function(d, i) { return dataset[i].label; });
}

function voting(){

var w = 200,                        //width
    h = 300,                            //height
    r = 70,                            //radius
    color = d3.scale.ordinal().range(["#314510","#ABD958","#D0D0D0"]); 
	var vis = d3.select(".local_elections")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([dataset2])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
		
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")      
            .attr("display","none")                    //center the text on it's origin
            .text(function(d, i) { return dataset2[i].label; });
}

function internet(){

var w = 200,                        //width
    h = 300,                            //height
    r = 70,                            //radius
    color = d3.scale.ordinal().range(["#314510","#ABD958","#D0D0D0"]); 
	var vis = d3.select(".political_thoughts_online")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([dataset3])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
		
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")      
            .attr("display","none")                    //center the text on it's origin
            .text(function(d, i) { return dataset3[i].label; });
}

function neighbor_talk(){

var w = 200,                        //width
    h = 300,                            //height
    r = 70,                            //radius
    color = d3.scale.ordinal().range(["#314510","#ABD958","#D0D0D0"]); 
	var vis = d3.select(".neighbor_talk")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([dataset4])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)
		
        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")      
            .attr("display","none")                    //center the text on it's origin
            .text(function(d, i) { return dataset4[i].label; });
}

function age_race(){
	//Width and height
			var w = 150;
			var h = 250;
			var barPadding = 5;

			d3.json('jsons/MSA_race_age.json', function(data){
				$.each(data.MSA_race_age, function(i, MSA_race_age){
					
				//console.log(MSA_gender);
				
					var MSA_name_from_table = $('#info_here').html();
				
					if (MSA_race_age['Metropolitan Area'] == MSA_name_from_table) {
						
						//console.log(MSA_gender['volunteering_by_gender']);
						
						var white = MSA_race_age['whites'];
						var black = MSA_race_age['blacks'];
						var asian = MSA_race_age['asians'];
						
						var dataset = [white,black,asian];
						console.log(dataset);
						
						//THIS IS WHERE THE BAR GRAPH CREATION CHART WILL GO
						
		var xScale = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, w], 0.05);

			var yScale = d3.scale.linear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);

			//Create SVG element
			var svg = d3.select(".by_race")
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
			   .data(dataset)
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

function age_breakdown(){
	//Width and height
			var w = 130;
			var h = 250;
			var barPadding = 5;

			d3.json('jsons/MSA_race_age.json', function(data){
				$.each(data.MSA_race_age, function(i, MSA_race_age){
					
				//console.log(MSA_gender);
				
					var MSA_name_from_table = $('#info_here').html();
				
					if (MSA_race_age['Metropolitan Area'] == MSA_name_from_table) {
						
						//console.log(MSA_gender['volunteering_by_gender']);
						
						var sixteen = MSA_race_age['16-24'];
						var twentyfive = MSA_race_age['25-34'];
						var thirtyfive = MSA_race_age['35-44'];
						var fortyfive = MSA_race_age['45-54'];
						var fiftyfive = MSA_race_age['55-64'];
						var sixtyfive = MSA_race_age['65 and over'];
						
						var dataset = [sixteen,twentyfive,thirtyfive,fortyfive,fiftyfive,sixtyfive];
						console.log(dataset);
						
						//THIS IS WHERE THE BAR GRAPH CREATION CHART WILL GO
						
		var xScale = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, w], 0.05);

			var yScale = d3.scale.linear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);

			//Create SVG element
			var svg = d3.select(".age_group")
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
			   .data(dataset)
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

function special_populations(){
	//Width and height
			var w = 150;
			var h = 250;
			var barPadding = 5;

			d3.json('jsons/MSA_race_age.json', function(data){
				$.each(data.MSA_race_age, function(i, MSA_race_age){
					
				//console.log(MSA_gender);
				
					var MSA_name_from_table = $('#info_here').html();
				
					if (MSA_race_age['Metropolitan Area'] == MSA_name_from_table) {
						
						//console.log(MSA_gender['volunteering_by_gender']);
						
						var young_adults = MSA_race_age['Young Adults (ages 16-24)'];
						var college_students = MSA_race_age['College Students (ages 16-24 in college)'];
						var Parents = MSA_race_age['Parents'];
						
						var dataset = [young_adults,college_students,Parents];
						console.log(dataset);
						
						//THIS IS WHERE THE BAR GRAPH CREATION CHART WILL GO
						
		var xScale = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, w], 0.05);

			var yScale = d3.scale.linear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);

			//Create SVG element
			var svg = d3.select(".special_population")
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
			   .data(dataset)
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