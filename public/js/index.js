var wWidth = 0;
var wHeight = 0;

$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

  setHeightsAndWidths();
  addEventListeners();
  
});



function setHeightsAndWidths(){
	wWidth = $(window).width();
  	wHeight = $(window).height();

  	$('.fullPageImg').height(wHeight);
  	$('.fullPageImg').width(wWidth);

  	var aboutSectionHeight = $('#aboutVertCenter').height();
  	var aboutSectionPadding = (wHeight - aboutSectionHeight)/2;
  	// $('#aboutSection').css("padding-top", wHeight);
  	$('#aboutSection').css("padding-top", aboutSectionPadding)
  	$('#aboutSection').css("padding-bottom", aboutSectionPadding);
  	var contactContainerHeight = $('#contactVertCenter').height();
  	var contactContainerPadding = 5 + (wHeight - contactContainerHeight)/2;
  	$('#contactVertCenter').css("padding-top", contactContainerPadding);
  	$('#contactVertCenter').css("padding-bottom", contactContainerPadding);
  	$('#contactVertCenter').css("background-color", "#EDEDED");
}

function addEventListeners(){
	$("#aboutButton").click(function(event) {
		event.preventDefault();
	    $('html, body').animate({
	        scrollTop: $("#aboutSection").offset().top
	    }, 600);
	});

	$("#contactButton").click(function(event) {
		event.preventDefault();
	    $('html, body').animate({
	        scrollTop: $("#contactSection").offset().top
	    }, 600);
	});

	$("#blogButton").click(function(event) {
		event.preventDefault();
	    $('html, body').animate({
	        scrollTop: $("#blogSection").offset().top
	    }, 600);
	});
}

