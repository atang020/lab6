'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	//e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	//alert("User clicked on project " + idNumber);
	//alert("project/"+idNumber);
	var str = "#".concat(projectID);
	var str1 = str.concat(" .details");


	var url = "/project/" + idNumber;

	$.get(url, addDetails);

}

function addDetails(result){
	var projectHTML = '<a href="#" class="thumbnail">' +
    '<img src="' + result['image'] + '" class="img">' +
    '<p>' + result['title'] + '</p>' +
    '<p><small>' + result['date'] +
    '</small></p>' +
    '<p>'+ result['summary'] + '</p></a>'; 

    $("#project" + result['id']).html(projectHTML);

}

$(".project a").click(function(e){
	$.get("/project", addProjectDetails);
})

$("#colorBtn").click(function(e){
	$.get("/palette", randomColors);
})

function randomColors(e){
	$.get("/palette", getRandomColors);
}

function getRandomColors(result){
	var colors = result['colors']['hex'];
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}
/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
}