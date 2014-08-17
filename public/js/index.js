var wWidth = 0;
var wHeight = 0;

$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  	var loaded = 0;
  	var images = $(document).find("img").filter(function(index, img) {
        return !img.complete;
   	});

	// Find any?
	if (images.length === 0) {
	  	//Nope, we're done loading images, set heights
	  	//and widths
	    setHeightsAndWidths();
	    addScrollListeners();
	}else {
	    // We're waiting for some images, do that
	    loaded = 0;
	    images.load(function() {
	        // One of them loaded; was it the last one?
	        if (++loaded === images.length) {
	            // Yup, we're done
	            setHeightsAndWidths();
	            addScrollListeners();
	        }
	    }); 
	}
  	addEventListeners();
  	addTagClickEvents();
});



function setHeightsAndWidths(){
	wWidth = $(window).width();
  	wHeight = $(window).height();

  	$('.fullPageImg').height(wHeight);
  	$('.fullPageImg').width(wWidth);

  	var aboutSectionHeight = $('#aboutVertCenter').height();
  	var aboutSectionPadding = 15 + (wHeight - aboutSectionHeight)/2;
  	// $('#aboutSection').css("padding-top", wHeight);
  	$('#aboutSection').css("padding-top", aboutSectionPadding)
  	$('#aboutSection').css("padding-bottom", aboutSectionPadding);
  	var contactContainerHeight = $('#contactVertCenter').height();
  	var contactContainerPadding = (wHeight - contactContainerHeight)/2;
  	$('#contactVertCenter').css("padding-top", contactContainerPadding);
  	$('#contactVertCenter').css("padding-bottom", contactContainerPadding);
  	$('#contactVertCenter').css("background-color", "#EDEDED");
}

function addEventListeners(){
	$("#aboutButton").click(function(event) {
		event.preventDefault();
	    $('html, body').animate({
	        // scrollTop: $("#aboutVertCenter").offset().top
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
	        scrollTop: $("#blogSection").offset().top - 55
	    }, 600);
	});
}

function addScrollListeners(){   
   //Make the available tags "stick" to the top of the page
   //as you scroll
   $(window).scroll(updateLinkCntnrPos);
}

function updateLinkCntnrPos() {
   
   if ($(window).scrollTop() < wHeight-5){
      $('#linkCntnr').css("position", "static");
      $('#linkCntnr').css("top", "auto");
      $('#linkCntnr').css("background-color", "");

      $('#aboutButton').removeClass("content");
      $('#contactButton').removeClass("content");
      $('#blogButton').removeClass("content");
      $('#aboutButton').removeClass("active");
      $('#contactButton').removeClass("active");
      $('#blogButton').removeClass("active");

      $('#aboutButton').addClass("photo");
      $('#contactButton').addClass("photo");
      $('#blogButton').addClass("photo");

   }else{

      $('#linkCntnr').css("position", "fixed");
      $('#linkCntnr').css("top", "0"); 
      $('#linkCntnr').css("background-color", "white");
      $('#linkCntnr').css("width", "100%");
      $('#linkCntnr').css("height", "20px;");

      $('#aboutButton').removeClass("photo");
      $('#contactButton').removeClass("photo");
      $('#blogButton').removeClass("photo");
      $('#aboutButton').addClass("content");
      $('#contactButton').addClass("content");
      $('#blogButton').addClass("content");


      if ($(window).scrollTop() >= $("#aboutSection").offset().top - 5 &&
      		$(window).scrollTop() < $("#contactSection").offset().top) {
      	$('#aboutButton').addClass("active");
      	$('#contactButton').removeClass("active");
      	$('#blogButton').removeClass("active");
      }
      if ($(window).scrollTop() >= $("#contactSection").offset().top - 55 && 
      		$(window).scrollTop() < $("#blogSection").offset().top - 55) {
      	$('#contactButton').addClass("active");
      	$('#aboutButton').removeClass("active");
      	$('#blogButton').removeClass("active");
      }

      if ($(window).scrollTop() >= $("#blogSection").offset().top - 55) {
      	$('#blogButton').addClass("active");
      	$('#contactButton').removeClass("active");
      	$('#aboutButton').removeClass("active");
      }
   }
}

function addTagClickEvents() {

}

